$(document).ready(function () {
    $("#logout").hide();
  });
  var userID,username,accessToken;
  
  
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
  
    if (response.status === 'connected') {
      // Logged into  app and Facebook.
      userID=response.authResponse.userID; console.log(userID);
      accessToken=response.authResponse.accessToken; 
      
      FB.api(
	    "/"+userID,
	    function (response) {
	    //console.log('username:',response);
	      if (response && !response.error) {
	        username=response.name;
	      
	      }
	      else
	      {
	      	alert('error fetching name');
	      }
	    }
      );
        
      displayFbFeed();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not  app.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
    } else {
      // The person is not logged into Facebook, not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  }
  
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1609834785896648',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  }); 

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  
  function displayFbFeed() {

     document.getElementById('status').innerHTML =   " ";
    $("#login_button").hide();   
    console.log('Welcome!  Fetching your information.... ');
   
    FB.api('me/feed?fields=shares,likes.limit(3).summary(true),comments.limit(3).summary(true),updated_time,created_time,object_id,message,link,story,from,to,source,caption,description,name,picture,actions', function(response) {
      console.log(response.data);
      var feed_entry;
       $("#feed").replaceWith("<div id='feed'></div>");  //to ensure feed exists if the user logs out and logs back in, since feed is removed during logout
      for (var i = 0; i < response.data.length; i++) {
      
        var author       = response.data[i].from.name; //eg: FC barca
        var profile_pic  = "http://graph.facebook.com/" + response.data[i].from.id + "/picture?type=square";
        var profile_link = "https://facebook.com/" + response.data[i].from.id;
        var activity     = response.data[i].story ? response.data[i].story.substr(author.length) : ""; //eg: "barca added 4 photos" is cut to "added 4 photos"
        var created_time = response.data[i].created_time;
        var updated_time = response.data[i].updated_time;
        var message      = response.data[i].message ? response.data[i].message : ""; //eg: status update 
        var link         = response.data[i].link ? response.data[i].link : ""; //eg: link may be to an album or video or fb post or to a website
	var link_name    = response.data[i].link ? response.data[i].name : "";
	var link_desc    = response.data[i].description? response.data[i].description: " ";
	var link_caption = response.data[i].caption ? response.data[i].caption : " ";
        var picture      = response.data[i].object_id ? "https://graph.facebook.com/" + response.data[i].object_id + "/picture?type=normal&access_token="+accessToken :" "; //preview pic for any uploaded photo or video attached to the post. object id exists for only photos or videos
        var likes        = response.data[i].likes ? (response.data[i].likes.summary.total_count+ " likes ") : " ";       
        var comments     = response.data[i].comments ?  (response.data[i].comments.summary.total_count + " comments ") : " ";
        var comments_link= response.data[i].actions ?  response.data[i].actions[0].link : " "; console.log(comments_link);
        var shares       = response.data[i].shares? (response.data[i].shares.count + " shares ") : " ";
        var link_picture         = response.data[i].picture?response.data[i].picture:""; // eg: default small pic
        var story        = response.data[i].story? response.data[i].story :" ";
        var story_author = (story!=" ")? story.substr(0,3): " ";        
        var converted_time = convert_time(created_time);
       
      if(story_author=="You")
      	{
      		activity=story.substr(3); 
      		//console.log(story.substr(3));
      	}
        if(link)
		{
			if(!response.data[i].object_id)  //ie link is to another website post or fb post
				{
					if(response.data[i].picture)  //The picture scraped from any link included with the post.
					{						
						var link_html = "<div class='shared_post'>" + "<a href='" + link + "' target='blank'><img width='130' height='130' style='float:left; margin-right:5px;' src='" + link_picture + "'></img>"+"<div class='link_desc'><span class='link_name'>"+ link_name +"</span></a><p >" + link_desc + "</p><span class='link_caption'>"+ link_caption + "</span></div></div>" ;
					}
					else
						var link_html = "<a href='"+ link + "'target='blank'>" + link_name + "</a>";
				}
			else if(response.data[i].object_id)          //ie link is to an album or video 
				var link_html = "<a href='" + link + "' target='blank'>" + "<img src='" + picture + "'></img></a>" ;
			else
				var link_html = " ";
		}
		else
		{
			var link_html = " ";
		}
        feed_entry = "<div class='post'><p style='clear:both;'><img width='50' height='50' style='float:left;' src='" + profile_pic + "'></img>&nbsp; &nbsp;" + "<b style='color:#3b5998;'>" + "<a class='author' href='" + profile_link + "' target='blank'>" + author + "</a></b>" + " " + "<span class='activity'>" + activity + "</span><br>&nbsp; &nbsp;<span class='time'>" + converted_time + "</span></p><p class='message'>" +
          message + "</p>" + link_html +
          "<p class='actions'><a  href='"+ comments_link + "' target='blank'>" + likes + comments + shares + "</a></p></div>";
       
        $("#feed").append(feed_entry);
      }
      $("#feed").show();
});
}
function logout(){
  FB.logout(function(response) {
    console.log("user is now logged out");
    document.getElementById('status').innerHTML =   'please log into facebook!'; 
    $("#login_button").show();
    $("#feed").hide();
  });
}
var time;
function convert_time( time){
  var given_time   = new Date(time); //time is in ISO format 
  var current_time = new Date();   // current_time is of the form : "Sat Mar 21 2015 00:49:36 GMT+0530 (India Standard Time)"
  var date         = given_time.toDateString();
  var local_time   = given_time.toLocaleTimeString();
  time             = date + " at " + local_time; //eg: Sat Mar 21 2015 at 12:49:36 AM

  var current_time_in_ms = current_time.getTime(); //current time in ms, eg: 1233333333333333534534
  var given_time_in_ms   = given_time.getTime();
  var diff               = current_time_in_ms - given_time_in_ms;
  var mins_ago           = diff / (1000 * 60);
  var hrs_ago            = diff / (1000 * 3600);
  var days_ago           = diff / (1000 * 3600 * 24);
  var weeks_ago          = diff / (1000 * 3600 * 24 * 7);

  var ago;
  var detailed_time;
  
  if(days_ago>7)           //if post is weeks old
  { 
    weeks_ago = parseInt(weeks_ago);
    ago       = (weeks_ago==1) ? (weeks_ago + " week ago "):(weeks_ago + " weeks ago ");    //toFixed is used to round off values 
  }
  else if(hrs_ago>24)      //if post is days old
  {
    days_ago = parseInt(days_ago);
    ago      = (days_ago==1) ? (days_ago + " day ago "):(days_ago + " days ago ");
  }
  else if(mins_ago>60)    //if post is hrs old
  {
    hrs_ago = parseInt(hrs_ago);
    ago     = (hrs_ago==1) ? (hrs_ago + " hr ago "):(hrs_ago + " hrs ago ");
  }
  else                   //if post is mins old
  {
    mins_ago= parseInt(mins_ago);
    ago     = (mins_ago==1) ? (mins_ago + " min ago "):(mins_ago + " mins ago ");
  }

  detailed_time = ago; //+" "+ time;
  return detailed_time;
}
function post_status(){
 var status = $("#status_content").val();
 if(status){
	 var cleaned_status=status.replace(/<(?:.|\n)*?>/gm, ''); //console.log('clean: ', clean);
	 FB.api(
	    "/me/feed",
	    "POST",
	    {
	        message: cleaned_status
	    },
	    function (response) {
		   if (!response || response.error)
		   {     
		    alert('error occured while posting, try again!');
		   } 
		   else
		   {
		    //alert('Post ID: ' + response.id);
		    //console.log(response);
		    //console.log('newpost: ',userID);
		    //console.log('newpost: ',username);
		    var author= username;
		   var profile_pic  = "http://graph.facebook.com/" + userID + "/picture?type=square";
	           var profile_link = "https://facebook.com/" + userID;
		   var new_post= "<div class='post'><p style='clear:both;'><img width='50' height='50' style='float:left;' src='" + profile_pic + "'></img>&nbsp; &nbsp;" + "<b style='color:#3b5998;'>" + "<a class='author' href='" + profile_link + "' target='blank'>" + author + "</a></b>" + " " +"<br>&nbsp; &nbsp;<span class='time'>" + "just now" + "</span></p><p class='message'>" +
		          cleaned_status + "</p>"+
		        "</div>";
		    $("#status_content").val('');      
		    $("#feed").prepend(new_post);
		  }
	    }
	  );
  }
  else
  {
  	alert('status is empty!');
  }
}