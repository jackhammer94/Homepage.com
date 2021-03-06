<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
#admin
Route::group(array('prefix'=> 'admin', 'before' => 'auth.admin'), function() {

  // Show Dashboard (url: http://yoursite.com/admin)
  Route::get('/', array('uses' => 'Admin\\DashboardController@index', 'as' => 'admin.home'));

  // Resource Controller for user management, nested so it needs to be relative
  //Route::resource('users', 'Admin\\UsersController');
  Route::get('/movies', 'Admin\\DashboardController@show_movies');
  Route::post('/add_movie', 'Admin\\DashboardController@add_movie');  
  Route::get('/edit_movie/{id}', 'Admin\\DashboardController@edit_movie');
  Route::put('/update_movie/{id}', 'Admin\\DashboardController@update_movie');
  Route::post('/delete_movie/{id}', 'Admin\\DashboardController@delete_movie');
  Route::post('/delete_all_movies', 'Admin\\DashboardController@delete_all_movies');

  Route::get('/feeds', 'Admin\\DashboardController@feeds');

});

Route::filter('auth.admin', function(){
    // Check if the user is logged in, if not redirect to login url
  if (Auth::guest()) return Redirect::guest('login');

    // Check user type admin/general etc
  if (Auth::user()->username !== 'admin') return Redirect::home(); // home
});

#pages
Route::get('/',['as'=>'home','uses'=>'PagesController@index']);
Route::get('/deals', 'PagesController@deals');
Route::get('/settings', 'PagesController@settings');
Route::put('/update_email/{id}', 'PagesController@update_email');
Route::put('/update_password/{id}', 'PagesController@update_password');

#movies
Route::get('/get_movies', 'MoviesController@get_movies');
Route::get('/get_upcoming_movies', 'MoviesController@get_upcoming_movies');
Route::get('/show_movies', 'MoviesController@show_movies');

#games
Route::get('/games', 'PagesController@games');
Route::get('/games/{game}', function($game){
  switch($game) {
    case 'monkey_lander':
    return View::make('games.index', ['game'=>'monkey_lander']);
    case 'alien_attack':
    return View::make('games.index', ['game'=>'alien_attack']);
    case 'bush_shoot_out':
    return View::make('games.index', ['game'=>'bush_shoot_out']);
    case 'alphattack':
    return View::make('games.index', ['game'=>'alphattack']);
    case 'red_beard':
    return View::make('games.index', ['game'=>'red_beard']);
    case 'rural_racer':
    return View::make('games.index', ['game'=>'rural_racer']);
    case 'samurai_warrior':
    return View::make('games.index', ['game'=>'samurai_warrior']);
    case 'trapshoot':
    return View::make('games.index', ['game'=>'trapshoot']);
    case 'snake':
    return View::make('games.index', ['game'=>'snake']);
    case 'rigelian_hotshots':
    return View::make('games.index', ['game'=>'rigelian_hotshots']);
    case 'king_of_the_hill':
    return View::make('games.index', ['game'=>'king_of_the_hill']);
    case 'panik_in_chocoland':
    return View::make('games.index', ['game'=>'panik_in_chocoland']);
    case 'stan_skates':
    return View::make('games.index', ['game'=>'stan_skates']);
    case 'surfs_up':
    return View::make('games.index', ['game'=>'surfs_up']);
    case 'mission_mars':
    return View::make('games.index', ['game'=>'mission_mars']);
    case 'reel_gold':
    return View::make('games.index', ['game'=>'reel_gold']);
    case 'bush_royal_rampage':
    return View::make('games.index', ['game'=>'bush_royal_rampage']);
    case 'alien_clones':
    return View::make('games.index', ['game'=>'alien_clones']);
    case 'ufo_joe':
    return View::make('games.index', ['game'=>'ufo_joe']);
    case 'twiddlestix':
    return View::make('games.index', ['game'=>'twiddlestix']);
    default:
    return 'error:page not found!';
}
});


#Registration
Route::get('/register', 'RegistrationController@create');
Route::post('/register', ['as'=>'registration.store', 'uses'=>'RegistrationController@store']);
Route::get('/register/resend_activation','RegistrationController@getResend');
Route::post('/register/resend_activation',['as'=>'registration.postResend','uses'=>'RegistrationController@postResend']);
Route::get( 'register/verify/{confirmationCode}',  'RegistrationController@confirm');


#authentication
Route::get('login', ['as'=>'login', 'uses'=>'SessionsController@create']);
Route::get('logout',['as' => 'logout', 'uses' =>'SessionsController@destroy']);
Route::resource('sessions', 'SessionsController', ['only'=>['create', 'store', 'destroy']]);
Route::controller('password', 'RemindersController');

