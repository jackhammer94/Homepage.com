$(document).ready(function() {
	$('#input').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			submitForm('https://www.google.co.in', '/search?q=');
			return false;
		}
	});
	$("#google_button").on("click", function() { //when + button is clicked open dialog
		submitForm('https://www.google.co.in', '/search?q=');
	});
	$("#flipkart_button").on("click", function() { //when + button is clicked open dialog
		submitForm('http://www.flipkart.com', '/search?q=');
	});
	$("#wikipedia_button").on("click", function() { //when + button is clicked open dialog
		submitForm('http://en.wikipedia.org', '/wiki/Special:Search?search=');
	});
	$("#imdb_button").on("click", function() { //when + button is clicked open dialog
		submitForm('http://www.imdb.com', '/find?ref_=nv_sr_fn&q=');
	});
	$("#youtube_button").on("click", function() { //when + button is clicked open dialog
		submitForm('https://www.youtube.com', '/results?q=');
	});

	var query = 'select * from rss where url="' + encodeURI("http://www.google.com/trends/hottrends/atom/feed?pn=p3") + '" limit 4';
   
   $.ajax({
     url: "https://query.yahooapis.com/v1/public/yql",
     dataType: "json",
     data: {
       q: query,       
       format: "json"
     },
     // Work with the response
     success: function(data) {
       
       //console.log('data', data.query.results);
       var items = data.query.results.item;
       var title, link, pic, search_count;//console.log('data', items);
       var google = "https://www.google.co.in/search?q=";
       items.forEach(function(item,index){
       	title = item.title;
       	link  = google + title;
       	pic = item.picture;
       	search_count = item.approx_traffic;
       	$("#search-"+index).append('<div><a href="'+link+'" target="blank"><img style="float:left" src = "'+pic+'"/><span style="font-size:11px">'+title+'</span></a><br><span style="font-size:10px" class="text-muted"><span class="glyphicon glyphicon-fire" />'+search_count+'</span></div>');
       });

     },
     error: function() {
       console.log('error fetching search info!');
     }
   });
});

function submitForm(home, url) {
	var sf = document.getElementById('search');
	var submitto;
	if (sf.q.value === "") {
		submitto = home;
	} else {
		submitto = home + url + encodeURI(sf.q.value);
	}
	$("#input").val('');
	window.open(submitto);
	return false;
}