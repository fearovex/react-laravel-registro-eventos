<?php
    include_once 'db.class.php';    
    include_once '../clases/utilidades.class.php';
    include_once 'config.php';

    class TiposArchivosMultimedia extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'tipos_archivos_multimedia',
            $pk = 'id';   

    }