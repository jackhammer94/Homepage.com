var feedcontainer=document.getElementById("feed")
var feedlimit=4
var rssoutput=""
var name
function addFeed(name){
var feed_url;
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
		var feedpointer=new google.feeds.Feed(feed_url)
		feedpointer.setNumEntries(feedlimit) 
		feedpointer.load(displayfeed) 
		// $.ajax({
  //   url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feed_url),
  //   dataType: 'json',
  //   success: function(data) {
  //   	console.log('raw: ', data);
  //     displayfeed(data.responseData.feed);
  //   }
  // });
}

function displayfeed(result){
	if (!result.error){
		var thefeeds=result.feed.entries
		console.log('feed: ', thefeeds);
		
		for (var i=0; i<thefeeds.length; i++)
		{
			var date = new Date(thefeeds[i].publishedDate); 
			date = date.toDateString().substr(4);  console.log(thefeeds[i].title); 
			if(thefeeds[i].title!="")
				rssoutput+="<li class='news-item' ><table cellpadding='4'><tr><td><a href='" + thefeeds[i].link + "' target='blank'>" + thefeeds[i].title+  "</a><br>"+"<p style='font-size:80%;opacity:0.6;'>"+date+"</p></td></tr></table> </li>"
		}
		// source_no++
		//feedcontainer.innerHTML=rssoutput
		$("#feed").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
		$("#" + name).append(rssoutput);
	}
	else
		alert("Error fetching feeds!")
}
$(document).ready(function() {
$("#add_feeds").on("click", function() { //when + button is clicked open dialog

    $("#add_feeds_modal").modal('show');
  });
 });