@extends('layouts.master')
@section('head')
<script src='//static.miniclipcdn.com/js/game-embed.js'></script>
@stop
@section('content')
@include('games.list')
<!-- Place this code where you'd like the game to appear -->
<div id="game">
@if($game=='alien_attack')

<div  class="miniclip-game-embed" data-game-name="alien-attack" data-theme="0" data-width="544" data-height="391" data-language="en"><a href="http://www.miniclip.com/games/alien-attack/">Play Alien Attack</a></div>
<p ><a href="http://www.miniclip.com/games/alien-attack/" target="_blank">Play Alien Attack</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot Em Up games</a></p>
@endif

@if($game=='monkey_lander')
<div class='miniclip-game-embed' data-game-name='monkey-lander' data-theme='0' data-width='750' data-height='400' data-language='en'><a href='http://www.miniclip.com/games/monkey-lander/'>Play Monkey Lander</a></div>
<p style='text-align:center;'><a href='http://www.miniclip.com/games/monkey-lander/' target='_blank'>Play Monkey Lander</a> / More <a href='http://www.miniclip.com/games/genre-13/' target='_blank'>Action games</a></p>
@endif

@if($game=='bush_shoot_out')
<div class="miniclip-game-embed" data-game-name="bush-shoot-out" data-theme="0" data-width="600" data-height="420" data-language="en"><a href="http://www.miniclip.com/games/bush-shoot-out/">Play Bush Shoot-Out</a></div>
<p ><a href="http://www.miniclip.com/games/bush-shoot-out/" target="_blank">Play Bush Shoot-Out</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot 'Em Up games</a></p>
@endif

@if($game=='alphattack')
<div class="miniclip-game-embed" data-game-name="alphattack" data-theme="0" data-width="400" data-height="460" data-language="en"><a href="http://www.miniclip.com/games/alphattack/">Play Alphattack</a></div>
<p ><a href="http://www.miniclip.com/games/alphattack/" target="_blank">Play Alphattack</a> / More <a href="http://www.miniclip.com/games/genre-476/" target="_blank">Brain Training games</a></p>
@endif

@if($game=='red_beard')
<div class="miniclip-game-embed" data-game-name="red-beard" data-theme="0" data-width="550" data-height="366" data-language="en"><a href="http://www.miniclip.com/games/red-beard/">Play Red Beard</a></div>
<p ><a href="http://www.miniclip.com/games/red-beard/" target="_blank">Play Red Beard</a> / More <a href="http://www.miniclip.com/games/genre-11/" target="_blank">Hot games</a></p>
@endif

@if($game=='rural_racer')
<div class="miniclip-game-embed" data-game-name="rural-racer" data-theme="0" data-width="570" data-height="400" data-language="en"><a href="http://www.miniclip.com/games/rural-racer/">Play Rural Racer</a></div>
<p ><a href="http://www.miniclip.com/games/rural-racer/" target="_blank">Play Rural Racer</a> / More <a href="http://www.miniclip.com/games/genre-3/" target="_blank">Sports games</a></p>
@endif

@if($game=='samurai_warrior')
<div class="miniclip-game-embed" data-game-name="samurai-warrior" data-theme="0" data-width="600" data-height="450" data-language="en"><a href="http://www.miniclip.com/games/samurai-warrior/">Play Samurai Warrior</a></div>
<p ><a href="http://www.miniclip.com/games/samurai-warrior/" target="_blank">Play Samurai Warrior</a> / More <a href="http://www.miniclip.com/games/genre-13/" target="_blank">Action games</a></p>
@endif

@if($game=='trapshoot')
<div class="miniclip-game-embed" data-game-name="trapshoot" data-theme="0" data-width="549" data-height="384" data-language="en"><a href="http://www.miniclip.com/games/trapshoot/">Play Trapshoot</a></div>
<p ><a href="http://www.miniclip.com/games/trapshoot/" target="_blank">Play Trapshoot</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot 'Em Up games</a></p>
@endif

@if($game=='snake')
<div class="miniclip-game-embed" data-game-name="snake" data-theme="0" data-width="450" data-height="360" data-language="en"><a href="http://www.miniclip.com/games/snake/">Play Snake</a></div>
<p ><a href="http://www.miniclip.com/games/snake/" target="_blank">Play Snake</a> / More <a href="http://www.miniclip.com/games/genre-1/" target="_blank">Puzzle games</a></p>
@endif

@if($game=='rigelian_hotshots')
<div class="miniclip-game-embed" data-game-name="rigelian-hotshots" data-theme="0" data-width="550" data-height="445" data-language="en"><a href="http://www.miniclip.com/games/rigelian-hotshots/">Play Rigelian Hotshots</a></div>
<p ><a href="http://www.miniclip.com/games/rigelian-hotshots/" target="_blank">Play Rigelian Hotshots</a> / More <a href="http://www.miniclip.com/games/genre-13/" target="_blank">Action games</a></p>
@endif

