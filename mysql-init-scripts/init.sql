-- Active: 1712802375897@@127.0.0.1@3306
CREATE DATABASE IF NOT EXISTS IBS_SISTEMAS;

USE IBS_SISTEMAS;

CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sex ENUM('M', 'F') NOT NULL,
    birthDate DATE NOT NULL,
    maritalStatus ENUM('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Outro') NOT NULL
);

CREATE TABLE IF NOT EXISTS Address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    people_id INT,
    cep VARCHAR(10) NOT NULL,
    address VARCHAR(255) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(255),
    district VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE
);
