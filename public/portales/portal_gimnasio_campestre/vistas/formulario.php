<?php 
    include_once "../db/campania.class.php";
    include_once "../db/files_campania.class.php";
    include_once "../db/banner_files_campania.class.php";
    include_once "../clases/conexion.class.php";
    include_once '../db/styles_campania.php';
    include_once '../db/terms_conditions_campania.php';


    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if (isset($_REQUEST['i'])) {
        $_SESSION['i'] = $_REQUEST['i'];
        $lang = $_REQUEST['i'];
    } else {
        $lang = $_SESSION["i"]; 
    } 

    include_once("../lang/{$lang}.php");
    
    $campania = new Campania();
    $datosCampania = $campania->GetDatosCampaña();  
    $id_campania = $campania->GetIdCampania();
    $fileCampania = new FilesCampania(); 
    $stylesCampania = new StylesCampania();
    $styles = $stylesCampania->GetStylesCampania($id_campania);
    $termConditions = new TermsConditionsCampania();
    $terms = $termConditions->GetTermsConditionsCampania($id_campania);
    $bannerFilesCampania = new BannerFilesCampania(); 
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />      
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=$styles->title_portal ? $styles->title_portal : $lang['titulo_form'];?></title>   
    <link rel="stylesheet" href="../vendor/flag-icon/flag-icon.css"> 
    <link rel="stylesheet" href="../vendor/flag-icon/flag-icon.min.css"> 
    <link rel="stylesheet" href="../vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/formulario.css">
    <link rel="stylesheet" href="../css/terminos_condiciones.css">

    <script src="../vendor/jquery/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../vendor/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="../vendor/slick/slick-theme.css"/>  
    <link rel="stylesheet" href="../css/banner.css">
    <link rel="stylesheet" href="../css/bannerPatr.css">
     
    
</head>
<style>
    html {
        background-image: url(<?=$fileCampania->GetSRCBackgroundImage($id_campania)?>);
    }  
    
    .img-logo {
        width: <?=$styles->width_logo_movil?>;
        margin: <?=$styles->margin_logo_movil?>;
    }

    .title {
        color: <?=$styles->color_title_portal?>  !important;
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
</style>
<body>
    <div class="selector-idioma">
        <?php if ($lang['lang'] == 'es'){ ?>
            <div class="icono-idioma">
                <a href="../vistas/formulario.php?i=en"><img src="../vendor/flag-icon/flags/4x3/us.svg" alt=""></a>
                <span>EN</span>
            </div>
        <?php } else { ?>
            <div class="icono-idioma">
                <a href="../vistas/formulario.php?i=es"><img src="../vendor/flag-icon/flags/4x3/es.svg" alt=""></a>
                <span>ES</span>
            </div>
        <?php } ?>
       
    </div>

    <div class="container">
        <div class="row h-100">
            <div class="col-sm-12 my-auto">

            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <!-- <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div> -->
                        <div class="modal-body">
                            <div class="slider">
                                <div class="slide-track">

                                <?php
                                    foreach ($bannerFilesCampania->GetSRCBannerList($id_campania) as $key => $value) {                                   
                                        echo '
                                            <div class="slide">
                                                <img src="'.$value->srcImgWeb.'" height="165" width="250" alt="" />
                                            </div>
                                        ';
                                    }
                                ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
                <div class="card"> 
                    <div class="logo">                        
                        <img class="img-logo" src="<?=$fileCampania->GetSRCIconImageSRC($id_campania)?>" alt="">
                        <p class="title"><?=$styles->title_portal ? $styles->title_portal : $lang['titulo_form'];?></p>
                    </div>

                    <form class="formulario"  action="">
                        <input type="hidden" name="os" id="os"> 
                        <input type="hidden" name="lang" id="lang" value="<?=$lang['lang']?>"> 
                        
                        <?php 
                            // Se valida que exista el campo nombre y apellidos en los datos de la campania, si existe se muestra el contenido html. 
                           
                            // Se valida que exista el campo voucher en los datos de la campania, si existe se muestra el contenido html. 
                            if (isset($datosCampania['numero_documento']) && isset($datosCampania['numero_documento'])) {
                                echo '
                                <div class="form-group" id="form_group_numero_documento" name="form_group_numero_documento">
                                    <input type="text" onkeyup="dropInvalidCharactersNumDocumento()" required autocomplete="off" class="form-control form-control-sm" id="numero_documento" name="numero_documento" onfocus="restaurarInputNumeroDocumento()" placeholder="'.$lang['documento_form'].'">
                                    <span id="errorMSGNumeroDocumento"></span>
                                </div>
                                ';
                            }
                        ?>

                        <div class="form-group check-terminos" id="form_group_check" name="form_group_check">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitches" name="customSwitches" required onclick="restaurarInputCheck()">
                                <label class="custom-control-label" for="customSwitches">
                                    <a href="#popup"><?= $lang['terminos_link'];?></a>
                                </label>
                            </div>
                            <span id="errorMSGCheck"></span>
                        </div>
                        <!-- <div class="container-carrusel mb-2">
                            <div class="slider carrousel" >
                                <?php
                                    foreach ($bannerFilesCampania->GetSRCBannerList($id_campania) as $key => $value) {                                   
                                        echo '
                                            <div class="banner-img">
                                                <picture>
                                                    <source srcset="'.$value->srcImgWeb.'" />                                
                                                    <img src="'.$value->srcImgMovil.'" />
                                                </picture>                                            
                                            </div>
                                        ';
                                    }
                                ?>
                            </div>
                        </div> -->
                        <div class="form-btn">
                            <button type="submit" id="submit" class="btn btn-conect"><?= $lang['btn_continuar'];?></button>
                        </div>                           
                    </form>
                    

                    <div class="footer">
                        <div class="page-footer font-small">
                            <!-- Copyright -->
                            <div class="footer-copyright text-center py-3">
                                Powered by <a href="https://ipwork.com.co/"> IPwork</a> (C) Copyright 2019
                            </div>
                            <!-- Copyright -->
                        </div>
                    </div>
                </div>
            </div>                        
        </div>
    </div> 
    
    <div class="popup" id="popup">
        <div class="popup-inner">
            <div class="popup__text">
                <div id="incluirTerminosCondiciones_es" class="container_terminos">
                        <div class="logo_terminos">
                            <img src="<?=$fileCampania->GetSRCIconImageSRC($id_campania)?>" alt="">
                        </div>
                        <?php 
                            if ($lang['lang'] == 'es') {
                                echo $terms->terms_conditions_es;
                            } else {
                                echo $terms->terms_conditions_en;
                            }
                        ?>
                </div>              
            </div>
            <a class="popup__close" href="#">X</a>
        </div>
    </div>
    <script src="../js/formulario.js"></script>
    <script type="text/javascript" src="../vendor/jquery/jquery-3.2.1.min.js"></script> 
    <script type="text/javascript" src="../vendor/slick/slick.min.js"></script>
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="../js/slidertest.js"></script>
</body>
</html>