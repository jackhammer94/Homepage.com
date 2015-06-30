@extends('layouts.master')
@section('head')
<script type="text/javascript" src='/js/moment.min.js'></script>
<script type="text/javascript" src='/js/fullcalendar.min.js'></script>
<script type="text/javascript" src="/js/calendar.js"></script>
<script type="text/javascript" src="/js/gcal.js"></script>
<script>

	var base_url = window.location.origin;

</script>

@stop
@section('content_with_no_sidebar')
@include('layouts/partials/calendar_modals')
<div id='calendar_outer' class="col-sm-12">
 			<h3>Calendar</h3>
 			<div id='calendar'>
 			</div>
 			<p style="margin-top:10px; opacity:0.6;">Click on a date to add resizable and draggable events.</p>
 		</div>


@stop