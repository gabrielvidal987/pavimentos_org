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
-- Table structure for table `log_eventos`
--

DROP TABLE IF EXISTS `log_eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_eventos` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `hora_evento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `funcao` varchar(100) DEFAULT NULL,
  `evento` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_eventos`
--

LOCK TABLES `log_eventos` WRITE;
/*!40000 ALTER TABLE `log_eventos` DISABLE KEYS */;
INSERT INTO `log_eventos` VALUES (1,'2024-09-30 01:37:14','server.js','Servidor rodando na porta 3000'),(2,'2024-09-30 01:37:14','server.js','Conectado ao banco de dados!'),(3,'2024-09-30 01:37:58','server.js','Requisição para pegar os dados de todas as obras'),(4,'2024-09-30 01:37:58','server.js','Retornado os dados de todas as obras'),(5,'2024-09-30 01:43:29','server.js','Servidor rodando na porta 3000'),(6,'2024-09-30 01:43:29','server.js','Conectado ao banco de dados!'),(7,'2024-09-30 01:44:18','server.js','Servidor rodando na porta 3000'),(8,'2024-09-30 01:44:18','server.js','Conectado ao banco de dados!'),(9,'2024-09-30 01:44:29','server.js','user teste1 senha 123456'),(10,'2024-09-30 01:44:29','server.js','undefined'),(11,'2024-09-30 01:44:30','server.js','Requisição para pegar os dados de todas as obras'),(12,'2024-09-30 01:44:30','server.js','Retornado os dados de todas as obras'),(13,'2024-09-30 01:44:39','server.js','Requisição para atualizar/alterar cores da obra teste2'),(14,'2024-09-30 01:44:39','server.js','Obra atualizada com sucesso'),(15,'2024-09-30 01:44:39','server.js','Requisição para pegar os dados de todas as obras'),(16,'2024-09-30 01:44:39','server.js','Retornado os dados de todas as obras'),(17,'2024-09-30 01:46:20','server.js','Servidor rodando na porta 3000'),(18,'2024-09-30 01:46:20','server.js','Conectado ao banco de dados!'),(19,'2024-09-30 01:46:47','server.js','Requisição para obter os dados da obra teste1'),(20,'2024-09-30 01:46:47','server.js','Retornados os dados da obra'),(21,'2024-09-30 01:46:49','server.js','Requisição para pegar os dados de todas as obras'),(22,'2024-09-30 01:46:49','server.js','Retornado os dados de todas as obras'),(23,'2024-09-30 01:47:18','server.js','Requisição para pegar galeria da obra teste1'),(24,'2024-09-30 01:47:18','server.js','Galeria retornada!'),(25,'2024-09-30 01:47:20','server.js','Requisição para pegar os dados de todas as obras'),(26,'2024-09-30 01:47:20','server.js','Retornado os dados de todas as obras'),(27,'2024-09-30 01:47:22','server.js','Requisição para pegar pavimentos da obra teste1'),(28,'2024-09-30 01:47:22','server.js','Retornados os pavimentos da obra'),(29,'2024-09-30 01:48:30','server.js','Requisição para pegar os dados de todas as obras'),(30,'2024-09-30 01:48:30','server.js','Retornado os dados de todas as obras'),(31,'2024-09-30 01:48:31','server.js','Requisição para pegar pavimentos da obra teste1'),(32,'2024-09-30 01:48:31','server.js','Retornados os pavimentos da obra'),(33,'2024-09-30 01:48:39','server.js','Requisição para pegar os dados de todas as obras'),(34,'2024-09-30 01:48:39','server.js','Retornado os dados de todas as obras'),(35,'2024-09-30 01:48:40','server.js','Requisição para pegar pavimentos da obra teste1'),(36,'2024-09-30 01:48:40','server.js','Retornados os pavimentos da obra'),(37,'2024-09-30 01:48:47','server.js','Requisição para pegar os dados de todas as obras'),(38,'2024-09-30 01:48:47','server.js','Retornado os dados de todas as obras'),(39,'2024-09-30 01:48:48','server.js','Requisição para pegar pavimentos da obra teste1'),(40,'2024-09-30 01:48:48','server.js','Retornados os pavimentos da obra'),(41,'2024-09-30 01:52:58','server.js','Requisição para pegar os dados de todas as obras'),(42,'2024-09-30 01:52:58','server.js','Retornado os dados de todas as obras'),(43,'2024-09-30 01:52:59','server.js','Requisição para pegar pavimentos da obra teste1'),(44,'2024-09-30 01:52:59','server.js','Retornados os pavimentos da obra'),(45,'2024-09-30 01:53:06','server.js','Requisição para pegar os dados de todas as obras'),(46,'2024-09-30 01:53:06','server.js','Retornado os dados de todas as obras'),(47,'2024-09-30 01:53:07','server.js','Requisição para pegar pavimentos da obra teste1'),(48,'2024-09-30 01:53:07','server.js','Retornados os pavimentos da obra'),(49,'2024-09-30 01:53:17','server.js','Requisição para pegar os dados de todas as obras'),(50,'2024-09-30 01:53:17','server.js','Retornado os dados de todas as obras'),(51,'2024-09-30 01:53:17','server.js','Requisição para pegar pavimentos da obra teste1'),(52,'2024-09-30 01:53:17','server.js','Retornados os pavimentos da obra'),(53,'2024-09-30 01:53:29','server.js','Requisição para pegar os dados de todas as obras'),(54,'2024-09-30 01:53:29','server.js','Retornado os dados de todas as obras'),(55,'2024-09-30 01:53:30','server.js','Requisição para pegar pavimentos da obra teste1'),(56,'2024-09-30 01:53:30','server.js','Retornados os pavimentos da obra'),(57,'2024-09-30 01:53:52','server.js','Requisição para pegar os dados de todas as obras'),(58,'2024-09-30 01:53:52','server.js','Retornado os dados de todas as obras'),(59,'2024-09-30 01:53:53','server.js','Requisição para pegar pavimentos da obra teste1'),(60,'2024-09-30 01:53:53','server.js','Retornados os pavimentos da obra'),(61,'2024-09-30 01:54:11','server.js','Requisição para pegar os dados de todas as obras'),(62,'2024-09-30 01:54:11','server.js','Retornado os dados de todas as obras'),(63,'2024-09-30 01:54:11','server.js','Requisição para pegar pavimentos da obra teste1'),(64,'2024-09-30 01:54:11','server.js','Retornados os pavimentos da obra'),(65,'2024-09-30 01:54:20','server.js','Requisição para pegar os dados de todas as obras'),(66,'2024-09-30 01:54:20','server.js','Retornado os dados de todas as obras'),(67,'2024-09-30 01:54:21','server.js','Requisição para pegar pavimentos da obra teste1'),(68,'2024-09-30 01:54:21','server.js','Retornados os pavimentos da obra'),(69,'2024-09-30 01:54:27','server.js','Requisição para pegar os dados de todas as obras'),(70,'2024-09-30 01:54:27','server.js','Retornado os dados de todas as obras'),(71,'2024-09-30 01:54:28','server.js','Requisição para pegar pavimentos da obra teste1'),(72,'2024-09-30 01:54:28','server.js','Retornados os pavimentos da obra'),(73,'2024-09-30 01:54:54','server.js','Requisição para pegar os dados de todas as obras'),(74,'2024-09-30 01:54:54','server.js','Retornado os dados de todas as obras');
/*!40000 ALTER TABLE `log_eventos` ENABLE KEYS */;
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
