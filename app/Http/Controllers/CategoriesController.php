<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function indexSubCategories(Request $request)
    {
        // try {
            // $var = \Config::get('app.env');
            // dd($var);
            $db = session('database');
            $event = DB::connection($db)->table('eventos')->select('evento_tabla')->where('id',$request->id_event)->first();
            // dd($event);
            $main_db=\Config::get('app.database');
            $reportSubCategories = DB::connection($db)->select("SELECT lv.fecha_validacion AS 'Fecha Validacion', 
            (SELECT u.name FROM $main_db.usuarios AS u WHERE id = lv.id_usuario_validador) AS 'Usuario Validador', 
            lv.numero_documento AS 'Numero Documento', 
            (SELECT eu.correo_electronico FROM $db.$event->evento_tabla AS eu WHERE eu.numero_documento = lv.numero_documento) AS 'Correo Electrónico',
            (SELECT sc.nombre_sub_categoria FROM $db.sub_categorias AS sc WHERE id = lv.sub_categoria) AS 'Sub Categoria',
            (IF(lv.estado_validacion = 1,'Ingresó','Usuario No Permitido')) AS 'Estado Validacion',
            (SELECT eu.tipo_registro FROM $db.$event->evento_tabla AS eu WHERE eu.numero_documento = lv.numero_documento) AS 'Tipo de Registro'
            FROM registro.log_validadores AS lv where lv.id_evento = $request->id_event");
            return response()->json($reportSubCategories,200);

        // } catch (\Throwable $th) {
        //     return response()->json(500);
        // }
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
