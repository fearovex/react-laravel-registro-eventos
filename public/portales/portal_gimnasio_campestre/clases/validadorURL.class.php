<?php 
    include_once('ruckus.class.php');

    class ValidadorURL {
        public $urlValida;
        public $macCliente;
        public $error;

        function __construct($requestURL)
        {
            $this->CheckURL($requestURL);
        }

        function CheckURL($requestURL) {
            $url = parse_url($requestURL);
            parse_str($url['query'], $params);
            //Por el momento solo existe Ruckus 
            $params['type'] = 'Ruckus';
            if (isset($params['type'])) {
                $this->urlValida = $this->SetParametersURL($params);
            } else {
                $this->urlValida = false;
                $this->error = 'error_technology';
            }
        }

        function SetParametersURL($params) {
            switch ($params['type']) {
                case 'Ruckus':
                    $objeto = new Ruckus();
                    $objeto->init($params);
                    if ($objeto->dataValidation) {
                        $this->macCliente = $objeto->mac_cliente;
                        return true;
                    } else {
                        $this->error = 'error_url';
                        return false;

                    }
                    break;
                
                default:
                    $this->error = 'error_default';
                    return false;
                    break;
            }
        }
    }
?>