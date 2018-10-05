<?php

class ChannelsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /calendar
	 *
	 * @return Response
	 */
	public function add_channel()
	{
		if(Auth::check())
		{   
			DB::table('channel_preference')->where('channel_id', 0 )->where('user_id',  Auth::user()->id)->delete(); //delete void_channel (which denotes user has removed all channels) if present
			$data = Input::all();
			$channel_name = $data['channel'];					
			$channel = DB::table('channels')->where('channel_name', $channel_name)->first(); //check whether channel_name is valid
			if($channel)
			{   
				DB::table('channel_preference')->insert(  array('channel_id' => $channel->id, 'user_id' => Auth::user()->id)	);
			}

			
		}
		
	}

	public function add_default_channels(){


		$default_channels = [8,59,46];
		foreach ($default_channels as $default_channel) {
			DB::table('channel_preference')->insert(  array('channel_id' => $default_channel, 'user_id' => Auth::user()->id)	);
		}
		
	}

	public function isChannelPreferenceEmpty(){
		$count = DB:: table('channel_preference')->where('user_id',Auth::user()->id)->count();
		if($count===0)
			return true;
		return false;
	}

	public function remove_channel(){
		if(Auth::check())
		{
			$data = Input::all();
			$channel_name = $data['channel'];
			$channel = DB::table('channels')->where('channel_name', $channel_name)->first();
			if($channel)
			{  
				DB::table('channel_preference')->where('channel_id', $channel->id )->where('user_id',  Auth::user()->id)->delete();
			}

		}
	}

	public function get_channel_id(){
		$data = Input::all();
		$channel = DB::select('select id from channels where channel_name = ?', [$data['channel_name']]);
		return $channel;
	}
	public function get_channels(){
		if(Auth::check())
		{
			if(!$this->isChannelPreferenceEmpty()) //user has preferences
			{ 
				$channels = DB::table('channel_preference')
				->join('channels', 'channel_preference.channel_id', '=', 'channels.id')
				->select('channels.channel_name', 'channels.id')
				->where('user_id', Auth::user()->id )
				->orderBy('channel_preference.created_at', 'desc')
				->get();
				return $channels;
			}
			else //user is newly registered 
			{	
				$this->add_default_channels();
				$channels = DB::table('channel_preference')
				->join('channels', 'channel_preference.channel_id', '=', 'channels.id')
				->select('channels.channel_name', 'channels.id')
				->where('user_id', Auth::user()->id )
				->orderBy('channel_preference.created_at', 'desc')
				->get();
				return $channels;
			}

		}
		else{ //user is guest

			$channels = DB::table('channels')
			->whereIn('id', array(8,59,46))->get();
			return $channels;

		}

	}
	public function show_channels(){
		if(Auth::check())
		{
			if(!$this->isChannelPreferenceEmpty()) //user has preferences
			{ 
				$channels = DB::table('channel_preference')
				->join('channels', 'channel_preference.channel_id', '=', 'channels.id')
				->select('channels.channel_name', 'channels.id')
				->where('user_id', Auth::user()->id )
				->orderBy('channel_preference.created_at', 'desc')
				->get();
				$schedule = $this->generate_html($channels);
				return $schedule;
			}
			else //user is newly registered 
			{	
				$this->add_default_channels();
				$channels = DB::table('channel_preference')
				->join('channels', 'channel_preference.channel_id', '=', 'channels.id')
				->select('channels.channel_name', 'channels.id')
				->where('user_id', Auth::user()->id )
				->orderBy('channel_preference.created_at', 'desc')
				->get();
				$schedule = $this->generate_html($channels);
				return $schedule;
			}

		}
		else{ //user is guest

			$channels = DB::table('channels')
			->whereIn('id', array(8,59,46))->get();
			$schedule = $this->generate_html($channels);
			return $schedule;

		}

	}
	public function generate_html($channels){
		$app_name = "TV_Schedule";
		$BASE_URL = "https://query.yahooapis.com/v1/public/yql";
		$schedule = '<div id="tv_schedule_outer" class="col-xs-12 application">
		<h3>TV schedule<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_name.'\')"><i class="fa fa-times"></i></button></span></h3>
		<div id="'.$app_name.'" class="application-inner">';
		
		foreach($channels as $channel){

			$yql_query = 'select * from html where url="http://tv.burrp.com/UpcomingSchedules.php?ID='.$channel->id.'&channelName='.str_replace(" ","%20", $channel->channel_name).'"';
			$yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
			//var_dump($yql_query_url);
			$schedule .="<div class='channel_outer well'>";
			$schedule .="<h3><b> ".$channel->channel_name."</b><span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_channel(\"".$channel->channel_name."\")'><i class='fa fa-times'></i></button></span></h3>";
			$schedule .="<table class='table '><tbody id='".str_replace(" ","_", $channel->channel_name)."' class='channels'>";

			$session = curl_init($yql_query_url);
			curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
			$json = curl_exec($session);
    		// Convert JSON to PHP object 
			$phpObj =  json_decode($json);
			//var_dump($phpObj);
    		// Confirm that results were returned before parsing
			if(!is_null($phpObj->query->results)){
      		// Parse results and extract data to display
			$body = $phpObj->query->results->body;
			$time = $body->content;
			$time = trim($time);
			$time = preg_replace('/\s\s+/', ' ', $time);
			$time = explode(" ",$time);
			$shows = $body->a;
			$sup_class = "";
			$full_schedule = $body->p->a->href;
			$i=0;
			foreach($shows as $show){
				$schedule .= "<tr><th>".$time[$i]."</th><td><a href = '".$show->href."' target = 'blank' ><strong>".$show->strong."</strong></a>".$sup_class."</td></tr>";
				$i++;
			}
			$schedule .= "<tr><th></th><td align='right'><p class='more'><a href=".$full_schedule." target='blank'>Full schedule</a></p></td></tr>";
			
		}
		else{
			$schedule .="<tr> please try again later!! </tr>";
		}
		$schedule .= "</tbody></table></div>";
	}
	
	$schedule .= '</div><button id="add_channel_button" class="btn btn-primary">Add channels</button></div>';
    //var_dump($schedule);
	return $schedule;
}
}