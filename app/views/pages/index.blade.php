@extends('layouts.master')

@section('content')
 <h1>
 	{{ Auth::check()?"Welcome, ".Auth::user()->username: "Why Don't You Sign Up?"}}
 </h1>
 @stop