-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2024 at 09:47 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supersos`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_instances` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `fullname`, `phone`, `email`, `password`, `id_instances`) VALUES
(1, 'Nama Admin RS', '6285156031385', 'email@adminrs.com', 'passwordrs', 1),
(2, 'Nama Admin Polisi', '621245361', 'email@adminpolisi.com', 'passwordpolisi', 2),
(3, 'Nama Admin Pemadam Kebakaran', '6222129419', 'email@adminpemadam.com', 'passwordpemadam', 3);

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--

CREATE TABLE `calls` (
  `id_call` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `applied_at` datetime DEFAULT NULL,
  `answered_at` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `calls`
--

INSERT INTO `calls` (`id_call`, `message`, `latitude`, `longitude`, `applied_at`, `answered_at`, `status`, `id_user`, `id_admin`) VALUES
(1, 'Panggilan darurat kebakaran di Jl. Pahlawan No. 123', '-1.00000000', '107.00000000', '2024-05-01 08:00:00', '2024-05-01 08:15:00', 2, 2, 2),
(2, 'Kecelakaan lalu lintas di Jl. Diponegoro No. 45', '-1.00000000', '107.00000000', '2024-05-01 09:30:00', NULL, 0, 2, 1),
(3, 'Tindak kekerasan di Jl. Gajah Mada No. 56', '-1.00000000', '107.00000000', '2024-05-01 10:45:00', '2024-05-01 22:49:54', 2, 2, 2),
(4, 'Panggilan darurat kesehatan di Jl. Gatot Subroto No. 78', '-1.00000000', '107.00000000', '2024-05-01 12:00:00', '2024-05-01 12:20:00', 2, 4, 1),
(5, 'Panggilan darurat di Jl. Asia Afrika No. 34', '-1.00000000', '107.00000000', '2024-05-01 14:00:00', '2024-05-01 22:50:20', 1, 5, 2),
(6, 'Kebakaran di Jl. Cendrawasih No. 67', '-1.00000000', '107.00000000', '2024-05-01 15:30:00', '2024-05-01 15:45:00', 2, 6, 3),
(9, 'Tindak kekerasan di Jl. Dipatiukur No. 23', '-1.00000000', '107.00000000', '2024-05-01 19:15:00', '2024-05-01 23:21:26', 1, 9, 2),
(10, 'Panggilan darurat kebakaran di Jl. Merdeka No. 123', '-1.00000000', '107.00000000', '2024-05-01 20:30:00', '2024-05-01 20:40:00', 2, 10, 3),
(11, 'Kecelakaan lalu lintas di Jl. Diponegoro No. 45', '-1.00000000', '107.00000000', '2024-05-02 08:00:00', NULL, 1, 1, 3),
(12, 'Panggilan darurat kesehatan di Jl. Gajah Mada No. 56', '-1.00000000', '107.00000000', '2024-05-02 09:30:00', '2024-05-02 09:45:00', 2, 2, 2),
(13, 'Tindak kekerasan di Jl. Gatot Subroto No. 78', '-1.00000000', '107.00000000', '2024-05-02 11:00:00', NULL, 0, 3, 1),
(14, 'Panggilan darurat di Jl. Asia Afrika No. 34', '-1.00000000', '107.00000000', '2024-05-02 12:15:00', NULL, 0, 4, 3),
(15, 'Kebakaran di Jl. Cendrawasih No. 67', '-1.00000000', '107.00000000', '2024-05-02 14:00:00', '2024-05-02 14:20:00', 2, 5, 3),
(16, 'Bantuan medis di Jl. Sudirman No. 89', '-1.00000000', '107.00000000', '2024-05-02 15:30:00', NULL, 0, 6, 1),
(17, 'Panggilan darurat di Jl. A. Yani No. 12', '-1.00000000', '107.00000000', '2024-05-02 17:00:00', NULL, 0, 7, 2),
(18, 'Tindak kekerasan di Jl. Dipatiukur No. 23', '-1.00000000', '107.00000000', '2024-05-02 18:30:00', NULL, 0, 8, 1),
(19, 'Panggilan darurat kebakaran di Jl. Merdeka No. 123', '-1.00000000', '107.00000000', '2024-05-02 20:00:00', '2024-05-02 20:15:00', 2, 9, 3),
(20, 'Kecelakaan lalu lintas di Jl. Diponegoro No. 45', '-1.00000000', '107.00000000', '2024-05-03 08:00:00', NULL, 0, 10, 1),
(21, 'Panggilan darurat kesehatan di Jl. Gajah Mada No. 56', '-1.00000000', '107.00000000', '2024-05-03 09:30:00', '2024-05-03 09:40:00', 2, 1, 1),
(22, 'Tindak kekerasan di Jl. Gatot Subroto No. 78', '-1.00000000', '107.00000000', '2024-05-03 11:15:00', NULL, 0, 2, 3),
(23, 'Panggilan darurat di Jl. Asia Afrika No. 34', '-1.00000000', '107.00000000', '2024-05-03 13:00:00', NULL, 0, 3, 3),
(24, 'Kebakaran di Jl. Cendrawasih No. 67', '-1.00000000', '107.00000000', '2024-05-03 14:45:00', '2024-05-03 15:00:00', 2, 4, 3),
(25, 'Bantuan medis di Jl. Sudirman No. 89', '-1.00000000', '107.00000000', '2024-05-03 16:30:00', NULL, 0, 5, 2),
(26, 'Panggilan darurat di Jl. A. Yani No. 12', '-1.00000000', '107.00000000', '2024-05-03 18:15:00', NULL, 0, 6, NULL),
(27, 'Tindak kekerasan di Jl. Dipatiukur No. 23', '-1.00000000', '107.00000000', '2024-05-03 19:45:00', NULL, 0, 7, NULL),
(28, 'Panggilan darurat kebakaran di Jl. Merdeka No. 123', '-1.00000000', '107.00000000', '2024-05-03 21:30:00', '2024-05-03 21:50:00', 2, 8, 3),
(29, 'Kecelakaan lalu lintas di Jl. Diponegoro No. 45', '-1.00000000', '107.00000000', '2024-05-04 08:30:00', NULL, 0, 9, NULL),
(30, 'Panggilan darurat kesehatan di Jl. Gajah Mada No. 56', '-1.00000000', '107.00000000', '2024-05-04 10:00:00', '2024-05-04 10:10:00', 2, 10, 1),
(31, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:25:22', NULL, 0, 11, 2),
(32, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:26:00', NULL, 0, 11, 2),
(33, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:29:11', '2024-05-02 02:44:53', 2, 11, 2),
(34, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:30:04', '2024-05-02 02:45:28', 3, 11, 2),
(35, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:30:19', NULL, 0, 11, 2),
(36, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:31:05', NULL, 1, 11, 2),
(37, 'Saya sackit', '1.00000000', '999.99999999', '2024-05-02 02:31:44', NULL, 0, 11, 2);

-- --------------------------------------------------------

--
-- Table structure for table `instances`
--

CREATE TABLE `instances` (
  `id_instances` int(11) NOT NULL,
  `instances_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instances`
--

INSERT INTO `instances` (`id_instances`, `instances_name`, `address`) VALUES
(1, 'Rumah Sakit', 'Alamat Rumah Sakit'),
(2, 'Polisi', 'Alamat Kantor Polisi'),
(3, 'Pemadam Api', 'Monjali');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `fullname`, `address`, `phone`, `email`, `password`, `picture`) VALUES
(1, 'Agus Setiawan', 'Jl. Merdeka No. 123', '081234567890', 'agus.setiawan@example.com', 'password1', 'profile_picture1.jpg'),
(2, 'Dewi Suryani', 'Jl. Pahlawan No. 45', '085678901234', 'dewi.suryani@example.com', 'password2', 'profile_picture2.jpg'),
(3, 'Budi Santoso', 'Jl. Diponegoro No. 78', '089012345678', 'budi.santoso@example.com', 'password3', 'profile_picture3.jpg'),
(4, 'Siti Rahayu', 'Jl. Gajah Mada No. 56', '082345678901', 'siti.rahayu@example.com', 'password4', 'profile_picture4.jpg'),
(5, 'Rudi Hermawan', 'Jl. Gatot Subroto No. 78', '081234567890', 'rudi.hermawan@example.com', 'password5', 'profile_picture5.jpg'),
(6, 'Ani Widarti', 'Jl. Asia Afrika No. 34', '085678901234', 'ani.widarti@example.com', 'password6', 'profile_picture6.jpg'),
(7, 'Andi Saputra', 'Jl. Cendrawasih No. 67', '089012345678', 'andi.saputra@example.com', 'password7', 'profile_picture7.jpg'),
(8, 'Rina Wijaya', 'Jl. Sudirman No. 89', '082345678901', 'rina.wijaya@example.com', 'password8', 'profile_picture8.jpg'),
(9, 'Faisal Rahman', 'Jl. A. Yani No. 12', '081234567890', 'faisal.rahman@example.com', 'password9', 'profile_picture9.jpg'),
(10, 'Lina Nurhayati', 'Jl. Dipatiukur No. 23', '085678901234', 'lina.nurhayati@example.com', 'password10', 'profile_picture10.jpg'),
(11, 'Satria Yoga Pratama2', 'Monjali2', '62884201122', 'funtastix@outlook.com2', '254f58b63f6a81858d3939632b3ea832', 'funtastix.jpg2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `fk_admin_instances` (`id_instances`);

--
-- Indexes for table `calls`
--
ALTER TABLE `calls`
  ADD PRIMARY KEY (`id_call`),
  ADD KEY `fk_call_user` (`id_user`),
  ADD KEY `fk_call_admin` (`id_admin`);

--
-- Indexes for table `instances`
--
ALTER TABLE `instances`
  ADD PRIMARY KEY (`id_instances`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `calls`
--
ALTER TABLE `calls`
  MODIFY `id_call` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `instances`
--
ALTER TABLE `instances`
  MODIFY `id_instances` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_admin_instances` FOREIGN KEY (`id_instances`) REFERENCES `instances` (`id_instances`) ON DELETE CASCADE;

--
-- Constraints for table `calls`
--
ALTER TABLE `calls`
  ADD CONSTRAINT `fk_call_admin` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_call_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
