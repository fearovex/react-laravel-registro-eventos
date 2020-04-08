<?php
    include_once 'db.class.php';    
    include_once '../clases/utilidades.class.php';
    include_once 'config.php';

    class Campania extends Orm {

        protected static    
            $database = BD_PARAMETERS['database']['name'],
            $table = BD_PARAMETERS['database']['campania'],
            $pk = 'id';           


        public function validarMac($mac = '') {
            return $this::retrieveBymac_cliente($mac, Orm::FETCH_ONE);
        }

        public function getNameUserByMac($mac = '') {
            $user = $this::retrieveBymac_cliente($mac, Orm::FETCH_ONE);
            if(isset($user)) {
                return $user->nombre;
            } else  {
                return '';
            }            
        }

        public function GetVoucherUserByMac($mac = '') {
            $user = $this::retrieveBymac_cliente($mac, Orm::FETCH_ONE);
            if(isset($user)) {
                return $user->num_voucher;
            } else  {
                return '';
            } 
        }

        public function SaveDataClient($dataClient) {

            $utilidades = new Utilidades();
            $this->id_evento = $this->GetIdCampania();
            $this->fecha_creacion = $utilidades->getDatetimeNow();
           
            if(isset($dataClient['numero_documento'])) {
                $this->numero_documento = $dataClient['numero_documento'];                
            }
            if(isset($dataClient['os'])) {
                $this->os = $dataClient['os'];
            }
            if(isset($dataClient['ip_ap'])) {
                $this->ip_ap = $dataClient['ip_ap'];
            }
            if(isset($dataClient['mac_ap'])) {
                $this->mac_ap = $dataClient['mac_ap'];
            }
            if(isset($dataClient['mac_cliente'])) {
                $this->mac_cliente = $dataClient['mac_cliente'];
            }
            if(isset($dataClient['ip_cliente'])) {
                $this->ip_cliente = $dataClient['ip_cliente'];
            }
            if(isset($dataClient['ssid'])) {
                $this->ssid = $dataClient['ssid'];
            }
           

            try {
                $this->save();
                return true;
            } catch (\Throwable $th) {
                var_dump($th);
                exit;
                return false;
            }
        }

        public function GetUserByMac($mac = '') {
            return $this::retrieveBymac_cliente($mac, Orm::FETCH_ONE);
        } 

        public function ValidateExistUserRadiusByVoucher($voucher) {
            $user = $this::sql("SELECT* FROM :table a inner join users_radius b on a.id = b.id_campania WHERE a.num_voucher = '$voucher'", Orm::FETCH_ONE);
            if (isset($user)) {
                $this->SetUserPassSession($user->username);
                return true;
            } else {
                return false;
            }
        }

        public function ValidateExistUserRadiusByEmail($email) {
            $user = $this::sql("SELECT* FROM :table a inner join users_radius b on a.id = b.id_campania WHERE a.email = '$email'", Orm::FETCH_ONE);
            if (isset($user)) {
                $this->SetUserPassSession($user->username);
                return true;
            } else {
                return false;
            }
        }

        public function ValidateExistUserRadiusByDocument($document) {
            $user = $this::sql("SELECT* FROM :table a inner join users_radius b on a.id = b.id_campania WHERE a.numero_documento = '$document'", Orm::FETCH_ONE);
            if (isset($user)) {
                $this->SetUserPassSession($user->username);
                return true;
            } else {
                return false;
            }
        }

        function SetUserPassSession($randomNumber) {
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            
            $_SESSION['username'] = $randomNumber;
            $_SESSION['password'] = $randomNumber;
        }

        /*Valida si el usuario se ha registrado*/
        public function ValidateExistClientByMac($mac = '') {
            $user = $this::retrieveBymac_cliente($mac, Orm::FETCH_ONE);
            if(isset($user)) {
                return true;
            } else  {
                return false;
            } 
        }

        public function EsCampañaConVoucher() {
            $voucherColumn = $this::sql("SHOW COLUMNS FROM :table where field like 'num_voucher'", Orm::FETCH_ONE);
            if(isset($voucherColumn)) {
                return true;
            } else {
                return false;
            }
        }

        public function GetDatosCampaña() {
            $columnasCampania = $this::sql("select COLUMN_NAME from information_schema.COLUMNS where TABLE_NAME=':table'", Orm::FETCH_MANY);
            $datosCampania = array();
            foreach ($columnasCampania as $value) {
                $datosCampania[$value->COLUMN_NAME] = $value->COLUMN_NAME;
            } 
            return $datosCampania;
        }

        public function GetIdCampania() {
            $campania = $this::sql("SELECT* FROM eventos where evento_tabla = ':table'", Orm::FETCH_ONE);
            if(isset($campania)) {
                return $campania->id;
            } else {
                return '0';
            }
        }

        public function GetCampania() {
            $campania = $this::sql("SELECT* FROM eventos where evento_tabla = ':table'", Orm::FETCH_ONE);
            if(isset($campania)) {
                return $campania;
            } else {
                return '0';
            }
        }

        public function GetUserRadius($mac_cliente) {
            $sql = "SELECT* FROM :table a inner join users_radius b on a.id = b.id_cliente where a.mac_cliente = '$mac_cliente'";
            $usuario = $this::sql($sql, Orm::FETCH_ONE);

            if (isset($usuario)) {
                return $usuario->username;
            } else {
                return '';
            }
        }
    }