<?php namespace Admin;
use User;
use View;
use Input;
use Hash;
use Redirect;
use DB;
class UsersController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = User::paginate(15);
		$i = 0;
		foreach ($users as $user)		
		{   
			$no_of_tasks[$i] = DB:: table('tasks')->where('user', $user->username)->count();
			$no_of_events[$i]= DB:: table('events')->where('user', $user->username)->count();
			$i++;
		}
		
	return View::make('users.index', ['users' => $users, 'no_of_tasks' => $no_of_tasks, 'no_of_events' => $no_of_events, 'i'=>0]);

}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('users.create');
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$user = new User;

		$user->username   = Input::get('username');
		$user->email      = Input::get('email');
		$user->confirmed  = Input::get('confirmed');
		$user->password   = Hash::make(Input::get('password'));

		$user->save();

		return Redirect::to('/admin/users');
	}


	/**
	 * Display the specified resource.
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
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$user =User::find($id);

		return View::make('users.edit', [ 'user' => $user ]);
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$user = User::find($id);


		$user->username   = Input::get('username');
		$user->email      = Input::get('email');
		$user->confirmed  = Input::get('confirmed');
		$user->password   = Hash::make(Input::get('password'));

		$user->save();

		return Redirect::to('/admin/users');
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		User::destroy($id);

		return Redirect::to('/admin/users');
	}


}
