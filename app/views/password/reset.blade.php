@extends('layouts.master')
@section('content_with_no_sidebar')
 <div class='col-xs-12 col-lg-4 col-lg-offset-4'>
 	@include('flash::message') 
 	<div  class="col-xs-12" style="background:white; border-top: 2px solid #422150;">
	<h3><b>Set Your New Password</b></h3>

	{{Form::open()}}
		<input type="hidden" name="token" value="{{$token}}">

		<div  class="form-group">
			{{Form::label('email', 'Email Address')}}
			{{Form::email('email',null, ['class'=>'form-control', 'required'=>'required'])}}
		</div>

		<div  class="form-group">
			{{Form::label('password', 'Password')}}
			{{Form::password('password',['class'=>'form-control'])}}
		</div>

		<div  class="form-group">
			{{Form::label('password_confirmation','Password Confirmation:')}}
			{{Form::password('password_confirmation',['class'=>'form-control'])}}
		</div>

		<div  class="form-group">
			{{Form::submit('Submit', ['class'=>'btn btn-primary'])}}
		</div>
	</form>
	@if(Session::has('error'))
		<p style="color:red;">{{Session::get('error')}}</p>
	@endif
</div>
@stop