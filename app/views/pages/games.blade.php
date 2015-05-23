@extends('layouts.master')
@section('head')
<script src='//static.miniclipcdn.com/js/game-embed.js'></script>
<script src="/js/show_games.js"></script>
@stop
@section('content')
<!-- Place this code where you'd like the game to appear -->
@include('games.list');
@stop