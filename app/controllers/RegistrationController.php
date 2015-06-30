<?php

class RegistrationController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /registration
	 *
	 * @return Response
	 */
	public function index()
	{
		return View::make('registration.index');
	}

	/**
	 * Show the form for creating a new resource.
	 * GET /registration/create
	 *
	 * @return Response
	 */
	public function create()
	{
		if(Auth::check()) return Redirect::home();
		return View::make('registration.create');
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /registration
	 *
	 * @return Response
	 */
	public function store()
	{
		$confirmation_code = str_random(30);
		$inputData = Input::all();	
		$rules = array(
	      'username' => 'required|min:6|unique:users|alpha_dash',
	      'email' => 'required|email|unique:users',
	      'password' => 'required|min:6',
	      'password_confirmation' => 'required|same:password',
	    );
	    $messages = array(
   		  'email.unique' => 'An account with the given email address already exists!',
   		  'username.unique' =>'Username is not available!',
   		  'password_confirmation.same'=>'Passwords do not match!'
		);
		$validation=Validator::make($inputData, $rules, $messages); //the validator checks the input data against given rules, in our case email and password are required
		if($validation->fails())
			return  Redirect::back()->withInput()->withErrors($validation->messages());
		$user=new User;
		$user->username=Input::get('username');
		$user->email=Input::get('email');
		$user->password=Hash::make(Input::get('password'));
		$user->confirmation_code  = $confirmation_code;
		$user->save();

		 Mail::send('emails.verification', array('email'=>Input::get('email'),'confirmation_code'=>$confirmation_code), function($message){
	        $message->to(Input::get('email'))->subject('Welcome to Myfrontpage.in!');
   		 });

	Auth::login($user);
  	Flash::message('please verify with your email to activate your account!');
	return Redirect::home();
	}

	/**
	 * Display the specified resource.
	 * GET /registration/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return View::make('registration.show');
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /registration/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /registration/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /registration/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	 public function confirm($confirmation_code)
    {
        if( ! $confirmation_code)
        {
            //throw new InvalidConfirmationCodeException;
            return "Invalid Confirmation Code";
        }

        $user = User::whereConfirmationCode($confirmation_code)->first();

        if ( ! $user)
        {
            //throw new InvalidConfirmationCodeException;
            return "Invalid Confirmation Code";
        }

        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();

        Flash::message('You have successfully verified your account!'); //prints the message in to the  view given below

        return Redirect::to('login');
    }

    public function getResend()
    {
    	return View::make('registration.resend_activation');
    }

    public function postResend()
    {
    	$confirmation_code = str_random(30);	
    	$user=User::whereEmail(Input::get('email'))->first();
    	if(!$user)
    		{Flash::error('Invalid email'); return Redirect::back();   } 	
    	$user->confirmation_code  = $confirmation_code;
    	$user->save();
    	Mail::send('emails.verification', array('email'=>Input::get('email'),'confirmation_code'=>$confirmation_code), function($message){
	        $message->to(Input::get('email'))->subject('Welcome to Myfrontpage.in!');
	    });
	    Flash::message('Activation mail has been resent!');
	    return Redirect::back();
    }

}