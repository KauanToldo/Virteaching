CREATE DATABASE chat;
USE chat; 

CREATE TABLE userMessage (
	id INT NOT NULL  auto_increment PRIMARY KEY,
    username VARCHAR(255),
	message varchar(255)
);

CREATE TABLE users (
	id INT NOT NULL auto_increment primary KEY,
    nome VARCHAR(255),
    senha VARCHAR(255)
);
