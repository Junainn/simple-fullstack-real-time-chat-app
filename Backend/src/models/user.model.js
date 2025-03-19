import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length >= 6;
            },
            message: "Password must be at least 6 characters long"
        }
    },
    fullName: {
        type: String,
        required: true
    },
    profileImage:{
        type: String,
        default:""
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
