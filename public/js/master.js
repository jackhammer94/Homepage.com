//feeds script
var base_url = "http://localhost:8080";
//var base_url = "http://myfrontpage.in";

$(document).ready(function() {

	$.ajax({
		type: "GET",
		url: base_url + '/show_feeds',
		success: function(result) {
			console.log("retrieved feeds Successfully", result);
			if (result !== "[]" && result !== "") {
				var feeds_obj = JSON.parse(result);
				var feed_names = JSON.parse(feeds_obj[0].feeds);
				console.log(feed_names); //parses the string to array
				if (feed_names) { //if feed names is not null( its null if all feeds are removed by user)

					feed_names.forEach(function(feed_name, index) {
						addFeed(feed_name);
					});
				}
			} else {
				addFeed("Google_News_-_India");
				addFeed("BBC_News_-_India");
				addFeed("Yahoo_News_-_movies");

			}
		},
		error: function() {
			console.log('error fetching feeds!');
		}

	});


	$("#add_feeds").on("click", function() { //when + button is clicked open dialog

		$("#add_feeds_modal").modal('show');
	});



});

function addFeed(name) {

	$("#" + name + "_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
	$("#" + name + "_button").prop("disabled", true); //disables add buttons for feeds already added
	$("#feeds").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
	getFeed(name);
}

function getFeed(name) {
		var feed_url;
		var page_url;
		var xpath;

		switch (name) {

			case "Yahoo_News_-_India":
				feed_url = 'https://in.news.yahoo.com/rss/india';
				break;
			case "Google_News_-_India":
				feed_url = 'https://news.google.co.in/news?cf=all&ned=in&hl=en&output=rss';
				break;
			case "BBC_News_-_India":
				feed_url = 'http://feeds.bbci.co.uk/news/world/asia/india/rss.xml';
				break;
			case "huffington_post_-_India":
				feed_url = 'http://www.huffingtonpost.in/feeds/verticals/india/news.xml';
				break;
			case "Indian_express":
				feed_url = 'http://indianexpress.com/print/front-page/feed/';
				break;
			case "hindustan_times":
				feed_url = 'http://feeds.hindustantimes.com/HT-HomePage-TopStories';
				break;
			case "ibnlive":
				feed_url = 'http://ibnlive.in.com/ibnrss/top.xml';
				break;
			case "CNN_-_World":
				feed_url = 'http://rss.cnn.com/rss/edition_world.rss';
				break;
			case "The_New_York_Times_-_World":
				feed_url = 'http://rss.nytimes.com/services/xml/rss/nyt/World.xml';
				break;
			case "BBC_News_-_World":
				feed_url = 'http://feeds.bbci.co.uk/news/world/rss.xml';
				break;



				/*entertainment*/
			case "Google_News_-_entertainment":
				feed_url = 'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=e&output=rss';
				break;
			case "Yahoo_News_-_movies":
				feed_url = 'https://in.movies.yahoo.com/rss/';
				break;
			case "empire_online":
				feed_url = 'http://rss.feedsportal.com/c/592/f/7507/index.rss';
				break;
			case "cracked":
				feed_url = 'feeds.feedburner.com/CrackedRSS';
				break;
			case "rollingstone":
				feed_url = 'http://www.rollingstone.com/news.rss';
				break;
			case "ign":
				feed_url = 'http://in.ign.com/feed.xml';
				break;
			case "bollywood_hungama":
				feed_url = 'http://www.bollywoodhungama.com/rss/news.xml';
				break;
			case "nowrunning_bollywood":
				feed_url = 'http://www.nowrunning.com/cgi-bin/rss/news_hindi.xml';
				break;
			case "nowrunning_kollywood":
				feed_url = 'http://www.nowrunning.com/cgi-bin/rss/news_tamil.xml';
				break;
			case "tamilstar":
				feed_url = 'http://www.tamilstar.com/english/rss-feed/rss10.php';
				break;
			case "filmibeat_kollywood":
				feed_url = 'http://www.filmibeat.com/rss/filmibeat-tamil-fb.xml';
				break;
			case "filmibeat_bollywood":
				feed_url = 'http://www.filmibeat.com/rss/filmibeat-bollywood-fb.xml';
				break;


				/*business*/
			case "Google_News_-_business":
				feed_url = 'https://news.google.co.in/news?cf=all&ned=in&hl=en&topic=b&output=rss';
				break;
			case "BBC_News_-_business":
				feed_url = 'http://feeds.bbci.co.uk/news/business/rss.xml';
				break;
			case "forbes":
				feed_url = 'http://www.forbes.com/most-popular/feed/';
				break;
			case "CNN_money":
				feed_url = 'http://rss.cnn.com/rss/money_latest.rss';
				break;
			case "inc_dot_com":
				feed_url = 'http://feeds.inc.com/home/updates';
				break;
			case "business_insider":
				feed_url = 'http://feeds2.feedburner.com/businessinsider';
				break;
			case "wall_street_journal":
				feed_url = 'http://www.wsj.com/xml/rss/3_7085.xml';
				break;


				/*health*/
			case "Google_News_-_health":
				feed_url = 'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=m&output=rss';
				break;
			case "Yahoo_News_-_lifestyle":
				feed_url = 'https://in.lifestyle.yahoo.com/rss/';
				break;
			case "webmd":
				feed_url = 'http://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC';
				break;
			case "BBC_News_-_health":
				feed_url = 'http://feeds.bbci.co.uk/news/health/rss.xml';
				break;
			case "medical_news_today":
				feed_url = 'http://www.medicalnewstoday.com/rss/featurednews.xml';
				break;
			case "healthline":
				feed_url = 'http://www.healthline.com/rss/health-news';
				break;
			case "health_dot_com":
				feed_url = 'http://www.health.com/health/diet-fitness/feed';
				break;



				/*tech*/
			case "BBC_News_-_technology":
				feed_url = 'http://feeds.bbci.co.uk/news/technology/rss.xml';
				break;
			case "Google_News_-_technology":
				feed_url = 'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=tc&output=rss';
				break;
			case "Yahoo_News_-_technology":
				feed_url = 'https://in.news.yahoo.com/rss/internet';
				break;
			case "gizmodo":
				feed_url = 'http://gizmodo.com/index.xml';
				break;
			case "techcrunch":
				feed_url = 'http://techcrunch.com/feed/';
				break;
			case "techradar":
				feed_url = 'http://techradar.com/rss/news';
				break;
			case "the_next_web":
				feed_url = 'http://feeds.feedburner.com/TheNextWebNetwork';
				break;


				/*science*/
			case "BBC_News_-_science":
				feed_url = 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk';
				break;
			case "Google_News_-_science":
				feed_url = 'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=snc&output=rss';
				break;
			case "scientific_american":
				feed_url = 'http://rss.sciam.com/ScientificAmerican-Global';
				break;
			case "NASA":
				feed_url = 'http://www.nasa.gov/rss/dyn/breaking_news.rss';
				break;
			case "science_daily":
				feed_url = 'http://feeds.sciencedaily.com/sciencedaily/top_news';
				break;
			case "science_mag":
				feed_url = 'http://news.sciencemag.org/rss/current.xml';
				break;
			case "live_science":
				feed_url = 'http://www.livescience.com/home/feed/site.xml';
				break;

				/*sports*/
			case "goal_dot_com":
				feed_url = 'http://www.goal.com/en/feeds/news?fmt=rss';
				break;
			case "BBC_News_-_football":
				feed_url = 'http://feeds.bbci.co.uk/sport/0/football/rss.xml?edition=int';
				break;
			case "bleacherreport":
				feed_url = 'http://bleacherreport.com/articles;feed?tag_id=20';
				break;
			case "espncricinfo":
				feed_url = 'http://www.espncricinfo.com/rss/content/story/feeds/6.xml';
				break;
			case "Yahoo_News_-_cricket":
				feed_url = 'https://in.news.yahoo.com/rss/cricket';
				break;
			case "BBC_News_-_cricket":
				feed_url = 'http://feeds.bbci.co.uk/sport/0/cricket/rss.xml?edition=uk';
				break;
			case "Google_News_-_sports":
				feed_url = 'http://news.google.co.in/news?cf=all&ned=in&hl=en&topic=s&output=rss';
				break;


				/*scraped feeds*/
			case "wikiquote_-_quote_of_the_day":
				page_url = 'https://en.wikiquote.org/wiki/Main_Page';
				xpath = '//*[@id=\'mf-qotd\']/div/div[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody';
				break;
			case "wikipedia_-_did_you_know":
				page_url = 'https://en.wikipedia.org/wiki/Main_Page';
				xpath = '//*[@id=\'mp-dyk\']/ul/li';
				break;
			case "wikipedia_-_on_this_day":
				page_url = 'https://en.wikipedia.org/wiki/Main_Page';
				xpath = '//*[@id=\'mp-right\']/tbody/tr[4]';
				break;
			default:
				feed_url = "";

		}
		if (feed_url) {

			$.ajax({
				url: "https://query.yahooapis.com/v1/public/yql",
				jsonp: "callback",
				dataType: "jsonp",
				data: {
					q: "select * from rss where url='" + feed_url + "' limit 10",
					format: "json",
					_maxage: 172800
				},
				// Work with the response
				success: function(data) {
					// console.log(data);
					displayFeed(data, name);
					var isshown = $("#add_feeds_modal").data('bs.modal') ? $("#add_feeds_modal").data('bs.modal').isShown : "";
					//console.log('isshown: ', isshown);
					if (isshown == true) //if the user is adding the feeds then save else the page is being loaded so don't save   
					{
						save_feeds();
					}
					$("#" + name + "_button").html("added");
				},
				error: function() {
					console.log('error fetching' + name + ' feed');
				}
			});

		} else {
			// console.log('page_url', page_url);
			// console.log('xpath', xpath);
			var query = 'use "http://www.datatables.org/data/htmlstring.xml" as html.tostring;' + 'select * from html.tostring where url="' + page_url + '" and xpath="' + xpath + '"';
			//console.log('query :', query); //use datatables to get stringified html else yql returns the text within hyperlinks separately from the quote
			$.ajax({
				url: "https://query.yahooapis.com/v1/public/yql",
				jsonp: "callback",
				dataType: "jsonp",
				data: {
					q: query,
					env: "store://RjdEzitN2Hceujh3tGHPj6",
					format: "json"
				},
				// Work with the response
				success: function(data) {
					// console.log(data);
					displayScrapedFeed(data, name);
					var isshown = $("#add_feeds_modal").data('bs.modal') ? $("#add_feeds_modal").data('bs.modal').isShown : "";
					//console.log('isshown: ', isshown);
					if (isshown == true) //if the user is adding the feeds then save else the page is being loaded so don't save   
					{
						save_feeds();
					}
					$("#" + name + "_button").html("added");
				},
				error: function() {
					console.log('error fetching' + name + ' feed');
				}
			});
		}
	}
	// Parses returned response and extracts
	// the title, links, and text of each news story.
function displayFeed(data, name) {
	// console.log(o);
	if (data.query.results) {
		console.log('feed: ', data.query.results);
		var items = data.query.results.item;
		var no_items = items.length;
		var i,title,link,desc,image,html_str,temp,imagetag,image,patt,res,image_html,pub_date,ago,output,isShown,collapsible;
		//create the master div for the feed
		// $("#feeds").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_feed_button btn btn-xs btn-default pull-right'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");

		for ( i = 0; i < no_items; i++) {
			 title = (Array.isArray(items[i].title) === true) ? items[i].title[0] :
				items[i].title ? items[i].title : "";
			 link = ((Array.isArray(items[i].link) === true) && items[i].link[0] && items[i].link[0].href) ? items[i].link[0].href :
				items[i].link ? items[i].link : "";
			 desc = (Array.isArray(items[i].description) === true) ? items[i].description[0] :
				items[i].description ? items[i].description : "";
			 image = (Array.isArray(items[i].thumbnail) === true) ? items[i].thumbnail[0].url :
				items[i].thumbnail ? items[i].thumbnail.url : "";

			if (image === '' && items[i].enclosure) //check for array
				image = items[i].enclosure.url ? items[i].enclosure.url : '';
			if (image === '' && items[i].content)
				image = items[i].content.url ? items[i].content.url : '';
			if (image === '' && items[i].group)
				image = (items[i].group.content && items[i].group.content.url) ? items[i].group.content.url : "";
			else if (items[i].imgURL) {
				image = items[i].imgURL;
			} else if (items[i].image && items[i].image.url) {
				image = items[i].image.url;
			}

			//extracting images from description
			if (image === "") {
				 html_str = desc;
				 temp = document.createElement('div');
				temp.innerHTML = html_str;
				 imagetag = temp.getElementsByTagName('img');
				 image = imagetag[0] ? imagetag[0].getAttribute("src") : "";
			}


			// test for valid formats
			 patt = /\.(gif|jpg|jpeg|tiff|png)/i;
			 res = patt.test(image);
			if (res === false)
				image = '';
			if (image && image.substr(0, 4) !== "http" && image.substr(0,2)!=="//")
				image = '';
			if (link && link.substr(0, 4) !== "http" && image.substr(0,2)!=="//")
				link = '';
			if (name.substr(0, 8) == "BBC_News") {
				if (items[i].thumbnail && Array.isArray(items[i].thumbnail))
					image = (items[i].thumbnail.length > 1) ? items[i].thumbnail[1].url : items[i].thumbnail[0].url;
				else
					image = " "; //add default pic here
			}

			 image_html = (image !== '') ? ("<img width='100' height='80' class='lazy' align='left' data-original='" + image + "'></img>") : '';

			 pub_date = items[i].pubDate ? items[i].pubDate : "";
			 ago = convert_time(pub_date);
			  if (name.substr(0, 11) == "Google_News") { //google news
			  	collapsible = (i>2)?"collapsible":"";
		        output = "<div class='entry  entry-" + i + " "+collapsible+"'>" + desc + "<hr/></div>";

		      } else
			 {
				desc = desc.replace(/<(?:.|\n)*?>/gm, ' ');				
				collapsible = (i>3)?"collapsible":"";
				output = "<div class='yahoo_news_entry "+collapsible+" '><h3><a href='" + link + "' target='blank'>" + image_html + "<b>" + title + "</b></a></h3><p>" + desc + "</p><span class='time'>" + ago + "</span><hr/></div>";
			}
			$("#" + name).append(output);
			if (name.substr(0, 11) == "Google_News") { //fixing css
				$("#" + name + " .entry-" + i + " div.lh font:first-child").append("<span class='time'>" + ago + "</span>");
				$('#' + name + ' a').attr('target', 'blank'); //make it open in new tab
			}
		}

		add_view_more_button(name);
		if (name.substr(0, 11) == "Google_News") { //fixing css

			$("div.lh ").siblings().remove();
			$("div.lh .p").remove();
			$("#" + name + " .entry table tr td:first-child font a font").remove(); //remove pic caption?
			$("#" + name + " div.lh br:last-child").remove();
		}


		 isshown = $("#add_feeds_modal").data('bs.modal') ? $("#add_feeds_modal").data('bs.modal').isShown : ""; //console.log('isshown: ',isshown);
		if (isshown == true) //only show console.log if user is currently adding the feed not during page load
			console.log(name + ' was added successfully');
	} else {
		console.log('error displaying feed, reload the page and try again!');
	}

}

function show_more(feed_name){
	$("#"+feed_name+" .collapsible").show(300);
	$("#"+feed_name+" .collapse_button").remove();
}

function add_view_more_button(name){
$("#"+name).append("<button type='button' class='collapse_button btn btn-link pull-right' onclick = 'show_more(\""+name+"\")'>view more</button>")
							$("#"+name+" .collapsible").hide();
							$("#"+name+" img.lazy").lazyload({
							    skip_invisible : true
							});
}

function displayScrapedFeed(data, name) {
	console.log('scraped feed: ', data);
	if (data) {


		if (name == "wikiquote_-_quote_of_the_day") {
			var raw_html = data.query.results.result.replace(/<(?:.|\n)*?>/gm, ''); //strip html
			var quote = [];
			var quote = raw_html.split('~'); //separate the quote from author
			var quote_author_link = "https://en.wikipedia.org/wiki/" + quote[1].trim();

			$("#" + name).append("<div class='entry container-fluid'><p><i class='fa fa-quote-left'></i> <i>" + quote[0] + "<i> <i class='fa fa-quote-right'></i></p>" +
				"<span>~<a href='" + quote_author_link + "' target='blank'>" + quote[1] + "</a></span></div>");

		} else {

			var output = data.query.results.result;
			$("#" + name).append("<div class='entry container-fluid'>" + output + "</div>");
			if (name == "wikipedia_-_on_this_day") { //remove unwanted divs
				$("#mp-otd div").remove();
			}

			$('#' + name + ' a').attr('href', function(i, v) { // correct the wiki links 
				return "https://en.wikipedia.org" + v;
			});
			$('#' + name + ' a').attr('target', 'blank'); //make it open in new tab
		}
		// $("#" + name+" a").removeAttr('href');
		var isshown = $("#add_feeds_modal").data('bs.modal') ? $("#add_feeds_modal").data('bs.modal').isShown : ""; //console.log('isshown: ',isshown);
		if (isshown == true) //only show console.log if user is currently adding the feed not during page load
			console.log(name + ' was added successfully');

	}
}

function save_feeds() {

	var feed_set = [];
	//adding the feeds of the user to the db
	$(".feeds").each(function(index, elt) {
		feed_set[index] = $(".feeds").eq(index).attr('id');
	});
	//console.log('feedsetlength ', feed_set.length);
	//console.log('feedset', feed_set);
	if (feed_set.length >= 0) { //accounting for the default newfeed
		if (feed_set.length > 0)
			var stringified_feed_set = JSON.stringify(feed_set);
		else
			var stringified_feed_set = "null";
		//console.log('stringified feed ', stringified_feed_set);

		$.ajax({
			url: base_url + "/add_feed",
			type: 'POST',
			data: 'feeds=' + stringified_feed_set,
			// Work with the response
			success: function(data) {
				console.log('feeds saved successfully');
			},
			error: function() {
				console.log('error saving' + name + ' feed');
			}
		});
	}
}

function remove_feed(name) {

	$("#" + name).parents('.news_feed_outer').remove();
	$("#" + name + "_button").prop("disabled", false); //enables add buttons for deleted feeds
	$("#" + name + "_button").html("add");
	save_feeds();
	console.log(name + ' deleted successfully');
}

var time;

function convert_time(time) {
	var given_time = new Date(time); //time is in ISO format 
	var current_time = new Date(); // current_time is of the form : "Sat Mar 21 2015 00:49:36 GMT+0530 (India Standard Time)"
	var date = given_time.toDateString();
	var local_time = given_time.toLocaleTimeString();
	time = date + " at " + local_time; //eg: Sat Mar 21 2015 at 12:49:36 AM

	var current_time_in_ms = current_time.getTime(); //current time in ms, eg: 1233333333333333534534
	var given_time_in_ms = given_time.getTime();
	var diff = current_time_in_ms - given_time_in_ms;
	var mins_ago = diff / (1000 * 60);
	var hrs_ago = diff / (1000 * 3600);
	var days_ago = diff / (1000 * 3600 * 24);
	var weeks_ago = diff / (1000 * 3600 * 24 * 7);

	var ago;
	var detailed_time;

	if (days_ago > 7) //if post is weeks old
	{
		weeks_ago = parseInt(weeks_ago);
		ago = (weeks_ago == 1) ? (weeks_ago + " week ago ") : (weeks_ago + " weeks ago "); //toFixed is used to round off values 
	} else if (hrs_ago > 24) //if post is days old
	{
		days_ago = parseInt(days_ago);
		ago = (days_ago == 1) ? (days_ago + " day ago ") : (days_ago + " days ago ");
	} else if (mins_ago > 60) //if post is hrs old
	{
		hrs_ago = parseInt(hrs_ago);
		ago = (hrs_ago == 1) ? (hrs_ago + " hr ago ") : (hrs_ago + " hrs ago ");
	} else //if post is mins old
	{
		mins_ago = parseInt(mins_ago);
		ago = (mins_ago == 1) ? (mins_ago + " min ago ") : (mins_ago + " mins ago ");
	}

	detailed_time = ago; //+" "+ time;
	return detailed_time;
}

//search script
$('#input').keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		submitForm('https://www.google.co.in', '/search?q=')
		return false;
	}
});

