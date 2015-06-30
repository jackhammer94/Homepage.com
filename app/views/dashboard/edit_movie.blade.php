@extends('layouts.master')
 
@section('title') Edit movie @stop
 
@section('content_with_no_sidebar')
 
<div >   

    <h3> Edit movie</h3>

    {{ Form::open( ['role' => 'form', 'url' => '/admin/update_movie/'.$id, 'method' => 'PUT']) }}
    <div class='form-group'>
        {{ Form::label('title', 'title') }}
        {{ Form::text('title', $movie->title,  ['required'=>'required', 'placeholder' => 'title', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::label('image', 'image link') }}
        {{ Form::text('image', $movie->image,  ['required'=>'required','placeholder' => 'image', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::label('overview', 'overview') }}
        {{ Form::textarea('overview', $movie->overview, ['required'=>'required','placeholder' => 'overview', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::submit('save', ['class' => 'btn btn-primary']) }}
    </div>

    {{ Form::close() }}

</div>
 
@stop