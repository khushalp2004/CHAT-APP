import express from 'express'
import { checkAuth, register, updateProfile } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';
import { logout } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post("/register",register );

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute, checkAuth);

export default router;