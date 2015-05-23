<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="description" content="A customizable webpage with various widgets like customizable news feeds, cricket livescores, youtube feeds, now showing and upcoming movies and more.">
  <meta name="keywords" content="customized news feeds, cricket live scores, upcoming movies, myfrontpage, igoogle, my yahoo india ">
  <meta name="author" content="myfrontpage.in">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@yield('meta-title','My Frontpage | customizable news feeds, cricket live scores, trending youtube videos, nowshowing and upcoming movies, hot deals, games and more..')</title>

  <!--jquery-->
  <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
 {{-- <script src="/js/jquery.cookie.js"></script> --}}
 

  <!--fullcalendar-->
  <link rel='stylesheet' href='/css/fullcalendar.min.css' />
  <link href='/css/fullcalendar.print.css' rel='stylesheet' media='print' />
  <script src='/js/moment.min.js'></script>
  <script src='/js/fullcalendar.min.js'></script>
  
  <!-- Include bootstrap  -->
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
  <script type="text/javascript">
  $('#myModal').modal();     
  </script>

  <!-- homepage_styles -->
  <link rel="stylesheet" href="/css/homepage_styles_1.css">
  <link rel="stylesheet" href="/css/dynamic-div.css">

  <!-- fonts -->
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="/css/fontello.css" rel="stylesheet">
  <link rel="stylesheet" href="/css/animation.css">
  <!--[if IE 7]><link rel="stylesheet" href="/css/fontello-ie7.css"><![endif]-->  
  
  
  @yield('head') 

</head>

<body>
  @include('layouts/partials/navbar')

  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=1609834785896648";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>

  <div id="fb_like_box">
    <div style="float:left;" class="fb-like" data-href="https://www.facebook.com/MyFrontpage.in" data-layout="box_count" data-action="like" data-show-faces="false" data-share="true"></div>
  </div>
  <div class="container">

    @include('flash::message')   
    @yield('content') 

  </div><!-- /.container -->

</body>
</html>
