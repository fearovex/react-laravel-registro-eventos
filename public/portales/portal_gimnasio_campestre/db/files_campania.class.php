<?php
    include_once 'db.class.php';  
    include_once 'config.php';

    class FilesCampania extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'files_campania',
            $pk = 'id'; 
            
        public function GetSRCBackgroundImage($id_campania = '') {
            $sql = "SELECT * FROM :table WHERE id_tipo_archivo_multimedia = '1' AND id_campania = '$id_campania'";
            $fileBackground = $this::sql($sql, Orm::FETCH_ONE);
            return '..'.$fileBackground->nombre;
        }

        public function GetSRCIconImageSRC($id_campania = '') {
            $sql = "SELECT * FROM :table WHERE id_tipo_archivo_multimedia = '2' AND id_campania = '$id_campania'";
            $fileIcon = $this::sql("$sql", Orm::FETCH_ONE);
            return '..'.$fileIcon->nombre;
        }

        public function GetSRCFavicon($id_campania = '') {
            $sql = "SELECT * FROM :table WHERE id_tipo_archivo_multimedia = '3' AND id_campania = '$id_campania'";
            $fileFavicon = $this::sql("$sql", Orm::FETCH_ONE);
            return '..'.$fileFavicon->nombre;
        }
    }