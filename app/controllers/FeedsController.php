<?php

class FeedsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /calendar
	 *
	 * @return Response
	 */
	public function add_feed()
	{
		if(Auth::check())
		{   
			DB::table('feed_preference')->where('feed_id', 1 )->where('user_id',  Auth::user()->id)->delete(); //delete void_feed (which denotes user has removed all feeds) if present
			$data = Input::all();
			$feed_name = $data['feed'];					
			$feed = DB::table('feeds')->where('feed_name', $feed_name)->first(); //check whether feed_name is valid
			if($feed)
			{   
				DB::table('feed_preference')->insert(  array('feed_id' => $feed->id, 'user_id' => Auth::user()->id)	);
			}

			
		}
		
	}

	public function add_default_feeds(){


		$default_feeds = [64,7,14, 44];
		foreach ($default_feeds as $default_feed) {
			DB::table('feed_preference')->insert(  array('feed_id' => $default_feed, 'user_id' => Auth::user()->id)	);
		}
		
	}

	public function isFeedPreferenceEmpty(){
		$count = DB:: table('feed_preference')->where('user_id',Auth::user()->id)->count();
		if($count===0)
			return true;
		return false;
	}

	public function remove_feed(){
		if(Auth::check())
		{
			$data = Input::all();
			$feed_name = $data['feed'];
			$feed = DB::table('feeds')->where('feed_name', $feed_name)->first();
			if($feed)
			{  
				DB::table('feed_preference')->where('feed_id', $feed->id )->where('user_id',  Auth::user()->id)->delete();
			}

		}
	}

	public function get_feed_url(){
		$data = Input::all();
		$feed = DB::select('select feed_url from feeds where feed_name = ?', [$data['feed_name']]);
		return $feed;
	}

	public function show_feeds(){
		if(Auth::check())
		{
			if(!$this->isFeedPreferenceEmpty()) //user has preferences
			{ 
				$feeds = DB::table('feed_preference')
				->join('feeds', 'feed_preference.feed_id', '=', 'feeds.id')
				->select('feeds.feed_name', 'feeds.feed_url')
				->where('user_id', Auth::user()->id )
				->orderBy('feed_preference.created_at', 'desc')
				->get();

				return $this->generate_html($feeds);
			}
			else //user is newly registered 
			{	
				$this->add_default_feeds();
				$feeds = DB::table('feed_preference')
				->join('feeds', 'feed_preference.feed_id', '=', 'feeds.id')
				->select('feeds.feed_name', 'feeds.feed_url')
				->where('user_id', Auth::user()->id )
				->orderBy('feed_preference.created_at', 'desc')
				->get();
				return $this->generate_html($feeds);
			}

		}
		else{ //user is guest

			$feeds = DB::table('feeds')
			->whereIn('id', array(64,7,14, 44))->get();
			return $this->generate_html($feeds);

		}

	}

	public function generate_html($feeds){
		$feed_div = "<div id='feeds'>";
		$BASE_URL = "https://query.yahooapis.com/v1/public/yql";
		foreach($feeds as $feed){
			$name = $feed->feed_name;
			switch ($name) {
			    case "wikiquote_-_quote_of_the_day":
			      $feed->xpath = '//*[@id=\'mf-qotd\']/div/div[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody';
			      $feed_div .= $this->generate_scraped_html($feed);
			      break;
			    case "wikipedia_-_did_you_know":
			      $feed->xpath = '//*[@id=\'mp-dyk\']/ul/li';
			      $feed_div .= $this->generate_scraped_html($feed);
			      break;
			    case "wikipedia_-_on_this_day":
			      $feed->xpath = '//*[@id=\'mp-right\']/tbody/tr[4]';
			      $feed_div .= $this->generate_scraped_html($feed);
			      break;
			    default:
			      $feed->xpath = "";

			  }
			  if($feed->xpath!=="")
			  	continue;
			//var_dump($feed);
			$yql_query = "select * from rss where url='".$feed->feed_url."' limit 10";
			$yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
			//var_dump($yql_query_url);
			$feed_div .="<div class='news_feed_outer col-xs-12'><h3>" . str_replace("_", " ", $feed->feed_name) . "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"".$feed->feed_name."\")'><i class='fa fa-times'></i></button></span></h3>";
			$feed_div .="<div id='". $feed->feed_name. "' class='feeds news_feed'>";
			
			$session = curl_init($yql_query_url);
			curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
			$json = curl_exec($session);
    		// Convert JSON to PHP object 
			$phpObj =  json_decode($json);
			//var_dump($phpObj);
    		// Confirm that results were returned before parsing
			if(!is_null($phpObj->query->results)){
				$items = $phpObj->query->results->item;
				$no_items = sizeof($items);
				//$i, $title, $link, $desc, $image_node, $image, $html_str, $temp, $imagetag, $encoded, $patt, $res, $image_html, $pub_date, $ago, $output, $collapsible;
				$entries_threshold = 3;

				for ($i = 0; $i < $no_items; $i++) {
					$title = is_string($items[$i]->title) ? $items[$i]->title : ( isset($items[$i]->title[0]) ? $items[$i]->title[0] : "");
					$link = is_string($items[$i]->link) ? $items[$i]->link :(isset($items[$i]->link[0]) && isset($items[$i]->link[0]->href) ? $items[$i]->link[0]->href : "");
					if ($title && $link) {
						$desc =is_string($items[$i]->description)? $items[$i]->description: (isset($items[$i]->description[0])? $items[$i]->description[0] : "");
						$encoded = (isset($items[$i]->encoded)===true) ? $items[$i]->encoded : "";

						$image_node = (isset($items[$i]->thumbnail)===true) ? ((is_array($items[$i]->thumbnail) === true) ? $items[$i]->thumbnail[0] : $items[$i]->thumbnail) : "";
						$image = ($image_node!=="") ? (isset($image_node->url) ? $image_node->url : $image_node) : "";

				        if ($image === '' && isset($items[$i]->enclosure)) //check for array
				        $image = isset($items[$i]->enclosure->url) ? $items[$i]->enclosure->url : '';
				        if ($image === '' && isset($items[$i]->content))
				        	$image = isset($items[$i]->content->url) ? $items[$i]->content->url : '';
				        if ($image === '' && isset($items[$i]->imgURL))
				        	$image = $items[$i]->imgURL;
				        if ($image === '' && isset($items[$i]->image))
				        	$image = isset($items[$i]->image->url) ? $items[$i]->image->url : $items[$i]->image;
				        if ($image === '' && isset($items[$i]->postimage))
				        	$image = $items[$i]->postimage;
				        if ($image === '' && isset($items[$i]->imageThumb))
				        	$image = $items[$i]->imageThumb;
				        if ($image === '' && isset($items[$i]->group))
				        	$image = (isset($items[$i]->group->content) && isset($items[$i]->group->content->url)) ? $items[$i]->group->content->url : "";

				        //extracting images from encoded section
				        if ($image === "" && isset($items[$i]->encoded)) {
				        	$html_str = $encoded;
				        	$doc = new DOMDocument();
				        	@$doc->loadHTML($html_str);
				        	$tags = $doc->getElementsByTagName('img');
				        	$imagetags = iterator_to_array($tags); //converting DOMNodelist to array

				        	$imagetag =(sizeof($imagetags)!==0) ? $imagetags[0] : null;
				        	if ($imagetag && $imagetag->hasAttribute("src")) {
				        		if ($imagetag->hasAttribute("height") && $imagetag->hasAttribute("width"))
				        		{
				        			$image = ($imagetag->getAttribute("width") < 50 || $imagetag->getAttribute("height") < 50) ? "" : $imagetag->getAttribute("src");
				                $imagetag->setAttribute('src' , ''); //prevent browser from downloading image
				            }
				            else
				            {
				            	$image = $imagetag->getAttribute("src");
				            	$imagetag->setAttribute('src', '');
				            }
				        } else
				        $image = "";
				    }

					        //extracting images from desc
				    if ($image === "" && isset($items[$i]->description)) {
				    	$html_str = $desc;
				    	$doc = new DOMDocument();
				    	@$doc->loadHTML($html_str);
				    	$tags = $doc->getElementsByTagName('img');
				    	$imagetags = iterator_to_array($tags); //converting DOMNodelist to array
				    	//var_dump($imagetags);
			    		$imagetag =(sizeof($imagetags)!==0) ? $imagetags[0] : null;
				    	//var_dump($imagetag);
				    	if ($imagetag && $imagetag->hasAttribute("src")) {
				    		if ($imagetag->hasAttribute("height") && $imagetag->hasAttribute("width"))
				    		{
				    			$image = ($imagetag->getAttribute("width") < 50 || $imagetag->getAttribute("height") < 50) ? "" : $imagetag->getAttribute("src");
					                $imagetag->setAttribute('src' , ''); //prevent browser from downloading image
					            }
					            else
					            {
					            	$image = $imagetag->getAttribute("src");
					            	$imagetag->setAttribute('src', '');
					            }
					        } else
					        $image = "";

					    }
					        // test for valid formats
					    $patt = '/\.(gif|jpg|jpeg|tiff|png)/i';
					    $res = preg_match($patt, $image);
					    if ($res === 0)
					    	$image = '';
					    if (!empty($image) && substr($image,0, 4) !== "http" && substr($image, 0, 2) !== "//")
					    	$image = '';
					    if (!empty($link) && substr($link, 0, 4) !== "http" && substr($link, 0, 2) !== "//")
					    	$link = '';

					    if (substr($name, 0, 8) == "BBC_News") {
					    	if (isset($items[$i]->thumbnail) && is_array($items[$i]->thumbnail))
					    		$image = (sizeof($items[$i]->thumbnail) > 1) ? $items[$i]->thumbnail[1]->url : $items[$i]->thumbnail[0]->url;
					    	else
					            $image = ""; //add default pic here
					    }

					    $image_html = ($image !== '') ? ("<img class='lazy' width='100' height='80'  align='left' data-original='".$image."'></img>") : '';
					    $pub_date = isset($items[$i]->pubDate) ? $items[$i]->pubDate : "";
					    $ago = $this->time_elapsed_string($pub_date);
				        if (substr($name, 0, 11) == "Google_News") { //google news
				        	$collapsible = ($i > 2) ? "collapsible" : "";
				        	$output = "<div class='entry  entry-".$i." ".$collapsible."'>".$desc."<hr/></div>";
				        } else {
				        	$desc = strip_tags($desc);
				        	$collapsible = ($i > $entries_threshold) ? "collapsible" : "";
				        	$output = "<div class='yahoo_news_entry " . $collapsible . " '><h3><a href='" . $link . "' target='blank'>" . $image_html . "<b>" . $title . "</b></a></h3><p>" . $desc . "</p><span class='time'>" . $ago . "</span><hr/></div>";
				        }

				        $feed_div .= $output;
				    }
				    else{
			        	$entries_threshold  = $entries_threshold+1; //1 entry was left out due to null title, so increase threshold which depends on forloop index by 1
			        }
			    } //end of for ie entries for single feed are inserted
			    $feed_div .= "<button type='button' class='collapse_button btn btn-link pull-right' onclick = 'show_more(\"".$name."\")'>view more</button>";
			    if (substr($name, 0, 11) == "Google_News") { //google news
			    	$feed_div .= '<script>
					  $("#'.$name.' a").attr("target", "blank");
					  $("#'.$name.' div.lh ").siblings().remove();
				      $("#'.$name.' div.lh .p").remove();
				      $("#'.$name.'  .entry table tr td:first-child font a font").remove(); //remove pic caption?
				      $("#'.$name.'  div.lh br:last-child").remove();
				      </script>';
				}
			    $feed_div .= "</div></div><script> $('#feeds .collapsible').hide(); $('#feeds img.lazy').lazyload({skip_invisible:true});</script>";
			    
			}//end of if null
			else{
				$feed_div .= "<div class='refresh_error'>please<button type='button' class='refresh_button btn btn-xs btn-link' onclick = 'getFeedWithNoUrl(\"".$name."\")'>refresh</button>or try again later!</div>";
				$feed_div .= "</div></div>";
			}
		}// end of foreach
		$feed_div .= '</div>';
return $feed_div;
}

