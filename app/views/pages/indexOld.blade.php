@extends('layouts.master')
@section('head')
<script>
  // $(function() {
  //   $( "#cricket" ).tabs({
  //    active: 0
  //  });
  // });
$(function () {
	$('#cricket a:first').tab('show')
})

</script>
<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>


<!-- include ytv  -->
<link href="/css/ytv.css" type="text/css" rel="stylesheet" />
<link href="/css/ytv_frame.css" type="text/css" rel="stylesheet"/>

<!-- news feed  
<script src="/js/jquery.newsTicker.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
google.load("feeds", "1")
</script>
-->
<link rel="stylesheet" href="/css/jquery.mCustomScrollbar.css" /> 
<script src="/js/jquery.mCustomScrollbar.concat.min.js"></script>
{{-- <script type="text/javascript" src="/js/favorites.js"></script>
<script src="/js/jquery.collapse.js"></script>
<script src="/js/jquery.collapse_storage.js"></script>
<script src="/js/themoviedb.min.js"> </script> --}}  
<script src="/js/nowplaying.js"></script> 
@stop
@section('content')

@include('layouts/partials/modals')



{{--  <div class="col-sm-12" id="search_box">
 	<h3>Search</h3>
 	<form  target="_blank" role="form" id="search" autocomplete="off">
 		<div class="form-group ">
 			<div class="row">
 				<div class="col-sm-12">
 					<div class="input-group">
 						<input type="text" name="q" size="40" maxlength="255" value="" id="input" class="form-control " placeholder="what are you looking for?" >			
 						<div class="input-group-btn">			
 							<button id = "google_button" type="button"  value="Google" class="btn btn-default  btn-responsive" title="search google">
 								<i class="fa fa-google fa-lg"></i> 
 							</button>
 							<button id = "wikipedia_button" type="button"  value="Wikipedia" class="btn btn-default  btn-responsive" title="search wikipedia">
 								<i class="fa fa-wikipedia"></i> 
 							</button>
 							<button id ="youtube_button" type="button"  value="youtube" class="btn btn-default  btn-responsive" title="search youtube">
 								<i class="fa fa-youtube fa-lg"></i> 
 							</button>
 							<button id = "imdb_button" type="button"  value="Imdb" class="btn btn-default  btn-responsive" title="search imdb">
 								<i class="fa  fa-film fa-lg"></i> 
 							</button>
 							<button id = "flipkart_button" type="button"  value="Flipkart" class="btn btn-default  btn-responsive" title="search flipkart">
 								<i class="fa fa-shopping-cart fa-lg"></i> 
 							</button>
 						</div>
 					</div><!-- end of input group -->
 				</div><!-- end of col -->
 			</div><!-- end of row -->	
 		</div><!--end of form-group-->
 	</form>
 	<div id="trending-searches" class="row">
 		<div class="col-md-3" id="search-0"></div><div  class="col-md-3" id="search-1"></div><div  class="col-md-3" id="search-2"></div><div  class="col-md-3" id="search-3"></div>
 	</div>	
 </div><!-- end of search-->

 <div class="col-sm-12" id="live-score">
 	<h3  >Cricket</h3>
 	<div id="cricket" role="tabpanel">		
 		<ul class="nav nav-tabs" role="tablist">
 			<li role="presentation" class="active"><a href="#cricket-1" aria-controls="cricket-1" role="tab" data-toggle="tab">live</a></li>
 			<li role="presentation"><a href="#cricket-2" aria-controls="cricket-2" role="tab" data-toggle="tab">recent</a></li>
 			<li role="presentation"><a href="#cricket-3" aria-controls="cricket-3" role="tab" data-toggle="tab">upcoming</a></li>
 		</ul>
 		<div class="tab-content">
 			<div id="cricket-1"   role="tabpanel" class="tab-pane active" >
 				<div class='loader'><i class="fa fa-spinner fa-pulse"></i> searching..</div>
 			</div>
 			<div id="cricket-2"  role="tabpanel" class="past-matches tab-pane ">
 				<div id="pastMatchCarousel" class="carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">
 					<!-- Wrapper for slides -->
 					<div class="carousel-inner" role="listbox">
 					</div>
 					<!-- Left and right controls -->
 					<a class="left carousel-control" href="#pastMatchCarousel" role="button" data-slide="prev" style="display:none">
 						<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
 						<span class="sr-only">Previous</span>
 					</a>
 					<a class="right carousel-control" href="#pastMatchCarousel" role="button" data-slide="next">
 						<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
 						<span class="sr-only">Next</span>
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
 						<span class="sr-only">Previous</span>
 					</a>
 					<a class="right carousel-control" href="#upcomingMatchCarousel" role="button" data-slide="next">
 						<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
 						<span class="sr-only">Next</span>
 					</a>
 				</div>
 			</div>	
 		</div>
 	</div> 
 </div>

 <div id="feeds">
 </div>
 @include('layouts/partials/gmail')
 <div id='calendar_outer' class="col-sm-12">
 	<h3>Calendar</h3>
 	<div id='calendar'>
 	</div>
 	<p style="margin-top:10px; opacity:0.6;">Click on a date to add resizable and draggable events.</p>
 </div>

 <div class="col-sm-12 " id="todo">
 	<h3>To Do</h3>
 	<form role="form" onkeypress="return event.keyCode != 13;">
 		<div class="form-group  ">
 			<div class="row">
 				<div class="col-sm-8">
 					<div class="input-group">
 						<input type="text"  maxlength="150"  class="form-control" id="task" placeholder="add new task">
 						<span class="input-group-btn">	
 							<button type="button" id="add_task_button" value="" class="btn btn-default  btn-responsive" title="add">
 								<i class="fa fa-plus"></i> add
 							</button>
 						</span>	
 					</div><!--end of input group-->
 				</div><!--end of col-->
 			</div><!--end of row-->
 		</div>
 	</form>
 </div>
 <div id='tv_schedule_outer' class="col-sm-12">
 	<h3>TV schedule</h3>
 	<div id='tv_schedule'>
 	</div>
 	<button id='add_channel_button' class='btn btn-primary'>Add channels</button>
 </div>

 <div id='movies_outer' class="col-sm-12">
 	<h3 >Movies</h3>
 	<div id="movies_tabs" role="tabpanel">		
 		<ul class="nav nav-tabs" role="tablist">
 			<li role="presentation" class="active"><a href="#nowplaying" aria-controls="nowplaying" role="tab" data-toggle="tab">Now showing</a></li>
 			<li role="presentation"><a href="#upcoming" aria-controls="upoming" role="tab" data-toggle="tab">Upcoming</a></li>
 		</ul>
 		<div class="tab-content">
 			<div id="nowplaying"   role="tabpanel" class="tab-pane active" ></div>
 			<div id="upcoming"  role="tabpanel" class=" tab-pane "></div>
 		</div>
 	</div> 
 </div>

 <div id="trending" class="col-sm-12" >
 	<h3 >Trending on Youtube</h3>
 	<div id="frame"></div>		
 </div>  --}} 
<div id="footer">
	<div class="container-fluid">
		<p align = 'center' class="muted credit"><a href="privacypolicy.htm" target='blank'>Privacy policy</a></p>
	</div>
</div>
@stop