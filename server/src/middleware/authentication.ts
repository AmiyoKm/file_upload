import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../constants/constants";
import mongoose from "mongoose";



const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader =  req.headers.authorization;
    const authCookieToken = req.cookies.accessToken;
    if(authHeader){
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return  res.status(401).json({ success: false, error: 'Not authorized to access this route' });
         }
     
         const token = authHeader.split(' ')[1];
         try {
             const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: mongoose.Types.ObjectId };
             req.user = { userId: decoded.userId };
             next();
         } catch (error) {
             res.status(401).json({ success: false, error: 'Not authorized to access this route' });
     
         }
    }

    if(authCookieToken){
        try {
            const decoded = jwt.verify(authCookieToken, JWT_SECRET) as JwtPayload & { userId: mongoose.Types.ObjectId };
            req.user = { userId: decoded.userId };
            next();
        } catch (error) {
            res.status(401).json({ success: false, error: 'Not authorized to access this route' });
        }
    }
    
};

export default authentication;