-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla registro.assistpeople
CREATE TABLE IF NOT EXISTS `assistpeople` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_userIngreso` int(11) NOT NULL,
  `id_userSalida` int(11) DEFAULT NULL,
  `numero_documento` varchar(100) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `fecha_nacimiento` varchar(10) NOT NULL,
  `fecha_ingreso` varchar(30) NOT NULL,
  `fecha_salida` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.assistpeople: ~29 rows (aproximadamente)
/*!40000 ALTER TABLE `assistpeople` DISABLE KEYS */;
REPLACE INTO `assistpeople` (`id`, `id_userIngreso`, `id_userSalida`, `numero_documento`, `apellidos`, `nombres`, `fecha_nacimiento`, `fecha_ingreso`, `fecha_salida`) VALUES
	(1, 1, NULL, '1032487185', 'ACEVEDO GANTIVA', 'MIGUEL ANGEL', '1996/11/16', '2020-03-12 16:42:20', '2020-03-12 16:42:31'),
	(2, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-12 16:43:08', '2020-03-12 16:43:22'),
	(3, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-12 16:44:58', '2020-03-12 16:45:04'),
	(4, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-12 16:45:20', '2020-03-12 16:45:48'),
	(5, 1, NULL, 'dfsfsdsffd', 'sdfgfd sadfgd', 'dsfghf fdgh', 'dsfgh', '2020-03-12 16:47:04', NULL),
	(6, 1, NULL, '1032487185', 'ACEVEDO GANTIVA', 'MIGUEL ANGEL', '1996/11/16', '2020-03-12 16:48:36', '2020-03-12 16:49:33'),
	(7, 1, NULL, 'sfdsfdsfds', 'sfdsfdsf dsfds', 'sdf sdfdsfds', 'sdf', '2020-03-12 16:50:13', NULL),
	(8, 1, NULL, '1032487185', 'ACEVEDO GANTIVA', 'MIGUEL ANGEL', '1996/11/16', '2020-03-12 16:51:18', '2020-03-12 16:52:06'),
	(9, 1, NULL, '1032487185', 'ACEVEDO GANTIVA', 'MIGUEL ANGEL', '1996/11/16', '2020-03-12 16:52:40', '2020-03-13 10:16:11'),
	(10, 1, NULL, 'dasdas', 'asd asdsa', 'dasdas sa', 'dasd', '2020-03-13 09:50:53', NULL),
	(11, 1, NULL, 'asdas', 'asddsad asddsad', 'asdasdsaa', 'asdas', '2020-03-13 09:54:53', '2020-03-13 09:56:55'),
	(12, 1, NULL, 'sasdasdasd', 'sadasd asdas', 'asdas asdas', 'sadas', '2020-03-13 09:56:21', NULL),
	(13, 1, NULL, 'asdsdsad', 'asdasdas asdasd', 'asdasd adasda', 'asdasdsa', '2020-03-13 09:58:11', NULL),
	(14, 1, NULL, 'asddasds', 'sdasd asddas', 'asdasd asdsad', 'dasd', '2020-03-13 09:58:55', NULL),
	(15, 1, NULL, 'adasd', 'asdasd asdasd', 'asdasda asdasd', 'asdas', '2020-03-13 10:00:08', NULL),
	(16, 1, NULL, 'adsasd', 'sdasdas asdasd', 'adasd asdas', 'asdas', '2020-03-13 10:01:18', NULL),
	(17, 1, NULL, 'adas', 'asdasd adasd', 'asdasd', 'asdas', '2020-03-13 10:01:29', NULL),
	(18, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 10:09:56', '2020-03-13 10:10:05'),
	(19, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 10:10:11', '2020-03-13 10:10:32'),
	(20, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 10:10:46', '2020-03-13 10:13:22'),
	(21, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 10:14:37', '2020-03-13 10:14:43'),
	(22, 1, NULL, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 10:15:49', '2020-03-13 10:15:56'),
	(23, 1, NULL, '1032487185', 'ACEVEDO GANTIVA', 'MIGUEL ANGEL', '1996/11/16', '2020-03-13 10:16:31', '2020-03-13 10:16:36'),
	(24, 6, 6, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:03:56', '2020-03-13 11:04:05'),
	(25, 6, 6, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:04:11', '2020-03-13 11:04:17'),
	(26, 6, 6, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:04:22', '2020-03-13 11:04:31'),
	(27, 6, NULL, '0', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:04:25', NULL),
	(28, 6, 6, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:04:38', '2020-03-13 11:04:45'),
	(29, 6, 6, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:04:53', '2020-03-13 11:05:00'),
	(30, 6, 7, '1002526800', 'GONZALEZ MORATO', 'DUVAN ARLEY', '2000/09/23', '2020-03-13 11:11:06', '2020-03-13 11:11:31');
/*!40000 ALTER TABLE `assistpeople` ENABLE KEYS */;

-- Volcando estructura para tabla registro.banner_files_campania
CREATE TABLE IF NOT EXISTS `banner_files_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `nombre_img_web` varchar(255) NOT NULL DEFAULT 'Untitled.txt',
  `mime_img_web` varchar(100) DEFAULT NULL,
  `tamano_img_web` bigint(20) DEFAULT NULL,
  `datos_img_web` mediumblob,
  `nombre_img_movil` varchar(255) NOT NULL DEFAULT 'Untitled.txt',
  `mime_img_movil` varchar(100) DEFAULT NULL,
  `tamano_img_movil` bigint(20) DEFAULT NULL,
  `datos_img_movil` mediumblob,
  `estado` tinyint(4) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.banner_files_campania: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `banner_files_campania` DISABLE KEYS */;
