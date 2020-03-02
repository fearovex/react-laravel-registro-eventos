DROP DATABASE IF EXISTS registro;
CREATE DATABASE registro;
USE registro;

DROP TABLE IF EXISTS eventos;
CREATE TABLE eventos (
    id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(255),
	fecha_inicial DATETIME NOT NULL,
	fecha_final DATETIME NOT NULL,
	evento_tabla VARCHAR(100) NOT NULL	
);
DROP TABLE IF EXISTS diccionario;
CREATE TABLE diccionario (
	id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_columna VARCHAR(100) NOT NULL,
	alias_columna VARCHAR(100) NOT NULL
);

INSERT INTO diccionario VALUES ('nombre', 'Nombre'), ('descripcion', 'Descripción'), ('fecha_inicial', 'Fecha Inicial'), ('fecha_final', 'Fecha Final'), ('evento_tabla', 'Tabla');