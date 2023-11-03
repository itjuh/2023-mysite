-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-11-03 10:46
-- 서버 버전: 8.0.34
-- PHP 버전: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `llllllll8`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `member`
--

CREATE TABLE `member` (
  `idx` int NOT NULL,
  `mid` varchar(20) NOT NULL,
  `mpw` varchar(100) NOT NULL,
  `name` varchar(20) NOT NULL,
  `gen` char(1) NOT NULL,
  `email1` varchar(20) NOT NULL,
  `email2` varchar(20) NOT NULL,
  `regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auth` char(1) DEFAULT 'M'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `member`
--

INSERT INTO `member` (`idx`, `mid`, `mpw`, `name`, `gen`, `email1`, `email2`, `regdate`, `auth`) VALUES
(1, 'member0', '$2y$10$vhZBuapx7U.c5l/PHNfik.Y8ZD2OKbaQITINw4xcrw3TBMM8M2cPi', '김보그', 'w', 'member0', 'naver.com', '2023-11-03 01:37:14', 'S'),
(2, 'wngusl22', '$2y$10$uU29UcCQ2XVIf0NmIwiBsuRJ7QoRVWZ82JM3Ky6WzIqnMVIDCsfbK', '안주현', 'w', 'luyer', 'naver.com', '2023-11-03 01:42:57', 'M');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
