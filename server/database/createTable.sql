CREATE DATABASE kehilat_israel;
USE kehilat_israel;
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    PRIMARY KEY (user_id)
);

CREATE TABLE donations (
    donation_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount INT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (donation_id)
   
);

CREATE TABLE messages(
    message_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255),
    date DATE NOT NULL,
    likes INT UNSIGNED NOT NULL DEFAULT 0,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (message_id)
);

CREATE TABLE comments(
    comment_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    message_id INT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    likes INT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (comment_id)    

);

CREATE TABLE deductions(
    deduction_id INT NOT NULL AUTO_INCREMENT,
    donation_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (deduction_id)
);

CREATE TABLE debts (
    debt_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount INT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (debt_id)
);

CREATE TABLE prayersTimes(
    prayer_name VARCHAR(255) NOT NULL ,
    dependency VARCHAR(255),
    minutes INT SIGNED,
    fixed VARCHAR(255),
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (prayer_name)
)
      





