CREATE DATABASE pokerDB;
use pokerDB;

CREATE TABLE player_info(
playerID int primary key,
player_name varchar(255) NOT NULL,
weekly_scores int
);

CREATE TABLE league_info(
playerID int primary key,
username varchar(255) NOT NULL,
password varchar(255) NOT NULL,
real_name varchar(255) NOT NULL
);