url = "";

function submitForm(home, url) {
	var sf = document.getElementById('search');
	if (sf.q.value == "") {
		var submitto = home;
	} else {
		var submitto = home + url + encodeURI(sf.q.value);
	}
	$("#input").val('');
	window.open(submitto);
	return false;
}

//calenderscript
$(document).ready(function() {


	$('#calendar').fullCalendar({
		header: {
			right: 'prev,next today',
			left: 'title',
			center: '' //hide week and day view options
		},
		// contentHeight: 100,
		height: "auto",
		contentHeight: "auto",
		handleWindowResize: true,
		fixedWeekCount: false,
		editable: true,
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			var title = prompt('Event Title:'); //console.log('allday: ',allDay);//console.log(start.format());			
			if (title) {
				var start = start.format(); //returns date in y-m-d, and time in ISO string
				var end = end.format();
				$.ajax({
					url: base_url + '/add_event',
					data: 'title=' + title + '&start=' + start + '&end=' + end,
					type: "POST",
					success: function(result) {
						// console.log(result); //eg: 22						
						id = result;
						$("#calendar").fullCalendar('renderEvent', {
								title: title,
								start: start,
								end: end,
								id: id
							},
							true // make the event "stick"
						);
					},
					error: function() {
						console.log('update failed!');
					}
				});
			}
			$("#calendar").fullCalendar('unselect');
		},

		eventDrop: function(event, delta) {
			var start = event.start.format();
			var end = event.end.format();
			$.ajax({
				url: base_url + '/update_event',
				data: 'title=' + event.title + '&start=' + start + '&end=' + end + '&id=' + event.id,
				type: "POST",
				success: function(json) {
					console.log("Updated Successfully");
				},
				error: function() {
					console.log('update failed!');
				}
			});
		},
		eventResize: function(event) {
			var start = event.start.format();
			var end = event.end.format();
			$.ajax({
				url: base_url + '/update_event',
				data: 'title=' + event.title + '&start=' + start + '&end=' + end + '&id=' + event.id,
				type: "POST",
				success: function(json) {
					console.log("Updated Successfully");
				},
				error: function() {
					console.log('update failed!');
				}
			});

		},
		eventLimit: true, // allow "more" link when too many events
		events: {
			url: base_url + '/show_events',
			error: function() {
				$('#script-warning').show();
			}
		},
		eventClick: function(event, jsEvent, view) {
			event_id = event.id;

			$("#confirm_event_delete_modal").modal('show');
		},
	});

});
var event_id;

