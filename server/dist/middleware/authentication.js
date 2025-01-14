import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constants/constants.js";
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const authCookieToken = req.cookies.accessToken;
    if (authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = { userId: decoded.userId };
            next();
        }
        catch (error) {
            res.status(401).json({ success: false, error: 'Not authorized to access this route' });
        }
    }
    if (authCookieToken) {
        try {
            const decoded = jwt.verify(authCookieToken, JWT_SECRET);
            req.user = { userId: decoded.userId };
            next();
        }
        catch (error) {
            res.status(401).json({ success: false, error: 'Not authorized to access this route' });
        }
    }
};
export default authentication;
