@extends('layouts.master')
@section('head')
<script src="/js/moment.min.js"></script>
<script src="/js/livescoreTest.js"></script>
@stop
@section('content_with_no_sidebar')

<div class="col-sm-12" id="live-score">
	<h3  >Cricket</h3>
		<div id="cricket" role="tabpanel">		
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#cricket-1" aria-controls="cricket-1" role="tab" data-toggle="tab"><b>LIVE</b></a></li>
			<li role="presentation"><a href="#cricket-2" aria-controls="cricket-2" role="tab" data-toggle="tab"><b>RECENT</b></a></li>
			<li role="presentation"><a href="#cricket-3" aria-controls="cricket-3" role="tab" data-toggle="tab"><b>UPCOMING</b></a></li>
		</ul>
		<div class="tab-content">
			<div id="cricket-1"   role="tabpanel" class="tab-pane active" >
				<div class='loader'><i class="fa fa-spinner fa-pulse"></i> searching..</div>
			</div>
			<div id="cricket-2"  role="tabpanel" class="past-matches tab-pane ">
				<div id="pastMatchCarousel" class="carousel slide" data-ride="carousel" data-interval="false" data-wrap="true">
			    <!-- Wrapper for slides -->
			    <div class="carousel-inner" role="listbox">
			    </div>
			    <!-- Left and right controls -->
			    <a class="left carousel-control" href="#pastMatchCarousel" role="button" data-slide="prev" style="display:none">
			      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			    </a>
			    <a class="right carousel-control" href="#pastMatchCarousel" role="button" data-slide="next">
			      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			    </a>
			  </div>
			</div>
			<div id="cricket-3"   role="tabpanel" class="upcoming-matches tab-pane ">
				<div id="upcomingMatchCarousel" class="carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">
			    <!-- Wrapper for slides -->
			    <div class="carousel-inner" role="listbox">
			    </div>
			    <!-- Left and right controls -->
			    <a class="left carousel-control" href="#upcomingMatchCarousel" role="button" data-slide="prev" style="display:none">
			      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			    </a>
			    <a class="right carousel-control" href="#upcomingMatchCarousel" role="button" data-slide="next">
			      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			      
			    </a>
			  </div>
			</div>	
		</div>
	</div> 
</div>

@stop