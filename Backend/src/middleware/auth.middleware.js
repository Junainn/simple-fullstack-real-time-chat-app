/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const authMiddleware = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            const error = new Error("Token koi?");
            error.statusCode = 401;
            throw error;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            const error = new Error("Token vul");
            error.statusCode = 401;
            throw error;
        }
        
        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
}