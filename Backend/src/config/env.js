/* eslint-disable no-undef */
import { config } from "dotenv";

config({path:`.env.${process.env.NODE_ENV|| 'development'}.local`});

export const {
    PORT,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    FR_URL
} = process.env;