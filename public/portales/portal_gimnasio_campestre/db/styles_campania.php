<?php
    include_once 'db.class.php';  
    include_once 'config.php';

    class StylesCampania extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'styles_campania',
            $pk = 'id'; 
            
        public function GetStylesCampania($id_campania = '') {
            $sql = "SELECT * FROM :table WHERE id_campania = '$id_campania'";
            $stylesCampania = $this::sql($sql, Orm::FETCH_ONE);
            return $stylesCampania;
        }
    }