import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { generateToken } from "../utils/generateToken.utils.js";
export const userSignUp = async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }
        if (password.length < 6) {
            console.log("DS");
            const error = new Error("Password must be at least 6 characters long");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findOne({ email });
        if (user) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword, fullName });
        await newUser.validate();
        await newUser.save();
        const token = generateToken(newUser._id, res);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            _id: newUser._id,
            data: {
                token: token
            }
        })
    }
    catch (err) {
        next(err);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        }
        if (password.length < 6) {
            const error = new Error("Wrong Password");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Invalid Credentials");
            error.statusCode = 400;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 400;
            throw error;
        }
        const token = generateToken(user._id, res);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            _id: user._id,
            data: {
                token: token
            }
        })
    }
    catch (err) {
        next(err);
    }
}

export const userSignOut = (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    }
    catch (err) {
        next(err);
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {

        const { profileImage } = req.body;
        const id = req.user._id;
        const user = await User.findById(id);
        if (!profileImage) {
            const error = new Error("Profile image is required");
            error.statusCode = 400;
            throw error;
        }
        const oldImage = user.profileImage;
        //console.log(oldImage);
        const im = oldImage.split("/").pop().split(".")[0];
        console.log(im);
        if (oldImage) {
             await cloudinary.uploader.destroy(`ChatApp/userImages/${im}`);
        }
        const uploadResult = await cloudinary.uploader.upload(profileImage, {
            folder: "ChatApp/userImages",
            public_id: `user_${req.user._id}_${Date.now()}`,
        });

        const updatedUser = await User.findByIdAndUpdate(id, { profileImage: uploadResult.secure_url }, { new: true });
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: updatedUser
        })
    }
    catch (err) {
        next(err);
    }
}

export const checkAuth = (req, res, next) => {
    try {
        res.status(200).json(req.user);
    }
    catch (err) {
        err.statusCode = 500;
        err.message = "Internal Server Error";
        next(err);
    }
}
