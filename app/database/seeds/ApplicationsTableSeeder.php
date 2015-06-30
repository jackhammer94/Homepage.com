<?php
//we use void channel to denote the user has deleted all apps
class ApplicationsTableSeeder extends Seeder {

	public function run()
	{   
		$app_names = array(
			"calendar"=>"Calendar",
			"cricket"=>"Cricket_live_score",
			"search"=>"Search_box",
			"gmail"=>"Gmail",
			"feeds"=>"feeds",
			"movies"=>"Movies",
			"youtube"=>"Youtube",
			"todo"=>"To_Do",
			"tv_schedule"=>"TV_Schedule");
		DB::table('applications')->insert(array(
			array('application_name'=>'void_application', 'html'=>'nil', 'js'=>'nil', 'dependency'=>null, 'application_logo'=>'nil'),
			array('application_name'=>$app_names['search'], 'html'=>'<div class="col-xs-12 application" id="search_outer">
				<h3>Search<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['search'].'\')"><i class="fa fa-times"></i></button></span></h3>
				<div id="'.$app_names['search'].'" class="application-inner">
				<form  target="_blank" role="form" id="search" autocomplete="off">
				<div class="form-group ">
				<div class="row">
				<div class="col-xs-12">
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
				<div class="col-xs-3" id="search-0"></div><div  class="col-xs-3" id="search-1"></div><div  class="col-xs-3" id="search-2"></div><div  class="col-xs-3" id="search-3"></div>
				</div>	
				</div>
				</div><!-- end of search-->', 'js'=>'/dist/Search_box.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-search"></i>'),
array('application_name'=>$app_names['cricket'], 'html'=>'<div class="col-xs-12 application" id="cricket_outer">
	<h3>Cricket<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['cricket'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="'.$app_names['cricket'].'" role="tabpanel" class="application-inner">		
	<ul class="nav nav-tabs" role="tablist">
	<li role="presentation" class="active"><a href="#cricket-1" aria-controls="cricket-1" role="tab" data-toggle="tab">live</a></li>
	<li role="presentation"><a href="#cricket-2" aria-controls="cricket-2" role="tab" data-toggle="tab">recent</a></li>
	<li role="presentation"><a href="#cricket-3" aria-controls="cricket-3" role="tab" data-toggle="tab">upcoming</a></li>
	</ul>
	<div class="tab-content">
	<div id="cricket-1"   role="tabpanel" class="tab-pane active" >
	<div class="loader"><i class="fa fa-spinner fa-pulse"></i> searching..</div>
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
	</div>' , 'js'=>'/dist/Cricket_live_score.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-bell"></i>'),
array('application_name'=>$app_names['feeds'], 'html'=>'<div id="'.$app_names['feeds'].'"></div>', 'js'=>'/dist/feeds.min.js','dependency'=>null, 'application_logo'=>'feed'),
array('application_name'=>$app_names['gmail'], 'html'=>'<div id = "gmail_outer"  class="col-xs-12 application">
	<h3>Gmail<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['gmail'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="gmail_middle" >
	<div id="'.$app_names['gmail'].'" class="application-inner">
	<div id = "gmail_unread">				
	<div id = "mail_loader" align="center" style="vertical-align:middle;"> <i   class="fa fa-spinner fa-pulse"></i></div>
	</div>
	<div id="gmail_read"></div>
	<div id="gmail_footer" style="display:none">
	<a href="https://mail.google.com/mail/u/0/#compose"  style="font-size:small" target="blank"><i class="fa fa-pencil-square fa-lg"></i> Compose  </a>
	<a href="https://mail.google.com" target="blank" style="font-size:small;margin-left:5px"><i class="fa fa-sign-out fa-lg"></i> Go to inbox</a>
	</div>			
	</div>
	</div>
	</div>', 'js'=>'/dist/Gmail.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-envelope"></i>'),
array('application_name'=>$app_names['calendar'], 'html'=>'<div id="calendar_outer" class="col-xs-12 application">
	<h3>Calendar<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['calendar'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="'.$app_names['calendar'].'" class="application-inner">
	</div>
	<p style="margin-top:10px; opacity:0.6;">Click on a date to add resizable and draggable events.</p>
	</div>', 'js'=>'/dist/Calendar.min.js', 'dependency'=>'/js/fullcalendar.min.js', 'application_logo'=>'<i class="fa fa-calendar"></i>'),
array('application_name'=>$app_names['todo'], 'html'=>'<div class="col-xs-12 application" id="todo_outer">
	<h3>To Do<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['todo'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="'.$app_names['todo'].'" class="application-inner">
	<form role="form" onkeypress="return event.keyCode != 13;">
	<div class="form-group  ">
	<div class="row">
	<div class="col-xs-12 col-md-8">
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
	</div>', 'js'=>'/dist/To_Do.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-list"></i>'),
array('application_name'=>$app_names['movies'], 'html'=>'<div id="movies_outer" class="col-xs-12 application">
	<h3 >Movies<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['movies'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="'.$app_names['movies'].'" role="tabpanel" class="application-inner">		
	<ul class="nav nav-tabs" role="tablist">
	<li role="presentation" class="active"><a href="#nowplaying" aria-controls="nowplaying" role="tab" data-toggle="tab">Now showing</a></li>
	<li role="presentation"><a href="#upcoming" aria-controls="upoming" role="tab" data-toggle="tab">Upcoming</a></li>
	</ul>
	<div class="tab-content">
	<div id="nowplaying"   role="tabpanel" class="tab-pane active" ></div>
	<div id="upcoming"  role="tabpanel" class=" tab-pane "></div>
	</div>
	</div> 
	</div>', 'js'=>'/dist/Movies.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-film"></i>'),
array('application_name'=>$app_names['tv_schedule'], 'html'=>'<div id="tv_schedule_outer" class="col-xs-12 application">
	<h3>TV schedule<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['tv_schedule'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="'.$app_names['tv_schedule'].'" class="application-inner">
	</div>
	<button id="add_channel_button" class="btn btn-primary">Add channels</button>
	</div>', 'js'=>'/dist/TV_Schedule.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-desktop"></i>'),
array('application_name'=>$app_names['youtube'], 'html'=>'<div id="youtube_outer" class="col-xs-12 application" >
	<h3 >Trending on Youtube<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$app_names['youtube'].'\')"><i class="fa fa-times"></i></button></span></h3>
	<div id="'.$app_names['youtube'].'" class="application-inner"></div>		
	</div>', 'js'=>'/dist/Youtube.min.js','dependency'=>null, 'application_logo'=>'<i class="fa fa-youtube-play"></i>')

));
}

}