@if($game=='king_of_the_hill')
<div class="miniclip-game-embed" data-game-name="king-of-the-hill" data-theme="0" data-width="560" data-height="360" data-language="en"><a href="http://www.miniclip.com/games/king-of-the-hill/">Play King of the Hill</a></div>
<p ><a href="http://www.miniclip.com/games/king-of-the-hill/" target="_blank">Play King of the Hill</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot 'Em Up games</a></p>
@endif

@if($game=='panik_in_chocoland')
<div class="miniclip-game-embed" data-game-name="panik-in-chocoland" data-theme="0" data-width="556" data-height="463" data-language="en"><a href="http://www.miniclip.com/games/panik-in-chocoland/">Play Panik in Chocoland</a></div>
<p ><a href="http://www.miniclip.com/games/panik-in-chocoland/" target="_blank">Play Panik in Chocoland</a> / More <a href="http://www.miniclip.com/games/genre-13/" target="_blank">Action games</a></p>
@endif

@if($game=='stan_skates')
<div class="miniclip-game-embed" data-game-name="stan-skates" data-theme="0" data-width="550" data-height="400" data-language="en"><a href="http://www.miniclip.com/games/stan-skates/">Play Stan Skates</a></div>
<p ><a href="http://www.miniclip.com/games/stan-skates/" target="_blank">Play Stan Skates</a> / More <a href="http://www.miniclip.com/games/genre-3/" target="_blank">Sports games</a></p>
@endif

@if($game=='surfs_up')
<div class="miniclip-game-embed" data-game-name="surfs-up" data-theme="0" data-width="550" data-height="400" data-language="en"><a href="http://www.miniclip.com/games/surfs-up/">Play Surf's Up</a></div>
<p ><a href="http://www.miniclip.com/games/surfs-up/" target="_blank">Play Surf's Up</a> / More <a href="http://www.miniclip.com/games/genre-3/" target="_blank">Sports games</a></p>
@endif

@if($game=='mission_mars')
<div class="miniclip-game-embed" data-game-name="mission-mars" data-theme="0" data-width="546" data-height="446" data-language="en"><a href="http://www.miniclip.com/games/mission-mars/">Play Mission Mars</a></div>
<p ><a href="http://www.miniclip.com/games/mission-mars/" target="_blank">Play Mission Mars</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot 'Em Up games</a></p>
@endif

@if($game=='reel_gold')
<div class="miniclip-game-embed" data-game-name="reel-gold" data-theme="0" data-width="550" data-height="450" data-language="en"><a href="http://www.miniclip.com/games/reel-gold/">Play Reel Gold</a></div>
<p ><a href="http://www.miniclip.com/games/reel-gold/" target="_blank">Play Reel Gold</a> / More <a href="http://www.miniclip.com/games/genre-13/" target="_blank">Action games</a></p>
@endif

@if($game=='bush_royal_rampage')
<div class="miniclip-game-embed" data-game-name="bush-royal-rampage" data-theme="0" data-width="550" data-height="445" data-language="en"><a href="http://www.miniclip.com/games/bush-royal-rampage/">Play Bush Royal Rampage</a></div>
<p ><a href="http://www.miniclip.com/games/bush-royal-rampage/" target="_blank">Play Bush Royal Rampage</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot 'Em Up games</a></p>
@endif

@if($game=='alien_clones')
<div class="miniclip-game-embed" data-game-name="alien-clones" data-theme="0" data-width="545" data-height="490" data-language="en"><a href="http://www.miniclip.com/games/alien-clones/">Play Alien Clones</a></div>
<p ><a href="http://www.miniclip.com/games/alien-clones/" target="_blank">Play Alien Clones</a> / More <a href="http://www.miniclip.com/games/genre-5/" target="_blank">Shoot 'Em Up games</a></p>
@endif

@if($game=='ufo_joe')
<div class="miniclip-game-embed" data-game-name="ufo-joe" data-theme="0" data-width="550" data-height="400" data-language="en"><a href="http://www.miniclip.com/games/ufo-joe/">Play UFO Joe</a></div>
<p ><a href="http://www.miniclip.com/games/ufo-joe/" target="_blank">Play UFO Joe</a> / More <a href="http://www.miniclip.com/games/genre-13/" target="_blank">Action games</a></p>
@endif

@if($game=='twiddlestix')
<div class="miniclip-game-embed" data-game-name="twiddlestix" data-theme="0" data-width="480" data-height="350" data-language="en"><a href="http://www.miniclip.com/games/twiddlestix/">Play Twiddlestix</a></div>
<p ><a href="http://www.miniclip.com/games/twiddlestix/" target="_blank">Play Twiddlestix</a> / More <a href="http://www.miniclip.com/games/genre-1/" target="_blank">Puzzle games</a></p>
@endif
</div>
@stop