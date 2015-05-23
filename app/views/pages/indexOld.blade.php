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



<div id='body_test' >

	<img style="float:left; width:35px ;height:30px; margin-right:10px;" src="/img/home.png"/><h1>my FRONTPAGE <button class="btn btn-sm btn-default pull-right"  id="add_feeds">add feeds</button></h1>
	

	{{-- <div id='favorites' class="col-sm-12">
		<h3>Favorites</h3>
		<ul></ul>   
	</div>	 --}}	

	<div class="col-sm-12" id="google-search-test">
		<h3>Search</h3>
		<center>
			<form action="" target="_blank" role="form" id="search" autocomplete="off">
				<div class="form-group ">
					<div class="row">
						<div class="col-sm-9">
							<div class="input-group">
								<input type="text" name="q" size="40" maxlength="255" value="" id="input" class="form-control " placeholder="what are you looking for?" >			
								<span class="input-group-btn">			
									<button type="button" onclick="submitForm('https://www.google.co.in','/search?q=')" value="Google" class="btn btn-default  btn-responsive" title="search google"/>
									<i class="fa fa-google fa-lg"></i> <span id="button-text"></span>
								</button>
								<button type="button" onclick="submitForm('http://en.wikipedia.org','/wiki/Special:Search?search=')" value="Wikipedia" class="btn btn-default  btn-responsive" title="search wikipedia"/>
								<i class="icon-wikipedia"></i> <span id="button-text"></span>
							</button>
							<button type="button" onclick="submitForm('https://www.youtube.com','/results?q=')" value="youtube" class="btn btn-default  btn-responsive"title="search youtube"/>
							<i class="fa fa-youtube fa-lg"></i> <span id="button-text"></span>
						</button>
						<button type="button" onclick="submitForm('http://www.imdb.com','/find?ref_=nv_sr_fn&q=')" value="Imdb" class="btn btn-default  btn-responsive" title="search imdb"/>
						<i class="fa  fa-film fa-lg"></i> <span id="button-text"></span>
					</button>
					<button type="button" onclick="submitForm('http://www.flipkart.com','/search?q=')" value="Flipkart" class="btn btn-default  btn-responsive" title="search flipkart"/>
					<i class="fa fa-shopping-cart fa-lg"></i> <span id="button-text"></span>
				</button>
			</span>
		</div><!-- end of input group -->
	</div><!-- end of col -->
</div><!-- end of row -->	
</div><!--end of form-group-->
</form>
</center>		
</div><!-- end of search-->

<div class="col-sm-12" id="live-score">
	<h3  >Cricket</h3>
	@include('layouts/partials/livescore')
</div>
<script src="/js/livescore.js"></script>

<div id="feeds">
	{{-- <div class="col-sm-12" id="news-feed" >
		<h3  >Top Stories</h3>					

		<ul class="newsticker" id='feed1'></ul>

		<div align="center"> 
			<ul class="pagination" style="margin: 4px;">
				<li><span class="glyphicon glyphicon-chevron-down" id="next-button"></span></li>
				<li><span class="glyphicon glyphicon-chevron-up" id="prev-button"></span></li>

			</ul>
			<div class="clearfix"></div>
		</div>	   
	</div>    --}}
</div>


<script src="/js/add_feeds_test.js"></script>

<script type="text/javascript" src="/js/search.js"></script>   

<script type = "text/javascript" src = "/js/gmail.js"></script>
<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
<div id = "gmail_outer"  class="col-sm-12">
	<h3>Gmail</h3>
	<div id="gmail" class ="container-fluid">
		<button id="authorize-button" class="btn btn-xs btn-primary" style="visibility: hidden">Log In</button>
		<div id = "mail_loader" align="center" style="vertical-align:middle;"> <i   class="fa fa-spinner fa-pulse"></i></div>
	</div>
</div>


<div id='calendar_outer' class="col-sm-12">
	<h3>Calendar</h3>
	<div id='calendar'>
	</div>
	<p style="margin-top:10px; opacity:0.6;">Click on a date to add resizable and draggable events.</p>
</div>
<div id="dialog" title="" style="display:none;">Are you sure want to delete it?</div>
<script type="text/javascript" src="/js/calendar.js"></script>

<div class="col-sm-12 " id="todo">
	<h3>To Do</h3>
	<form role="form" onkeypress="return event.keyCode != 13;">
		<div class="form-group  ">
			<div class="row">
				<div class="col-sm-8">
					<div class="input-group">
						<input type="text"  maxlength="150"  class="form-control" id="task" placeholder="add new task">
						<span class="input-group-btn">	
							<button type="button" id="add_task_button" onclick="add_task()" value="" class="btn btn-default  btn-responsive" title="add"/>
							<i class="fa fa-plus"></i> add
						</button>
					</span>	
				</div><!--end of input group-->
			</div><!--end of col-->
		</div><!--end of row-->
	</div>
</form>
</div>
<script type="text/javascript" src='/js/todo.js'></script>





<div id='movies_outer' class="col-sm-12">
	<h3 >Movies</h3>
	<div id="movies_tabs" role="tabpanel">		
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#nowplaying" aria-controls="nowplaying" role="tab" data-toggle="tab"><b>Now showing</b></a></li>
			<li role="presentation"><a href="#upcoming" aria-controls="upoming" role="tab" data-toggle="tab"><b>Upcoming</b></a></li>
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
	<script type="text/javascript" src="/js/ytv.js"></script>
	<script>		
	window.controller = new YTV('frame', {
		user:'youtube',					
		playlist:'PL_yIBWagYVjyyqx_qPkbat5zufWZOyZEZ'

	});
	</script>			  	
</div>  
</div> <!-- end body-test-->
<div id="footer">
	<div class="container-fluid">
		<p align = 'center' class="muted credit"><a href="privacypolicy.htm" target='blank'>Privacy policy</a></p>
	</div>
</div>
@stop