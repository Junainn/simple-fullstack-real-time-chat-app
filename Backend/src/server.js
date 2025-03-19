import express from "express";
import cookieParser from "cookie-parser";
import {PORT}  from "./config/env.js"
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { errorhandler } from "./middleware/error.middleware.js";
import {server,io,app} from "./config/socket.js";
//import server from './src/config/socket.js';
//import app from './src/config/socket.js';
import { FR_URL } from "./config/env.js";
import cors from 'cors';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:FR_URL,
    credentials:true
}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.use(errorhandler);
server.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});