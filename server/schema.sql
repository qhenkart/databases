CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `userID` INT,
  `text` varchar(200),
  `roomname` varchar(30),
  `timeStamp` TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(15),
  `avatar` varchar(30)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(15),
  `description` varchar(200),
  `image` varchar(30)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

