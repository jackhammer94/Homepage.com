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
}