import express from "express";
import {
  register,
  login,
  checkUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", requireAuth, checkUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
