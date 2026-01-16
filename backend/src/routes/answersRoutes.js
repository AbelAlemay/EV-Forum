import express from "express";
import { postAnswer, getAnswers } from "../controllers/answerController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/answers - Create a new answer
router.post("/", requireAuth, postAnswer);

// GET /api/answers/:questionId - Get all answers for a question
router.get("/:questionId", requireAuth, getAnswers);

export default router;