/*!40000 ALTER TABLE `banner_files_campania` ENABLE KEYS */;

-- Volcando estructura para tabla registro.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.categorias: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
REPLACE INTO `categorias` (`id`, `nombre_categoria`) VALUES
	(1, 'Expositor'),
	(2, 'Visitante'),
	(3, 'Estudiante'),
	(4, 'Staff');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando estructura para tabla registro.diccionario
CREATE TABLE IF NOT EXISTS `diccionario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_columna` varchar(100) NOT NULL,
  `alias_columna` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.diccionario: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `diccionario` DISABLE KEYS */;
REPLACE INTO `diccionario` (`id`, `nombre_columna`, `alias_columna`) VALUES
	(1, 'nombre', 'Nombre'),
	(2, 'descripcion', 'Descripción'),
	(3, 'fecha_inicial', 'Fecha Inicial'),
	(4, 'fecha_final', 'Fecha Final'),
	(5, 'evento_tabla', 'Tabla'),
	(6, 'fecha_creacion', 'Fecha Registro'),
	(7, 'nombre', 'Nombre'),
	(8, 'apellidos', 'Apellido'),
	(9, 'numero_documento', 'Numero Documento'),
	(10, 'escarapela', '¿Tiene Escarapela?'),
	(11, 'cantidad_impresos', 'Cantidad Impresos'),
	(12, 'categoria', 'Categoria'),
	(13, 'sub_categoria', 'Sub Categoria');
/*!40000 ALTER TABLE `diccionario` ENABLE KEYS */;

-- Volcando estructura para tabla registro.eventos
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_inicial` datetime NOT NULL,
  `fecha_final` datetime NOT NULL,
  `evento_tabla` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.eventos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
REPLACE INTO `eventos` (`id`, `nombre`, `descripcion`, `fecha_inicial`, `fecha_final`, `evento_tabla`) VALUES
	(1, 'Prueba Portal', NULL, '2020-03-11 00:00:00', '2020-04-30 23:59:00', 'Prueba_Portal_2020_03_11'),
	(2, 'Evento Campestre', NULL, '2020-03-13 11:10:00', '2020-03-31 11:10:00', 'Evento_Campestre_2020_03_13');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;

-- Volcando estructura para tabla registro.evento_campestre_2020_03_13
CREATE TABLE IF NOT EXISTS `evento_campestre_2020_03_13` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_documento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado_numero_documento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correo_electronico` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_celular` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `escarapela` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad_impresos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_categoria` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla registro.evento_campestre_2020_03_13: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `evento_campestre_2020_03_13` DISABLE KEYS */;
/*!40000 ALTER TABLE `evento_campestre_2020_03_13` ENABLE KEYS */;

