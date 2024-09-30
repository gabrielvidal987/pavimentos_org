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
  `data_concreto` datetime DEFAULT NULL,
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
  `primeiro_contato_nome` varchar(100) DEFAULT NULL,
  `primeiro_contato_tel` varchar(20) DEFAULT NULL,
  `segundo_contato_nome` varchar(100) DEFAULT NULL,
  `segundo_contato_tel` varchar(20) DEFAULT NULL,
  `terceiro_contato_nome` varchar(100) DEFAULT NULL,
  `terceiro_contato_tel` varchar(20) DEFAULT NULL,
  `obra_ativa` int DEFAULT '1',
  PRIMARY KEY (`insert_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obras`
--

LOCK TABLES `obras` WRITE;
/*!40000 ALTER TABLE `obras` DISABLE KEYS */;
INSERT INTO `obras` VALUES (18,'2024-09-24 12:13:23','Anderson','teste1','rua professor nicolau maria rossetti 12 b','teste1','2023-09-25 00:00:00','teste1','teste1','#0000ff','teste1','#00ff00','teste1','#00ff00','teste1','#ff0000','teste1','#00ff00','maria','11957362264','josea','11957362264','','',1),(19,'2024-09-24 12:13:49','Edno','teste2','teste2','teste2','2004-12-15 00:00:00','teste2','teste2',NULL,'teste2',NULL,'teste2','#ff0000','teste2',NULL,'teste2',NULL,'','','','','','',1),(20,'2024-09-24 12:14:06','Tamara','teste33','teste33','teste33','2012-12-12 00:00:00','teste33','teste33',NULL,'teste33','#00ff00','teste33',NULL,'teste33',NULL,'teste33',NULL,'maria','11957362264','josea','11957362264','joao','11957362264',1),(21,'2024-09-24 12:43:50','Fabio','teste4','teste4','teste4','2024-09-24 00:00:00','teste4','teste4',NULL,'teste4',NULL,'teste4',NULL,'teste4',NULL,'teste4',NULL,'teste41','teste41','teste42','teste42','teste43','teste43',1),(22,'2024-09-29 17:50:57','Vitor','teste5','rua dulce carneiro','teste5','2024-01-01 00:00:00','teste5','teste5',NULL,'teste5',NULL,'teste5',NULL,'teste5',NULL,'teste5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
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

-- Dump completed on 2024-09-29 22:55:28
