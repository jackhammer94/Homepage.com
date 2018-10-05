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

		$applications =DB::table('applications')->where('application_name','!=','void_application')->orderBy('created_at','desc')->get();

		$modal_applications =DB::table('applications')->where('application_name','!=','void_application')->where('application_name','!=','feeds')->orderBy('created_at','desc')->get();
		
		$request = Request::create('/show_apps', 'GET');
		$user_applications = Route::dispatch($request)->getContent();
	    $user_applications = json_decode($user_applications);

	    $applications_with_slots = $applications;// apps not selected by user will be included as empty slots where they'll be appended if user adds it from the modal
	    foreach ($applications_with_slots as $application) {
	    	$found=0;
	    	foreach($user_applications as $user_application)
	    	{
	    		if($user_application->id === $application->id)
	    			{
	    				$found=1;
	    				switch($application->application_name)
	    				{
	    					case "Movies":
		    					$request = Request::create('/show_movies', 'GET');
								$movies = Route::dispatch($request)->getContent(); //var_dump($movies);
								$application->html = $movies;
								$application->js = null;
								break;
							case "TV_Schedule":
								$request = Request::create('/show_channels', 'GET');
								$channels = Route::dispatch($request)->getContent(); //var_dump($channels);
								$application->html = $channels;
								break;
							case "feeds":
								$request = Request::create('/show_feeds', 'GET');
								$feeds = Route::dispatch($request)->getContent(); //var_dump($feeds);
								$application->html = $feeds;
								break;
						}
	    				break;
	    			}
	    	}
	    	if($found!==1)
	    	{
	    		$application->html = "<div id='".$application->application_name."_slot'></div>";
	    		$application->js =  null;
	    		$application->dependency = null;
	    	}
	    }

		$news = DB::table('feeds')-> where('feed_category','news')-> orderBy('feed_name','asc')->get();
		$entertainment = DB::table('feeds')-> where('feed_category','entertainment')-> orderBy('feed_name','asc')->get();
		$business = DB::table('feeds')-> where('feed_category','business')-> orderBy('feed_name','asc')->get();
		$health = DB::table('feeds')-> where('feed_category','health')-> orderBy('feed_name','asc')->get();
		$technology = DB::table('feeds')-> where('feed_category','technology')-> orderBy('feed_name','asc')->get();
		$science =DB::table('feeds')-> where('feed_category','science')-> orderBy('feed_name','asc')->get();
		$sports =DB::table('feeds')-> where('feed_category','sports')-> orderBy('feed_name','asc')->get();
		$other =DB::table('feeds')-> where('feed_category','other')-> orderBy('feed_name','asc')->get();

		$news_channels = DB::table('channels')-> where('channel_category','news')-> orderBy('channel_name','asc')->get();
		$entertainment_channels = DB::table('channels')-> where('channel_category','entertainment')-> orderBy('channel_name','asc')->get();
		$movies_channels = DB::table('channels')-> where('channel_category','movies')-> orderBy('channel_name','asc')->get();
		$devotional_channels = DB::table('channels')-> where('channel_category','devotional')-> orderBy('channel_name','asc')->get();
		$kids_channels = DB::table('channels')-> where('channel_category','kids')-> orderBy('channel_name','asc')->get();
		$documentary_channels =DB::table('channels')-> where('channel_category','documentary')-> orderBy('channel_name','asc')->get();
		$sports_channels =DB::table('channels')-> where('channel_category','sports')-> orderBy('channel_name','asc')->get();
		$music_channels =DB::table('channels')-> where('channel_category','music')-> orderBy('channel_name','asc')->get();
		return View::make('pages.index', ['applications_with_slots'=>$applications_with_slots, 'applications'=>$modal_applications, 'news'=>$news, 'entertainment'=> $entertainment, 'business'=>$business, 'health'=>$health, 'technology'=>$technology, 'science'=>$science, 'sports'=>$sports, 'other'=>$other,
										  'news_channels'=>$news_channels,'entertainment_channels'=>$entertainment_channels, 'sports_channels'=>$sports_channels, 'devotional_channels'=>$devotional_channels, 'documentary_channels'=>$documentary_channels, 'kids_channels'=>$kids_channels, 'music_channels'=>$music_channels, 'movies_channels'=>$movies_channels]);
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

	
}