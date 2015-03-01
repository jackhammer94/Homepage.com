@extends('layouts.master')
@section('content')
	<h3><b>Resend activation mail</b></h3>

	{{Form::open(['route'=>'registration.postResend'])}}
	<div  class="form-group">
		{{Form::label('email','Enter Email Address')}}
		{{Form::email('email',null, ['class'=>'form-control', 'required'=>'required'])}}
	</div>

	<div  class="form-group">
		{{Form::submit('Resend', ['class'=>'btn btn-primary'])}}
	</div>

	{{Form::close()}}

	@if(Session::has('error'))
		<p style="color:red;">{{Session::get('error')}}</p>
	@elseif(Session::has('status'))
		<p style="color:blue;">{{Session::get('status')}}</p>
	@endif
@stop