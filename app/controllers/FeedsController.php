<?php

class FeedsController extends \BaseController {

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
			DB::table('feed_preference')->where('feed_id', 1 )->where('user_id',  Auth::user()->id)->delete(); //delete void_feed (which denotes user has removed all feeds) if present
			$data = Input::all();
			$feed_name = $data['feed'];					
			$feed = DB::table('feeds')->where('feed_name', $feed_name)->first(); //check whether feed_name is valid
			if($feed)
			{   
				DB::table('feed_preference')->insert(  array('feed_id' => $feed->id, 'user_id' => Auth::user()->id)	);
			}

			
		}
		
	}

	public function add_default_feeds(){


		$default_feeds = [64,7,14, 44];
		foreach ($default_feeds as $default_feed) {
			DB::table('feed_preference')->insert(  array('feed_id' => $default_feed, 'user_id' => Auth::user()->id)	);
		}
		
	}

	public function isFeedPreferenceEmpty(){
		$count = DB:: table('feed_preference')->where('user_id',Auth::user()->id)->count();
		if($count===0)
			return true;
		return false;
	}

	public function remove_feed(){
		if(Auth::check())
		{
			$data = Input::all();
			$feed_name = $data['feed'];
			$feed = DB::table('feeds')->where('feed_name', $feed_name)->first();
			if($feed)
			{  
				DB::table('feed_preference')->where('feed_id', $feed->id )->where('user_id',  Auth::user()->id)->delete();
			}

		}
	}
    
    public function get_feed_url(){
    	$data = Input::all();
    	$feed = DB::select('select feed_url from feeds where feed_name = ?', [$data['feed_name']]);
    	return $feed;
    }

	public function show_feeds(){
		if(Auth::check())
		{
			if(!$this->isFeedPreferenceEmpty()) //user has preferences
			{ 
				$feeds = DB::table('feed_preference')
				->join('feeds', 'feed_preference.feed_id', '=', 'feeds.id')
				->select('feeds.feed_name', 'feeds.feed_url')
				->where('user_id', Auth::user()->id )
				->orderBy('feed_preference.created_at', 'desc')
				->get();
			    
				return $feeds;
			}
			else //user is newly registered 
			{	
				$this->add_default_feeds();
				$feeds = DB::table('feed_preference')
				->join('feeds', 'feed_preference.feed_id', '=', 'feeds.id')
				->select('feeds.feed_name', 'feeds.feed_url')
				->where('user_id', Auth::user()->id )
				->orderBy('feed_preference.created_at', 'desc')
				->get();
		    	return $feeds;
			}
  
		}
		else{ //user is guest

			$feeds = DB::table('feeds')
                    ->whereIn('id', array(64,7,14, 44))->get();
		    return $feeds;

		}

	}
}