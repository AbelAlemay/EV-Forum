import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

import {
  getQuestions,
  getQuestionById,
  createQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

// GET /api/questions - Get all questions
router.get("/", requireAuth, getQuestions);

// GET /api/questions/:id - Get single question by ID
router.get("/:id", requireAuth, getQuestionById);

// POST /api/questions - Create new question
router.post("/", requireAuth, createQuestion);

export default router;

// // ===== FILE: src/routes/questionRoutes.js =====
// import express from "express";
// const router = express.Router();

// // GET /api/questions - Get all questions
// router.get("/", verifyToken, getQuestions);

// // GET /api/questions/:id - Get single question by ID
// router.get("/:id", verifyToken, getQuestionById);

// // POST /api/questions - Create new question
// router.post("/", verifyToken, createQuestion);

// export default router;
