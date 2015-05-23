<?php

class CalendarController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /calendar
	 *
	 * @return Response
	 */
	public function add_event()
	{
		if(Auth::check())
		{
			
			$data = Input::all();
			DB::insert('insert into events (title, start, end, user) values (?, ?, ?, ?)', [$data['title'], $data['start'],$data['end'],Auth::user()->username]);
			$id=DB::getPdo()->lastInsertId();
			echo $id;
		}
		else
		{
			 // Flash::overlay('Please log in!');
			 // return Redirect::home();
		}
	}

	public function show_events()
	{
		if(Auth::check())
		{
			$events = DB::select('select * from events where user = ?', [Auth::user()->username]); //spits out the id,title,start, end of the event, this is how eventid is set
			echo json_encode($events);
		}
		else{

		}
	}

	public function update_event(){
		if(Auth::check())
		{
			$update = Input::all();
			DB::update('update events set  title=?, start=?, end=? where id=?  ',[ $update['title'],$update['start'],$update['end'],$update['id']]);
		}
		else
		{

		}
	}

	public function delete_event(){
		if(Auth::check())
		{
			$delete = Input::all(); 
			DB::delete('delete from events where id=? ', [$delete['id']]);
		}
		else
		{

		}
	}

}
