-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: licence_db
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'database/migrations/1755157360929_create_licenses_tables',1,'2025-08-14 18:43:31'),(2,'database/migrations/1755157386933_create_support_response_times_tables',1,'2025-08-14 18:43:31'),(3,'database/migrations/1755187190582_create_support_items_tables',1,'2025-08-14 18:43:32');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adonis_schema_versions`
--

DROP TABLE IF EXISTS `adonis_schema_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema_versions` (
  `version` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema_versions`
--

LOCK TABLES `adonis_schema_versions` WRITE;
/*!40000 ALTER TABLE `adonis_schema_versions` DISABLE KEYS */;
INSERT INTO `adonis_schema_versions` VALUES (2);
/*!40000 ALTER TABLE `adonis_schema_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license_support_items`
--

DROP TABLE IF EXISTS `license_support_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `license_support_items` (
  `license_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `support_item_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`license_id`,`support_item_id`),
  KEY `license_support_items_support_item_id_foreign` (`support_item_id`),
  CONSTRAINT `license_support_items_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `license_support_items_support_item_id_foreign` FOREIGN KEY (`support_item_id`) REFERENCES `support_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license_support_items`
--

LOCK TABLES `license_support_items` WRITE;
/*!40000 ALTER TABLE `license_support_items` DISABLE KEYS */;
INSERT INTO `license_support_items` VALUES ('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','0638305c-398e-4333-a431-b5de895a0136',NULL,NULL),('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','17a0b744-8759-431d-b616-71f4882b71bd',NULL,NULL),('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','446ba218-e650-470a-8d86-c5ff46e219dc',NULL,NULL),('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','49dfdbc7-fa4b-4853-8f06-17d03ad6f0d3',NULL,NULL),('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','95db7f44-938b-45a6-8ddc-d48d7ed01637',NULL,NULL),('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','afc3d84b-8966-4341-9d0e-7d8bb9735b5b',NULL,NULL),('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','cae23732-0544-4356-96c8-4e1882ac6718',NULL,NULL),('ecd8be63-69c9-462d-8558-51eec113c850','0638305c-398e-4333-a431-b5de895a0136',NULL,NULL),('ecd8be63-69c9-462d-8558-51eec113c850','446ba218-e650-470a-8d86-c5ff46e219dc',NULL,NULL),('ecd8be63-69c9-462d-8558-51eec113c850','95db7f44-938b-45a6-8ddc-d48d7ed01637',NULL,NULL),('ecd8be63-69c9-462d-8558-51eec113c850','afc3d84b-8966-4341-9d0e-7d8bb9735b5b',NULL,NULL);
/*!40000 ALTER TABLE `license_support_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `licenses`
--

DROP TABLE IF EXISTS `licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `licenses` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','expired','suspended') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `licenses_license_key_unique` (`license_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `licenses`
--

LOCK TABLES `licenses` WRITE;
/*!40000 ALTER TABLE `licenses` DISABLE KEYS */;
INSERT INTO `licenses` VALUES ('88b3caaa-2696-4a05-9cb3-e9c4c47adf99','SRC25-W4Q9K-M1T8J-L5X2B-C3V7N','2020-03-05','2028-03-31','active','Forosta Jaya Makmur','Jl. Taman Palem Lestari Komplek Ruko Pelangi Blok E No. 32 Cengkareng Barat, Cengkareng Jakarta Barat','admin@forostajayamakmur.com','Rachman Mullyadi','081319193551','2025-08-14 18:43:32','2025-08-14 18:43:32'),('ecd8be63-69c9-462d-8558-51eec113c850','0000','2025-08-15','2025-08-30','active','test ganti','jl palem','admin@forostajayamakmur.com','tst','08123456789','2025-08-14 19:01:19','2025-08-14 19:53:04');
/*!40000 ALTER TABLE `licenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_items`
--

DROP TABLE IF EXISTS `support_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support_items` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'general',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_items`
--

LOCK TABLES `support_items` WRITE;
/*!40000 ALTER TABLE `support_items` DISABLE KEYS */;
INSERT INTO `support_items` VALUES ('0638305c-398e-4333-a431-b5de895a0136','System Performance','Ensuring that the SuperApp system operates in accordance with the specifications and requirements set out in the agreement.','performance',1,'2025-08-14 18:43:32','2025-08-14 18:43:32'),('17a0b744-8759-431d-b616-71f4882b71bd','System Security','The system is guaranteed to be protected against common vulnerabilities and will receive necessary security patches during the warranty period.','security',1,'2025-08-14 18:43:32','2025-08-14 18:43:32'),('446ba218-e650-470a-8d86-c5ff46e219dc','Support Service Hours','Monday - Friday, from 08:00 to 17:00 WIB (Western Indonesian Time), excluding national holidays. For critical cases, 24/7 support can be provided based on agreement.','support',1,'2025-08-14 18:43:32','2025-08-14 18:43:32'),('49dfdbc7-fa4b-4853-8f06-17d03ad6f0d3','Free from Major Bugs','If a major bug is found that disrupts the system\'s core functionality, the Development Team is obligated to fix it at no additional cost during the warranty period.','warranty',1,'2025-08-14 18:43:32','2025-08-14 18:43:32'),('95db7f44-938b-45a6-8ddc-d48d7ed01637','Update & Patch Management','Providing system updates, security patches, and bug fixes throughout the support period.','maintenance',1,'2025-08-14 18:43:32','2025-08-14 18:43:32'),('afc3d84b-8966-4341-9d0e-7d8bb9735b5b','On-Site Support (if necessary)','Technical visits to the user\'s location for issues that cannot be resolved through remote support.','support',1,'2025-08-14 18:43:32','2025-08-14 18:43:32'),('cae23732-0544-4356-96c8-4e1882ac6718','Technical Assistance','Remote technical support for troubleshooting, configuration, and minor fixes related to system usage.','support',1,'2025-08-14 18:43:32','2025-08-14 18:43:32');
/*!40000 ALTER TABLE `support_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support_response_times`
--

DROP TABLE IF EXISTS `support_response_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support_response_times` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `response_time` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resolution` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `support_response_times_license_id_foreign` (`license_id`),
  CONSTRAINT `support_response_times_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support_response_times`
--

LOCK TABLES `support_response_times` WRITE;
/*!40000 ALTER TABLE `support_response_times` DISABLE KEYS */;
INSERT INTO `support_response_times` VALUES ('1a34c861-fa5a-40be-a579-5d9bc11a913a','88b3caaa-2696-4a05-9cb3-e9c4c47adf99','Critical','Service down','4 hours','24 hours','2025-08-14 18:43:32','2025-08-14 18:43:32'),('2b88d27b-0ed2-43a8-a497-6e1ce7e72f3b','88b3caaa-2696-4a05-9cb3-e9c4c47adf99','Moderate','Feature disrupted','1 business day','3 business days','2025-08-14 18:43:32','2025-08-14 18:43:32'),('31a76c21-8af3-42a5-a04e-2d8c4d4ef61b','88b3caaa-2696-4a05-9cb3-e9c4c47adf99','Minor','Customization/UI','2 business days','5 business days','2025-08-14 18:43:32','2025-08-14 18:43:32'),('d5263c68-cc7d-48ca-9c02-f62e88402725','ecd8be63-69c9-462d-8558-51eec113c850','test','test ','4 hours','4 days','2025-08-14 19:53:04','2025-08-14 19:53:04');
/*!40000 ALTER TABLE `support_response_times` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-15  3:04:44
