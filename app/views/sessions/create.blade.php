@extends('layouts.master')
@section('meta-title', 'log in')
@section('content_with_no_sidebar')
 <div class='col-xs-12 col-lg-4 col-lg-offset-4'>
 	@include('flash::message') 
 	<div  class="col-xs-12" style="background:white; border-top: 2px solid #422150;">
	<h3><b>Log In</b></h3>
	{{Form::open(['route'=>'sessions.store'])}}

	        <div class="form-group">
	        	{{Form::label('email','Email:')}}
	        	{{Form::text('email', null, ['class'=>'form-control','required'=>'required', 'placeholder' => 'enter email..'])}}
	        	{{$errors->first('email','<span class="error">:message</span>')}}
	        </div>

	        <div class="form-group">
	        	{{Form::label('password','Password:')}}
	        	{{Form::password('password', ['class'=>'form-control','required'=>'required', 'placeholder' => 'enter password..'])}}
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
    </div>
@stop