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
-- Table structure for table `obras`
--

DROP TABLE IF EXISTS `obras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obras` (
  `insert_sys` int NOT NULL AUTO_INCREMENT,
  `data_insert` datetime DEFAULT CURRENT_TIMESTAMP,
  `projetista` varchar(200) DEFAULT NULL,
  `nome_obra` varchar(200) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  `torre` char(50) DEFAULT NULL,
  `data_concreto` char(50) DEFAULT NULL,
  `pavimento_ativo` char(50) DEFAULT NULL,
  `pilar` char(50) DEFAULT NULL,
  `cor_pilar` char(50) DEFAULT NULL,
  `grade` char(50) DEFAULT NULL,
  `cor_grade` char(50) DEFAULT NULL,
  `viga` char(50) DEFAULT NULL,
  `cor_viga` char(50) DEFAULT NULL,
  `garfo` char(50) DEFAULT NULL,
  `cor_garfo` char(50) DEFAULT NULL,
  `laje` char(50) DEFAULT NULL,
  `cor_laje` char(50) DEFAULT NULL,
  PRIMARY KEY (`insert_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obras`
--

LOCK TABLES `obras` WRITE;
/*!40000 ALTER TABLE `obras` DISABLE KEYS */;
INSERT INTO `obras` VALUES (7,'2024-09-23 12:34:11','teste1','teste1','doce','doce','2005-08-15','doce','doce','#FF0000','doce','#FF0000','doce','#FF0000','doce','#FF0000','doce','#FF0000'),(8,'2024-09-23 14:29:29','teste2','teste2','teste2','teste2','2005-12-15','teste2','teste2','#FF0000','teste2','#FF0000','teste2','#FF0000','teste2','#FF0000','teste2','#FF0000'),(9,'2024-09-23 15:25:21','Emilio',NULL,'teste3','teste3',NULL,NULL,'teste3',NULL,'teste3',NULL,'teste3',NULL,'teste3',NULL,'teste3',NULL);
/*!40000 ALTER TABLE `obras` ENABLE KEYS */;
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
