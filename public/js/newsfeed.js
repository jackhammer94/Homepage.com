var feedcontainer=document.getElementById("feed1")
var feedurl=["http://feeds.hindustantimes.com/HT-HomePage-TopStories","http://feeds.bbci.co.uk/news/world/asia/india/rss.xml","http://ibnlive.in.com/ibnrss/top.xml","http://indianexpress.com/print/front-page/feed/"]

var feedlimit=4
var rssoutput=""
var source=["Hindustan Times, ","BBC News, ","IBNlive, ","Indian Express "];
source_no=0; 
function rssfeedsetup(){
	for(var i=0;i<source.length;i++)
	{
		var feedpointer=new google.feeds.Feed(feedurl[i])
		feedpointer.setNumEntries(feedlimit) 
		feedpointer.load(displayfeed) 
	}	
	
}

function displayfeed(result){
	if (!result.error){
		var thefeeds=result.feed.entries
		
		for (var i=0; i<thefeeds.length; i++)
		{
			var date = new Date(thefeeds[i].publishedDate); 
			date = date.toDateString().substr(4);  console.log(thefeeds[i].title); 
			if(thefeeds[i].title!="")
				rssoutput+="<li class='news-item' ><table cellpadding='4'><tr><td><a href='" + thefeeds[i].link + "' target='blank'>" + thefeeds[i].title+  "</a><br>"+"<p style='font-size:80%;opacity:0.6;'>"+source[source_no]+date+"</p></td></tr></table> </li>"
		}
		source_no++
		feedcontainer.innerHTML=rssoutput
		
	}
	else
		alert("Error fetching feeds!")
}

window.onload=function(){
	rssfeedsetup();
	$('.newsticker').newsTicker({
		row_height: 80,
		max_rows: 3,
		duration: 4000,
		direction:'down',
		start: function() {
			console.log('newsTicker just started !');
		},
		prevButton:  $('#prev-button'), 
		nextButton:  $('#next-button'),
		stopButton:  $('#stop-button'),
		startButton: $('#start-button')
	});
}