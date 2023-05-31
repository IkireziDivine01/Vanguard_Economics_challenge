CREATE DATABASE FinancialInclusionDB;

USE FinancialInclusionDB;

CREATE TABLE Indicator (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IndicatorValues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  indicator_id INT,
  year INT NOT NULL,
  percentage_value FLOAT NOT NULL,
  FOREIGN KEY (indicator_id) REFERENCES Indicator(id)
);