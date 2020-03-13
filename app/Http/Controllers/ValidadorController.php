<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
        $date = Carbon::now();
        $tabla = DB::connection($database)->table('eventos')->select('evento_tabla')->where('id', $request->id_register)->first();
        $validador = DB::connection($database)->select("
            SELECT * FROM sub_categorias_usuario AS sub INNER JOIN $tabla->evento_tabla AS t ON t.id = sub.id_usuario WHERE t.numero_documento = ".$request->form["numero_documento"]." AND sub.id_sub_categoria = $request->id limit 1
        ");
        
        if($validador){
            $log_validador = DB::connection($database)->table('log_validadores')->insert(
                [
                    'fecha_validacion' => $date,
                    'id_usuario_validador' => session('id_user'),
                    'sub_categoria' => $request->id,
                    'estado_validacion'=> 1,
                ]
            );
            return response()->json(200);
        }
        else{
            $log_validador = DB::connection($database)->table('log_validadores')->insert(
                [
                    'fecha_validacion' => $date,
                    'id_usuario_validador' => session('id_user'),
                    'sub_categoria' => $request->id,
                    'estado_validacion'=> 0,
                ]
            );
            return response()->json(500);
        }
    }

    public function ListaSubCategorias(){
        try {
            $database = session('database');
            $subcategorias = DB::connection($database)->table('sub_categorias')->get();
            return response()->json($subcategorias,200);
        } catch (\Throwable $th) {
            return response()->json(500);
        }
       
            

    }
}