public function generate_scraped_html($feed){
	$name = $feed->feed_name;
	$BASE_URL = "https://query.yahooapis.com/v1/public/yql";
	$yql_query = 'use "http://www.datatables.org/data/htmlstring.xml" as html.tostring;'.'select * from html.tostring where url="'.$feed->feed_url.'" and xpath="'.$feed->xpath.'"';
	$yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
	//var_dump($yql_query_url);
	$feed_div ="<div class='news_feed_outer col-xs-12'><h3>" . str_replace("_", " ", $feed->feed_name) . "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"".$feed->feed_name."\")'><i class='fa fa-times'></i></button></span></h3>";
	$feed_div .="<div id='". $feed->feed_name. "' class='feeds news_feed'>";

	$session = curl_init($yql_query_url);
	curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($session, CURLOPT_RETURNTRANSFER,true);
	$json = curl_exec($session);
	// Convert JSON to PHP object 
	$phpObj =  json_decode($json);
	//var_dump($phpObj);
	// Confirm that results were returned before parsing
	if(!is_null($phpObj->query->results)){
		if ($name == "wikiquote_-_quote_of_the_day") {
	      $raw_html = strip_tags($phpObj->query->results->result);//strip html
	      $quote =array();
	      $quote = explode('~', $raw_html); //separate the quote from author
	      $quote_author_link = "https://en.wikipedia.org/wiki/".trim($quote[1]);

	      $feed_div .= "<div class='entry container-fluid'><p><i class='fa fa-quote-left'></i> <i>".$quote[0]."</i> <i class='fa fa-quote-right'></i></p><span>~<a href='".$quote_author_link."' target='blank'>".$quote[1]."</a></span></div>";
	      $feed_div .= "</div></div>";
	      return $feed_div;
	    
	    } else {

	      $output = $phpObj->query->results->result;
	      $feed_div .= "<div class='entry container-fluid'>".$output."</div>";
	      if ($name == "wikipedia_-_on_this_day") { 
	        $feed_div .='<script>$("#mp-otd div").remove();$("#mp-otd ul").eq(1).remove();</script>';
	      }

	      $feed_div .= '</div></div><script>$("#'.$name.' a").attr("href", function(i, v) { 
				        return "https://en.wikipedia.org" + v;
				      });
				      $("#'.$name.' a").attr("target", "blank");</script>'; //make it open in new tab
		  return $feed_div;
	    }
	}
}
public function time_elapsed_string($datetime, $full = false) {
	date_default_timezone_set('Asia/Kolkata');
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' ago' : 'just now';
}
}