@extends('layouts.master')
@section('content')
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
@stop