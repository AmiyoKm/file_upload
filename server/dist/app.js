import dotenv from 'dotenv'
dotenv.config({path:'./.env'});
import mongoose from 'mongoose';
import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import imageRouter from './routes/image.route.js';
import path from 'path';
import { MONGO_URI } from './constants/constants.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/", userRouter);
app.use("/api/uploads/", imageRouter);
const __dirname = path.resolve();

 if (process.env.NODE_ENV) {
    app.use(express.static(path.join(__dirname, '/client/dist')));
    console.log("hi");
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
 }
app.listen(4000, async () => {
    if (MONGO_URI) {
        await mongoose.connect(MONGO_URI);
        console.log("Data base connected");
    }
    else {
        return console.log(" Data base not connected");
    }
    console.log("server started on port 4000");
});
