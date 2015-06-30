@extends('layouts.master')
@section('head')

<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="/js/jquery.lazyload.min.js"></script>
<script type="text/javascript" src='/js/moment.min.js'></script>
<script type="text/javascript" src="/dist/applications.min.js"></script>

@stop
@section('content')

@include('layouts/partials/modals')
@include('layouts/partials/tv_schedule_modal')


<div id="logo_container">
	<img style="float:left; width:35px ;height:30px; margin-right:10px;" src="/img/home.png"/><h1>my FRONTPAGE <button class="btn btn-sm btn-default pull-right"  id="add_feeds">add feeds</button></h1>
</div>	

@foreach($applications_with_slots as $application)

		{{$application->html}}
		@if($application->dependency)
			<script id="{{$application->application_name}}_dependency" src="{{$application->dependency}}"></script>
		@endif 
		@if($application->js)
			<script id="{{$application->application_name}}_js" src="{{$application->js}}"></script>
		@endif
@endforeach
<div id="footer" class="col-sm-12">
	<p ><span>Copyright &#169; 2015 MyFrontpage.  All rights reserved  </span><a href="privacypolicy.htm" target='blank'>privacy</a> | <a href='http://goo.gl/forms/WVvJduvlPw' target='blank'>contact</a></p>
</div>	
@stop