function delete_event() {
	$.ajax({
		type: "POST",
		url: base_url + '/delete_event',
		data: 'id=' + event_id,
		success: function(json) {
			console.log("Updated Successfully");
			$('#calendar').fullCalendar('removeEvents', event_id);
			$("#confirm_event_delete_modal").modal('hide');
		},
		error: function() {
			console.log('update failed!');
		}
	});

}

//todo script

$(document).ready(function() {

	render_tasks();

});


function render_tasks() {

	$.ajax({
		url: base_url + '/show_tasks',
		type: "GET",
		success: function(result) {
			console.log('tasks retrieved successfully');
			//console.log(result);
			if (result) {
				var obj = JSON.parse(result); //console.log(obj);
				//console.log(obj[0]);
				for (var i = 0; i < obj.length; i++) {
					$("#todo").append("  <div class='checkbox' id='" + obj[i].id + "'>" +
						"<label><input type='checkbox' class='task_check'> " + obj[i].title + "</label>" +
						"</div>");
					activate_delete_task_functionality();
				}
			}
		},
		error: function() {
			console.log('error: cannot retrieve tasks!');
		}
	});


}

function add_task() {

	var id;
	var task = $("#task").val();
	if (task) {
		$("#add_task_button").prop("disabled", true);
		$("#add_task_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
		var clean = task.replace(/<(?:.|\n)*?>/gm, ''); //console.log('clean: ', clean);
		$.ajax({
			url: base_url + '/add_task',
			data: 'title=' + clean,
			type: "POST",
			success: function(result) {
				console.log('task saved');
				id = result; //console.log('id of new task: ', id);
				$("#todo").append("  <div class='checkbox' id='" + id + "'>" +
					"<label><input type='checkbox' class='task_check'>" + clean + "</label>" +
					"</div>");
				console.log('id of new task div: ', id);
				$("#add_task_button").html("<i class='fa fa-plus'></i> add");
				$("#add_task_button").prop("disabled", false);
				$("#task").val('');
				activate_delete_task_functionality();

			},
			error: function() {

				console.log('error: task not saved!');

			}
		});
	} else {

		console.log('no task entered!');
	}

}

function activate_delete_task_functionality() {

	$('.task_check').click(function() {

		id = $(this).closest('div').attr('id');
		console.log('id of task removed: ', id);
		$.ajax({
			type: "POST",
			url: base_url + '/delete_task',
			data: 'id=' + id,
			success: function(json) {
				console.log("deleted task Successfully");

			},
			error: function() {
				console.log('update failed!');
			}
		});
		$(this).closest('div').remove();
	});
}

//nowplaying script

$(document).ready(function() {
	nowplaying();

	upcoming();



});



function nowplaying() {

	$.ajax({
		url: "https://query.yahooapis.com/v1/public/yql",
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			q: 'select * from html(10) where url="http://in.bookmyshow.com/chennai/movies/nowshowing" and xpath="//*[@id=\'divComingSoon\']/ul[1]"',
			format: "json"
		},
		// Work with the response
		success: function(data) {
			// console.log(data);
			console.log('nowplaying: ', data);
			var results = data.query.results;
			if (results) {
				// console.log('img ', results.ul.li[0].div.div[0].img.src)
				// console.log('title', results.ul.li[0].div.div[1].ul.li[0].a.content);
				// console.log('plot ', results.ul.li[0].div.div[1].ul.li[1].blockquote.content);
				for (var i = 0; i < 10; i++) {
					var title = results.ul.li[i].div.div[1].ul.li[0].a.content;
					var img_src = results.ul.li[i].div.div[0].img.src;
					var overview = results.ul.li[i].div.div[1].ul.li[1].blockquote.content;
					var bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=" + title;
					var collapsible = (i>2)?"collapsible":"";

					$("#nowplaying").append("<div id='movie" + i + "' class='movie_entry "+collapsible+"'>" +
						"<img class='lazy' width='75' height='113' data-original='" + img_src + "' style='float:left; margin-right:5px'></img>" + "<span><b>" + title + "</b></span><br>" +
						"<p>" + overview + "<br> <span><a href='" + bookmyshow + "' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>"
					);
				}

				add_view_more_button("nowplaying");
			} else { //if can't scrape from website, get from db
				$.ajax({
					url: base_url + "/get_movies",
					type: "GET",
					async: false,
					success: function(data) {

						var obj = JSON.parse(data);
						console.log('movies retrieved from db successfully', obj);
						for (var i = 0; i < obj.length; i++) {
							var title = obj[i].title;
							var img_src = obj[i].image;
							var overview = obj[i].overview
							var bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=" + title;
							var collapsible = (i>2)?"collapsible":"";

							$("#nowplaying").append("<div id='movie" + i + "' class='movie_entry "+collapsible+"'>" +
						"<img class='lazy' width='75' height='113' data-original='" + img_src + "' style='float:left; margin-right:5px'></img>" + "<span><b>" + title + "</b></span><br>" +
						"<p>" + overview + "<br> <span><a href='" + bookmyshow + "' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>"
					);
				}

				add_view_more_button("nowplaying");

					}
				});
			}
		},
		error: function() {
			console.log('error fetching movies!');
		}
	});
}

