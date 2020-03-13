<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AssistController extends Controller
{
    public function registers(Request $request){
        $registro = DB::connection(session('database'))
            ->table('assistpeople')
            ->where('numero_documento', $request->form["numero_cedula"])
            ->orderBy('fecha_ingreso', 'desc')
            ->first();
        if($registro){
            if($registro->fecha_salida == NULL){
                AssistController::salida($registro);
                return response()->json(201);
            }
            else{
                AssistController::ingreso($request);
                return response()->json(200);
            }
        }
        else{
            AssistController::ingreso($request);
            return response()->json(200);
        }
        try {
        } catch (\Throwable $th) {
            return response()->json(500);
        }
    }
    
    public function ingreso($request){
        DB::connection(session('database'))
            ->table('assistpeople')
            ->insert([
                'id_userIngreso' => session('id_user'),
                'numero_documento' => $request->form["numero_cedula"],
                'apellidos' => $request->form["apellidos"],
                'nombres' => $request->form["nombres"],
                'fecha_nacimiento' => $request->form["fecha_nacimiento"],
                'fecha_ingreso' => Carbon::now(),
                'fecha_salida' => NULL
            ]);
    }

    public function salida($registro){
        DB::connection(session('database'))
            ->table('assistpeople')
            ->where('id', $registro->id)
            ->update([
                'id_userSalida' => session('id_user'),
                'fecha_salida' => Carbon::now()
            ]);
    }
}