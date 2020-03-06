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

INSERT INTO diccionario (nombre_columna,alias_columna) VALUES ('nombre', 'Nombre'), ('descripcion', 'Descripción'), ('fecha_inicial', 'Fecha Inicial'), ('fecha_final', 'Fecha Final'), ('evento_tabla', 'Tabla'), ('fecha_creacion', 'Fecha Registro'),('nombre', 'Nombre'), ('apellidos', 'Apellido'), ('numero_documento', 'Numero Documento'), ('escarapela', '¿Tiene Escarapela?'), ('categoria', 'Categoria');
create table categorias(
    id int AUTO_INCREMENT,
    nombre_categoria varchar(100),
    PRIMARY KEY(id)
);
insert into categorias (nombre_categoria) VALUES('Expositor'),('Visitante'),('Estudiante'),('Staff');