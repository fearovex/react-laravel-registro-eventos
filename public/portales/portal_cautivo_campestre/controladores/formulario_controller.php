<?php 
    //Se llaman las librerias y clases necesarias
    include_once "../db/campania.class.php";
    include_once "../db/users_register.class.php";
    include_once "../db/habitacion.class.php";
    include_once "../clases/formulario.class.php";
    include_once "../clases/utilidades.class.php";   

     //Datos de que suministra el AP
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $lang = $_SESSION['i']; 
    include_once("../lang/{$lang}.php"); 

    $formulario = new Formulario($_REQUEST);
    $datosFormulario = $formulario->GetDataForm();

    
    if (!$datosFormulario->errorFormulario) {        
        if ($formulario->SaveDataForm()) {
            echo json_encode(['code'=>200]);
            exit;
        } else {            
            //Pendiente Mensaje cuando no guarde los datos
            echo json_encode(['code'=>404]);   
            exit;
        }
    } else {    
        echo json_encode([
            'code'=>404, 
            'errorNumeroDocumento'=>isset($datosFormulario->errorNumeroDocumento) ? $datosFormulario->errorNumeroDocumento : false, 
            'errorCheck' => isset($datosFormulario->errorCheck) ? $datosFormulario->errorCheck : false,
            'errorMSGNumeroDocumento'=>!empty($datosFormulario->errorMSGNumeroDocumento) ? $lang[$datosFormulario->errorMSGNumeroDocumento]: '',
            'errorMSGCheck' => !empty($datosFormulario->errorMSGCheck) ?$lang[$datosFormulario->errorMSGCheck] : ''           
        ]);
    }
?>
