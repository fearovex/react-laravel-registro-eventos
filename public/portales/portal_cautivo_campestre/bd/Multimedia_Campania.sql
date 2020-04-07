use portal_oxohotel;
drop table if exists files_campania;
create table `files_campania` (
	`id` int unsigned	not null auto_increment ,
    `id_campania` int unsigned	not null,
    `id_tipo_archivo_multimedia` int unsigned not null,
    `nombre` varchar(255) not null default 'Untitled.txt',
	`mime` VarChar(50) Not Null Default 'text/plain',
    `tamano` BigInt Unsigned Not Null Default 0,
    `datos` MediumBlob Not Null,    
    `estado` bool not null default false,
    `fecha_creacion`   DateTime Not Null,
    PRIMARY KEY (`id`)
);

drop table if exists banner_files_campania;
create table `banner_files_campania` (
	`id` int unsigned not null auto_increment,
    `id_campania` int unsigned not null,
    `nombre_img_web` varchar(255) not null default 'Untitled.txt',
	`mime_img_web` VarChar(50) Not Null Default 'text/plain',
    `tamano_img_web` BigInt Unsigned Not Null Default 0,
    `datos_img_web` MediumBlob Not Null,    
    `nombre_img_movil` varchar(255) not null default 'Untitled.txt',
	`mime_img_movil` VarChar(50) Not Null Default 'text/plain',
    `tamano_img_movil` BigInt Unsigned Not Null Default 0,
    `datos_img_movil` MediumBlob Not Null,    
    `estado` bool not null default false,
    `fecha_creacion` DateTime Not Null,
    PRIMARY KEY (`id`)
);

drop table if exists tipos_archivos_multimedia;
create table `tipos_archivos_multimedia` (
	`id` int unsigned not null auto_increment,
    `tipo` varchar(100) not null,
    PRIMARY KEY (`id`)
);

insert into `tipos_archivos_multimedia` values (1, 'Background');
insert into `tipos_archivos_multimedia` values (2, 'Logo');
insert into `tipos_archivos_multimedia` values (3, 'Favicon');


use unicentro;
drop table if exists files_campania;
create table `files_campania` (
	`id` int unsigned	not null auto_increment ,
    `id_campania` int unsigned	not null,
    `id_tipo_archivo_multimedia` int unsigned not null,
    `nombre` varchar(255) not null default 'Untitled.txt',
	`mime` VarChar(50) Not Null Default 'text/plain',
    `tamano` BigInt Unsigned Not Null Default 0,
    `datos` MediumBlob Not Null,    
    `estado` bool not null default false,
    `fecha_creacion`   DateTime Not Null,
    PRIMARY KEY (`id`)
);

drop table if exists banner_files_campania;
create table `banner_files_campania` (
	`id` int unsigned not null auto_increment,
    `id_campania` int unsigned not null,
    `nombre_img_web` varchar(255) not null default 'Untitled.txt',
	`mime_img_web` VarChar(50) Not Null Default 'text/plain',
    `tamano_img_web` BigInt Unsigned Not Null Default 0,
    `datos_img_web` MediumBlob Not Null,    
    `nombre_img_movil` varchar(255) not null default 'Untitled.txt',
	`mime_img_movil` VarChar(50) Not Null Default 'text/plain',
    `tamano_img_movil` BigInt Unsigned Not Null Default 0,
    `datos_img_movil` MediumBlob Not Null,    
    `estado` bool not null default false,
    `fecha_creacion` DateTime Not Null,
    PRIMARY KEY (`id`)
);

drop table if exists tipos_archivos_multimedia;
create table `tipos_archivos_multimedia` (
	`id` int unsigned not null auto_increment,
    `tipo` varchar(100) not null,
    PRIMARY KEY (`id`)
);

insert into `tipos_archivos_multimedia` values (1, 'Background');
insert into `tipos_archivos_multimedia` values (2, 'Logo');
insert into `tipos_archivos_multimedia` values (3, 'Favicon');












