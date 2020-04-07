<?php
    include_once "../../db/files_campania.class.php";
    include_once "../../db/banner_files_campania.class.php";
    include_once "../../db/campania.class.php";
    include_once "../../clases/utilidades.class.php";

    $action = $_REQUEST['action'];
    //Agregamos los archivos multimedia
    if ($action == 1) {
        $arrayFiles = array();
        $arrayBannerFiles = array();
    
        if(isset($_FILES['background'])) {
            if($_FILES['background']['error'] == 0) {
                $arrayFileBackground = $_FILES['background'];
                $arrayFileBackground['id_tipo_archivo'] = '1';
                array_push($arrayFiles, $arrayFileBackground);
            }
        }
        if(isset($_FILES['logo'])) {
            if($_FILES['logo']['error'] == 0) {
                $arrayFileLogo = $_FILES['logo'];
                $arrayFileLogo['id_tipo_archivo'] = '2';
                array_push($arrayFiles, $arrayFileLogo);
            }   
        }
        if(isset($_FILES['favicon'])) {
            if($_FILES['favicon']['error'] == 0) {
                $arrayFileFavicon = $_FILES['favicon'];
                $arrayFileFavicon['id_tipo_archivo'] = '3';
                array_push($arrayFiles, $arrayFileFavicon);
            }   
        }
        //Banner 1
        if(isset($_FILES['banner_1_web']) && isset($_FILES['banner_1_movil'])) {
            if($_FILES['banner_1_web']['error'] == 0 && $_FILES['banner_1_movil']['error'] == 0) {
                $fileBannerWeb = (object)$_FILES['banner_1_web']; 
                $fileBannerMovil = (object)$_FILES['banner_1_movil']; 
                $arrayFileBanner = array();
                $arrayFileBanner['nombre_img_web'] = $fileBannerWeb->name;
                $arrayFileBanner['mime_img_web'] =  $fileBannerWeb->type;
                $arrayFileBanner['tamano_img_web'] =  $fileBannerWeb->size;
                $arrayFileBanner['datos_img_web'] = file_get_contents($fileBannerWeb->tmp_name);
                $arrayFileBanner['nombre_img_movil'] = $fileBannerMovil->name;
                $arrayFileBanner['mime_img_movil'] = $fileBannerMovil->type;
                $arrayFileBanner['tamano_img_movil'] = $fileBannerMovil->size;
                $arrayFileBanner['datos_img_movil'] = file_get_contents($fileBannerMovil->tmp_name);

                array_push($arrayBannerFiles, (object)$arrayFileBanner);
            }   
        }
        //Banner 2
        if(isset($_FILES['banner_2_web']) && isset($_FILES['banner_2_movil'])) {
            if($_FILES['banner_2_web']['error'] == 0 && $_FILES['banner_2_movil']['error'] == 0) {
                $fileBannerWeb = (object)$_FILES['banner_2_web']; 
                $fileBannerMovil = (object)$_FILES['banner_2_movil']; 
                $arrayFileBanner = array();
                $arrayFileBanner['nombre_img_web'] = $fileBannerWeb->name;
                $arrayFileBanner['mime_img_web'] =  $fileBannerWeb->type;
                $arrayFileBanner['tamano_img_web'] =  $fileBannerWeb->size;
                $arrayFileBanner['datos_img_web'] = file_get_contents($fileBannerWeb->tmp_name);
                $arrayFileBanner['nombre_img_movil'] = $fileBannerMovil->name;
                $arrayFileBanner['mime_img_movil'] = $fileBannerMovil->type;
                $arrayFileBanner['tamano_img_movil'] = $fileBannerMovil->size;
                $arrayFileBanner['datos_img_movil'] = file_get_contents($fileBannerMovil->tmp_name);

                array_push($arrayBannerFiles, (object)$arrayFileBanner);
            }   
        }
        //Banner 3
        if(isset($_FILES['banner_3_web']) && isset($_FILES['banner_3_movil'])) {
            if($_FILES['banner_3_web']['error'] == 0 && $_FILES['banner_3_movil']['error'] == 0) {
                $fileBannerWeb = (object)$_FILES['banner_3_web']; 
                $fileBannerMovil = (object)$_FILES['banner_3_movil']; 
                $arrayFileBanner = array();
                $arrayFileBanner['nombre_img_web'] = $fileBannerWeb->name;
                $arrayFileBanner['mime_img_web'] =  $fileBannerWeb->type;
                $arrayFileBanner['tamano_img_web'] =  $fileBannerWeb->size;
                $arrayFileBanner['datos_img_web'] = file_get_contents($fileBannerWeb->tmp_name);
                $arrayFileBanner['nombre_img_movil'] = $fileBannerMovil->name;
                $arrayFileBanner['mime_img_movil'] = $fileBannerMovil->type;
                $arrayFileBanner['tamano_img_movil'] = $fileBannerMovil->size;
                $arrayFileBanner['datos_img_movil'] = file_get_contents($fileBannerMovil->tmp_name);

                array_push($arrayBannerFiles, (object)$arrayFileBanner);
            }   
        }
        //Banner 4
        if(isset($_FILES['banner_4_web']) && isset($_FILES['banner_4_movil'])) {
            if($_FILES['banner_4_web']['error'] == 0 && $_FILES['banner_4_movil']['error'] == 0) {
                $fileBannerWeb = (object)$_FILES['banner_4_web']; 
                $fileBannerMovil = (object)$_FILES['banner_4_movil']; 
                $arrayFileBanner = array();
                $arrayFileBanner['nombre_img_web'] = $fileBannerWeb->name;
                $arrayFileBanner['mime_img_web'] =  $fileBannerWeb->type;
                $arrayFileBanner['tamano_img_web'] =  $fileBannerWeb->size;
                $arrayFileBanner['datos_img_web'] = file_get_contents($fileBannerWeb->tmp_name);
                $arrayFileBanner['nombre_img_movil'] = $fileBannerMovil->name;
                $arrayFileBanner['mime_img_movil'] = $fileBannerMovil->type;
                $arrayFileBanner['tamano_img_movil'] = $fileBannerMovil->size;
                $arrayFileBanner['datos_img_movil'] = file_get_contents($fileBannerMovil->tmp_name);

                array_push($arrayBannerFiles, (object)$arrayFileBanner);
            }   
        }  
    
        $campania = new Campania();
        $id_campania = $campania->GetIdCampania();
    
        $utilidades = new Utilidades();
        $today = $utilidades->getDatetimeNow();
      
        foreach ($arrayFiles as $key => $value) {
            $file = (object)$value;            
            $file_campania =  new FilesCampania();
            $file_campania->id_campania = (int)$id_campania ;
            $file_campania->id_tipo_archivo_multimedia = $file->id_tipo_archivo;
            $file_campania->nombre = $file->name;
            $file_campania->mime = $file->type;
            $file_campania->tamano = $file->size;
            $file_campania->datos = file_get_contents($file->tmp_name);
            $file_campania->fecha_creacion = $today;
            $file_campania->estado = true;
            $file_campania->save();
        }

        foreach ($arrayBannerFiles as $key => $value) {
            $banner_file_campaña = new BannerFilesCampania();
            $banner_file_campaña->id_campania = (int)$id_campania;
            $banner_file_campaña->nombre_img_web = $value->nombre_img_web;
            $banner_file_campaña->mime_img_web = $value->mime_img_web;
            $banner_file_campaña->tamano_img_web = $value->tamano_img_web;
            $banner_file_campaña->datos_img_web = $value->datos_img_web;
            $banner_file_campaña->nombre_img_movil = $value->nombre_img_movil;
            $banner_file_campaña->mime_img_movil = $value->mime_img_movil;
            $banner_file_campaña->tamano_img_movil = $value->tamano_img_movil;
            $banner_file_campaña->datos_img_movil = $value->datos_img_movil;
            $banner_file_campaña->estado = true;
            $banner_file_campaña->fecha_creacion = $today;
            $banner_file_campaña->save();
        }
       
    
        echo 'Hecho';
    }
    
    //Eliminamos el archivo de multimedia
    if ($action == 2) {
        $file_campania =  new FilesCampania();
        $file_campania->id = $_REQUEST['id'];
        $file_campania->delete();
    }
    //Eliminamos elemento del banner
    if ($action == 3) {
        $banner_file_campaña =  new BannerFilesCampania();
        $banner_file_campaña->id = $_REQUEST['id'];
        $banner_file_campaña->delete();
    }


   
?>
 