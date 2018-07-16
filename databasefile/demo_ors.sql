/*
SQLyog Ultimate v9.02 
MySQL - 5.7.22-log : Database - demo_ors
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`demo_ors` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `demo_ors`;

/*Table structure for table `st_college` */

DROP TABLE IF EXISTS `st_college`;

CREATE TABLE `st_college` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `STATE` varchar(255) DEFAULT NULL,
  `CITY` varchar(255) DEFAULT NULL,
  `PHONE_NO` varchar(255) DEFAULT NULL,
  `CREATED_BY` varchar(255) DEFAULT NULL,
  `MODIFIED_BY` varchar(255) DEFAULT NULL,
  `CREATED_DATETIME` datetime DEFAULT NULL,
  `MODIFIED_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `NAME_IDX` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=latin1;

/*Table structure for table `st_marksheet` */

DROP TABLE IF EXISTS `st_marksheet`;

CREATE TABLE `st_marksheet` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ROLL_NO` varchar(255) DEFAULT NULL,
  `STUDENT_ID` bigint(20) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `PHYSICS` int(11) DEFAULT NULL,
  `CHEMISTRY` int(11) DEFAULT NULL,
  `MATHS` int(11) DEFAULT NULL,
  `CREATED_BY` varchar(255) DEFAULT NULL,
  `MODIFIED_BY` varchar(255) DEFAULT NULL,
  `CREATED_DATETIME` datetime DEFAULT NULL,
  `MODIFIED_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_STUDENT_ID_idx` (`STUDENT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Table structure for table `st_marksheet_log` */

DROP TABLE IF EXISTS `st_marksheet_log`;

CREATE TABLE `st_marksheet_log` (
  `ID` bigint(20) NOT NULL,
  `ROLL_NO` varchar(15) DEFAULT NULL,
  `STUDENT_ID` bigint(20) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL,
  `PHYSICS` int(11) DEFAULT NULL,
  `CHEMISTRY` int(11) DEFAULT NULL,
  `MATHS` int(11) DEFAULT NULL,
  `CREATED_BY` varchar(50) DEFAULT NULL,
  `MODIFIED_BY` varchar(50) DEFAULT NULL,
  `CREATED_DATETIME` datetime DEFAULT NULL,
  `MODIFIED_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ST_STUDENT_ID_idx` (`STUDENT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `st_role` */

DROP TABLE IF EXISTS `st_role`;

CREATE TABLE `st_role` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `CREATED_BY` varchar(255) DEFAULT NULL,
  `MODIFIED_BY` varchar(255) DEFAULT NULL,
  `CREATED_DATETIME` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `MODIFIED_DATETIME` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`),
  KEY `NAME_IDX` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Table structure for table `st_user` */

DROP TABLE IF EXISTS `st_user`;

CREATE TABLE `st_user` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(255) DEFAULT NULL,
  `LAST_NAME` varchar(255) DEFAULT NULL,
  `LOGIN` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `MOBILE_NO` varchar(255) DEFAULT NULL,
  `ROLE_ID` bigint(20) DEFAULT NULL,
  `UNSUCCESSFUL_LOGIN` int(11) DEFAULT NULL,
  `GENDER` varchar(255) DEFAULT NULL,
  `IMAGE` longblob,
  `LAST_LOGIN` datetime DEFAULT NULL,
  `USER_LOCK` varchar(255) DEFAULT NULL,
  `REGISTERED_IP` varchar(255) DEFAULT NULL,
  `LAST_LOGIN_IP` varchar(255) DEFAULT NULL,
  `CREATED_BY` varchar(255) DEFAULT NULL,
  `MODIFIED_BY` varchar(255) DEFAULT NULL,
  `CREATED_DATETIME` datetime DEFAULT NULL,
  `MODIFIED_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_ROLE_ID_idx` (`ROLE_ID`),
  KEY `MOBILE_NO_IDX` (`MOBILE_NO`),
  KEY `FIRST_LAST_NAME_IDX` (`FIRST_NAME`,`LAST_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `COLLEGE_ID` bigint(20) DEFAULT NULL,
  `COLLEGE_NAME` varchar(255) DEFAULT NULL,
  `FIRST_NAME` varchar(255) DEFAULT NULL,
  `LAST_NAME` varchar(255) DEFAULT NULL,
  `DATE_OF_BIRTH` datetime DEFAULT NULL,
  `MOBILE_NO` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `CREATED_BY` varchar(255) DEFAULT NULL,
  `MODIFIED_BY` varchar(255) DEFAULT NULL,
  `CREATED_DATETIME` datetime DEFAULT NULL,
  `MODIFIED_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `MOBILE_NO_IDX` (`MOBILE_NO`),
  KEY `fk_COLLEGE_ID_idx` (`COLLEGE_ID`),
  KEY `FIRST_LAST_NAME_IDX` (`FIRST_NAME`,`LAST_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

/*Table structure for table `st_student_mst_view` */

DROP TABLE IF EXISTS `st_student_mst_view`;

/*!50001 DROP VIEW IF EXISTS `st_student_mst_view` */;
/*!50001 DROP TABLE IF EXISTS `st_student_mst_view` */;

/*!50001 CREATE TABLE  `st_student_mst_view`(
 `ID` bigint(20) ,
 `FIRST_NAME` varchar(255) ,
 `LAST_NAME` varchar(255) ,
 `COLLEGE_NAME` varchar(255) ,
 `ROLL_NO` varchar(255) ,
 `PHYSICS` int(11) ,
 `CHEMISTRY` int(11) ,
 `MATHS` int(11) ,
 `SUM_MARKS` decimal(34,0) 
)*/;

/*Table structure for table `st_user_role_view` */

DROP TABLE IF EXISTS `st_user_role_view`;

/*!50001 DROP VIEW IF EXISTS `st_user_role_view` */;
/*!50001 DROP TABLE IF EXISTS `st_user_role_view` */;

/*!50001 CREATE TABLE  `st_user_role_view`(
 `FIRST_NAME` varchar(255) ,
 `LAST_NAME` varchar(255) ,
 `LOGIN` varchar(255) ,
 `NAME` varchar(255) 
)*/;

/*View structure for view st_student_mst_view */

/*!50001 DROP TABLE IF EXISTS `st_student_mst_view` */;
/*!50001 DROP VIEW IF EXISTS `st_student_mst_view` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`ncs_mysql_dev`@`%` SQL SECURITY DEFINER VIEW `st_student_mst_view` AS select `student`.`ID` AS `ID`,`student`.`FIRST_NAME` AS `FIRST_NAME`,`student`.`LAST_NAME` AS `LAST_NAME`,`student`.`COLLEGE_NAME` AS `COLLEGE_NAME`,`st_marksheet`.`ROLL_NO` AS `ROLL_NO`,`st_marksheet`.`PHYSICS` AS `PHYSICS`,`st_marksheet`.`CHEMISTRY` AS `CHEMISTRY`,`st_marksheet`.`MATHS` AS `MATHS`,sum(((`st_marksheet`.`PHYSICS` + `st_marksheet`.`CHEMISTRY`) + `st_marksheet`.`MATHS`)) AS `SUM_MARKS` from (`student` join `st_marksheet`) where (`student`.`ID` = `st_marksheet`.`ID`) */;

/*View structure for view st_user_role_view */

/*!50001 DROP TABLE IF EXISTS `st_user_role_view` */;
/*!50001 DROP VIEW IF EXISTS `st_user_role_view` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`ncs_mysql_dev`@`%` SQL SECURITY DEFINER VIEW `st_user_role_view` AS select `st_user`.`FIRST_NAME` AS `FIRST_NAME`,`st_user`.`LAST_NAME` AS `LAST_NAME`,`st_user`.`LOGIN` AS `LOGIN`,`st_role`.`NAME` AS `NAME` from (`st_user` join `st_role`) where (`st_role`.`ID` = `st_user`.`ROLE_ID`) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
