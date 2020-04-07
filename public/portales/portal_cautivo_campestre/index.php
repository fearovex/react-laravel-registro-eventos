<?php
    include_once('./controladores/validacion_controller.php');
    include_once('./clases/validadorURL.class.php');
    include_once('./clases/validadorCliente.class.php');
    include_once('./clases/utilidades.class.php');

    if (session_status() == PHP_SESSION_NONE) {
        session_destroy();
        session_start();
    }
    
    $utilidades = new Utilidades();
    $utilidades->DetectLanguage();
    $validacionURL = new ValidadorURL($_SERVER['REQUEST_URI']); 
    if ($validacionURL->urlValida) {
        $validarCliente = new ValidadorCliente($validacionURL->macCliente);
        if ($validarCliente->clienteValido) {
            if($validarCliente->clienteNuevo) {
                header('Location: vistas/formulario.php');
            } else {
                header('Location: vistas/banner.php');
            }
        } else {
            header('Location: vistas/error.php?e='.$validarCliente->error);  
        }
    } else {
        header('Location: vistas/error.php?e='.$validacionURl->error);  
    }
?>  