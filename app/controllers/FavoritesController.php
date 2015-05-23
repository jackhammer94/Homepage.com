<?php
class FavoritesController extends \BaseController {

	/**
	 * add favorites
	 * POST /add_favorite
	 *
	 * @return Response
	 */
	public function add_favorite(){
	if(Auth::check())
		{
			
			$data = Input::all();
			$count = DB:: table('favorites')->where('user',Auth::user()->username)->count();//after first insertion the user's favorties should be updated not inserted again
			if($count==0)
			{   

				DB::insert('insert into favorites (urls, names, user) values (?, ?, ?)', [ $data['urls'],  $data['names'], Auth::user()->username]);
			}
			else
			{
				DB::update('update favorites set  urls=?, names=? where user=?  ',[ $data['urls'],  $data['names'], Auth::user()->username]);
			}
		}
		else{

		}
}

 public function show_favorites(){
 		if(Auth::check())
		{
			$favorites = DB::select('select urls,names from favorites where user = ?', [Auth::user()->username]);
			echo json_encode($favorites);
		}
		else{

		}
}
}