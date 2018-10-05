<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="description" content="A customizable webpage with various widgets like customizable news feeds, cricket livescores, youtube feeds, now showing and upcoming movies and more.">
  <meta name="keywords" content="customized news feeds, cricket live scores, upcoming movies, myfrontpage, igoogle, my yahoo india ">
  <meta name="author" content="myfrontpage.in">
  <meta charset="UTF-8">
  
  <title>@yield('meta-title','My Frontpage | customizable news feeds, cricket live scores, trending youtube videos, nowshowing and upcoming movies, hot deals, games and more..')</title>

  <!--jquery-->
  <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>

  <!-- Include bootstrap  -->
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" />  
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

  
  <link rel='stylesheet' href='/css/fullcalendar.min.css' />
  <link href='/css/fullcalendar.print.css' rel='stylesheet' media='print' />
  <link href="/css/ytv.css" type="text/css" rel="stylesheet" />
  <link href="/css/ytv_frame.css" type="text/css" rel="stylesheet"/>
  <link rel="stylesheet" href="/css/homepage_styles_1.css">

  {{-- <link href="/dist/all.min.css" type="text/css" rel="stylesheet"/> --}}
  @yield('head') 

</head>

<body>
  @include('layouts/partials/navbar')
  @if(Auth::guest() || (Auth::check()&&Auth::user()->username!=='admin'))
  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=1609834785896648";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  </script>

  <div id="fb_like_box">
    <div style="float:left;" class="fb-like" data-href="https://www.facebook.com/MyFrontpage.in" data-layout="box_count" data-action="like" data-show-faces="false" data-share="true"></div>
  </div>
  @endif
  @if(Request::path() !== '/')
  <div class="container">
    
    @yield('content_with_no_sidebar')
  </div>
  @endif  
  @if(Request::path() == '/')
  <div class="container">
    <div class="row">
     <div id="content" class='col-md-10 col-xs-12'>
      @include('flash::message') 
      @yield('content') 
    </div> <!-- end content-->
    <div id="sidebar" class = "col-md-2 col-xs-12">
      @yield('sidebar') 
    </div>
  </div> <!-- end of row-->
</div><!-- /.container -->
@endif  
</body>
</html>
