<?php 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../vendor/bootstrap/css/bootstrap.min.css">
    <title>Document</title>
</head>
<style>
    label {
        font-size: 25px;
    }
</style>
<body>
    <div class="container">
        <div class="card">
            <form action="../../controladores/multimedia/action_multimedia.php" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="action" id="action" value="1">
                <div class="jumbotron" style="text-align:center;">
                    <h1 class="display-4">Multimedia de la Campaña</h1>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="background">Background</label>
                        <input type="file" class="form-control-file" name="background" id="background">
                    </div>           
                    <div class="form-group col-md-6">
                        <label for="logo">Logo</label>
                        <input type="file" class="form-control-file" name="logo" id="logo">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="favicon">Favicon</label>
                        <input type="file" class="form-control-file" name="favicon" id="favicon">
                    </div>
                </div>
                <div class="jumbotron" style="text-align:center;">
                    <h1 class="display-4">Banners de la Campania</h1>
                </div>
                <div class="form-row">               
                    <div class="form-group col-md-6">
                        <label for="banner_1_web">Banner 1 Web</label>
                        <input type="file"  class="form-control-file" name="banner_1_web" id="banner_1_web">
                    </div>
                    <div class="form-group col-md-6">               
                        <label for="banner_1_movil">Banner 1 Movil</label>
                        <input type="file" class="form-control-file" name="banner_1_movil" id="banner_1_movil">
                    </div>               
                </div>
                
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="banner_2_web">Banner 2 Web</label>
                        <input type="file" class="form-control-file" name="banner_2_web" id="banner_2_web">
                    </div>
                    <div class="form-group col-md-6">               
                        <label for="banner_2_movil">Banner 2 Movil</label>
                        <input type="file" class="form-control-file" name="banner_2_movil" id="banner_2_movil">
                    </div>                
                </div>

                <div class="form-row">                
                    <div class="form-group col-md-6">
                        <label for="banner_3">Banner 3 Web</label>
                        <input type="file" class="form-control-file" name="banner_3_web" id="banner_3_web">
                    </div>
                    <div class="form-group col-md-6">               
                        <label for="banner_3_movil">Banner 3 Movil</label>
                        <input type="file" class="form-control-file" name="banner_3_movil" id="banner_3_movil">
                    </div>                
                </div>
                <div class="form-row">                
                    <div class="form-group col-md-6">
                        <label for="banner_4">Banner 4 Web</label>
                        <input type="file" class="form-control-file" name="banner_4_web" id="banner_4_web">
                    </div>
                    <div class="form-group col-md-6">               
                        <label for="banner_4_movil">Banner 4 Movil</label>
                        <input type="file" class="form-control-file" name="banner_4_movil" id="banner_4_movil">
                    </div>                
                </div>
                </br>

                <input style="width:100%; margin-bottom:5%;" name="" id="" class="btn btn-primary" type="submit" value="Cargar Archivos">
            </form>
        </div>        
    </div>
    
    <script src="../../vendor/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>