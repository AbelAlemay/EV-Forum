import db from "../config/db.js";

export const getQuestions = async (req, res) => {
  try {
    // JOIN questions with users table to get username
    const [rows] = await db.query(`
      SELECT 
        questions.id,
        questions.title,
        questions.description,
        questions.user_id,
        questions.created_at,
        users.username,
        users.first_name,
        users.last_name
      FROM questions
      LEFT JOIN users ON questions.user_id = users.id
      ORDER BY questions.id DESC
    `);

    res.json({ questions: rows });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!title || !title.trim()) {
      return res.status(400).json({ msg: "Title is required" });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ msg: "Description is required" });
    }

    if (title.length > 200) {
      return res
        .status(400)
        .json({ msg: "Title must be 200 characters or less" });
    }

    const [result] = await db.query(
      "INSERT INTO questions (title, description, user_id) VALUES (?, ?, ?)",
      [title.trim(), description.trim(), userId]
    );

    res.status(201).json({
      id: result.insertId,
      title: title.trim(),
      description: description.trim(),
      user_id: userId,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get question with user details
    const [questions] = await db.query(
      `
      SELECT 
        questions.id,
        questions.title,
        questions.description,
        questions.user_id,
        questions.created_at,
        users.username,
        users.first_name,
        users.last_name
      FROM questions
      LEFT JOIN users ON questions.user_id = users.id
      WHERE questions.id = ?
    `,
      [id]
    );

    if (questions.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    res.json({ question: questions[0] });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// import express from "express";

// const router = express.Router();

// // GET /api/question - Fetch all questions
// router.get("/api/question", async (req, res) => {
//   try {
//     // Fetch all questions from database
//     const questions = await Question.find();

//     // Send response
//     return res.status(200).json({
//       total_questions: questions.length,
//       questions: questions
//     });

//   } catch (error) {
//     // Handle server error
//     return res.status(500).json({
//       error: "Internal server error"
//     });
//   }
// });

// export default router;
