<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AssistController extends Controller
{
    public function GetColumns($id){
        $db = session('database');
        $table_name= DB::connection($db)->table('eventos')->select('evento_tabla')->where('id',$id)->first();
        
        $columns = DB::connection($db)
            ->select("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '".$db."' AND TABLE_NAME = '".$table_name->evento_tabla."';");

        $columnsEnable = [];

        foreach ($columns as $key => $column){
            $diccionario = DB::connection($db)->table('diccionario')->select('alias_columna')->where('nombre_columna',$column->COLUMN_NAME)->first();
            if($diccionario){
                $columnsEnable[count($columnsEnable)]['COLUMN_NAME'] = $diccionario->alias_columna;
            }
        }

        return response()->json(($columnsEnable), 200);
    }

    public function DataTable(Request $request){
        $db = session('database');
        $table_name= DB::connection($db)->table('eventos')->select('evento_tabla')->where('id',$request->id_register)->first();

        $select = "";
        for ($i=0; $i < count($request->columns); $i++){
            $diccionario = DB::connection(session('database'))->table('diccionario')->select('nombre_columna')->where('alias_columna',$request->columns[$i])->first();
            if($diccionario){
                $select .= $diccionario->nombre_columna." '".$request->columns[$i]."',";
            }
        }        
        $select = substr($select, 0, -1);
        $main_db=\Config::get('app.database');
        $selectCompleto = "select id, (SELECT u.name FROM $main_db.usuarios AS u WHERE id = et.id_userIngreso) AS 'Responsable Ingreso', (SELECT u.name FROM $main_db.usuarios AS u WHERE id = et.id_userSalida) AS 'Responsable Salida', ".$select.", et.donde_dirije as 'A Donde Se Dirige', et.quien_autoriza as 'Quien Autoriza' from ".$table_name->evento_tabla." as et order by id desc";
        $detailEvents = DB::connection($db)->select($selectCompleto);
        
        return response()->json($detailEvents, 200);
    }

    public function registers(Request $request){
        
            $registro = DB::connection(session('database'))
                ->table('assistpeople')
                ->where('numero_documento', $request->form["numero_cedula"])
                ->orderBy('fecha_ingreso', 'desc')
                ->first();
            if($registro){
                // dd($request->in_out_validation);
                // dd($registro->fecha_salida);
                if($registro->fecha_salida == NULL && $request->in_out_validation == 'OUT'){
                    AssistController::salida($registro);
                    return response()->json(201);
                }
                else if($registro->fecha_salida != NULL && $request->in_out_validation == 'IN'){
                    AssistController::ingreso($request);
                    return response()->json(200);
                }else{
                    if($request->in_out_validation == 'IN'){
                        return response()->json(501);
                    }
                    if($request->in_out_validation == 'OUT'){
                        return response()->json(502);
                    }
                }
            }
            if(!$registro && $request->in_out_validation == 'IN'){
                AssistController::ingreso($request);
                return response()->json(200);
            }
            if(!$registro && $request->in_out_validation == 'OUT'){
                return response()->json(502);
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
                'nombre' => $request->form["nombres"],
                // 'fecha_nacimiento' => $request->form["fecha_nacimiento"],
                'donde_dirije' => $request->form["donde_dirije"],
                'quien_autoriza' => $request->form["quien_autoriza"],
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