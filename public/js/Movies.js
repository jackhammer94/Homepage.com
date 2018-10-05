//nowplaying script
$(document).ready(function() {
	nowplaying();
	upcoming();
});

function nowplaying() {
 $("#nowplaying").append("<div class= 'feed_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");
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
				$("#nowplaying").empty();
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
						$("#nowplaying").empty();
						for (var i = 0; i < obj.length; i++) {
							var title = obj[i].title;
							var img_src = obj[i].image;
							var overview = obj[i].overview;
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
$("#upcoming").append("<div class= 'feed_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");
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
					$("#upcoming").empty();
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
							$("#upcoming").empty();
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