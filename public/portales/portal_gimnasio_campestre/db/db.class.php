<?php 
    include_once('config.php') ;
    include_once('orm.class.php');

    $params = BD_PARAMETERS;

    $conn = new mysqli($params['database']['host'], $params['database']['user'], $params['database']['password']);

    if ($conn->connect_error)
        die(sprintf('Unable to connect to the database. %s', $conn->connect_error));

    // Tell SimpleOrm to use the connection you just created.
    Orm::useConnection($conn, $params['database']['name']);