import {JWT_SECRET,JWT_EXPIRES_IN} from "../config/env.js";
import jwt from "jsonwebtoken";
export const generateToken = (id,res)=>{
    const token =  jwt.sign({_id:id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
    res.cookie(
        "jwt",
        token,
        {
            httpOnly: true,
            maxAge : 1*24*60*60*1000,
            samsite:"strict"
        }
    )
    return token;
}