<?php

class MoviesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /pages
	 *
	 * @return Response
	 */
	public function show_movies(){
		$movie_app_name = "Movies";
		$BASE_URL = "https://query.yahooapis.com/v1/public/yql";
		$movies='<div id="movies_outer" class="col-xs-12 application">
		<h3 >Movies<span><button  class="remove_button btn btn-xs btn-default pull-right" onclick="removeApp(\''.$movie_app_name.'\')"><i class="fa fa-times"></i></button></span></h3>
		<div id="'.$movie_app_name.'" role="tabpanel" class="application-inner">		
		<ul class="nav nav-tabs" role="tablist">
		<li role="presentation" class="active"><a href="#nowplaying" aria-controls="nowplaying" role="tab" data-toggle="tab">Now showing</a></li>
		<li role="presentation"><a href="#upcoming" aria-controls="upoming" role="tab" data-toggle="tab">Upcoming</a></li>
		</ul>
		<div class="tab-content">
		<div id="nowplaying"   role="tabpanel" class="tab-pane active" >';

		// nowplaying
		$yql_query = 'select * from html(10) where url="http://in.bookmyshow.com/chennai/movies/nowshowing" and xpath="//*[@id=\'divComingSoon\']/ul[1]"';

		$yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";

    // Make call with cURL
		$session = curl_init($yql_query_url);
		curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
		$json = curl_exec($session);
    // Convert JSON to PHP object 
		$phpObj =  json_decode($json);

    // Confirm that results were returned before parsing
		if(!is_null($phpObj->query->results)){
      // Parse results and extract data to display
			$i=0;
			foreach($phpObj->query->results->ul->li as $movie){
				if($i>9)
					break;
				$title = $movie->div->div[1]->ul->li[0]->a->content;
				$img_src = $movie->div->div[0]->img->src;
				$overview = $movie->div->div[1]->ul->li[1]->blockquote->content;
				$bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=".$title;
				$collapsible = ($i>2)?"collapsible":"";

				$movies .= "<div class='movie_entry ".$collapsible."'>";
				$movies .= "<img class='lazy' width='75' height='113' data-original='".$img_src."' style='float:left; margin-right:5px'></img>";
				$movies .="<span><b>".$title."</b></span><br>";
				$movies .="<p>".$overview."<br> <span><a href='".$bookmyshow."' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>";
				
				$i++;
			}
			$movies .='</div><div id="upcoming"  role="tabpanel" class=" tab-pane ">';
		}

			//upcoming
		$yql_query = 'select * from html(10) where url="http://in.bookmyshow.com/chennai/movies/comingsoon" and xpath="//*[@id=\'divComingSoon\']/ul[1]"';

		$yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";

    // Make call with cURL
		$session = curl_init($yql_query_url);
		curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
		$json = curl_exec($session);
    // Convert JSON to PHP object 
		$phpObj =  json_decode($json);

    // Confirm that results were returned before parsing
		if(!is_null($phpObj->query->results)){
      // Parse results and extract data to display
			$i=0;
			foreach($phpObj->query->results->ul->li as $movie){
				if($i>9)
					break;
				$title = $movie->div->div[1]->ul->li[0]->a->content;
				$img_src = $movie->div->div[0]->img->src;
				$overview = $movie->div->div[1]->ul->li[1]->blockquote->content;
				$release_date = $movie->div->div[2]->div->span->content;
				$bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=".$title;
				$collapsible = ($i>2)?"collapsible":"";

				$movies .= "<div class='movie_entry ".$collapsible."'>";
				$movies .= "<img class='lazy' width='75' height='113' data-original='".$img_src."' style='float:left; margin-right:5px'></img>";
				$movies .="<span><b>".$title."</b></span><br>";
				$movies .="<p>".$overview."<br> <span style='opacity:0.7;'>".$release_date." </span>  <span><a href='".$bookmyshow."' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>";
				
				$i++;
			}
			$movies .='</div></div></div></div><script>add_view_more_button("nowplaying");add_view_more_button("upcoming")</script>';
		}


    // No results were returned
		if(empty($movies)){
			$movies = "Sorry, there was an error while retrieving movies, please try again later!";
		}
    // Display results 
		//var_dump($movies);
		return $movies;
	}

	public function get_movies(){
		$movies = DB::select('select * from movies where type=? ', ["nowplaying"]);
		echo json_encode($movies);
	}

	public function get_upcoming_movies(){
		$movies = DB::select('select * from movies where type=? ', ["upcoming"]);
		echo json_encode($movies);
	}
}