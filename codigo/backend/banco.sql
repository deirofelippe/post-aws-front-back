CREATE DATABASE IF NOT EXISTS aws_front_back;

USE aws_front_back;

CREATE TABLE IF NOT EXISTS usuario (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8 NOT NULL,
  `data_nascimento` varchar(10) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `senha` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;