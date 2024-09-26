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
-- Table structure for table `galeria`
--

DROP TABLE IF EXISTS `galeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galeria` (
  `id_foto` int NOT NULL AUTO_INCREMENT,
  `caminho` varchar(255) DEFAULT NULL,
  `obra` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_foto`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeria`
--

LOCK TABLES `galeria` WRITE;
/*!40000 ALTER TABLE `galeria` DISABLE KEYS */;
INSERT INTO `galeria` VALUES (1,'galeria\\1727364067213.png','teste1'),(2,'galeria\\1727364145240.png','teste1'),(3,'galeria\\1727364350581.png','teste1'),(4,'galeria\\1727365896199.png','teste1'),(5,'galeria\\1727365900228.png','teste1'),(6,'galeria\\1727365904499.png','teste1'),(7,'galeria\\1727365911788.png','teste1'),(8,'galeria\\1727365915587.png','teste1'),(9,'galeria\\1727365919004.png','teste1'),(10,'galeria\\1727365923156.png','teste1'),(11,'galeria\\1727365926636.png','teste1'),(12,'galeria\\1727365931492.png','teste1'),(13,'galeria\\1727365998964.png','teste1'),(14,'galeria\\1727370154514.png','teste1'),(15,'galeria\\1727370160858.png','teste1'),(16,'galeria\\1727370166242.png','teste1'),(17,'galeria\\1727370169850.png','teste1'),(18,'galeria\\1727370174034.png','teste1'),(19,'galeria\\1727370177907.png','teste1'),(20,'galeria\\1727370184483.png','teste1'),(21,'galeria\\1727370188746.png','teste1'),(22,'galeria\\1727370192883.png','teste1'),(23,'galeria\\1727370197330.png','teste1'),(24,'galeria\\1727370201194.png','teste1'),(25,'galeria\\1727370206051.png','teste1'),(26,'galeria\\1727370352058.png','teste1');
/*!40000 ALTER TABLE `galeria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 14:25:02