-- Volcando estructura para tabla registro.files_campania
CREATE TABLE IF NOT EXISTS `files_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `id_tipo_archivo_multimedia` int(10) unsigned NOT NULL,
  `nombre` varchar(255) NOT NULL DEFAULT 'Untitled.txt',
  `mime` varchar(50) DEFAULT 'image/png',
  `tamano` bigint(20) DEFAULT NULL,
  `datos` mediumblob,
  `estado` tinyint(4) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.files_campania: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `files_campania` DISABLE KEYS */;
REPLACE INTO `files_campania` (`id`, `id_campania`, `id_tipo_archivo_multimedia`, `nombre`, `mime`, `tamano`, `datos`, `estado`, `fecha_creacion`) VALUES
	(1, 1, 1, '/img/background.png', 'image/png', NULL, NULL, NULL, '2020-03-11 12:02:14'),
	(2, 1, 2, '/img/logo.png', 'image/png', NULL, NULL, NULL, '2020-03-11 12:02:14'),
	(3, 1, 3, '/img/favicon.ico', 'image/png', NULL, NULL, NULL, '2020-03-11 12:02:14');
/*!40000 ALTER TABLE `files_campania` ENABLE KEYS */;

-- Volcando estructura para tabla registro.log_impresiones
CREATE TABLE IF NOT EXISTS `log_impresiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.log_impresiones: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `log_impresiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_impresiones` ENABLE KEYS */;

