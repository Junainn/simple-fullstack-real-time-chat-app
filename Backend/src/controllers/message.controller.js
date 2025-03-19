import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";
import {io,getReceiverID} from "../config/socket.js";

export const getUsers = async(req,res,next)=>{
    try{
        const currentUserID = req.user._id;
        const users = await User.find({_id:{$ne:currentUserID}}).select("-password");;
        res.status(200).json({success:true,data:users})
    }
    catch(err){
        next(err);
    }
}

export const getMessages = async(req,res,next)=>{
    try{
        const myID = req.user._id;
        const otherID = req.params.id;
         
        
         // Find messages
         const messages = await Message.find({
            $or: [
                { senderID: myID, receiverID: otherID },
                { senderID: otherID, receiverID: myID }
            ]
        }).sort({ createdAt: 1 });

      

        res.status(200).json({ success: true, data: messages });
        
    }
    catch(err){
        next(err);
    }
}

export const sendMessage = async(req,res,next)=>{
    try{
        const {message,image} = req.body;
        const senderID = req.user._id;
        const receiverID = req.params.id;
        let imageUrl = "";
        //console.log(image);
        if(image){
            //console.log("paiiiiiiiiiiiiii",CLOUDINARY_API_KEY);
            const uploadResult = await cloudinary.uploader.upload(image,{
                folder:"ChatApp/messageImages"
            });
            
            imageUrl = uploadResult.secure_url;
            console.log(imageUrl);
            
        }
        const newMessage = new Message({senderID,receiverID,message,image:imageUrl});
        await newMessage.save();
        const receiverId = getReceiverID(receiverID);
        io.to(receiverId).emit("newMessage",newMessage);
        res.status(201).json({success:true,data:newMessage});
    }
    catch(err){
        next(err);
    }
}