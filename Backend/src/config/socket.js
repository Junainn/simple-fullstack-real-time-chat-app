import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
import {FR_URL} from './env.js';
const fronEndUrl = FR_URL
const app= express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: fronEndUrl,
        methods: ["GET", "POST"],
        credentials: true
    }
});
const userSocketMap={};//key value pair
const getReceiverID = (id)=>{
    return userSocketMap[id];
}
io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`);
    const userId = socket.handshake.query.userId;
    //console.log("user",userId);
    if(userId && !userSocketMap[userId]){
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      });
})

export  {server,io,app,getReceiverID};