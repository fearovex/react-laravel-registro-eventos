<?php
    include_once 'db.class.php';
    include_once 'config.php';    

    class Habitacion extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = 'habitaciones',
            $pk = 'id';

        public function validateHabitacion($habitacion = '') {
            $habitacion = $this::retrieveBynum_habitacion($habitacion, Orm::FETCH_ONE);
         
            if(isset($habitacion)) {
                return true;
            } else  {
                return false;
            }            
        }

    }