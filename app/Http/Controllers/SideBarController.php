<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SideBarController extends Controller
{
    public static function getSideBarRol($rol, $database){
        $id_location = session('location');
        $id_campaing = session('campaing');
        if($rol == 1){
            // session(['sideBar' => $sidebarJSON]);
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
