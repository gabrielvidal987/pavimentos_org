-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: obras_lajes
-- ------------------------------------------------------
-- Server version	8.0.36

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
  `data_prev` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`insert_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pavimentos`
--

LOCK TABLES `pavimentos` WRITE;
/*!40000 ALTER TABLE `pavimentos` DISABLE KEYS */;
INSERT INTO `pavimentos` VALUES (1,'2024-09-23 11:13:47','65','62','2005-08-20'),(2,'2024-09-23 11:14:57','94','59','2005-09-22'),(3,'2024-09-23 11:18:53','obra1','2','2005-05-20'),(4,'2024-09-23 11:22:49','595','59','2004-12-09'),(5,'2024-09-23 12:34:11','teste1','AMARGO','2005-08-15'),(6,'2024-09-23 14:10:10','teste1','opavimentos24','2025-12-15'),(7,'2024-09-23 14:29:29','teste2','teste2','2005-12-15'),(8,'2024-09-23 15:25:21',NULL,NULL,NULL);
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

-- Dump completed on 2024-09-23 16:08:46
