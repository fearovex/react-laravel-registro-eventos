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

INSERT INTO diccionario (nombre_columna,alias_columna) VALUES ('nombre', 'Nombre'), ('descripcion', 'Descripción'), ('fecha_inicial', 'Fecha Inicial'), ('fecha_final', 'Fecha Final'), ('evento_tabla', 'Tabla'), ('fecha_creacion', 'Fecha Registro'),('nombre', 'Nombre'), ('apellidos', 'Apellido'), ('numero_documento', 'Numero Documento'),('correo_electronico','Correo'),('numero_celular', 'Número Contacto'), ('escarapela', '¿Tiene Escarapela?'),('cantidad_impresos','Cantidad Impresos'), ('categoria', 'Categoria'), ('sub_categoria', 'Sub Categoria');

DROP TABLE IF EXISTS categorias;
create table categorias(
    id int AUTO_INCREMENT,
    nombre_categoria varchar(100),
    PRIMARY KEY(id)
);
insert into categorias (nombre_categoria) VALUES('Expositor'),('Visitante'),('Estudiante'),('Staff');

DROP TABLE IF EXISTS sub_categorias;
CREATE TABLE sub_categorias(
	id int AUTO_INCREMENT,
	nombre_sub_categoria varchar(100),
	id_categoria int,
 	PRIMARY KEY(id)
);

insert into sub_categorias (nombre_sub_categoria) VALUES 
('Subcategoria1'),
('Subcategoria2'),
('Subcategoria3'),
('Subcategoria4'),
('Subcategoria5'),
('Subcategoria6'),
('Subcategoria7'),
('Subcategoria8');

DROP TABLE IF EXISTS log_impresiones;
CREATE TABLE log_impresiones(
	id int AUTO_INCREMENT,
	fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
	id_usuario int,
 	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS log_validadores;
CREATE TABLE log_validadores(
	id int AUTO_INCREMENT,
	fecha_validacion DATETIME DEFAULT CURRENT_TIMESTAMP,
	id_usuario_validador int,
	sub_categoria varchar(100),
	estado_validacion tinyint,
 	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS sub_categorias_usuario;
CREATE TABLE sub_categorias_usuario(
	id int AUTO_INCREMENT,
	id_usuario int,
	id_sub_categoria int,
 	PRIMARY KEY(id)
);
