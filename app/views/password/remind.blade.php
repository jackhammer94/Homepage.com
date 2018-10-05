@extends('layouts.master')
@section('content_with_no_sidebar')
  <div class='col-xs-12 col-lg-4 col-lg-offset-4'>
 	@include('flash::message') 
 	<div  class="col-xs-12" style="background:white; border-top: 2px solid #422150;">
	<h3><b>Reset Your Password</b></h3>

	{{Form::open()}}
	<div  class="form-group">
		{{Form::label('email','Enter Email Address')}}
		{{Form::email('email',null, ['class'=>'form-control', 'required'=>'required'])}}
	</div>

	<div  class="form-group">
		{{Form::submit('Reset', ['class'=>'btn btn-primary'])}}
	</div>

	{{Form::close()}}

	@if(Session::has('error'))
		<p style="color:red;">{{Session::get('error')}}</p>
	@elseif(Session::has('status'))
		<p style="color:blue;">{{Session::get('status')}}</p>
	@endif
</div>
@stop