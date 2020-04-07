<?php 
    // Pagina que se encarga de la configuracion general del portal
    // Datos de la configuracion del portal de Aerohive
    $usernameRuckus = 'prueba';
    $passwordRuckus = 'prueba';
    // Se extraen los datos de configuracion de BD
    $params = parse_ini_file(sprintf('%s/parameter.ini.dist', __DIR__), true);

    //Se definen las variables globales
    define('RUCKUS_USERNAME', $usernameRuckus);
    define('RUCKUS_PASSWORD', $passwordRuckus);
    //Se definen las variables globales de BD
    define('BD_PARAMETERS', $params);

    //Mostrar errores en produccion
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
?>