function upcoming() {

		$.ajax({
			url: "https://query.yahooapis.com/v1/public/yql",
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				q: 'select * from html(10) where url="http://in.bookmyshow.com/chennai/movies/comingsoon" and xpath="//*[@id=\'divComingSoon\']/ul[1]"',
				format: "json"
			},
			// Work with the response
			success: function(data) {
				// console.log(data);
				console.log('upcoming: ', data);
				var results = data.query.results;
				if (results) {

					for (var i = 0; i < 10; i++) {
						var title = results.ul.li[i].div.div[1].ul.li[0].a.content;
						var img_src = results.ul.li[i].div.div[0].img.src;
						var overview = results.ul.li[i].div.div[1].ul.li[1].blockquote.content;
						var release_date = results.ul.li[i].div.div[2].div.span.content;
						var bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=" + title;
						var collapsible = (i>2)?"collapsible":"";

						$("#upcoming").append("<div id='movie" + i + "' class='movie_entry "+collapsible+"'>" +
									"<img class='lazy' width='75' height='113' data-original='" + img_src + "' style='float:left; margin-right:5px'></img>" + "<span><b>" + title + "</b></span><br>" +
									"<p>" + overview + "<br> <span style='opacity:0.7;'>" + release_date + " </span> <span><a href='" + bookmyshow + "' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>"
								);
					}

					add_view_more_button("upcoming");
				} else { //if can't scrape from website, get from db
					$.ajax({
						url: base_url + "/get_upcoming_movies",
						type: "GET",
						async: false,
						success: function(data) {

							var obj = JSON.parse(data);
							console.log('upcoming movies retrieved from db successfully', obj);
							for (var i = 0; i < obj.length; i++) {
								var title = obj[i].title;
								var img_src = obj[i].image;
								var overview = obj[i].overview;
								var release_date = obj[i].release_date;
								var bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=" + title;
								var collapsible = (i>2)?"collapsible":"";

								$("#upcoming").append("<div id='movie" + i + "' class='movie_entry "+collapsible+"'>" +
									"<img class='lazy' width='75' height='113' data-original='" + img_src + "' style='float:left; margin-right:5px'></img>" + "<span><b>" + title + "</b></span><br>" +
									"<p>" + overview + "<br> <span style='opacity:0.7;'>" + release_date + " </span> <span><a href='" + bookmyshow + "' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>"
								);

							}
							
							add_view_more_button("upcoming");
						}
					});
				}
			},
			error: function() {
				console.log('error fetching upcoming movies!');
			}
		});
	}


	//live score script

