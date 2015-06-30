//feeds script
//var base_url = "http://localhost:8080";
var base_url = "http://myfrontpage.in";

$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: base_url + '/show_feeds',
    success: function(feeds) {
      console.log("retrieved feeds Successfully", feeds);
      if (!isEmpty(feeds)) {

        feeds.forEach(function(feed, index) {
          if (feed.feed_name !== "void_feed")
            addFeed(feed, "load");
        });

      }
    },
    error: function() {
      console.log('error fetching feeds!');
    }

  });


  $("#add_feeds").on("click", function() { //when + button is clicked open dialog

    $("#add_feeds_modal").modal('show');
  });

  $(".add_feed_button").on("click", function() { //when + button is clicked open dialog

    var name = $(this).attr('id'); //console.log('btnname ', name.slice(0,-7));
    addFeed(name.slice(0,-7), 'add');
  });

  $('#add_feeds_modal').on("shown.bs.modal", function() {
    $("#add_feeds_modal img.lazy").lazyload({
      skip_invisible: true,
      container: $("#add_feeds_modal")
    });
  });


});

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}

function getFeedWithNoUrl(feed_name) {

  
  $.ajax({
    type: "GET",
    url: base_url + '/get_feed_url',
    data: {
      feed_name: feed_name
    },
    success: function(feed) {
      //console.log("retrieved feed url Successfully", feed);
      getFeed(feed_name, feed[0].feed_url);
    },
    error: function() {
      console.log('error fetching feed url!');
    }

  });

}

