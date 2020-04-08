<?php 
    include_once('../../db/files_campania.class.php');
    include_once('../../db/banner_files_campania.class.php');

    $filesCampania= FilesCampania::all();
    $bannerFilesCampania = BannerFilesCampania::all();
?>

<!doctype html>
<html lang="en">
  <head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
        <div class="container">
            <button style="width:100%; margin-top:5%; margin-bottom:5%;"  onclick="window.location.href='../../vistas/multimedia/loadfiles.php'" type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">Agregar Archivos</button>
            <div class="jumbotron" style="text-align:center;">
                <h1 class="display-4">Multimedia de la Campaña</h1>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo Multimedia</th>                        
                        <th>Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    <?php 
                        foreach ($filesCampania as $key => $value) {
                            switch ($value->id_tipo_archivo_multimedia) {
                                case 1:
                                    $tipo_multimedia = 'Background';
                                    break;
                                case 2:
                                    $tipo_multimedia = 'Logo';
                                    break;
                                case 3:
                                    $tipo_multimedia = 'Favicon';
                                    break;
                                default:
                                    $tipo_multimedia = 'Otro';
                                    break;
                            }

                            echo '
                                <tr>
                                    <td scope="row">'.$value->nombre.'</td>
                                    <td>'.$tipo_multimedia.'</td>
                                    <td>
                                        <form name="delete_file" action="../../controladores/multimedia/delete_file.php method="POST">
                                            <input type="hidden" name="id" id="id" value="'.$value->id.'">
                                            <input type="hidden" name="action" id="action" value="2">
                                            <input type="submit" value="Eliminar">
                                        </form>
                                    </td>                                   
                                </tr>                        
                            ';
                        }                  
                    ?>
                </tbody>
            </table>
            <div class="jumbotron" style="text-align:center;">
                <h1 class="display-4">Banners de la Campaña</h1>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre Img Web</th>
                        <th>Nombre Img Movil</th>                        
                        <th>Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    <?php 
                        foreach ($bannerFilesCampania as $key => $value) {
                            echo '
                                <tr>
                                    <td scope="row">'.$value->nombre_img_web.'</td>
                                    <td>'.$value->nombre_img_movil.'</td>
                                    <td>
                                        <form name="delete_file" action="../../controladores/multimedia/delete_file.php method="POST">
                                            <input type="hidden" name="id" id="id" value="'.$value->id.'">
                                            <input type="hidden" name="action" id="action" value="3">
                                            <input type="submit" value="Eliminar">
                                        </form>
                                    </td>                                   
                                </tr>                        
                            ';
                        }                  
                    ?>
                </tbody>
            </table>
        </div>      
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>