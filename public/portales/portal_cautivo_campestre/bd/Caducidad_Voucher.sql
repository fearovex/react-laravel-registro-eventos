use portal_oxohotel; 
DROP TABLE if exists caducidad_voucher;
create table caducidad_voucher
(
id int not null auto_increment,
nombre varchar(100),
PRIMARY KEY (id)
);

insert into caducidad_voucher VALUES(1,'No Expira'),(2,'Expira'),(3,'Activar Una Vez Usado');
alter table vouchers  ADD dias_disponibles INT NOT NULL,  ADD horas_disponibles INT NOT NULL,  ADD minutos_disponibles INT NOT NULL, ADD id_caducidad INT NOT NULL;
insert into portal_oxohotel.diccionario (name_column,alias_column) VALUES('apellidos', 'Apellidos'),('razon_visita', 'Razon Visita'),('num_voucher', 'Numero de Vouchers'); 

#DELETE vouchers FROM vouchers; #Elimina todos los vouchers creados;

#---------------------------------------------------------------------------------------------------


use unicentro;

DROP TABLE if exists caducidad_voucher;
create table caducidad_voucher
(
id int not null auto_increment,
nombre varchar(100),
PRIMARY KEY (id)
);

insert into caducidad_voucher VALUES(1,'No Expira'),(2,'Expira'),(3,'Activar Una Vez Usado');

alter table vouchers  ADD dias_disponibles INT NOT NULL,  ADD horas_disponibles INT NOT NULL,  ADD minutos_disponibles INT NOT NULL, ADD id_caducidad INT NOT NULL;

UPDATE unicentro.campania SET zona_ap=2 WHERE id = 2; 

DELETE vouchers FROM vouchers; #Elimina todos los vouchers creados;

select* from unicentro.campania;