function addFeed(feed, op) {
  if (op === "load") //feeds loading from db
  {
    var name = feed.feed_name; 
    var url = feed.feed_url;
    $("#" + name + "_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
    $("#" + name + "_button").prop("disabled", true); //disables add buttons for feeds already added
    $("#feeds").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
    getFeed(name, url);  
  } 
  else //user is adding from modal
  { 
    var name = feed;
    $("#" + name + "_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
    $("#" + name + "_button").prop("disabled", true); //disables add buttons for feeds already added
    $("#feeds").prepend("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
    save_feed(name);
    getFeedWithNoUrl(name);
  }
}

function getFeed(name, url) {
  var feed_url = url;
  var xpath;
  switch (name) {
    case "wikiquote_-_quote_of_the_day":
      xpath = '//*[@id=\'mf-qotd\']/div/div[2]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/table/tbody';
      break;
    case "wikipedia_-_did_you_know":
      xpath = '//*[@id=\'mp-dyk\']/ul/li';
      break;
    case "wikipedia_-_on_this_day":
      xpath = '//*[@id=\'mp-right\']/tbody/tr[4]';
      break;
    default:
      xpath = "";

  }

  $("#" + name + " .refresh_error").remove();
  $("#" + name).append("<div class= 'feed_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");

  if (xpath === "") {

    $.ajax({
      url: "https://query.yahooapis.com/v1/public/yql",
      // jsonp: "callback",
      dataType: "json",
      data: {
        q: "select * from rss where url='" + feed_url + "' limit 10",
        format: "json",
      },
      // Work with the response
      success: function(data) {
        // console.log(data);
        displayFeed(data, name);

        $("#" + name + "_button").html("added");
      },
      error: function() {
        add_refresh_message(name);
      }
    });

  } else {
    // console.log('page_url', page_url);
    // console.log('xpath', xpath);
    var query = 'use "http://www.datatables.org/data/htmlstring.xml" as html.tostring;' + 'select * from html.tostring where url="' + feed_url + '" and xpath="' + xpath + '"';
    //console.log('query :', query); //use datatables to get stringified html else yql returns the text within hyperlinks separately from the quote
    $.ajax({
      url: "https://query.yahooapis.com/v1/public/yql",
      // jsonp: "callback",
      dataType: "json",
      data: {
        q: query,
        env: "store://RjdEzitN2Hceujh3tGHPj6",
        format: "json"
      },
      // Work with the response
      success: function(data) {
        // console.log(data);
        displayScrapedFeed(data, name);

        $("#" + name + "_button").html("added");
      },
      error: function() {
        add_refresh_message(name);
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
    var i, title, link, desc, image, html_str, temp, imagetag, image, encoded, patt, res, image_html, pub_date, ago, output, isShown, collapsible;
    //create the master div for the feed
    // $("#feeds").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_feed_button btn btn-xs btn-default pull-right'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");

    for (i = 0; i < no_items; i++) {
      title = (Array.isArray(items[i].title) === true) ? items[i].title[0] :
        items[i].title ? items[i].title : "";
      link = ((Array.isArray(items[i].link) === true) && items[i].link[0] && items[i].link[0].href) ? items[i].link[0].href :
        items[i].link ? items[i].link : "";
      desc = (Array.isArray(items[i].description) === true) ? items[i].description[0] :
        items[i].description ? items[i].description : "";
      image = (Array.isArray(items[i].thumbnail) === true) ? items[i].thumbnail[0].url :
        items[i].thumbnail ? items[i].thumbnail.url : "";
      encoded = items[i].encoded? items[i].encoded:"";

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
      //extracting images from encoded section
       if (image === "") {
        html_str = encoded;
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
      if (image && image.substr(0, 4) !== "http" && image.substr(0, 2) !== "//")
        image = '';
      if (link && link.substr(0, 4) !== "http" && image.substr(0, 2) !== "//")
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
        collapsible = (i > 2) ? "collapsible" : "";
        output = "<div class='entry  entry-" + i + " " + collapsible + "'>" + desc + "<hr/></div>";

      } else {
        desc = desc.replace(/<(?:.|\n)*?>/gm, ' ');
        collapsible = (i > 3) ? "collapsible" : "";
        output = "<div class='yahoo_news_entry " + collapsible + " '><h3><a href='" + link + "' target='blank'>" + image_html + "<b>" + title + "</b></a></h3><p>" + desc + "</p><span class='time'>" + ago + "</span><hr/></div>";
      }

      $("#" + name + " .feed_loader").remove();
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

  } else {
    add_refresh_message(name);
  }

}

function add_refresh_message(name) {
  $("#" + name + " .feed_loader").remove();
  $("#" + name).append("<div class='refresh_error'>please<button type='button' class='refresh_button btn btn-xs btn-link' onclick = 'getFeed(\"" + name + "\")'>refresh</button>or try again later!</div>");
  console.log('error fetching ' + name + ' feed');
}

function show_more(feed_name) {
  $("#" + feed_name + " .collapsible").show(300);
  $("#" + feed_name + " .collapse_button").remove();
}

function add_view_more_button(name) {
  $("#" + name).append("<button type='button' class='collapse_button btn btn-link pull-right' onclick = 'show_more(\"" + name + "\")'>view more</button>")
  $("#" + name + " .collapsible").hide();
  $("#" + name + " img.lazy").lazyload({
    skip_invisible: true
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

      $("#" + name + " .feed_loader").remove();
      $("#" + name).append("<div class='entry container-fluid'><p><i class='fa fa-quote-left'></i> <i>" + quote[0] + "<i> <i class='fa fa-quote-right'></i></p>" +
        "<span>~<a href='" + quote_author_link + "' target='blank'>" + quote[1] + "</a></span></div>");

    } else {

      var output = data.query.results.result;

      $("#" + name + " .feed_loader").remove();
      $("#" + name).append("<div class='entry container-fluid'>" + output + "</div>");
      if (name == "wikipedia_-_on_this_day") { //remove unwanted divs
        $("#mp-otd div").remove();
        $("#mp-otd ul").eq(1).remove();
      }

      $('#' + name + ' a').attr('href', function(i, v) { // correct the wiki links 
        return "https://en.wikipedia.org" + v;
      });
      $('#' + name + ' a').attr('target', 'blank'); //make it open in new tab
    }
  }
}

function save_feed(name) {
  $.ajax({
    url: base_url + "/add_feed",
    type: 'POST',
    data: 'feed=' + name,
    // Work with the response
    success: function(data) {
      console.log(name + ' added successfully');
    },
    error: function() {
      console.log('error adding ' + name + ' feed');
    }
  });
}

function remove_feed(name) {
  //console.log('name', name);
  $("#" + name).parents('.news_feed_outer').remove();
  $("#" + name + "_button").prop("disabled", false); //enables add buttons for deleted feeds
  $("#" + name + "_button").html("add");
  //save_feeds();
  $.ajax({
    url: base_url + "/remove_feed",
    type: 'POST',
    data: 'feed=' + name,
    // Work with the response
    success: function(data) {
      console.log(name + ' removed successfully');
    },
    error: function() {
      console.log('error removing ' + name + ' feed');
    }
  });
  console.log(name + ' deleted successfully');

  //if user has removed all feeds, save void feed
  var feed_set = [];
  $(".feeds").each(function(index, elt) {
    feed_set[index] = $(".feeds").eq(index).attr('id');
  });

  if (feed_set.length === 0)
    save_feed("void_feed");
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
		}
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
                $(container[cnt]).append('<p style="opacity:0.7;">Match Drawn</p><hr>');
              } else {
                for (var k = 0; k < results.Match[i].Team.length; k++) {

                  if ((results.Match[i].Result.Team[k].matchwon).localeCompare("yes")) //find the match winner's id
                  {
                    for (var l = 0; l < results.Match[i].Team.length; l++) //find the match winner's name
                    {
                      if ((results.Match[i].Team[l].teamid).localeCompare(results.Match[i].Result.Team[k].id))
                        $(container[cnt]).append('<p style=" opacity:0.7;">' + results.Match[i].Team[l].Team + ' won by ' + results.Match[i].Result.by + ' ' + results.Match[i].Result.how + '</p><hr>');
                    }
                  }


                }
              }

            } else {
              $(container[cnt]).append('<p style="opacity:0.7">Match was abandoned</p><hr>');
            }

          } else //print the date of upcoming match
          {
            var date = new Date(results.Match[i].StartDate);
            date = date.toDateString().substr(0, 10);
            var time = new Date(results.Match[i].StartDate);
            time = time.toTimeString().substr(0, 5);
            var am_pm = new Date(results.Match[i].StartDate);
            am_pm = am_pm.toLocaleTimeString().substr(8, 3);
            $(container[cnt]).append('<p style="opacity:0.7">' + date + ', ' + time + ' ' + am_pm + ' (IST)</p><hr>');
          }
        }

      }

    });
})
});
//LIVE MATCHES


