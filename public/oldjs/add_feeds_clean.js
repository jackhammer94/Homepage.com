//feeds script
var base_url = "http://localhost:8080";
//var base_url = "http://myfrontpage.in";

$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: base_url + '/show_feeds',
    success: function(feeds) {
      console.log("retrieved feeds Successfully", feeds);
      if (!isEmpty(feeds)) {
        
          feeds.forEach(function(feed, index) {
            if(feed.feed_name !=="void_feed")
               addFeed(feed.feed_name, "load");
          });
       
      } else {
        
        add_default_feeds();
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
function add_default_feeds(){
  addFeed("Google_News_-_India", "load");
  addFeed("BBC_News_-_India", "load");
  addFeed("Yahoo_News_-_movies", "load");
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
function addFeed(name,op) {

  $("#" + name + "_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
  $("#" + name + "_button").prop("disabled", true); //disables add buttons for feeds already added
  if(op === "load") //feeds loading from db
      $("#feeds").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
  else //user is adding from modal
     {
       $("#feeds").prepend("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
       save_feed(name);
     }

  getFeed(name);
}

function getFeed(name) {
    var feed_url;
    var page_url;
    var xpath; 

    $("#"+name+" .refresh_error").remove();
    $("#"+name).append("<div class= 'feed_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");
    
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
      var query = 'use "http://www.datatables.org/data/htmlstring.xml" as html.tostring;' + 'select * from html.tostring where url="' + page_url + '" and xpath="' + xpath + '"';
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

      $("#"+name+" .feed_loader").remove();
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
    add_refresh_message(name);
  }

}
function add_refresh_message(name){
   $("#"+name+" .feed_loader").remove();
       $("#" + name).append("<div class='refresh_error'>please<button type='button' class='refresh_button btn btn-xs btn-link' onclick = 'getFeed(\""+name+"\")'>refresh</button>or try again later!</div>"  );
      console.log('error fetching ' + name + ' feed');
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

      $("#"+name+" .feed_loader").remove();
      $("#" + name).append("<div class='entry container-fluid'><p><i class='fa fa-quote-left'></i> <i>" + quote[0] + "<i> <i class='fa fa-quote-right'></i></p>" +
        "<span>~<a href='" + quote_author_link + "' target='blank'>" + quote[1] + "</a></span></div>");

    } else {

      var output = data.query.results.result;

      $("#"+name+" .feed_loader").remove();
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
    // $("#" + name+" a").removeAttr('href');
    var isshown = $("#add_feeds_modal").data('bs.modal') ? $("#add_feeds_modal").data('bs.modal').isShown : ""; //console.log('isshown: ',isshown);
    if (isshown == true) //only show console.log if user is currently adding the feed not during page load
      console.log(name + ' was added successfully');

  }
}

function save_feed(name) {
    $.ajax({
      url: base_url + "/add_feed",
      type: 'POST',
      data: 'feed=' + name,
      // Work with the response
      success: function(data) {
        console.log('feeds added successfully');
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
        console.log('feeds remoed successfully');
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