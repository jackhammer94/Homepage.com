<?php

class SessionsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /sessions
	 *
	 * @return Response
	 */
	public function index()
	{
		
	}

	/**
	 * Show the form for creating a new resource.
	 * GET /sessions/create
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('sessions.create');
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /sessions
	 *
	 * @return Response
	 */
	public function store()
	{
		// $validation=Validator::make(Input::all(),['email'=>'required|exists:users','password'=>'required']);
	 //    if($validation->fails())
		// 	return  Redirect::back()->withInput()->withErrors($validation->messages());
	
		$credentials = [
            'email' => Input::get('email'),
            'password' => Input::get('password'),
            'confirmed' => 1
        ];
		if(Auth::attempt($credentials,Input::get('remember_me')=='true'?true:false))
		{   //echo Input::get('remember_me');
			//return 'Welome, your email is '.Auth::user()->email;
			Flash::message('Hi '.Auth::user()->username.', good to see you again!');
			return Redirect::home();
		}
		Flash::error('Invalid email or password!');
		return Redirect::back()->withInput();
	
	}

	/**
	 * Display the specified resource.
	 * GET /sessions/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /sessions/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /sessions/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /sessions/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy( )
	{
		Auth::logout();
		Flash::message('you have successfully logged out!');
		return Redirect::home();
	}

}