import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import answerRoutes from "./src/routes/answersRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", authRoutes); // Auth routes: /api/auth/login, /api/auth/signup
app.use("/api/questions", questionRoutes); // Question routes: /api/questions
app.use("/api/answers", answerRoutes); // Answer routes: /api/answers

//  check connection
app.get("/", (req, res) => {
  res.json({ msg: "API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
