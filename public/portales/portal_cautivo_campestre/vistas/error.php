<?php
    include_once "../db/files_campania.class.php";
    include_once '../db/styles_campania.php';
    include_once '../db/terms_conditions_campania.php';
    include_once '../db/campania.class.php';

    session_start();
   
    if (isset($_REQUEST['i'])) {
        $_SESSION['i'] = $_REQUEST['i'];
        $lang = $_REQUEST['i'];
    } else {
        $lang = $_SESSION["i"]; 
    }  

    include_once("../lang/{$lang}.php"); 
    
    if (isset($_REQUEST['e']) && $_REQUEST['e'] != "") {
        $error_message_url = $_REQUEST['e'];
        $error_message = $lang[$error_message_url];
    } else {
        $error_message = $lang['error_default'];
    }

    $campania = new Campania();
    $id_campania = $campania->GetIdCampania();
    $fileCampania = new FilesCampania();
    $stylesCampania = new StylesCampania();
    $styles = $stylesCampania->GetStylesCampania($id_campania);
    $termConditions = new TermsConditionsCampania();
    $terms = $termConditions->GetTermsConditionsCampania($id_campania);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=$lang['titulo_website']?></title>   
    <link rel="stylesheet" href="../vendor/flag-icon/flag-icon.css"> 
    <link rel="stylesheet" href="../vendor/flag-icon/flag-icon.min.css"> 
    <link rel="stylesheet" href="../vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/error.css">
</head>
<style>
    html {
        background-image: url(<?=$fileCampania->GetSRCBackgroundImage($id_campania)?>);
    }  
    
    .img-logo {
        width: <?=$styles->width_logo_movil?>;
        margin: <?=$styles->margin_logo_movil?>;
    }


    @media (min-width: 992px) {
        .img-logo {
            width: <?=$styles->width_logo_web?>;
            margin: <?=$styles->margin_logo_web?>;
        }     
    }

    .formulario {    
        background: <?=$styles->container_form_color?>;
        color: <?=$styles->container_form_font_color?>;
    }

    .btn-conect {
        color: <?=$styles->button_font_color?>;
        background-color: <?=$styles->button_background_color?>;
        border-color: <?=$styles->button_border_color?>;
    }

    .btn-conect:hover {
        background-color: <?=$styles->button_hover_background_color?>;
        color: <?=$styles->button_hover_font_color?>;
    }

    .custom-control-input:checked~.custom-control-label::before {
        border-color: <?=$styles->checkbox_terms_border_color?>;
        background-color: <?=$styles->checkbox_terms_background_color?>;
    }

    .msg_error {    
        color: <?=$styles->msg_error_color_font?>;
        background-color: <?=$styles->msg_error_color_background?>;  
    }
</style>
<body>
    <div class="selector-idioma">
        <?php if ($lang['lang'] == 'es'){ ?>
            <div class="icono-idioma">
                <a href="../vistas/error.php?i=en&e=<?=$error_message_url?>"><img src="../vendor/flag-icon/flags/4x3/us.svg" alt=""></a>
                <span>EN</span>
            </div>
        <?php } else { ?>
            <div class="icono-idioma">
                <a href="../vistas/error.php?i=es&e=<?=$error_message_url?>"><img src="../vendor/flag-icon/flags/4x3/es.svg" alt=""></a>
                <span>ES</span>
            </div>
        <?php } ?>       
    </div>
    <div class="container">
        <div class="row h-100">
            <div class="col-sm-12 my-auto">
                <div class="card"> 
                    <div class="logo">
                        <img class="img-logo" src="<?=$fileCampania->GetSRCIconImageSRC($id_campania)?>" alt="">
                        <p class="msg_error"><?=$error_message?></p>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    
    
 
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>    
</body>
</html>