<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SideBarController extends Controller
{
    public static function getSideBarRol(){
        $rol = session('rol');
        $database = session('database');
        if($rol == 1){
            $eventos=DB::connection($database)
                ->select("select * from eventos");
            $eventosArray = [];
            $eventosArray[0] = (object) array(
                'menu_title'=>'Eventos',
                'type_multi'=>false,
                'menu_icon'=>'zmdi zmdi-city',
                'path'=>'/app/eventos'
            );
            
            foreach ($eventos as $count => $evento){
                $eventosArray[($count+1)] = (object) array(
                    'menu_title'=>$evento->nombre,
                    'id_evento' => $evento->id,
                    'menu_icon'=>'zmdi zmdi-pin',
                    'type_multi'=>false,
                    'child_routes'=>[
                        (object) array(
                            'menu_title'=>'Dashboard',
                            'type_multi'=> false,
                            'menu_icon'=>'ti-pie-chart',
                            'path'=>'/app/eventos/'.$evento->nombre
                        ),
                        (object) array(
                            'menu_title'=>'Registro',
                            'type_multi'=> false,
                            'menu_icon'=>'ti-view-grid',
                            'path'=>'/app/eventos/'.$evento->nombre.'/registro'
                        ),
                        (object) array(
                            'menu_title'=>'Validar',
                            'type_multi'=> false,
                            'menu_icon'=>'zmdi zmdi-view-carousel',
                            'path'=>'/app/eventos/'.$evento->nombre.'/validacion'
                        )
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $eventosArray);
            return response()->json($sidebarJSON, 200);
        }
        else if($rol == 2){
            // session(['sideBar' => $sidebarJSON]);
        }
        else if($rol == 3){
            // session(['sideBar' => $sidebarJSON]);
        }
        else if($rol == 4){
            // session(['sideBar' => $sidebarJSON]);
        }
    }
}
