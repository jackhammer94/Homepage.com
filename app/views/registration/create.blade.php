@extends('layouts.master')
@section('meta-title', 'register')
@section('content_with_no_sidebar')

<div class='col-xs-12 col-lg-4 col-lg-offset-4'>
	@include('flash::message') 
	<div  class="col-xs-12" style="background:white; border-top: 2px solid #422150;">
		<h3><b>Register</b></h3>
		{{Form::open(['route'=>'registration.store'])}}
		<div class="form-group">
			{{Form::label('username','Username:')}}
			{{Form:: text('username', null, ['class'=>'form-control','required'=>'required','placeholder' => 'enter username..'])}}
			{{$errors->first('username','<span class="error">:message</span>')}}
		</div>

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
			{{Form::label('password_confirmation','Confirm password:')}}
			{{Form::password('password_confirmation', ['class'=>'form-control','required'=>'required', 'placeholder' => 'confirm password..'])}}
			{{$errors->first('password_confirmation','<span class="error">:message</span>')}}
		</div>

		<div class="form-group">
			{{Form::submit('Create Account', ['class'=>'btn btn-primary'])}}
		</div>


		<div  class="form-group">
			{{link_to("/register/resend_activation", 'Resend activation mail?')}}
		</div>
		
		{{Form::close()}}
		
	</div>
	@stop
