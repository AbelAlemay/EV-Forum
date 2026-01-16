-- Add password reset token fields to users table
USE evangadi_db;

-- Check if columns exist before adding (MySQL doesn't support IF NOT EXISTS for ALTER TABLE)
-- Run this script manually or handle errors if columns already exist

ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL,
ADD COLUMN reset_token_expires DATETIME DEFAULT NULL;
