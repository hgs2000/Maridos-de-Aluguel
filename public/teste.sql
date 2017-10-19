CREATE SCHEMA IF NOT EXISTS MdA
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE MdA;

CREATE TABLE IF NOT EXISTS users(
  id VARCHAR(20) PRIMARY KEY,
  password VARCHAR(45) NOT NULL,
  name VARCHAR(60) NOT NULL
);

INSERT INTO users VALUES ('root', 'root', 'Administrador');

INSERT INTO users VALUES ('hgs2000', 'senha123', 'Henrique Starosky');
