<?php 
    include_once('./db/campania.class.php');
    include_once('./db/voucher.class.php');

    class ValidadorCliente {
        public $clienteValido;
        public $clienteNuevo;
        public $error;
        private $mac_cliente;

        function __construct($mac_cliente)
        {
            $this->mac_cliente = $mac_cliente;
            $this->ValidarCliente();
        }   

        function ValidarCliente() {
            //Validacion si existe o no el cliente que ingresa al portal cautivo
            if($this->ValidarExistenciaClienteByMac($this->mac_cliente)) {                
                //Se pregunta si la campaña pide voucher
                // if ($this->EsClienteConVoucher()) {
                //     if(!$this->ValidarVoucherByMac($this->mac_cliente)) {
                //         $this->clienteValido = false;    
                //         $this->error = 'error_voucher_expiration';                     
                //     } 
                // }
                $this->SetUserPasswordSession($this->mac_cliente);
                $this->clienteValido = true;
                $this->clienteNuevo = false;              

            } else {
                $this->clienteValido = true;
                $this->clienteNuevo = true;
            }            
        }

        function ValidarExistenciaClienteByMac($mac_cliente) {
            $campania = new Campania();
            return $campania->ValidateExistClientByMac($mac_cliente);
        }

        function SetUserPasswordSession($mac_cliente) {
            $campania = new Campania();   
            $username = $campania->GetUserRadius($mac_cliente);

            if (!empty($username)) {
                if (session_status() == PHP_SESSION_NONE) {
                    session_start();
                }
                
                $_SESSION['username'] = $username;
                $_SESSION['password'] = $username;                
            }           
        }

        function EsClienteConVoucher() {
            $campania = new Campania();
            return $campania->EsCampañaConVoucher();
        }

        function ValidarVoucherByMac($mac_cliente) {
            $campania = new Campania();
            $num_voucher = $campania->GetVoucherUserByMac($mac_cliente);
            $voucher = new Voucher();
            return $voucher->ValidateUsedVoucher($num_voucher);            
        }
    }
?>