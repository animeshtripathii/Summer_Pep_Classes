import { Router } from "express";
import {
	login,
	logout,
	getCurrentUser,
	register,
} from "../controller/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, getCurrentUser);

export default router;