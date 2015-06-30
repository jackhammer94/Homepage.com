//feeds script


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
    addFeed(name.slice(0, -7), 'add');
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

$("#" + feed_name + " .refresh_error").remove();
 $("#" + feed_name).append("<div class= 'feed_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");
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
  var name;
  if (op === "load") //feeds loading from db
  {
    name = feed.feed_name;
    var url = feed.feed_url;
    $("#" + name + "_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
    $("#" + name + "_button").prop("disabled", true); //disables add buttons for feeds already added
    $("#feeds").append("<div class='news_feed_outer col-xs-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
    getFeed(name, url);
  } else //user is adding from modal
  {
    name = feed;
    $("#" + name + "_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
    $("#" + name + "_button").prop("disabled", true); //disables add buttons for feeds already added
    $("#feeds").prepend("<div class='news_feed_outer col-xs-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_feed(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");
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
  if($("#"+name).find('.feed_loader').length===0)
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
    var i, title, link, desc, image_node, image, html_str, temp, imagetag, encoded, patt, res, image_html, pub_date, ago, output, isShown, collapsible;
    var entries_threshold = 3;
    //create the master div for the feed
    // $("#feeds").append("<div class='news_feed_outer col-sm-12'><h3>" + name.replace(/_/g, " ") + "<span><button  class='remove_feed_button btn btn-xs btn-default pull-right'><i class='fa fa-times'></i></button></span></h3><div id='" + name + "' class='feeds news_feed'></div></div>");

    for (i = 0; i < no_items; i++) {
      title = (Array.isArray(items[i].title) === true) ? items[i].title[0] :
        items[i].title ? items[i].title : "";
      link = ((Array.isArray(items[i].link) === true) && items[i].link[0] && items[i].link[0].href) ? items[i].link[0].href :
        items[i].link ? items[i].link : "";
      if (title && link) {
        desc = (Array.isArray(items[i].description) === true) ? items[i].description[0] :
          items[i].description ? items[i].description : "";
        encoded = items[i].encoded ? items[i].encoded : "";

        image_node = (items[i].thumbnail) ? ((Array.isArray(items[i].thumbnail) === true) ? items[i].thumbnail[0] : items[i].thumbnail) : "";
        image = (image_node) ? (image_node.url ? image_node.url : image_node) : "";

        if (image === '' && items[i].enclosure) //check for array
          image = items[i].enclosure.url ? items[i].enclosure.url : '';
        if (image === '' && items[i].content)
          image = items[i].content.url ? items[i].content.url : '';
        if (image === '' && items[i].imgURL)
          image = items[i].imgURL;
        if (image === '' && items[i].image)
          image = items[i].image.url ? items[i].image.url : items[i].image;
        if (image === '' && items[i].postimage)
          image = items[i].postimage;
        if (image === '' && items[i].imageThumb)
          image = items[i].imageThumb;
        if (image === '' && items[i].group)
          image = (items[i].group.content && items[i].group.content.url) ? items[i].group.content.url : "";

        //extracting images from encoded section
        if (image === "" && items[i].encoded) {
          html_str = encoded;
          temp = document.createElement('div');
          temp.innerHTML = html_str;
          imagetag = temp.getElementsByTagName('img')[0]; //console.log('imagesencode', imagetag);
          temp.innerHTML = "";
          if (imagetag && imagetag.hasAttribute("src")) {
            if (imagetag.hasAttribute("height") && imagetag.hasAttribute("width"))
              {
                image = (imagetag.getAttribute("width") < 50 || imagetag.getAttribute("height") < 50) ? "" : imagetag.getAttribute("src");
                imagetag.setAttribute('src' , ''); //prevent browser from downloading image
              }
            else
              {
                image = imagetag.getAttribute("src");
                imagetag.setAttribute('src', '');
              }
          } else
              image = "";

        }

        //extracting images from description
        if (image === "") {
          html_str = desc;
          temp = document.createElement('div');
          temp.innerHTML = html_str;
          imagetag = temp.getElementsByTagName('img')[0]; //console.log('imagesdesc', imagetag);
          temp.innerHTML = '';
          if (imagetag && imagetag.hasAttribute("src")) {
            if (imagetag.hasAttribute("height") && imagetag.hasAttribute("width"))
              {
                image = (imagetag.getAttribute("width") < 50 || imagetag.getAttribute("height") < 50) ? "" : imagetag.getAttribute("src");
                imagetag.setAttribute('src' , ''); //prevent browser from downloading image
              }
            else
              {
                image = imagetag.getAttribute("src");
                imagetag.setAttribute('src', '');
              }
          } else
              image = "";
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
            image = ""; //add default pic here
        }

        image_html = (image !== '') ? ("<img class='lazy' width='100' height='80'  align='left' data-original='" + image + "'></img>") : '';

        pub_date = items[i].pubDate ? items[i].pubDate : "";
        ago = convert_time(pub_date);
        if (name.substr(0, 11) == "Google_News") { //google news
          collapsible = (i > 2) ? "collapsible" : "";
          output = "<div class='entry  entry-" + i + " " + collapsible + "'>" + desc + "<hr/></div>";

        } else {
          desc = desc.replace(/<(?:.|\n)*?>/gm, ' ');
          collapsible = (i > entries_threshold) ? "collapsible" : "";
          output = "<div class='yahoo_news_entry " + collapsible + " '><h3><a href='" + link + "' target='blank'>" + image_html + "<b>" + title + "</b></a></h3><p>" + desc + "</p><span class='time'>" + ago + "</span><hr/></div>";
        }

        $("#" + name + " .feed_loader").remove();
        $("#" + name).append(output);
        if (name.substr(0, 11) == "Google_News") { //fixing css
          $("#" + name + " .entry-" + i + " div.lh font:first-child").append("<span class='time'>" + ago + "</span>");
          $('#' + name + ' a').attr('target', 'blank'); //make it open in new tab
        }
      }
      else{
        entries_threshold  = entries_threshold+1; //1 entry was left out due to null title, so increase threshold which depends on forloop index by 1
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
  $("#" + name).append("<div class='refresh_error'>please<button type='button' class='refresh_button btn btn-xs btn-link' onclick = 'getFeedWithNoUrl(\"" + name + "\")'>refresh</button>or try again later!</div>");
  console.log('error fetching ' + name + ' feed');
}

function show_more(feed_name) {
  $("#" + feed_name + " .collapsible").show(300);
  $("#" + feed_name + " .collapse_button").remove();
}

function add_view_more_button(name) {
  $("#" + name).append("<button type='button' class='collapse_button btn btn-link pull-right' onclick = 'show_more(\"" + name + "\")'>view more</button>");
  $("#" + name + " .collapsible").hide();
  $("#" + name + " img.lazy").lazyload({
    skip_invisible:true
  });
}

function displayScrapedFeed(data, name) {
  console.log('scraped feed: ', data);
  if (data) {


    if (name == "wikiquote_-_quote_of_the_day") {
      var raw_html = data.query.results.result.replace(/<(?:.|\n)*?>/gm, ''); //strip html
      var quote = [];
      quote = raw_html.split('~'); //separate the quote from author
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