import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import jobRouter from "./routes/jobs.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// cors
const corsOptions = {
    origin:true
}

app.get('/',(req,res)=>{
    res.send("Api is working")
})

// db 
mongoose.set("strictQuery",false)
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDb database is connected");
    } catch (error) {
        console.log("MongoDb database connection failed");
    }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobRouter)

app.listen(port,()=>{
    connectDB();
    console.log("Server is running on port "+port);
})

