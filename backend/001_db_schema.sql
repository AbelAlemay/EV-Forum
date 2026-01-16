/* Note: Bellow is a ONE TIME Script */

/* create databse */
CREATE DATABASE IF NOT EXISTS evangadi_db;
USE evangadi_db;

/* CREATE USER IF NOT EXISTS 'Eva_User'@'%' IDENTIFIED BY 'your_password_here'; */
/* GRANT ALL PRIVILEGES ON evangadi_db.* TO 'Eva_User'@'%'; */

/*create "user" table*/
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` CHAR(60) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/* create "questions" table */
CREATE TABLE IF NOT EXISTS `questions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* create "answers" table */
CREATE TABLE IF NOT EXISTS `answers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `question_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `answer` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
