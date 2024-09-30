-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: obras_lajes
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pavimentos`
--

DROP TABLE IF EXISTS `pavimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pavimentos` (
  `insert_sys` int NOT NULL AUTO_INCREMENT,
  `data_insert` datetime DEFAULT CURRENT_TIMESTAMP,
  `obra` varchar(50) DEFAULT NULL,
  `nome_pavimento` varchar(50) DEFAULT NULL,
  `data_prev` datetime DEFAULT NULL,
  `ativo` int DEFAULT '1',
  PRIMARY KEY (`insert_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pavimentos`
--

LOCK TABLES `pavimentos` WRITE;
/*!40000 ALTER TABLE `pavimentos` DISABLE KEYS */;
INSERT INTO `pavimentos` VALUES (17,'2024-09-24 12:13:23','teste1','teste1','2023-09-25 00:00:00',0),(18,'2024-09-24 12:13:49','teste2','teste2','2004-12-15 00:00:00',1),(19,'2024-09-24 12:14:06','teste33','teste33','2012-12-12 00:00:00',1),(20,'2024-09-24 12:21:11','teste1','teste2 do 1','2024-09-24 00:00:00',0),(21,'2024-09-24 12:43:50','teste4','teste4','2024-09-24 00:00:00',1),(22,'2024-09-24 12:53:36','teste1','teste3 do 1','2004-02-01 00:00:00',0),(32,'2024-09-25 14:13:09','teste1','teste4 do 1','2012-12-12 00:00:00',0),(40,'2024-09-26 00:28:58','teste1','teste5 do 1','2024-02-02 00:00:00',0),(41,'2024-09-26 00:31:06','teste1','teste6 do 1','2024-01-01 00:00:00',1),(42,'2024-09-29 17:50:57','teste5','teste5','2024-01-01 00:00:00',1);
/*!40000 ALTER TABLE `pavimentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-29 22:55:28