window.setInterval(function() {
  var query = ["select * from cricket.scorecard.live.summary"];
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
        if (data.query.count > 0) //if there are live matches
        {
          var Scorecard = results.Scorecard;
          if (Array.isArray(Scorecard)) //if there are multiple live matches then Scorecard is an array
          {
            for (var i = 0; i < Scorecard.length; i++) //iterate through matches
            {
              var teams = Scorecard[i].teams;
              var past_ings = Scorecard[i].past_ings;
              var flag = check('flag', teams);
              //console.log('flags: ', flag);
              if(teams == null || past_ings == null){
                console.log("error fetching livescore");
                continue;
              }
              
              if(flag!==2) //check whether both teams flags are available
              {
                console.log('error fetchin flag in livescore');
                continue; 
              } 
              update_score(Scorecard[i]);

            }
          } else //there is only one live match so Scorecard is a variable
          {
            //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
            var teams = Scorecard.teams;
            var past_ings = Scorecard.past_ings;
            var flag = check('flag', teams);
              //console.log('flags: ', flag);
              if(teams == null || past_ings == null){
                console.log("error fetching livescore");
                return;
              }

              if(flag!==2)
              {
                console.log('error fetchin flag in livescore');
                return; 
              }           
              update_score(Scorecard);


            }

        } else if (data.query.count === 0) //if no live matches 
        {
          $("#cricket-1 .loader").remove();
          $("#cricket-1").empty();
          $("#cricket-1").append('<p>no games in progress</p>');
        }
        
      }
    });
});
}, 10000);

