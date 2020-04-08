<?php
    
    include_once 'db.class.php'; 
    include_once '../clases/utilidades.class.php'; 
    include_once 'config.php';

    class UsersRegister extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'evento_campestre',
            $pk = 'id';


        public function validateExistNumeroDocumento($numero_documento = '', $id_evento = '') {
           
            $sql = "SELECT * FROM :table WHERE numero_documento = '$numero_documento' AND id_evento = '2'";
           
            $document = $this::sql($sql, Orm::FETCH_ONE); 
            if(isset($document)) {
                return true;
            }
            else {
                return false;
            }
        }
    }