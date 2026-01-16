import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../config/db.js"; // from TADESSE db.js

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/user/register
export async function register(req, res) {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    if (!username || !first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Password must be at least 8 characters",
      });
    }

    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1",
      [email, username]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        error: "Conflict",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (username, first_name, last_name, email, password)
       VALUES (?, ?, ?, ?, ?)`,
      [username, first_name, last_name, email, hashedPassword]
    );

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// POST /api/user/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide a valid email address",
      });
    }

    const [rows] = await db.query(
      "SELECT id, username, password FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "User login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// GET /api/user/checkUser
export function checkUser(req, res) {
  return res.status(200).json({
    message: "Valid user",
    username: req.user.username,
    userid: req.user.userid,
  });
}

// POST /api/user/forgot-password
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide an email address",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide a valid email address",
      });
    }

    const [rows] = await db.query(
      "SELECT id, email FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const user = rows[0];

    // Always return success message for security (don't reveal if email exists)
    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await db.query(
      "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
      [resetToken, resetTokenExpires, user.id]
    );

    // In a real application, you would send an email here with the reset link
    // For now, we'll return the token in the response (in production, remove this)
    // The frontend can use this token to reset the password
    console.log(`Password reset token for ${email}: ${resetToken}`);

    return res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
      // In production, remove the token from the response
      // For development/testing purposes, we're including it
      resetToken:
        process.env.NODE_ENV === "development" ? resetToken : undefined,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// POST /api/user/reset-password
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide reset token and new password",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Password must be at least 8 characters",
      });
    }

    // Find user with valid reset token
    const [rows] = await db.query(
      "SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW() LIMIT 1",
      [token]
    );

    const user = rows[0];

    if (!user) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    return res.status(200).json({
      message: "Password has been reset successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
