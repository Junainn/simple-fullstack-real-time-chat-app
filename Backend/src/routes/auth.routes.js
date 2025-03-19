import express from "express";

import {userSignUp,userLogin,userSignOut,updateUserProfile,checkAuth}  from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", userSignUp);

router.post("/signin", userLogin);

router.post("/signout", userSignOut);

router.put('/update-profile',authMiddleware,updateUserProfile);

router.get('/check',authMiddleware,checkAuth);
export default router;