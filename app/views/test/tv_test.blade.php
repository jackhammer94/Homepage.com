@extends('layouts.master')
@section('head')
<script type="text/javascript" src="/js/jquery.lazyload.min.js"></script>
<script>

	var base_url = window.location.origin;

</script>
@stop
@section('content_with_no_sidebar')
@include('layouts/partials/tv_schedule_modal')
<div id='tv_schedule_outer' class="col-sm-12">
	<h3>TV schedule</h3>
	<div id='tv_schedule'>
	</div>
	<button id='add_channel_button' class='btn btn-primary'>Add channels</button>
</div>
<div id = "output">
</div>
<script type="text/javascript" src='/js/tv_schedule.js'></script>
@stop