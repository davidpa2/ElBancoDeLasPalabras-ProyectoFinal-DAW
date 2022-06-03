-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bookshelf
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookshelf
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookshelf` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bookshelf` ;

-- -----------------------------------------------------
-- Table `bookshelf`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshelf`.`user` (
  `id` INT NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `surnames` VARCHAR(200) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `birthday` VARCHAR(45) NULL DEFAULT NULL,
  `tlf` VARCHAR(12) NULL DEFAULT NULL,
  `telegram` VARCHAR(150) NULL DEFAULT NULL,
  `img` LONGBLOB NULL DEFAULT NULL,
  `rating` FLOAT NULL DEFAULT NULL,
  `location` VARCHAR(200) NULL DEFAULT NULL,
  `recoveryKey` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookshelf`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshelf`.`book` (
  `id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `state` INT NULL DEFAULT NULL,
  `price` VARCHAR(45) NULL DEFAULT NULL,
  `img` LONGBLOB NULL DEFAULT NULL,
  `reserved` INT NULL DEFAULT NULL,
  `buyer_id` INT NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookshelf`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookshelf`.`exchange`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshelf`.`exchange` (
  `id` INT NOT NULL,
  `userP_id` INT NULL DEFAULT NULL,
  `bookP_id` INT NULL DEFAULT NULL,
  `idUserO` INT NOT NULL,
  `idBookO` INT NOT NULL,
  `date` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `bookp_id` (`bookP_id` ASC) VISIBLE,
  INDEX `userP_id` (`userP_id` ASC) VISIBLE,
  CONSTRAINT `bookp_id`
    FOREIGN KEY (`bookP_id`)
    REFERENCES `bookshelf`.`book` (`id`),
  CONSTRAINT `userP_id`
    FOREIGN KEY (`userP_id`)
    REFERENCES `bookshelf`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bookshelf`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshelf`.`hibernate_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
