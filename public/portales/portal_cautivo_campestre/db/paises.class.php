<?php
    include 'db.class.php';  
    include_once 'config.php';  

    class Paises extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'paises',
            $pk = 'id';
    }