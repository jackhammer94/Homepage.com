<?php

class WidgetControllerOld extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /calendar
	 *
	 * @return Response
	 */
	public function add_feed()
	{
		if(Auth::check())
		{
			
			$data = Input::all();
			$count = DB:: table('widgets')->where('user',Auth::user()->username)->count();//after first insertion the user's favorties should be updated not inserted again
			if($count==0)
			{   

				DB::insert('insert into widgets (feeds, user) values ( ?, ?)', [ $data['feeds'], Auth::user()->username]);
			}
			else
			{
				DB::update('update widgets set   feeds=? where user=?  ',[ $data['feeds'], Auth::user()->username]);
			}
		}
		else{

		}
}

 public function show_feeds(){
 		if(Auth::check())
		{
			$widgets = DB::select('select feeds from widgets where user = ?', [Auth::user()->username]);
			echo json_encode( $widgets);
		}
		else{

		}
}
public function add_channel()
	{
		if(Auth::check())
		{
			
			$data = Input::all();
			$count = DB:: table('widgets')->where('user',Auth::user()->username)->count();//after first insertion the user's favorties should be updated not inserted again
			if($count==0)
			{   

				DB::insert('insert into widgets (channels, user) values ( ?, ?)', [ $data['channels'], Auth::user()->username]);
			}
			else
			{
				DB::update('update widgets set   channels=? where user=?  ',[ $data['channels'], Auth::user()->username]);
			}
		}
		else{

		}
}

 public function show_channels(){
 		if(Auth::check())
		{
			$widgets = DB::select('select channels from widgets where user = ?', [Auth::user()->username]);
			echo json_encode($widgets);
		}
		else{

		}
}

}
