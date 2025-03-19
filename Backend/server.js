import express from "express";
import cookieParser from "cookie-parser";
import {PORT}  from "./src/config/env.js"
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js"
import messageRoutes from "./src/routes/message.routes.js"
import { errorhandler } from "./src/middleware/error.middleware.js";
import {server,io,app} from "./src/config/socket.js";
//import server from './src/config/socket.js';
//import app from './src/config/socket.js';

import cors from 'cors';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.use(errorhandler);
server.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});