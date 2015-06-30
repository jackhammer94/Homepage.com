<?php

class ApplicationsController extends \BaseController {
	private $default_applications = [2,3,4,8,9,10];
	public function get_app(){
		$data = Input::all();
    	$application = DB::select('select * from applications where application_name = ?', [$data['application_name']]);
    	return $application;
	}
    public function save_app()
	{
		if(Auth::check())
		{   
			DB::table('application_preference')->where('application_id', 1 )->where('user_id',  Auth::user()->id)->delete(); //delete void_application (which denotes user has removed all applications) if present
			$data = Input::all();
			$application_name = $data['application_name'];					
			$application = DB::table('applications')->where('application_name', $application_name)->first(); //check whether application_name is valid
			if($application)
			{   
				DB::table('application_preference')->insert(  array('application_id' => $application->id, 'user_id' => Auth::user()->id)	);
			}

			
		}
		
	}
	public function remove_app(){
		if(Auth::check())
		{
			$data = Input::all();
			$application_name = $data['application_name'];
			$application = DB::table('applications')->where('application_name', $application_name)->first();
			if($application)
			{  
				DB::table('application_preference')->where('application_id', $application->id )->where('user_id',  Auth::user()->id)->delete();
			}

		}
	}
	public function add_default_apps(){

		foreach ($this->default_applications as $default_application) {
			DB::table('application_preference')->insert(  array('application_id' => $default_application, 'user_id' => Auth::user()->id)	);
		}
		
	}

	public function isApplicationPreferenceEmpty(){
		$count = DB:: table('application_preference')->where('user_id',Auth::user()->id)->count();
		if($count===0)
			return true;
		return false;
	}

	public function show_apps(){
		if(Auth::check())
		{
			if(!$this->isApplicationPreferenceEmpty()) //user has preferences
			{ 
				$applications = DB::table('application_preference')
				->join('applications', 'application_preference.application_id', '=', 'applications.id')
				->select('applications.application_name', 'applications.id', 'applications.html', 'applications.js', 'applications.dependency')
				->where('user_id', Auth::user()->id )
				->orderBy('application_preference.application_id', 'asc')
				->get();
			    
				return $applications;
			}
			else //user is newly registered 
			{	
				$this->add_default_apps();
				$applications = DB::table('application_preference')
				->join('applications', 'application_preference.application_id', '=', 'applications.id')
				->select('applications.application_name', 'applications.id', 'applications.html', 'applications.js', 'applications.dependency')
				->where('user_id', Auth::user()->id )
				->orderBy('application_preference.application_id', 'asc')
				->get();
		    	return $applications;
			}
  
		}
		else{ //user is guest

			$applications = DB::table('applications')
                    ->whereIn('id', $this->default_applications)->get();
		    return $applications;

		}

	}
}