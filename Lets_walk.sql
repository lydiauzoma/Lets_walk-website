-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 04, 2023 at 03:39 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Lets_walk`
--

-- --------------------------------------------------------

--
-- Table structure for table `filter`
--

CREATE TABLE `filter` (
  `filter_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Participants`
--

CREATE TABLE `Participants` (
  `message_id` int NOT NULL,
  `Name` varchar(20) DEFAULT NULL,
  `Age` int DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `message_timestamp` timestamp NULL DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Participants`
--

INSERT INTO `Participants` (`message_id`, `Name`, `Age`, `Location`, `sender_id`, `receiver_id`, `event_id`, `message_timestamp`, `content`) VALUES
(111101, 'John', 20231204, 'Oshodi', 11234, 23, 1132, '2023-12-03 14:44:08', 'I\'m currently looking for a walk buddy to Ikeja mall, I would love someone that is chatty and friendly.'),
(111102, 'Benita', 20231204, 'Ajao estate', 11200, 45, 1120, '2023-12-05 11:04:08', 'Love walking? Need a partner to walk to Oshodi market, its 20minutes from here. We can walk silently or discuss about games');

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

CREATE TABLE `search` (
  `search_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `Siteusers` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `search`
--

INSERT INTO `search` (`search_id`, `user_id`, `event_id`, `Siteusers`) VALUES
(12, 1, 1132, 'Loves cooking or gaming'),
(30, 2, 1120, 'Loves sports,Tech');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `interests` varchar(100) DEFAULT NULL,
  `organiser_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `username`, `email`, `password`, `first_name`, `last_name`, `DOB`, `gender`, `location`, `interests`, `organiser_id`) VALUES
(1, 'Emmanuel', 'Emma@gmail.com', '1234555', 'Emmanuel', 'John', '1994-12-05', 'Male', 'Oshodi', 'Sports,Gaming,Movies.', 12),
(2, 'Chikki12', 'Chyke@hotmail.com', '0023bgh', 'Chika', 'Benjamin', '1994-07-10', 'Female', 'Ikeja', 'Movies,Tech,Food dates.', 9),
(4, 'Chiomyz', 'Chioma@glion.co.uk', 'sand123', 'Chioma', 'Clarke', '2006-10-17', 'female', 'Oshodi', 'Law, Food reviews, Childcare.', 8);

-- --------------------------------------------------------

--
-- Table structure for table `Walkevent`
--

CREATE TABLE `Walkevent` (
  `event_id` int NOT NULL,
  `organiser_id` int DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `meeting_point` varchar(255) DEFAULT NULL,
  `max_participants` int DEFAULT NULL,
  `current_participants` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `filter`
--
ALTER TABLE `filter`
  ADD PRIMARY KEY (`filter_id`);

--
-- Indexes for table `Participants`
--
ALTER TABLE `Participants`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `search`
--
ALTER TABLE `search`
  ADD PRIMARY KEY (`search_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `Walkevent`
--
ALTER TABLE `Walkevent`
  ADD PRIMARY KEY (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;