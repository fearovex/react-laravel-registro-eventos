<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ValidadorController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Validacion(Request $request){
        $database = session('database');
        $tabla = DB::connection($database)->table('eventos')->select('evento_tabla')->where('id', $request->id_register)->first();
        $validador = DB::connection($database)->select("
            SELECT * FROM sub_categorias_usuario AS sub INNER JOIN $tabla->evento_tabla AS t ON t.id = sub.id_usuario WHERE t.numero_documento = ".$request->form["numero_documento"]." AND sub.id_sub_categoria = $request->id limit 1
        ");
        if($validador){
            return response()->json(200);
        }
        else{
            return response()->json(500);
        }
    }
}
