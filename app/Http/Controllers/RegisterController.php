<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class RegisterController extends Controller
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
        $selectCompleto = "select id,".$select." from ".$table_name->evento_tabla." order by fecha_creacion desc";
        $detailEvents = DB::connection($db)->select($selectCompleto);
        
        return response()->json($detailEvents, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        try {
            $categorias = DB::connection(session('database'))
                ->table('categorias')
                ->select('id','nombre_categoria')
                ->get();

            $sub_categorias = DB::connection(session('database'))
                ->table('sub_categorias')
                ->select('id','nombre_sub_categoria')
                ->get();
            
            return response()->json([$categorias,$sub_categorias], 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $database = session('database');
        // try {
            $date = Carbon::now();
            $database = session('database');
            $tabla = DB::connection($database)->table('eventos')->select('evento_tabla')->where('id', $request->id_register)->first();
            $categoria = DB::connection($database)->table('categorias')->select('nombre_categoria')->where('id', $request->form['categorias'])->first();

           
            
            $document = DB::connection($database)->table($tabla->evento_tabla)->select('numero_documento')->where('numero_documento',$request->form['numero_documento'])->first();
               
            if(is_null($document)){

                $stringSubCategories = "";

                foreach ($request->form['sub_categorias'] as $key => $value){
                    $stringSubCategories .= $value['nombre_sub_categoria'].', ';
                }
                $stringSubCategories = substr($stringSubCategories, 0, -2);

                $id_usuario = DB::connection(session('database'))->table($tabla->evento_tabla)->insertGetId([
                    'id_evento'=> $request->id_register,
                    'fecha_creacion' => $date,
                    'nombre' => $request->form['nombre'],
                    'apellidos' => $request->form['apellidos'],
                    'numero_documento' => $request->form['numero_documento'],
                    'cantidad_impresos'=>0,
                    'escarapela' => 'No',
                    'categoria' => $categoria->nombre_categoria,
                    'sub_categoria' => $stringSubCategories
                ]);

                foreach ($request->form['sub_categorias'] as $key => $value){
                    DB::connection(session('database'))->table('sub_categorias_usuario')->insertGetId([
                        'id_usuario'=> $id_usuario,
                        'id_sub_categoria' => $value['id']
                    ]);
                }
                return response()->json(200);
            }
            else{
                return response()->json(501);
            }
               
        // } catch (\Throwable $th) {
        //     return response()->json(500);
        // }
    }

    public function logPrints(Request $request){
        try {
            $database = session('database');
            $tabla = DB::connection($database)->table('eventos')->select('evento_tabla')->where('id', $request->id_register)->first();
            DB::connection(session('database'))->table($tabla->evento_tabla)->where('id',$request->form['id_usuario'])->update([
                'cantidad_impresos'=> $request->form['cantidad_impresos']+1,
            ]);
    
            DB::connection(session('database'))->table('log_impresiones')->insert([
                'id_usuario' => $request->form['id_usuario'],
            ]);
            return response()->json(200);
        } catch (\Throwable $th) {
            return "hI";
            return response()->json(500);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    public function search(Request $request){
        try {
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
            $selectCompleto = "select ".$select." from ".$table_name->evento_tabla." where numero_documento = '".$request->form["numero_documento"]."'";
            $register = DB::connection($db)->select($selectCompleto);
            if($register){
                return response()->json($register, 200);
            }
            else{
                return response()->json(500);
            }
        } catch (\Throwable $th) {
            return response()->json(500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
