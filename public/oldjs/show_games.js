$(document).ready(function() {
	

});

function show_game( game){

	 switch (game) {
      case "monkey_lander":
        var game_data = "<div class='miniclip-game-embed' data-game-name='monkey-lander' data-theme='0' data-width='750' data-height='400' data-language='en'><a href='http://www.miniclip.com/games/monkey-lander/'>Play Monkey Lander</a></div>"+
"<p style='text-align:center;'><a href='http://www.miniclip.com/games/monkey-lander/' target='_blank'>Play Monkey Lander</a> / More <a href='http://www.miniclip.com/games/genre-13/' target='_blank'>Action games</a></p>";
        break;
      case "alien_attack":
        var game_data = '<div class="miniclip-game-embed" data-game-name="alien-attack" data-theme="0" data-width="544" data-height="391" data-language="en"><a href="http://www.miniclip.com/games/alien-attack/">Play Alien Attack</a></div>'+
'<p style="text-align:center;"><a href="http://www.miniclip.com/games/alien-attack/" target="_blank">Play Alien Attack</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot Em Up games</a></p>';
        break;
      case "yahoo_news_hollywood":
        var game_data = 'https://in.news.yahoo.com/rss/hollywood';
        break;
      default:
        var game_data = "";

    }
//$("#game_modal_body").replaceWith("<div id='games'>"+game_data+"</div>"+"");
$("#game_modal").modal('show');
}