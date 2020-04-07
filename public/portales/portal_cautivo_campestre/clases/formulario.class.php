<?php 
    include_once('utilidades.class.php');
    include_once('../db/users_register.class.php');
    include_once('../db/habitacion.class.php');
    include_once('../db/campania.class.php');
    include_once('../clases/radius.class.php');

    class Formulario {
        
        private $dataFormulario;
        private $dataWIFI;
        private $arrayElementsForm;

        private $utilidades;

        function __construct($formRequest)
        { 
            $this->InitializeVariables();   
            $this->SetFormElements($formRequest);
            $this->SetDataWifi();
        }

        public function GetDataForm() {
            return (object)$this->dataFormulario;
        }

        public function GetDataWIFI() {
            return (object)$this->dataWIFI;
        }

        public function SaveDataForm() {
            $dataClient = $this->GetDataCLient();           
            $campania = new Campania();
            // $voucher = new Voucher();
            
            // if(isset($dataClient['num_voucher'])) {
            //     $voucher->UpdateVoucherState($dataClient['num_voucher'], $campania->GetCampania());                
            // }
            //Se guardan los datos de la campaña en BD
            if($campania->SaveDataClient($dataClient)){
                $radius = new Radius();    
                if (!$this->ExistUserRadius($dataClient)) {

                    if($radius->AddUser($campania)) {
                        return true;
                    } else {
                        return false;
                    } 
                } else {
                    return true;
                } 
            } else {
                return false;
            }        
        }

        function ExistUserRadius($dataClient) {
            $campania = new Campania();
            if (array_key_exists('num_voucher', $dataClient)) {                
                return $campania->ValidateExistUserRadiusByVoucher($dataClient['num_voucher']);
            } else if (array_key_exists('email', $dataClient)) {
                return $campania->ValidateExistUserRadiusByEmail($dataClient['email']);
            }
            else if (array_key_exists('numero_documento', $dataClient)) {
                return $campania->ValidateExistUserRadiusByDocument($dataClient['numero_documento']);
            }
            else {
                return false;
            }
        }
        
        function GetDataCLient() {
            $dataCLient = array();
            foreach ($this->arrayElementsForm as $formElement) {
                $dataClient[$formElement] = $this->dataFormulario[$formElement];
            }

            foreach ($this->dataWIFI as $key => $value) {
                $dataClient[$key] = $value;
            }

            return $dataClient;
        }

        function SetDataWifi() {
             //Datos de que suministra el AP
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }

            $this->dataWIFI['ip_ap'] = isset($_SESSION['ip_ap']) ? trim($_SESSION['ip_ap']) : '';   
            $this->dataWIFI['mac_ap'] = isset($_SESSION['mac_ap']) ? trim($_SESSION['mac_ap']) : '';  
            $this->dataWIFI['mac_cliente'] = isset($_SESSION['mac_cliente']) ? trim($_SESSION['mac_cliente']) : '';  
            $this->dataWIFI['ip_cliente'] = isset($_SESSION['ip_cliente']) ? trim($_SESSION['ip_cliente']) : '';  
            $this->dataWIFI['ssid'] = isset($_SESSION['ssid']) ? trim($_SESSION['ssid']) : '';
        }

        function InitializeVariables() {
            $this->utilidades = new Utilidades();
            $this->dataFormulario = array();
            $this->dataWIFI = array();
            $this->arrayElementsForm = array();
            $this->dataFormulario['errorFormulario'] = false;  
        }

        function SetFormElements($formRequest) {   
            foreach ($formRequest as $key => $value) {
                
                if ($key == 'numero_documento') {
                    array_push($this->arrayElementsForm, $key);
                    $numero_documento = $value;
                    $this->dataFormulario['numero_documento'] = $numero_documento;
                    $this->ValidateNumDocument($numero_documento);
                }
                if ($key == 'os') {  
                    array_push($this->arrayElementsForm, $key);                  
                    $os = $value;
                    $this->dataFormulario['os'] = $os;
                    $this->ValidateSistemaOperativo($os);
                }
                //Datos que se omiten al guardar la informacion
                if ($key == 'check') {
                    $check = $value;
                    $this->ValidateTerminosCondiciones($check);
                }
            }  
        }
    
        function ValidateNumDocument($numero_documento) {            
            $document = new UsersRegister();
            $campania = new Campania();        
            if(empty($numero_documento)) {
                $this->dataFormulario['errorMSGNumeroDocumento'] =  'error_numero_documento_vacio';
                $this->dataFormulario['errorNumeroDocumento'] = true;
                $this->dataFormulario['errorFormulario'] = true;
            } else {
                if (!$document->validateExistNumeroDocumento($numero_documento, $campania->GetIdCampania())) {
                    $this->dataFormulario['errorMSGNumeroDocumento'] =  'error_numero_documento_existencia';
                    $this->dataFormulario['errorNumeroDocumento'] = true;
                    $this->dataFormulario['errorFormulario'] = true;
                }else if (strlen($numero_documento) <= 7) {
                    $this->dataFormulario['errorMSGNumeroDocumento'] =  'error_numero_documento_min_longitud';
                    $this->dataFormulario['errorNumeroDocumento'] = true;
                    $this->dataFormulario['errorFormulario'] = true;
                } else if (strlen($numero_documento) > 12) {
                    $this->dataFormulario['errorMSGNumeroDocumento'] =  'error_numero_documento_max_longitud';
                    $this->dataFormulario['errorNumeroDocumento'] = true;
                    $this->dataFormulario['errorFormulario'] = true;
                } else {
                    $this->dataFormulario['errorMSGNumeroDocumento'] = '';
                    $this->dataFormulario['errorNumeroDocumento'] = false;
                }
            }           

            $this->dataFormulario['numero_documento'] = $numero_documento;             
        }

       
    
        function ValidateTerminosCondiciones($check) {      
            if ($check == 'false') {
                $this->dataFormulario['errorMSGCheck'] =  'error_terminos_condiciones';
                $this->dataFormulario['errorCheck']  = true; 
                $this->dataFormulario['errorFormulario'] = true;
            } else {
                $this->dataFormulario['errorMSGCheck'] =  '';
                $this->dataFormulario['errorCheck']  = false; 
            }

            $this->dataFormulario['check'] = $check;            
        }
    
        function ValidateSistemaOperativo($os) {
            if ($os == '') {
                $this->dataFormulario['os'] = 'Otro';   
            }
        }
    }

?>
