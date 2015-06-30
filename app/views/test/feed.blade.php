@extends('layouts.master')
@section('head')
<script type="text/javascript" src="/js/jquery.lazyload.min.js"></script>
<script type="text/javascript" src='/js/moment.min.js'></script>
<script type="text/javascript" src='/js/fullcalendar.min.js'></script>
<script type="text/javascript" src="/js/applications.min.js"></script>
<script type="text/javascript" src="/js/gcal.js"></script>
@stop
@section('content_with_no_sidebar')
@include('layouts/partials/modals')
<div id="content">
@foreach ($user_applications as $application)
     {{$application->html}}
     <script src="/js/{{$application->application_name}}.js"></script>           
  @endforeach
</div>
<button class="btn btn-sm btn-default pull-right"  id="add_feeds">add feeds</button>
{{-- <script type="text/javascript" src='/js/add_feeds(remove_switchcase).js'></script> --}}
{{-- <script type="text/javascript" src='/js/add_feeds_old.js'></script> --}}
@stop