<?php

class TodoController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /Todo
	 *
	 * @return Response
	 */
	public function add_task()
	{
		if(Auth::check())
		{
			
			$data = Input::all();
			DB::insert('insert into tasks (title, user) values (?, ?)', [$data['title'], Auth::user()->username]);
			$id=DB::getPdo()->lastInsertId();
			echo $id; //returns the id of the task so that we can save task id as an dom elt id and later retrieve it to delete the correct task from db
		}
		else
		{
			echo null;
		}
	}

	public function show_tasks(){
			if(Auth::check())
		{
			//$tasks = DB::select('select * from tasks where user = ?', [Auth::user()->username]);
			$tasks = DB::table('tasks')->where('user', [Auth::user()->username])->orderBy('id', 'asc')->get();
			echo json_encode($tasks);
		}
		else{

		}
	}

	public function delete_task(){
			if(Auth::check())
		{
			$delete = Input::all();
			DB::delete('delete from tasks where id=? ', [$delete['id']]);
		}
		else
		{

		}
	}
}