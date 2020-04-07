<?php 
    include_once '../clases/utilidades.class.php';
    include_once '../db/users_radius.class.php';
    include_once '../db/config.php';

    class Radius {
        public function AddUser($campania) {
            $params = BD_PARAMETERS;

            $active         = 'active';
            $cap_data       = 'soft';
            $language       = '4_4';
            //No se que es
            $parent_id      = 0;
            //Este es el id del perfil con el que se crea el usuario, el perfil es el tiempo de conexion establecido en este caso es 1G-1Day y su id es 15
            $profile_id     = $params['radius']['profile_id'];
            //Es el id del realm en el caso de IPFI se creo con el id 37
            $realm_id       = $params['radius']['realm_id'];;
            //Token obtenido en la tabla usuarios de base de datos del usuario root
            $token          = $params['radius']['token'];

            $ramdomUser = $this->CreateRandomUser();

            $username = $ramdomUser;
            $password = $ramdomUser;

            //URL donde esta el radiusdesk
            $url = $params['radius']['url'].'/cake2/rd_cake/permanent_users/add.json';
            
            // The data to send to the API
            $postData = array(
                'active'        => $active,
                'cap_data'      => $cap_data,
                'language'      => $language,
                'parent_id'     => $parent_id,
                'profile_id'    => $profile_id,
                'realm_id'      => $realm_id,
                'token'         => $token,
                'username'      => $username,
                'password'      => $password,
                'name'          => $campania->nombre,
                'surname'       => $campania->apellidos
            );
            
            // Setup cURL
            $ch = curl_init($url);
            curl_setopt_array($ch, array(
            
                CURLOPT_POST            => TRUE,
                CURLOPT_RETURNTRANSFER  => TRUE,
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json'
                ),
                CURLOPT_POSTFIELDS => json_encode($postData)
            ));
            
            // Send the request
            $response = curl_exec($ch);
            
            // Check for errors
            if($response === FALSE){
                return false;
            } else {
                //Agregamos los datos del usuario en radius
                $user_radius = new UsersRadius();           
                if ($user_radius->SaveDataUserRadius($ramdomUser, $campania)) {
                    return true;
                } else {
                    return false;
                }
            } 
        }

        function CreateRandomUser() {
            $utilidades = new Utilidades(); 
            $randomValue = $utilidades->GetRandomValue();
            $users_radius = new UsersRadius();
            $user = $users_radius::retrieveByusername($randomValue, Orm::FETCH_ONE);
            if (isset($user )) {
                $this->CreateRandomUser();   
            } else {
                return $randomValue;
            }
        }
    }

    
?>