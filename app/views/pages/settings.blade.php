@extends('layouts.master')

@section('title') Settings @stop

@section('content_with_no_sidebar')

<div class='col-lg-4 col-lg-offset-4'>

    @if ($errors->has())
    @foreach ($errors->all() as $error)
    <div class='bg-danger alert'>{{ $error }}</div>
    @endforeach
    @endif

    <h1><i class='fa fa-user'></i> Settings</h1>

    {{ Form::open( ['role' => 'form', 'url' => '/update_email/'. Auth::user()->id, 'method' => 'PUT']) }}

    <div class='form-group'>
        {{ Form::label('email', 'Change Email') }}
        {{ Form::email('email', Auth::user()->email, ['placeholder' => 'Email', 'class' => 'form-control']) }}
    </div>
    <div class='form-group'>
        {{ Form::submit('save', ['class' => 'btn btn-primary']) }}
    </div>

    {{ Form::close() }}

    {{ Form::open( ['role' => 'form', 'url' => '/update_password/'. Auth::user()->id, 'method' => 'PUT']) }}
    <div class='form-group'>
        {{ Form::label('password', 'Change Password') }}
        {{ Form::password('password', ['required'=>'required', 'placeholder' => 'Password', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::label('password_confirmation', 'Confirm Password') }}
        {{ Form::password('password_confirmation', ['required'=>'required','placeholder' => 'Confirm Password', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::submit('save', ['class' => 'btn btn-primary']) }}
    </div>

    {{ Form::close() }}

</div>

@stop