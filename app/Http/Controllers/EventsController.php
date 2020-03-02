<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use App\Event;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $eventos = DB::connection(session('database'))
                ->table('eventos')
                ->select('id','nombre as Nombre', 'descripcion as Descripción','fecha_inicial as Fecha Inicio','fecha_final as Fecha Fin','evento_tabla')
                ->get();
    
            return response()->json($eventos, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
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
        try {
            $NameTabla = str_replace(["-", " "],"_",$request->nombre_evento." ".date('Y-m-d'));

            $validation = EventsController::createTable($request, $NameTabla);

            if($validation == 500){
                return response()->json(['message' => 500]);
            }

            $evento = new Event();
            $evento->setConnection(session('database'));
            $evento->nombre = $request->nombre_evento;
            $evento->descripcion = $request->descripcion;
            $evento->fecha_inicial = $request->fecha_inicio;
            $evento->fecha_final = $request->fecha_fin;
            $evento->evento_tabla =  $NameTabla;
            $evento->save();

            return response()->json(['code'=>200]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['code'=>500]);
        }
    }

    private function createTable($request, $NameTabla){
        try {
            Schema::connection(session('database'))->create($NameTabla, function (Blueprint $table) use ($request) {
                $table->increments('id');
                $table->bigInteger('id_evento');
                $table->dateTime('fecha_creacion');
    
                // if($request->nombre){
                    $table->string('estado_nombre')->nullable();
                // }            
                // if($request->apellidos){
                    $table->string('estado_apellidos')->nullable();
                // }
                // if($request->email){
                    $table->string('estado_email')->nullable();
                // }              
                // if($request->numero_documento){
                    $table->string('estado_numero_documento')->nullable();
                // } 
                $table->string('email')->nullable();
                $table->string('nombre')->nullable();
                $table->string('apellidos')->nullable();
                $table->string('numero_documento')->nullable();
            });
            return 200;
        } catch (\Throwable $th) {
            return 500;
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
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $evento = DB::connection(session('database'))
                ->table('eventos')
                ->where('id', $id)
                ->first();
    
            return response()->json($evento, 200);
        } catch (\Throwable $th) {
            return response()->json($th, 500);
        }
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
        try {
            DB::connection(session('database'))
                ->table('eventos')
                ->where('id', $id)
                ->update([
                    'nombre' => $request->nombre_evento,
                    'descripcion' => $request->descripcion,
                    'fecha_inicial' => $request->fecha_inicio,
                    'fecha_final' => $request->fecha_fin,
                ]);

            return response()->json(['code'=>200]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['code'=>500]);
        }
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