#calendar
Route::post('/add_event', 'CalendarController@add_event');
Route::post('/delete_event', 'CalendarController@delete_event');
Route::post('/update_event', 'CalendarController@update_event');
Route::post('/update_event_title', 'CalendarController@update_event_title');
Route::get('/show_events', 'CalendarController@show_events');

#todo
Route::post('/add_task', 'TodoController@add_task');
Route::post('/delete_task', 'TodoController@delete_task');
Route::get('/show_tasks', 'TodoController@show_tasks');

// #favorites
// Route::post('/add_favorite','FavoritesController@add_favorite');
// Route::get('/show_favorites', 'FavoritesController@show_favorites');

#add feeds
Route::post('/add_feed', 'FeedsController@add_feed');
Route::post('/remove_feed', 'FeedsController@remove_feed');
Route::get('/show_feeds', 'FeedsController@show_feeds');
Route::get('/get_feed_url', 'FeedsController@get_feed_url');

// Route::post('/add_feed', 'WidgetControllerOld@add_feed');
// Route::get('/show_feeds', 'WidgetControllerOld@show_feeds');

#add channels
Route::post('/add_channel', 'ChannelsController@add_channel');
Route::get('/show_channels', 'ChannelsController@show_channels');
Route::get('/get_channels', 'ChannelsController@get_channels');
Route::get('/get_channel_id', 'ChannelsController@get_channel_id');
Route::post('/remove_channel', 'ChannelsController@remove_channel');

#app
Route::get('/get_app', 'ApplicationsController@get_app');
Route::post('/save_app', 'ApplicationsController@save_app');
Route::post('/remove_app', 'ApplicationsController@remove_app');
Route::get('/show_apps', 'ApplicationsController@show_apps');

#test
Route::get('/test/livescore', function(){
    return View::make('test.livescore');
});
Route::get('/test/calendar', function(){
    return View::make('test.calendar');
});

Route::get('/test/tv', function(){
    $news_channels = DB::table('channels')-> where('channel_category','news')-> orderBy('channel_name','asc')->get();
    $entertainment_channels = DB::table('channels')-> where('channel_category','entertainment')-> orderBy('channel_name','asc')->get();
    $movies_channels = DB::table('channels')-> where('channel_category','movies')-> orderBy('channel_name','asc')->get();
    $devotional_channels = DB::table('channels')-> where('channel_category','devotional')-> orderBy('channel_name','asc')->get();
    $kids_channels = DB::table('channels')-> where('channel_category','kids')-> orderBy('channel_name','asc')->get();
    $documentary_channels =DB::table('channels')-> where('channel_category','documentary')-> orderBy('channel_name','asc')->get();
    $sports_channels =DB::table('channels')-> where('channel_category','sports')-> orderBy('channel_name','asc')->get();
    $music_channels =DB::table('channels')-> where('channel_category','music')-> orderBy('channel_name','asc')->get();
    return View::make('test.tv_test', [
                      'news_channels'=>$news_channels,'entertainment_channels'=>$entertainment_channels, 'sports_channels'=>$sports_channels, 'devotional_channels'=>$devotional_channels, 'documentary_channels'=>$documentary_channels, 'kids_channels'=>$kids_channels, 'music_channels'=>$music_channels, 'movies_channels'=>$movies_channels]);
});

Route::get('/test/feed', function(){
    $applications =DB::table('applications')->where('application_name','!=','void_application')->where('application_name','!=','feeds')->orderBy('created_at','desc')->get();

    $request = Request::create('/show_apps', 'GET');
        $user_applications = Route::dispatch($request)->getContent();
        $user_applications = json_decode($user_applications);

    $news = DB::table('feeds')-> where('feed_category','news')-> orderBy('feed_name','asc')->get();
    $entertainment = DB::table('feeds')-> where('feed_category','entertainment')-> orderBy('feed_name','asc')->get();
    $business = DB::table('feeds')-> where('feed_category','business')-> orderBy('feed_name','asc')->get();
    $health = DB::table('feeds')-> where('feed_category','health')-> orderBy('feed_name','asc')->get();
    $technology = DB::table('feeds')-> where('feed_category','technology')-> orderBy('feed_name','asc')->get();
    $science =DB::table('feeds')-> where('feed_category','science')-> orderBy('feed_name','asc')->get();
    $sports =DB::table('feeds')-> where('feed_category','sports')-> orderBy('feed_name','asc')->get();
    $other =DB::table('feeds')-> where('feed_category','other')-> orderBy('feed_name','asc')->get();
    return View::make('test.feed', ['user_applications'=>$user_applications, 'applications'=>$applications, 'news'=>$news, 'entertainment'=> $entertainment, 'business'=>$business, 'health'=>$health, 'technology'=>$technology, 'science'=>$science, 'sports'=>$sports, 'other'=>$other]);
});



