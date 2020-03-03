<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $selectCompleto = "select ".$select." from ".$table_name->evento_tabla." order by fecha_creacion desc";
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
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
