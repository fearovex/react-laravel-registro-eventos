


DELETE t1 FROM Coworking t1
INNER JOIN Coworking t2 
WHERE 
    t1.id < t2.id AND 
    t1.nombre = t2.nombre and
    t1.apellidos = t2.apellidos;
    
DELETE t1 FROM Coworking t1
INNER JOIN Coworking t2 
WHERE 
    t1.id < t2.id AND 
    t1.mac_cliente = t2.mac_cliente;



DELETE t1 FROM Gammer t1
INNER JOIN Gammer t2 
WHERE 
    t1.id < t2.id AND 
    t1.nombre = t2.nombre and
    t1.apellidos = t2.apellidos;
    
DELETE t1 FROM Gammer t1
INNER JOIN Gammer t2 
WHERE 
    t1.id < t2.id AND 
    t1.mac_cliente = t2.mac_cliente ;

use unicentro;
delete from Coworking where CHAR_LENGTH(nombre) < 3;
delete from Coworking where CHAR_LENGTH(apellidos) < 3;
delete from Coworking where os = '';
delete from Coworking where ssid = 'Test_R';
delete from Coworking where mac_cliente = '';

delete from Gammer where CHAR_LENGTH(nombre) < 3; 
delete from Gammer where CHAR_LENGTH(apellidos) < 3;
delete from Gammer where os = '';
delete from Gammer where ssid = 'Test_R';
delete from Gammer where mac_cliente = '';

delete from portal_cautivo_habitaciones where CHAR_LENGTH(nombre) < 3;
delete from portal_cautivo_habitaciones where CHAR_LENGTH(apellidos) < 3;
delete from portal_cautivo_habitaciones where os = '';
delete from portal_cautivo_habitaciones where ssid = 'Portal_Captive';
delete from portal_cautivo_habitaciones where mac_cliente = '';









