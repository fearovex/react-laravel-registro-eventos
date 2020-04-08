<?php

    class Ruckus {
        //Atributos
        public $ip_nbi ;
        public $zd_ip;
        public $ip_ap;
        public $mac_ap;
        public $mac_cliente;
        public $ip_cliente;
        public $ssid;
        public $sshTunnelStatus;
        public $url;
        public $proxy;
        public $tecnologia;
        
        public $dataValidation;
        public $ruckusTechology;

        private $username = '';
        private $password = '';

        function __construct() {              
        }

        function init($params) {
            $this->tecnologia = 'Ruckus';
            switch ($this->CheckRuckusTechnology($params)) {
                case 'SZ':
                    if($this->ValidateSZParametersURL($params)) {
                        $this->SetParametersSZSession();
                    } 
                    break;
                case 'ZD':
                    if($this->ValidateZDParametersURL($params)) {
                        $this->SetParametersZDSession();
                    } 
                    break;                
                default:
                    $this->dataValidation = false;
                    break;
            }  
        }

        function CheckRuckusTechnology($params) {
            if (!isset($params['nbiIP'])) {
                //Es Zone Director o es un AP Unleashed
                $this->ruckusTechology = 'ZD';
                return $this->ruckusTechology ;
            } else {
                //Utiliza controladora
                $this->ruckusTechology = 'SZ';
                return $this->ruckusTechology;
            }
        }

        function ValidateSZParametersURL($params) {
            $this->dataValidation = true;
            if (!isset($params['nbiIP'])) {
                $this->dataValidation = false;
                $this->ip_nbi = '';
            } else {
                $this->ip_nbi = $params['nbiIP'];
            }  
            if (!isset($params['sip'])) {
                $this->dataValidation = false;
                $this->zd_ip = '';
            } else {
                $this->zd_ip = $params['sip'];
            }  
            if (!isset($params['apip'])) {
                $this->dataValidation = false;
                $this->ip_ap = '';
            } else {
                $this->ip_ap = $params['apip'];
                
            } 
            if (!isset($params['mac'])) {
                $this->dataValidation = false;
                $this->mac_ap = '';
            } else {
                $this->mac_ap = $params['mac'];
            }  
            if (!isset($params['client_mac'])) {
                $this->dataValidation = false;
                $this->mac_cliente = '';
            } else {
                $this->mac_cliente = $params['client_mac'];
            } 
            if (!isset($params['uip'])) {
                $this->dataValidation = false;
                $this->ip_cliente = '';
            } else {
                $this->ip_cliente = $params['uip'];
            }    
            if (!isset($params['ssid'])) {
                $this->dataValidation = false;
                $this->ssid = '';
            } else {
                $this->ssid = $params['ssid'];
            } 
            if (!isset($params['sshTunnelStatus'])) {
                $this->dataValidation = false;
                $this->sshTunnelStatus = '';
            } else {                 
                $this->sshTunnelStatus = $params['sshTunnelStatus'];
            }  
            if (!isset($params['url'])) {
                $this->dataValidation = false;
                $this->url = '';
            } else {
                $this->url = $params['url'];
            }    
            if (!isset($params['proxy'])) {
                $this->dataValidation = false;
                $this->proxy = '';
            } else {
                $this->proxy = $params['proxy'];
            }  
            return $this->dataValidation;
        }

        function ValidateZDParametersURL($params) {
            $this->dataValidation = true;
            if (!isset($params['sip'])) {
                $this->dataValidation = false;
            } else {
                $this->ip_ap = $params['sip'];
            }  
            if (!isset($params['mac'])) {
                $this->dataValidation = false;
            } else {
                $this->mac_ap = $params['mac'];
            }  
            if (!isset($params['client_mac'])) {
                $this->dataValidation = false;
            } else {
                $this->mac_cliente = $params['client_mac'];
            } 
            if (!isset($params['uip'])) {
                $this->dataValidation = false;
            } else {
                $this->ip_cliente = $params['uip'];
            }    
            if (!isset($params['ssid'])) {
                $this->dataValidation = false;
            } else {
                $this->ssid = $params['ssid'];
            } 
            return $this->dataValidation;
        }

        function SetParametersZDSession() {
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }           
       
            $_SESSION['tecnologia'] = $this->tecnologia;
            $_SESSION['tipo_tecnologia'] = $this->ruckusTechology;
            $_SESSION['ip_ap'] = $this->ip_ap;
            $_SESSION['mac_ap'] = $this->mac_ap;
            $_SESSION['mac_cliente'] = $this->mac_cliente;
            $_SESSION['ip_cliente'] = $this->ip_cliente;
            $_SESSION['ssid'] = $this->ssid;
        }

        function SetParametersSZSession() {
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }

            $_SESSION['tecnologia'] = $this->tecnologia;
            $_SESSION['tipo_tecnologia'] = $this->ruckusTechology;
            $_SESSION['ip_nbi'] = $this->ip_nbi;
            $_SESSION['zd_ip'] = $this->zd_ip;
            $_SESSION['ip_ap'] = $this->ip_ap;
            $_SESSION['mac_ap'] = $this->mac_ap;
            $_SESSION['mac_cliente'] = $this->mac_cliente;
            $_SESSION['ip_cliente'] = $this->ip_cliente;
            $_SESSION['ssid'] = $this->ssid;
            $_SESSION['sshTunnelStatus'] = $this->sshTunnelStatus;
            $_SESSION['url'] = $this->url;
            $_SESSION['proxy'] = $this->proxy;
        }

        function GetFormConnection() {
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }    
            $tipo_tecnologia = $_SESSION['tipo_tecnologia']; 

            switch ($tipo_tecnologia) {
                case 'ZD':
                    $port = '9997';
                    $client_mac = $_SESSION['mac_cliente'];
                    $uip = $_SESSION['ip_cliente'];                                    
                    $url = 'http://'.$_SESSION['ip_ap'].':'.$port.'/login';
                    $username = $_SESSION['username'];
                    $password = $_SESSION['password'];
                    return '                        
                        action="'.$url.'" method="POST">
                            <input type="hidden" name="uip" value="'.$uip.'">
                            <input type="hidden" name="client_mac" value="'.$client_mac.'">
                            <input type="hidden" name="username" value="'.$username.'">
                            <input type="hidden" name="password" value="'.$password.'">
                    ';
                    break;
                case 'SZ':
                    $port = '9997';
                    $client_mac = $_SESSION['mac_cliente'];
                    $uip = $_SESSION['ip_cliente'];
                    $proxy = $_SESSION['proxy'];                    
                    $url = 'http://'.$_SESSION['zd_ip'].':'.$port.'/SubscriberPortal/hotspotlogin'; 
                    $username = $_SESSION['username'];
                    $password = $_SESSION['password'];
                    return ' 
                        action="'.$url.'" method="POST">
                            <input type="hidden" name="proxy" value="'.$proxy.'">
                            <input type="hidden" name="uip" value="'.$uip.'">
                            <input type="hidden" name="client_mac" value="'.$client_mac.'">
                            <input type="hidden" name="username" value="'.$username.'">
                            <input type="hidden" name="password" value="'.$password.'">                            
                    ';
                    break;
                default:
                    return '';
                    break;
            }       
        }
    }
?>