$(function() {
	var query = ["select * from cricket.past_matches", "select * from cricket.upcoming_matches"];
	var container = [".past-matches", ".upcoming-matches"];
	query.forEach(function(queryVal, cnt) {
		$.ajax({
			url: "https://query.yahooapis.com/v1/public/yql",
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				q: queryVal,
				env: "store://0TxIGQMQbObzvU4Apia0V0",
				format: "json"
			},
			// Work with the response
			success: function(data) {
				console.log(data);
				var results = data.query.results;
				for (var i = 0; i < data.query.count; i++) {
					for (var j = 0; j < results.Match[i].Team.length; j++) {
						$(container[cnt]).append('<p>' + results.Match[i].Team[j].Team + '</p>');

					}


					if (results.Match[i].Result) //if results are there, ie if its a recent match
					{

						if (results.Match[i].Result.how != 'abandoned') //if match was abandoned 
						{
							if (results.Match[i].Result.how == "drawn") {
								$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">Match Drawn</p>');
							} else {
								for (var k = 0; k < results.Match[i].Team.length; k++) {

									if ((results.Match[i].Result.Team[k].matchwon).localeCompare("yes")) //find the match winner's id
									{
										for (var l = 0; l < results.Match[i].Team.length; l++) //find the match winner's name
										{
											if ((results.Match[i].Team[l].teamid).localeCompare(results.Match[i].Result.Team[k].id))
												$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">' + results.Match[i].Team[l].Team + ' won by ' + results.Match[i].Result.by + ' ' + results.Match[i].Result.how + '</p>');
										}
									}


								}
							}

						} else {
							$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">Match was abandoned</p>');
						}

					} else //print the date of upcoming match
					{
						var date = new Date(results.Match[i].StartDate);
						date = date.toDateString().substr(0, 10);
						var time = new Date(results.Match[i].StartDate);
						time = time.toTimeString().substr(0, 5);
						var am_pm = new Date(results.Match[i].StartDate);
						am_pm = am_pm.toLocaleTimeString().substr(8, 3);
						$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">' + date + ', ' + time + ' ' + am_pm + ' (IST)</p>');
					}
					$(container[cnt]).append('<br>');
				}

			}

		});
	})
});
//LIVE MATCHES
window.setInterval(function() {
	var query = ["select * from cricket.scorecard.live.summary"];
	var container_live = ["div.LIVE", "div.LIVE1", "div.LIVE2", "div.LIVE3", "div.LIVE4"];
	query.forEach(function(queryVal, cnt) {
		$.ajax({
			url: "https://query.yahooapis.com/v1/public/yql",
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				q: queryVal,
				env: "store://0TxIGQMQbObzvU4Apia0V0",
				format: "json"
			},
			// Work with the response
			success: function(data) {
				console.log(data);
				var results = data.query.results;

				$(container_live[cnt]).replaceWith('<div class="LIVE" >');
				if (data.query.count > 0) //if there are live matches
				{
					if (Array.isArray(results.Scorecard)) //if there are multiple live matches then Scorecard is an array
					{
						for (var i = 0; i < results.Scorecard.length; i++) //iterate through matches
						{
							if (Array.isArray(results.Scorecard[i].past_ings)) //if the current batting team is chasing target then 'past_ings' is an array
							{ //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
								for (var p = 0; p < 2; p++) //match teams with their score and print their names
								{
									if ((results.Scorecard[i].teams[p].i).localeCompare(results.Scorecard[i].past_ings[0].s.a.i) == 0) {
										var flag = results.Scorecard[i].teams[p].flag.roundstd ? results.Scorecard[i].teams[p].flag.roundstd : results.Scorecard[i].teams[p].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[p].fn +
											'<span class="score"> ' + results.Scorecard[i].past_ings[0].s.a.r + '/' + results.Scorecard[i].past_ings[0].s.a.w + " (" + results.Scorecard[i].past_ings[0].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs

										var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
										var flag = results.Scorecard[i].teams[bowling_team].flag.roundstd ? results.Scorecard[i].teams[bowling_team].flag.roundstd : results.Scorecard[i].teams[bowling_team].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[bowling_team].fn +
											'<span class="score" > ' + results.Scorecard[i].past_ings[1].s.a.r + '/' + results.Scorecard[i].past_ings[1].s.a.w + " (" + results.Scorecard[i].past_ings[1].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs
										$(container_live[cnt]).append('<br>');
										break;
									}
								}
							} else //if the second team is yet to bat, then jason object 'past_ings' is a variable ie., only the batting team score is returned in past_ings
							{
								for (var p = 0; p < 2; p++) //match teams with their score and print their names
								{
									if ((results.Scorecard[i].teams[p].i).localeCompare(results.Scorecard[i].past_ings.s.a.i) == 0) //the current batting team
									{
										var flag = results.Scorecard[i].teams[p].flag.roundstd ? results.Scorecard[i].teams[p].flag.roundstd : results.Scorecard[i].teams[p].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[p].fn +
											'<span class="score"> ' + results.Scorecard[i].past_ings.s.a.r + '/' + results.Scorecard[i].past_ings.s.a.w + " (" + results.Scorecard[i].past_ings.s.a.o + ')</span></p>'); //r-runs w-wicket o-overs 

										var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
										var flag = results.Scorecard[i].teams[bowling_team].flag.roundstd ? results.Scorecard[i].teams[bowling_team].flag.roundstd : results.Scorecard[i].teams[bowling_team].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[bowling_team].fn +
											'<span class="score" style="opacity:0.5;"> yet to bat</span></p>');
										$(container_live[cnt]).append('<br>');
										break;
									}

								}
							}
						}
					} else //there is only one live match so Scorecard is a variable
					{
						if (Array.isArray(results.Scorecard.past_ings)) //if the current batting team is chasing target then 'past_ings' is an array
						{ //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
							for (var p = 0; p < 2; p++) //match teams with their score and print their names
							{
								if ((results.Scorecard.teams[p].i).localeCompare(results.Scorecard.past_ings[0].s.a.i) == 0) {
									var flag = results.Scorecard.teams[p].flag.roundstd ? results.Scorecard.teams[p].flag.roundstd : results.Scorecard.teams[p].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[p].fn +
										'<span class="score"> ' + results.Scorecard.past_ings[0].s.a.r + '/' + results.Scorecard.past_ings[0].s.a.w + " (" + results.Scorecard.past_ings[0].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs

									var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
									var flag = results.Scorecard.teams[bowling_team].flag.roundstd ? results.Scorecard.teams[bowling_team].flag.roundstd : results.Scorecard.teams[bowling_team].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[bowling_team].fn +
										'<span class="score"> ' + results.Scorecard.past_ings[1].s.a.r + '/' + results.Scorecard.past_ings[1].s.a.w + " (" + results.Scorecard.past_ings[1].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs
									$(container_live[cnt]).append('<br>');
									break;
								}
							}
						} else //if the second team is yet to bat, then jason object 'past_ings' is a variable ie., only the batting team score is returned in past_ings
						{
							for (var p = 0; p < 2; p++) //match teams with their score and print their names
							{
								if ((results.Scorecard.teams[p].i).localeCompare(results.Scorecard.past_ings.s.a.i) == 0) //the current batting team
								{
									var flag = results.Scorecard.teams[p].flag.roundstd ? results.Scorecard.teams[p].flag.roundstd : results.Scorecard.teams[p].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[p].fn +
										'<span class="score"> ' + results.Scorecard.past_ings.s.a.r + '/' + results.Scorecard.past_ings.s.a.w + " (" + results.Scorecard.past_ings.s.a.o + ')</span></p>'); //r-runs w-wicket o-overs 

									var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
									var flag = results.Scorecard.teams[bowling_team].flag.roundstd ? results.Scorecard.teams[bowling_team].flag.roundstd : results.Scorecard.teams[bowling_team].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[bowling_team].fn + '<span class="score" style="opacity:0.5;"> yet to bat</span></p>');
									$(container_live[cnt]).append('<br>');
									break;
								}

							}
						}
					}

				} else if (data.query.count === 0) //if no live matches 
				{
					$(container_live[cnt]).append('<p>no games in progress</p>');
				}
				$(container_live[cnt]).append('</div>');
			}
		});
	});
}, 10000);