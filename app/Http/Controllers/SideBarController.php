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
                ->select("select * from eventos where evento_tabla != 'portal_cautivo_campestre' && evento_tabla != 'assistpeople'");
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
                            'id_evento' => $evento->id,
                            'menu_icon'=>'ti-pie-chart',
                            'path'=>'/app/eventos/'.$evento->nombre
                        ),
                        (object) array(
                            'menu_title'=>'Registro',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'ti-view-grid',
                            'path'=>'/app/eventos/'.$evento->nombre.'/registro'
                        ),
                        (object) array(
                            'menu_title'=>'Informe de SubCategorias',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'zmdi zmdi-library',
                            'path'=>'/app/eventos/'.$evento->nombre.'/informe_subcategorias'
                        ),
                        (object) array(
                            'menu_title'=>'Validador de SubCategorias',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'zmdi zmdi-scanner',
                            'path'=>'/app/eventos/'.$evento->nombre.'/subcategoria'
                        ),
                      
                        // (object) array(
                        //     'menu_title'=>'Control de Acceso',
                        //     'type_multi'=> false,
                        //     'id_evento' => $evento->id,
                        //     'menu_icon'=>'zmdi zmdi-male-alt',
                        //     'path'=>'/app/eventos/'.$evento->nombre.'/asistencia'
                        // )
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $eventosArray);
            return response()->json($sidebarJSON, 200);
        }
        else if($rol == 2){
            $eventos=DB::connection($database)
                ->select("select * from eventos where evento_tabla != 'portal_cautivo_campestre' && evento_tabla != 'assistpeople'");
            $eventosArray = [];
            
            foreach ($eventos as $count => $evento){
                $eventosArray[$count] = (object) array(
                    'menu_title'=>$evento->nombre,
                    'id_evento' => $evento->id,
                    'menu_icon'=>'zmdi zmdi-pin',
                    'type_multi'=>false,
                    'child_routes'=>[
                        (object) array(
                            'menu_title'=>'Registro',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'ti-view-grid',
                            'path'=>'/app/eventos/'.$evento->nombre.'/registro'
                        )
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $eventosArray);
            return response()->json($sidebarJSON, 200);
        }
        else if($rol == 3){
            $eventos=DB::connection($database)
                ->select("select * from eventos where evento_tabla != 'portal_cautivo_campestre' && evento_tabla != 'assistpeople'");
            $eventosArray = [];
            
            foreach ($eventos as $count => $evento){
                $eventosArray[$count] = (object) array(
                    'menu_title'=>$evento->nombre,
                    'id_evento' => $evento->id,
                    'menu_icon'=>'zmdi zmdi-pin',
                    'type_multi'=>false,
                    'child_routes'=>[
                        (object) array(
                            'menu_title'=>'Informe de SubCategorias',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'zmdi zmdi-library',
                            'path'=>'/app/eventos/'.$evento->nombre.'/informe_subcategorias'
                        ),
                        (object) array(
                            'menu_title'=>'Validador de SubCategorias',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'zmdi zmdi-scanner',
                            'path'=>'/app/eventos/'.$evento->nombre.'/subcategoria'
                        )
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $eventosArray);
            return response()->json($sidebarJSON, 200);
        }
        else if($rol == 4){
            $eventos=DB::connection($database)
                ->select("select * from eventos where evento_tabla = 'assistpeople'");
            $eventosArray = [];
            
            foreach ($eventos as $count => $evento){
                $eventosArray[$count] = (object) array(
                    'menu_title'=>$evento->nombre,
                    'id_evento' => $evento->id,
                    'menu_icon'=>'zmdi zmdi-pin',
                    'type_multi'=>false,
                    'child_routes'=>[
                        (object) array(
                            'menu_title'=>'Control de Visitantes',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'zmdi zmdi-male-alt',
                            'path'=>'/app/eventos/'.$evento->nombre.'/control_visitantes'
                        ),
                        (object) array(
                            'menu_title'=>'Informe Control de Visitantes',
                            'type_multi'=> false,
                            'id_evento' => $evento->id,
                            'menu_icon'=>'zmdi zmdi-filter-list',
                            'path'=>'/app/eventos/'.$evento->nombre.'/informe_control_visitantes'
                        ),
                    ]
                );
            }
            $sidebarJSON = (object) array('category1' => $eventosArray);
            return response()->json($sidebarJSON, 200);
        }
    }
}
