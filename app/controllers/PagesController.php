<?php

class PagesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /pages
	 *
	 * @return Response
	 */
	public function index()
	{	if(!Auth::check())
			Flash::message("please log in to save your preferences!");
		return View::make('pages.index');
	}

	public function deals(){
		return View::make('pages.deals');
	}

	public function games(){
		return View::make('games.index', ['game'=>'monkey_lander']);
	}

	public function settings()
	{			
			return View::make('pages.settings');

	}

	public function update_email($id)
	{
		$user = User::find($id);
		$user->email      = Input::get('email');
		$email = $user->email;
		$validation=Validator::make(array('email'=>$email),array('email'=>'unique:users')); 
		if($validation->fails())
			return  Redirect::back()->withInput()->withErrors($validation->messages());		
		$user->save();
		Flash::message('changes saved!');
		return Redirect::to('/settings');
	}

	public function update_password($id)
	{
		$user = User::find($id);		
		$validation=Validator::make(array('password'=>Input::get('password'),'password_confirmation'=> Input::get('password_confirmation') ),array('password'=>'required|min:6',  'password_confirmation' => 'required|same:password',)); 
		if($validation->fails())
			return  Redirect::back()->withInput()->withErrors($validation->messages());	
		$user->password   = Hash::make(Input::get('password'));
		$user->save();
		Flash::message('changes saved!');
		return Redirect::to('/settings');
	}

	public function get_movies(){
		$movies = DB::select('select * from movies where type=? ', ["nowplaying"]);
		echo json_encode($movies);
	}

	public function get_upcoming_movies(){
		$movies = DB::select('select * from movies where type=? ', ["upcoming"]);
		echo json_encode($movies);
	}
}