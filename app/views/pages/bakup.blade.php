@extends('layouts.master')
@section('head')

<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="/js/jquery.lazyload.min.js"></script>

<!--fullcalendar-->
<link rel='stylesheet' href='/css/fullcalendar.min.css' />
<link href='/css/fullcalendar.print.css' rel='stylesheet' media='print' />
<script src='/js/moment.min.js'></script>
<script src='/js/fullcalendar.min.js'></script> 

<!-- include ytv  -->
<link href="/css/ytv.css" type="text/css" rel="stylesheet" />
<link href="/css/ytv_frame.css" type="text/css" rel="stylesheet"/>

<script src="/js/master.min.js"></script>
@stop
@section('content')

@include('layouts/partials/modals')
@include('layouts/partials/tv_schedule_modal')
<div class='row'>
	<div id="content" class="col-md-10" >
		<div id = "logo_container">
			<img style="float:left; width:35px ;height:30px; margin-right:10px;" src="/apple-icon-152x152.png"/><h1>my FRONTPAGE <button class="btn btn-sm btn-default pull-right"  id="add_feeds">add feeds</button></h1>
		</div>
		<div class="col-sm-12" id="search_box">
			<h3>Search</h3>
			<form target="_blank" role="form" id="search" autocomplete="off">
				<div class="form-group ">
					<div class="row">
						<div class="col-sm-9">
							<div class="input-group">
								<input type="text" name="q" size="40" maxlength="255" value="" id="input" class="form-control " placeholder="what are you looking for?" >			
								<div class="input-group-btn">			
									<button id = "google_button" type="button"  value="Google" class="btn btn-default  btn-responsive" title="search google">
										<i class="fa fa-google fa-lg"></i> 
									</button>
									<button id = "wikipedia_button" type="button"  value="Wikipedia" class="btn btn-default  btn-responsive" title="search wikipedia">
										<i class="icon-wikipedia"></i> 
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
		</div><!-- end of search-->

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
					<div id="cricket-2"  role="tabpanel" class="past-matches tab-pane "></div>
					<div id="cricket-3"   role="tabpanel" class="upcoming-matches tab-pane "></div>	
				</div>
			</div> 
		</div>

		<div id="feeds">
		</div>


		<div id='calendar_outer' class="col-sm-12">
			<h3>Calendar</h3>
			<div id='calendar'>
			</div>
			<p style="margin-top:10px; opacity:0.6;">Click on a date to add resizable and draggable events.</p>
		</div>
		<div id="dialog" title="" style="display:none;">Are you sure want to delete it?</div>

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
		
		<script>		
		window.controller = new YTV('frame', {

		//channelId:'UCAh9DbAZny_eoGFsYlH2JZw',
		playlist:'PL_yIBWagYVjyyqx_qPkbat5zufWZOyZEZ,PL_yIBWagYVjyIlTVNPVKZR_SoB53Sl2nc,PL8fVUTBmJhHJDAtZwiIOooPRurN0hna-j,PLiCvVJzBupKnKoAJR3T8NxXwA5mPeBD8W,PL_yIBWagYVjz8ioMD4wt5DOqgn2BwOJZ4,PLrEnWoR732-DZV1Jc8bUpVTF_HTPbywpE',
		browsePlaylists: true,
		chainVideos: false,
		responsive: true

	});
		</script>			  	
	</div>  
	<div id="footer" class="col-sm-12">
		
		<p><span>Copyright &#169; 2015 MyFrontpage.  All rights reserved  </span><a href="privacypolicy.htm" target='blank'>privacy</a> | <a href='http://goo.gl/forms/WVvJduvlPw' target='blank'>contact</a></p>
		
	</div>
</div> <!-- end of content-->
<div class="col-md-2">
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<!-- myfrontpage-sidebar -->
	<ins class="adsbygoogle"
	style="display:block"
	data-ad-client="ca-pub-9256615353456962"
	data-ad-slot="3759797537"
	data-ad-format="auto"></ins>
	<script>
	(adsbygoogle = window.adsbygoogle || []).push({});
	</script>
</div>
</div> <!-- end of row-->

@stop