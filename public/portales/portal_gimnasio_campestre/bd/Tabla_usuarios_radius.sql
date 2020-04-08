use portal_oxohotel;
DROP TABLE if exists users_radius;
create table users_radius
(
	id int not null auto_increment,
	id_campania int not null, 
    id_cliente int not null,
	username varchar(100) not null,
	password varchar(100) not null,
	fecha_creacion datetime not null,
	PRIMARY KEY (id)
);

use unicentro;
DROP TABLE if exists users_radius;
create table users_radius
(
	id int not null auto_increment,
    id_campania int not null, 
    id_cliente int not null,
	username varchar(100) not null,
	password varchar(100) not null,
	fecha_creacion datetime not null,
	PRIMARY KEY (id)
);








