<?php
    include_once 'db.class.php';  
    include_once 'config.php';

    class TermsConditionsCampania extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'terms_conditions_campania',
            $pk = 'id'; 
            
        public function GetTermsConditionsCampania($id_campania = '') {
            $sql = "SELECT * FROM :table WHERE id_campania = '$id_campania'";
            $termsConditions = $this::sql($sql, Orm::FETCH_ONE);
            return $termsConditions;
        }
    }