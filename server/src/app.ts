import mongoose from 'mongoose'
import express, { Request, Response } from "express"
import multer from "multer"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'
import userRouter from './routes/user.route'
import imageRouter from './routes/image.route'
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const upload = multer({ dest: 'uploads/' })

app.use("/api/user/", userRouter)
app.use("/api/uploads/", imageRouter )
app.listen(4000, async () => {
    if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Data base connected");

    }
    else {
        return console.log(" Data base not connected");

    }
    console.log("server started on port 4000");

})

