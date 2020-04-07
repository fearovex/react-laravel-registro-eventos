<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'cors'], function() {

    Route::post('/login','Auth\LoginController@login');

    Route::post('/password/email','Api\ForgotPasswordController@sendResetLinkEmail');
    
    Route::post('/password/reset','Api\ResetPasswordController@reset');

    Route::get('/hidden','Api\GeneralController@index');

    Route::group(['middleware' => 'connection'], function() {

        Route::get('/sidebar','SideBarController@getSideBarRol');

        Route::resource('/events','EventsController');

        Route::resource('/register', 'RegisterController');
        
        Route::get('/register/columns/{id}', 'RegisterController@GetColumns');

        Route::post('/register/data', 'RegisterController@DataTable');

        Route::post('/register/dataModal/{id}', 'RegisterController@DataTableForModal');

        Route::post('/register/logPrints', 'RegisterController@logPrints');

        Route::post('/register/search', 'RegisterController@search');

        Route::post('/validacion/search', 'ValidadorController@Validacion');

        Route::get('/validacion/subcategorias', 'ValidadorController@ListaSubCategorias');

        Route::post('/assist', 'AssistController@registers');

        Route::get('/assist/columns/{id}', 'AssistController@GetColumns');
        
        Route::post('/assist/data', 'AssistController@DataTable');

        Route::post('/subcategories/reportSubcategories', 'CategoriesController@indexSubCategories');

        // Route::get('/subcategories/columns/{id}', 'CategoriesController@GetColumns');
    });
 });
