import db from "../config/db.js";
export const postAnswer = async (req, res) => {
  const { questionId, answer } = req.body;
  try {
    await db.query(
      "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
      [questionId, req.user.id, answer]
    );
    res.json({ msg: "Answer posted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong, please try again later" });
  }
};
export const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  const [rows] = await db.query(
    `SELECT a.id, a.answer, u.username 
     FROM answers a
     JOIN users u ON a.user_id = u.id
     WHERE a.question_id = ?
     ORDER BY a.created_at ASC`,
    [questionId]
  );
  res.json({ answers: rows });
};