function check(prop, obj)
{ 
  var count = 0;
  for ( curr_obj in obj) {
    if (obj[curr_obj].hasOwnProperty(prop)) {
      count++; 
      //console.log('flag obj', obj[curr_obj][prop]);
    }
  }
  return count;
}

function update_score(Scorecard){
  $("#cricket-1 .loader").remove();
  if(document.getElementById(Scorecard.mid) !== null)
    {$('#'+Scorecard.mid).empty();
      //console.log('replaceing...');
    }
    else
      {$("#cricket-1").append('<div id="'+Scorecard.mid+'" ></div>');
        //console.log('creating..');
      }
    if (Array.isArray(Scorecard.past_ings)) //if the current batting team is chasing target then 'past_ings' is an array
    { //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
      for (var p = 0; p < 2; p++) //match teams with their score and print their names
      {
        if ((Scorecard.teams[p].i).localeCompare(Scorecard.past_ings[0].s.a.i) == 0) {
          var flag = Scorecard.teams[p].flag.roundstd ? Scorecard.teams[p].flag.roundstd : Scorecard.teams[p].logo.small;
          $('#'+Scorecard.mid).append('<p><img src="' + flag + '"></img>' + Scorecard.teams[p].fn +
            '<span class="score"> ' + Scorecard.past_ings[0].s.a.r + '/' + Scorecard.past_ings[0].s.a.w + " (" + Scorecard.past_ings[0].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs

          var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
          var flag = Scorecard.teams[bowling_team].flag.roundstd ? Scorecard.teams[bowling_team].flag.roundstd : Scorecard.teams[bowling_team].logo.small;
          $('#'+Scorecard.mid).append('<p><img src="' + flag + '"></img>' + Scorecard.teams[bowling_team].fn +
            '<span class="score" > ' + Scorecard.past_ings[1].s.a.r + '/' + Scorecard.past_ings[1].s.a.w + " (" + Scorecard.past_ings[1].s.a.o + ')</span></p><hr>'); //r-runs w-wicket o-overs
          
          break;
        }
      }
    } else //if the second team is yet to bat, then jason object 'past_ings' is a variable ie., only the batting team score is returned in past_ings
    {
      for (var p = 0; p < 2; p++) //match teams with their score and print their names
      {
        if ((Scorecard.teams[p].i).localeCompare(Scorecard.past_ings.s.a.i) == 0) //the current batting team
        {
          var flag = Scorecard.teams[p].flag.roundstd ? Scorecard.teams[p].flag.roundstd : Scorecard.teams[p].logo.small;
          $("#"+Scorecard.mid).append('<p><img src="' + flag + '"></img>' + Scorecard.teams[p].fn +
            '<span class="score"> ' + Scorecard.past_ings.s.a.r + '/' + Scorecard.past_ings.s.a.w + " (" + Scorecard.past_ings.s.a.o + ')</span></p>'); //r-runs w-wicket o-overs 

          var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
          var flag = Scorecard.teams[bowling_team].flag.roundstd ? Scorecard.teams[bowling_team].flag.roundstd : Scorecard.teams[bowling_team].logo.small;
          $('#'+Scorecard.mid).append('<p><img src="' + flag + '"></img>' + Scorecard.teams[bowling_team].fn +
            '<span class="score" style="opacity:0.5;"> yet to bat</span></p><hr>');
          
          break;
        }

      }
    }
    
  }
