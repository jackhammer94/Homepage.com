@extends('layouts.master')
@section('meta-title', 'log in')
@section('content')
 <div class='col-lg-4 col-lg-offset-4'>
	<h3><b>Log In</b></h3>
	{{Form::open(['route'=>'sessions.store'])}}

	        <div class="form-group">
	        	{{Form::label('email','Email:')}}
	        	{{Form::text('email', null, ['class'=>'form-control','required'=>'required'])}}
	        	{{$errors->first('email','<span class="error">:message</span>')}}
	        </div>

	        <div class="form-group">
	        	{{Form::label('password','Password:')}}
	        	{{Form::password('password', ['class'=>'form-control','required'=>'required'])}}
	        	{{$errors->first('password','<span class="error">:message</span>')}}
	        </div>

	        <div class="form-group">
			    {{Form::checkbox('remember_me','true')}} <!--irst arg is name of form elt ,and the second is the value-->
			    Keep me logged in
			</div>			

	        <div class="form-group">
	        	{{Form::submit('Log In', ['class'=>'btn btn-primary'])}}
	        </div>

	        <div  class="form-group">
				{{link_to("/password/remind", 'Forgot your password?')}}
			</div>
        
        {{Form::close()}}
    </div>
@stop