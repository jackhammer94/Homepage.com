var apikey = "9bvzdqdy5pf39r6dp9engbj6";
var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";

$(document).ready(function() {

  // send off the query
  $.ajax({
    url: baseUrl + "/lists/movies/in_theaters.json?apikey="+ apikey + "&page_limit=10&page=1&country=us",
    dataType: "jsonp",
    success: searchCallback
  });
});

// callback for when we get back the results
function searchCallback(data) {

  //console.log(data);
  for (var i = 0; i < data.movies.length; i++) {
    var icons = {
      certified_fresh: "/img/certified_fresh.png",
      fresh: "/img/fresh.png",
      rotten: "/img/rotten.png",
      audience: "/img/audience.png",
      default_icon: "/img/default.png"
    };
    var title = data.movies[i].title;
    var poster = data.movies[i].posters.profile;
    var rating = data.movies[i].ratings.critics_rating ? data.movies[i].ratings.critics_rating :"--"; //rotten or fresh or certified_fresh
    var critics_score = data.movies[i].ratings.critics_score ? data.movies[i].ratings.critics_score :"--";
    var audience_score= data.movies[i].ratings.audience_score ? data.movies[i].ratings.audience_score :"--";
    var synopsis = data.movies[i].synopsis ? data.movies[i].synopsis :"--";
    var link = data.movies[i].links.alternate ? data.movies[i].links.alternate :"http://www.rottentomatoes.com";
    var cast1 = data.movies[i].abridged_cast[0].name ? data.movies[i].abridged_cast[0].name :"--";
    var cast2 = data.movies[i].abridged_cast[1].name ? data.movies[i].abridged_cast[1].name :"--";

    switch (rating) {
      case "Certified Fresh":
        var icon_src = icons.certified_fresh;
        break;
      case "Fresh":
        var icon_src = icons.fresh;
        break;
      case "Rotten":
        var icon_src = icons.rotten;
        break;
      default:
        var icon_src = icons.default_icon;
    }

    $("#movies").append("<div class='movie_entry' style='clear:both;'>" +
      "<a href='"+ link + "' target='blank' data-toggle='tooltip' title='"+ synopsis +"'><img src='" + poster + "' style='float:left; margin-right:5px'></img>" + "<span>" + title + "</span></a><br>" +
      "<img src='" + icon_src + "' style='width:16px; height:16px; margin-right:5px' title='critics score'></img>" +"<span>"+critics_score + "%</span>"+
      "<img src='"+icons.audience+"'style='width:16px; height:16px; margin-right:5px;' title='audience score'></img>" +"<span>" + audience_score + "%</span><br>"+
      "<span class='cast'>"+ cast1 + ", " + cast2 + "</span>"+
      "</div>");
  }
}
//for the api of tmdb
  // function successCB(data) {
  //  var obj = JSON.parse(data);
  //  var overview = [];
  //  console.log(obj);
  //  for (var i = 0; i < 10; i++) {

  //    var title = obj.results[i].title;
  //    var poster = "http://image.tmdb.org/t/p/w75" + obj.results[i].poster_path;

  //    overview[i] = obj.results[i].id;
  //    $("#movies").append("<div id='movie" + i + "' class='movie_entry'>" +
  //      "<img width='75' height='113' src='" + poster + "' style='float:left; margin-right:5px'></img>" + "<span><b>" + title + "</b></span><br>"
  //      );
  //    var counter = 0;
  //    theMovieDb.movies.getById({
  //      "id": overview[i]
  //    }, function(data) {
  //      movieCB(data, counter++);
  //    }, errorCB);
  //  }


  // }

  // function movieCB(data, i) {

  //  var obj = JSON.parse(data);
  //  console.log('overview: ', obj); //console.log('i: ', i);
  //  var imdb_link = "http://www.imdb.com/title/" + obj.imdb_id;
  //  var bookmyshow = "http://in.bookmyshow.com/search/results/?_s=0.2&search=" + obj.title;

  //  $("#movie" + i).append("<p>" + obj.overview + "<br><span><a href='" + imdb_link + "' target='blank'><img title='imdb' width='20' height='20' src='/img/imdb.png'></img></a></span> <span><a href='" + bookmyshow + "' target='blank'><img  width='20' height='20' src='/img/bookmyshow.png' title='bookmyshow'></img></a></p><br clear='all'><hr/></div>");
  // }

  // function errorCB(data) {
  //  console.log("Error callback: " + data);
  // };