-- Volcando estructura para tabla registro.prueba_portal_2020_03_11
CREATE TABLE IF NOT EXISTS `prueba_portal_2020_03_11` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_evento` bigint(20) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_documento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado_numero_documento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `escarapela` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cantidad_impresos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoria` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_categoria` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla registro.prueba_portal_2020_03_11: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `prueba_portal_2020_03_11` DISABLE KEYS */;
REPLACE INTO `prueba_portal_2020_03_11` (`id`, `id_evento`, `fecha_creacion`, `nombre`, `apellidos`, `numero_documento`, `estado_numero_documento`, `escarapela`, `cantidad_impresos`, `categoria`, `sub_categoria`) VALUES
	(1, 1, '2020-03-12 14:51:38', 'zdfgcbvnm', 'dfhgjk132425364', '1002526800', NULL, 'No', '0', 'Expositor', 'Subcategoria2, Subcategoria3, Subcategoria4, Subcategoria5, Subcategoria6, Subcategoria7, Subcategoria8, Subcategoria1');
/*!40000 ALTER TABLE `prueba_portal_2020_03_11` ENABLE KEYS */;

-- Volcando estructura para tabla registro.styles_campania
CREATE TABLE IF NOT EXISTS `styles_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `width_logo_web` varchar(255) NOT NULL DEFAULT '200px',
  `margin_logo_web` varchar(255) NOT NULL DEFAULT '1px',
  `width_logo_movil` varchar(255) NOT NULL DEFAULT '120px',
  `margin_logo_movil` varchar(255) NOT NULL DEFAULT '1px',
  `container_form_color` varchar(255) NOT NULL DEFAULT '#005153ad',
  `container_form_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `button_hover_font_color` varchar(255) NOT NULL DEFAULT '#EEE',
  `button_hover_background_color` varchar(255) NOT NULL DEFAULT '#1a2b50',
  `checkbox_terms_background_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `checkbox_terms_border_color` varchar(255) NOT NULL DEFAULT '#20396f',
  `msg_error_color_font` varchar(255) NOT NULL DEFAULT '#EEE',
  `msg_error_color_background` varchar(255) NOT NULL DEFAULT 'rgb(160,19,35,0.91)',
  `title_portal` varchar(100) DEFAULT NULL,
  `color_title_portal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.styles_campania: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `styles_campania` DISABLE KEYS */;
REPLACE INTO `styles_campania` (`id`, `id_campania`, `width_logo_web`, `margin_logo_web`, `width_logo_movil`, `margin_logo_movil`, `container_form_color`, `container_form_font_color`, `button_font_color`, `button_background_color`, `button_border_color`, `button_hover_font_color`, `button_hover_background_color`, `checkbox_terms_background_color`, `checkbox_terms_border_color`, `msg_error_color_font`, `msg_error_color_background`, `title_portal`, `color_title_portal`) VALUES
	(1, 1, '50px', '1px', '50px', '1px', 'rgba(24, 75, 222, 0.7)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(247, 3, 3, 0.76)', 'rgba(247, 3, 3, 0.76)', '#EEE', '#000', 'rgba(247, 3, 3, 0.76)', 'rgba(247, 3, 3, 0.76)', '#EEE', 'rgb(160,19,35,0.91)', 'BIenvenidos Campestres', 'rgba(0, 0, 0, 1)');
/*!40000 ALTER TABLE `styles_campania` ENABLE KEYS */;

-- Volcando estructura para tabla registro.sub_categorias
CREATE TABLE IF NOT EXISTS `sub_categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_sub_categoria` varchar(100) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.sub_categorias: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `sub_categorias` DISABLE KEYS */;
REPLACE INTO `sub_categorias` (`id`, `nombre_sub_categoria`, `id_categoria`) VALUES
	(1, 'Subcategoria1', NULL),
	(2, 'Subcategoria2', NULL),
	(3, 'Subcategoria3', NULL),
	(4, 'Subcategoria4', NULL),
	(5, 'Subcategoria5', NULL),
	(6, 'Subcategoria6', NULL),
	(7, 'Subcategoria7', NULL),
	(8, 'Subcategoria8', NULL);
/*!40000 ALTER TABLE `sub_categorias` ENABLE KEYS */;

-- Volcando estructura para tabla registro.sub_categorias_usuario
CREATE TABLE IF NOT EXISTS `sub_categorias_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_sub_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.sub_categorias_usuario: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `sub_categorias_usuario` DISABLE KEYS */;
REPLACE INTO `sub_categorias_usuario` (`id`, `id_usuario`, `id_sub_categoria`) VALUES
	(1, 1, 2),
	(2, 1, 3),
	(3, 1, 4),
	(4, 1, 5),
	(5, 1, 6),
	(6, 1, 7),
	(7, 1, 8),
	(8, 1, 1);
/*!40000 ALTER TABLE `sub_categorias_usuario` ENABLE KEYS */;

-- Volcando estructura para tabla registro.terms_conditions_campania
CREATE TABLE IF NOT EXISTS `terms_conditions_campania` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_campania` int(10) unsigned NOT NULL,
  `terms_conditions_es` longtext NOT NULL,
  `terms_conditions_en` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.terms_conditions_campania: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `terms_conditions_campania` DISABLE KEYS */;
REPLACE INTO `terms_conditions_campania` (`id`, `id_campania`, `terms_conditions_es`, `terms_conditions_en`) VALUES
	(1, 1, '<p>sdasdas</p>', '<p>asdasd</p>');
/*!40000 ALTER TABLE `terms_conditions_campania` ENABLE KEYS */;

-- Volcando estructura para tabla registro.tipos_archivos_multimedia
CREATE TABLE IF NOT EXISTS `tipos_archivos_multimedia` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.tipos_archivos_multimedia: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `tipos_archivos_multimedia` DISABLE KEYS */;
REPLACE INTO `tipos_archivos_multimedia` (`id`, `tipo`) VALUES
	(1, 'Background'),
	(2, 'Logo'),
	(3, 'Favicon');
/*!40000 ALTER TABLE `tipos_archivos_multimedia` ENABLE KEYS */;

-- Volcando estructura para tabla registro.users_radius
CREATE TABLE IF NOT EXISTS `users_radius` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_campania` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla registro.users_radius: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users_radius` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_radius` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
