<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

#Home
Route::get('/',['as'=>'home','uses'=>'PagesController@index']);

#Registration
Route::get('/register', 'RegistrationController@create');
Route::post('/register', ['as'=>'registration.store', 'uses'=>'RegistrationController@store']);
Route::get('/register/resend_activation','RegistrationController@getResend');
Route::post('/register/resend_activation',['as'=>'registration.postResend','uses'=>'RegistrationController@postResend']);
Route::get( 'register/verify/{confirmationCode}',  'RegistrationController@confirm');


#authentication
Route::get('login', ['as'=>'login', 'uses'=>'SessionsController@create']);
Route::get('logout',['as' => 'logout', 'uses' =>'SessionsController@destroy']);
Route::resource('sessions', 'SessionsController', ['only'=>['create', 'store', 'destroy']]);
Route::controller('password', 'RemindersController');