-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: Courses
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users_tbl`
--

DROP TABLE IF EXISTS `Users_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_tbl` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_tbl`
--

LOCK TABLES `Users_tbl` WRITE;
/*!40000 ALTER TABLE `Users_tbl` DISABLE KEYS */;
INSERT INTO `Users_tbl` VALUES (1,'sayan','$2y$10$rzXQQaI0nNBtK9TycyMtDe.6PDrtkWgyWCuYeK3ei.EkxEQJ3ZO2G'),(2,'meshi','$2y$10$BKwG2cLNr/EOuDWwGOKzIu5Sr53KAkrEh.ScCBeUqkE7h/.OAeMoC');
/*!40000 ALTER TABLE `Users_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_tbl`
--

DROP TABLE IF EXISTS `course_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `overview` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `start_month` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fees_UK` varchar(255) DEFAULT NULL,
  `fees_international` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1053 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_tbl`
--

LOCK TABLES `course_tbl` WRITE;
/*!40000 ALTER TABLE `course_tbl` DISABLE KEYS */;
INSERT INTO `course_tbl` VALUES (1046,'Accounting and Finance (Top-Up) MSc','This programme will broaden your specialist knowledge previously gained at a professional level, turning leading qualifications like ACCA into a recognised masters degree. In particular the module, ‘Accounting & finance research project’ guides you to research into the key challenges accounting and finance professionals face in the industry. This module aims to equip accounting and finance professionals with the necessary skills to undertake independent project work within a business context. The Research Methods element provides you with an introduction to research, types of research methodology, formulating and planning a research project, data collection, analysis and presentation of research findings based upon an actual industry specific or corporate focused topic.','Waterside','January','£2500','£3000','Postgraduate'),(1047,'Advertising and Digital Marketing BA (Hons)','The advertising industry has been transformed by the digital and social media revolution. From start-ups to big businesses, from social enterprises to charities and the public sector, this discipline offers careers in a wide range of industry sectors.Experiences are at the heart of our advertising degree. As well as regular guest speakers and industry visits, we work on real projects with real marketing budgets. We operate as a marketing department from the first year. Typically, you will be set a brief and then develop and pitch your concept. You will work within brand guidelines, often appointing suppliers, like photographers or design agencies, to deliver your project.','online','April','£2355','£3000','Undergraduate'),(1048,'BSc (Hons) in Artificial Intelligence and Data Science','This course is designed to provide you with the knowledge and skills to work with data and build intelligent systems using modern Artificial Intelligence (AI) techniques.\\n\\nYou will learn how to develop machine learning models to analyse and make predictions from data, as well as how to build intelligent agents that can interact with the world and make decisions. You will also gain a solid understanding of the mathematical and computational foundations of AI, as well as the ethical and societal issues related to the development and deployment of intelligent systems.\\n\\nDuring the course, you will work on a range of practical projects and have the opportunity to collaborate with businesses and organisations on real-world AI and data science problems. You will also have access to state-of-the-art facilities, including dedicated AI and data science labs equipped with cutting-edge hardware and software.','Waterside','Septemper','£14750','£16000','Undergraduate'),(1049,'Criminal and Corporate Investigation BA (Hons)','Our Criminal and Corporate Investigation course has been designed and developed with input from leading investigation, intelligence, security and financial specialists. Throughout your criminal investigation degree studies, you will develop the necessary industry standard skills and experience to carry out professional investigations to the highest level within commercial, public or criminal justice settings.','Waterside','Septemper','£14750','£18000','Undergraduate'),(1051,'Business Management BSc','The Business Management BSc program equips students with a comprehensive understanding of key business principles and practices. Through a combination of theoretical knowledge and practical application, students develop the necessary skills to excel in various business environments. The program covers a wide range of subjects, including marketing, finance, human resources, operations management, and strategic management. Graduates of this program are well-prepared for careers in business administration, entrepreneurship, and management.','Waterside','January','£9250','£11000','Undergraduate');
/*!40000 ALTER TABLE `course_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry_req_tbl`
--

DROP TABLE IF EXISTS `entry_req_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entry_req_tbl` (
  `entry_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `requirements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`entry_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `entry_req_tbl_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course_tbl` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_req_tbl`
--

LOCK TABLES `entry_req_tbl` WRITE;
/*!40000 ALTER TABLE `entry_req_tbl` DISABLE KEYS */;
INSERT INTO `entry_req_tbl` VALUES (23,1046,'A minimum of a second class honours degree or equivalent.'),(24,1046,'Applicants who do not have English as their first language must have an IELTS score of 6.5 or equivalent.'),(25,1047,'UCAS tariff points: 104-120'),(26,1047,'A-Level: BCC-BBC'),(27,1047,'BTEC: DMM-DMP'),(28,1047,'IB Diploma: 28-30 points'),(29,1047,'Applicants are expected to hold GCSE English and Maths at Grade 4 or above.'),(30,1048,'a_levels 112 UCAS points from at least two A-levels or equivalent qualifications, including a grade C or above in Mathematics or Computing'),(31,1048,'gcse GCSE English Language and Mathematics at grade C/4 or above (or equivalent)'),(32,1048,'mature_applicants Mature applicants without formal qualifications will be considered on a case-by-case basis'),(33,1049,'112 UCAS tariff points'),(34,1049,'GCSE English Language and Mathematics at grade C/4 or above'),(35,1049,'International students: IELTS 6.0 overall with no element lower than 5.5 or equivalent'),(37,1051,'A minimum of three A-levels or equivalent qualifications.'),(38,1051,'Applicants who do not have English as their first language must have an IELTS score of 6.0 or equivalent.');
/*!40000 ALTER TABLE `entry_req_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq_tbl`
--

DROP TABLE IF EXISTS `faq_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq_tbl` (
  `faq_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`faq_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `faq_tbl_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course_tbl` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq_tbl`
--

LOCK TABLES `faq_tbl` WRITE;
/*!40000 ALTER TABLE `faq_tbl` DISABLE KEYS */;
INSERT INTO `faq_tbl` VALUES (16,1046,'How many years of course?','4 years'),(17,1047,'How many years of course?','4 years'),(18,1048,'How will I be taught on Computing (Software Engineering) MSc?','online and physical classes'),(19,1049,'How many days of classes we have?','5 days a week'),(21,1051,'Is research included in this course?','No');
/*!40000 ALTER TABLE `faq_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules_tbl`
--

DROP TABLE IF EXISTS `modules_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules_tbl` (
  `module_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `module` varchar(255) NOT NULL,
  `credit` int NOT NULL,
  PRIMARY KEY (`module_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `modules_tbl_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course_tbl` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules_tbl`
--

LOCK TABLES `modules_tbl` WRITE;
/*!40000 ALTER TABLE `modules_tbl` DISABLE KEYS */;
INSERT INTO `modules_tbl` VALUES (41,1046,'Advanced Financial Reporting',20),(42,1046,'Advanced Management Accounting',20),(43,1046,'Corporate Finance',20),(44,1046,'Corporate Governance and Ethics',20),(45,1046,'Research Methods for Accounting and Finance',20),(46,1047,'Introduction to Advertising',20),(47,1047,'Introduction to Digital Marketing',20),(48,1047,'Advertising Creativity and Innovation',20),(49,1047,'Social Media Marketing',20),(50,1047,'Advertising and Society',20),(51,1047,'Mobile Marketing',20),(52,1048,'Introduction to Artificial Intelligence and Data Science',20),(53,1048,'Data Structures and Algorithms',20),(54,1048,'Machine Learning',20),(55,1048,'Natural Language Processing',20),(56,1048,'Computer Vision',20),(57,1048,'Big Data and Cloud Computing',20),(58,1048,'Intelligent Systems',20),(59,1048,'Research Project',40),(60,1049,'Criminal Law',20),(61,1049,'Policing and Investigation',20),(62,1049,'Corporate Law and Governance',20),(63,1049,'Financial Investigation and Forensic Accounting',20),(64,1049,'Investigative Interviewing and Interpersonal Skills',20),(65,1049,'Digital and Cybercrime Investigation',20),(67,1051,'Introduction to Business',20),(68,1051,'Marketing Management',20),(69,1051,'Strategic Management',20),(70,1051,'Financial Management',20),(71,1051,'Leadership and Organizational Behavior',20);
/*!40000 ALTER TABLE `modules_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 18:16:53
