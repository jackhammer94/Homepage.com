<?php namespace Admin;
use DB;
use View;
use Input;
use Redirect;
use Flash;
use User;
class DashboardController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

		$no_of_users = DB:: table('users')->count();
		$no_of_tasks = DB:: table('tasks')->count();
		$no_of_events = DB:: table('events')->count();
		

		$users = User::all();
		
		foreach ($users as $user)		
		{   
			$user->tasks = DB:: table('tasks')->where('user', $user->username)->count();
			$user->events= DB:: table('events')->where('user', $user->username)->count();
			$user->feeds= DB:: table('feed_preference')->where('user_id', $user->id)->count();
			
		}

		return View::make('dashboard.index', ['no_of_users' => $no_of_users, 'no_of_tasks' => $no_of_tasks, 'no_of_events' => $no_of_events,  'users' => $users]);
	}

	//movie administration
	public function show_movies(){
		$movies      = DB::table('movies')->paginate(10);
		return View::make ('dashboard.show_movies', ['movies'=>$movies]);
	}
	public function add_movie(){
		$data = Input::all();
		DB::insert('insert into movies (title, image, overview, release_date, type) values (?, ?, ?, ?, ?)', [$data['title'], $data['image'], $data['overview'],$data['release_date'],$data['type']]);
		Flash::message('movie added successfully');
		return Redirect::to('/admin');
	}
	public function edit_movie($id){
		$movie = DB::table('movies')->where('id', $id)->first();
		return View::make('dashboard.edit_movie', [ 'id' => $id , 'movie'=>$movie]);
	}
	public function update_movie($id){
		$title   = Input::get('title');
		$image      = Input::get('image');
		$overview  = Input::get('overview');
		DB::update('update movies set  title =?,image=?, overview=? where id=?  ',[ $title,  $image, $overview, $id]);
		Flash::message('movie updated successfully');
		return Redirect::to('/admin');
	}
	public function delete_movie($id){
		DB::delete('delete from movies where id=? ', [$id]);
		Flash::message('movie deleted successfully');
		return Redirect::back();
	}
	public function delete_all_movies(){
		DB::table('movies')->delete();
		Flash::message('all movies deleted successfully');
		return Redirect::back();
	}
	
	//feed administration
	public function feeds(){
		$feeds = DB::table('feeds')->get();

		foreach($feeds as $feed)
		{
			$user_count = DB::table('feed_preference')->where('feed_id', $feed->id)->count();
			$feed->user_count = $user_count;
		}

			    
		return View::make ('dashboard.feeds', ['feeds'=>$feeds]);	}

}