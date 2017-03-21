CREATE DATABASE pokerDB;
use pokerDB;

CREATE TABLE users(
playerID int primary key,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL,
real_name varchar(255) NOT NULL,
email varchar(255) NOT NULL,
);

CREATE TABLE tournament(
tournament_name varchar(255) NOT NULL,
tournament_ID int,
username varchar(255),
playerID int,
ranking int,
points int NULL
);