CREATE DATABASE kehila;
USE kehila;
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
    zip VARCHAR(255),
    PRIMARY KEY (user_id)
);

CREATE TABLE donations (
    donation_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    amount INT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (donation_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE messages(
    message_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    likes INT UNSIGNED NOT NULL,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments(
    comment_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    message_id INT NOT NULL,
    comment VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    likes INT UNSIGNED NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (message_id) REFERENCES messages(message_id)
);

CREATE TABLE deductions(
    deduction_id INT NOT NULL AUTO_INCREMENT,
    donation_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (deduction_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);




