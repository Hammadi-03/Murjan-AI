-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `murjan_ai` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `murjan_ai`;

-- Create the api_keys table
CREATE TABLE IF NOT EXISTS `api_keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_name` varchar(255) NOT NULL,
  `key_value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_key_name` (`key_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert some dummy placeholders (You should edit these in phpMyAdmin)
INSERT IGNORE INTO `api_keys` (`id`, `key_name`, `key_value`) VALUES
(1, 'gemini_api_key', 'AIzaSy... (Replace this with real key inside phpMyAdmin)'),
(2, 'openrouter_api_key', 'sk-or-v1-... (Replace this with real key inside phpMyAdmin)');
