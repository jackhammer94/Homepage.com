	//live score script

	$(function() {
		var query = ["select * from cricket.past_matches", "select * from cricket.upcoming_matches"];
		var container = [".past-matches", ".upcoming-matches"];
		query.forEach(function(queryVal, cnt) {
			$.ajax({
				url: "https://query.yahooapis.com/v1/public/yql",
				jsonp: "callback",
				dataType: "jsonp",
				data: {
					q: queryVal,
					env: "store://0TxIGQMQbObzvU4Apia0V0",
					format: "json"
				},
				// Work with the response
				success: function(data) {
					console.log(data);
					var results = data.query.results;
					var active, UTC, match_date, logo;
					for (var i = 0; i < data.query.count; i++) {
						active = (i === 0) ? "active" : "";
						match_date = moment(results.Match[i].StartDate).format('dddd, D MMMM, h:mm A');
						venue = results.Match[i].Venue.content;
						$(container[cnt] + ' .carousel-inner').append('<div class="item ' + active + '"><table class="table-' + i + ' table"><tbody class="body"></tbody></table></div>');
						for (var j = 0; j < results.Match[i].Team.length; j++) {

							add_logo(results.Match[i].Team[j].Team, container[cnt] + ' .table-' + i + ' .body .' + i + j + ' td:first-child');

							$(container[cnt] + '  .carousel-inner .table-' + i + ' .body').append('<tr class="' + i + j + '"><td>' + results.Match[i].Team[j].Team + '</td></tr>');
						}
						if (results.Match[i].Result) //if results are there, ie if its a recent match
						{

							if (results.Match[i].Result.how != 'abandoned') //if match was abandoned 
							{
								if (results.Match[i].Result.how == "drawn") {
									$(container[cnt] + ' .table-' + i + ' .body .' + i + 0).append('<td rowspan="2" style="vertical-align:middle" class="game-result">Match Drawn</td>');
								} else {
									for (var k = 0; k < results.Match[i].Team.length; k++) {

										if ((results.Match[i].Result.Team[k].matchwon).localeCompare("yes")) //find the match winner's id
										{
											for (var l = 0; l < results.Match[i].Team.length; l++) //find the match winner's name
											{
												if ((results.Match[i].Team[l].teamid).localeCompare(results.Match[i].Result.Team[k].id))
													$(container[cnt] + ' .body .' + i + 0).append('<td rowspan="2" style="vertical-align:middle" class="game-result">' + results.Match[i].Team[l].Team + ' won by ' + results.Match[i].Result.by + ' ' + results.Match[i].Result.how + '</td>');
											}
										}
									}
								}

							} else {
								$(container[cnt] + ' .table-' + i + ' .body .' + i + 0).append('<td rowspan="2" style="vertical-align:middle" class="game-result">Match was abandoned</td>');
							}

							$(container[cnt] + ' .table-' + i + ' .body .' + i + 0).append('<td rowspan="2" style="vertical-align:middle" class="col-md-5 text-muted">' + results.Match[i].series_name + '<br><span>' + results.Match[i].MatchNo + '</span><br><span>' + match_date + '</span><br><span>' + venue + '</span></td>');

						} else //print the date of upcoming match
						{
							$(container[cnt] + ' .table-' + i + ' .body .' + i + 0).append('<td rowspan="2" style="vertical-align:middle" class="col-md-5 text-muted">' + results.Match[i].series_name + '<br><span>' + results.Match[i].MatchNo + '</span><br><span>' + match_date + '</span><br><span>' + venue + '</span></td>');
						}
					}
				}
			});
		});
		var href;

		$('.carousel-control').on('click', function() {
			href = $(this).attr('href');
		});
		$('.carousel').carousel({
			wrap: false
		}).on('slid.bs.carousel', function() {
			curSlide = $(href + ' .active');
			if (curSlide.is(' :first-child')) {
				$(href + ' .left').hide();
				return;
			} else {
				$(href + ' .left').show();
			}
			if (curSlide.is(':last-child')) {
				$(href + ' .right').hide();
				return;
			} else {
				$(href + ' .right').show();
			}
		});
	});
	//LIVE MATCHES
	window.setInterval(function() {
		var query = ["select * from cricket.scorecard.live.summary"];
		query.forEach(function(queryVal, cnt) {
			$.ajax({
				url: "https://query.yahooapis.com/v1/public/yql",
				jsonp: "callback",
				dataType: "jsonp",
				data: {
					q: queryVal,
					env: "store://0TxIGQMQbObzvU4Apia0V0",
					format: "json"
				},
				// Work with the response
				success: function(data) {
					console.log(data);
					var results = data.query.results;
					if (data.query.count > 0) //if there are live matches
					{
						var Scorecard = results.Scorecard;
						var teams,
							past_ings,
							flag;
						if (Array.isArray(Scorecard)) //if there are multiple live matches then Scorecard is an array
						{
							for (var i = 0; i < Scorecard.length; i++) //iterate through matches
							{
								teams = Scorecard[i].teams;
								past_ings = Scorecard[i].past_ings;
								flag = check('flag', teams);
								//console.log('flags: ', flag);
								if (teams === null || past_ings === null) {
									console.log("error fetching livescore");
									continue;
								}

								if (flag !== 2) //check whether both teams flags are available
								{
									console.log('error fetchin flag in livescore');
									continue;
								}
								update_score(Scorecard[i]);

							}
						} else //there is only one live match so Scorecard is a variable
						{
							//to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
							teams = Scorecard.teams;
							past_ings = Scorecard.past_ings;
							flag = check('flag', teams);
							//console.log('flags: ', flag);
							if (teams === null || past_ings === null) {
								console.log("error fetching livescore");
								return;
							}

							if (flag !== 2) {
								console.log('error fetchin flag in livescore');
								return;
							}
							update_score(Scorecard);
						}

					} else if (data.query.count === 0) //if no live matches 
					{
						$("#cricket-1 .loader").remove();
						$("#cricket-1").empty();
						$("#cricket-1").append('<p id="no-game-message">no games in progress</p>');
					}
				}
			});
		});
	}, 10000);

	function check(prop, obj) {
		var count = 0;
		for (var curr_obj in obj) {
			if (obj[curr_obj].hasOwnProperty(prop)) {
				count++;
				//console.log('flag obj', obj[curr_obj][prop]);
			}
		}
		return count;
	}

	function add_logo(team_name, append_to) {
		var nImg = document.createElement('img');
		nImg.src = '/img/' + team_name + '.png';
		nImg.onload = function() {
			// image exists and is loaded
			$(append_to).prepend('<img src="' + nImg.src + '"/>');
		};
		nImg.onerror = function() {
			// image did not load
			console.log('logo not found!');
		};
	}

	function update_score(Scorecard) {
		var p,
			flag,
			bowling_team;
		$("#cricket-1 .loader").remove();
		if (document.getElementById("no-game-message") !== null)
			$("#no-game-message").remove();
		if (document.getElementById(Scorecard.mid) !== null) {
			$('#' + Scorecard.mid + " tbody").empty();
			//console.log('replaceing...');
		} else {
			
			$("#cricket-1").append('<div id="' + Scorecard.mid + '" ><p class="series_name">' + Scorecard.series.series_name + '</p><table class="table"><tbody></tbody></table></div><hr>');
			//console.log('creating..');
		}
		if (Array.isArray(Scorecard.past_ings)) //if the current batting team is chasing target then 'past_ings' is an array
		{ //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
			for (p = 0; p < 2; p++) //match teams with their score and print their names
			{
				if ((Scorecard.teams[p].i).localeCompare(Scorecard.past_ings[0].s.a.i) === 0) {
					flag = Scorecard.teams[p].flag.roundstd ? Scorecard.teams[p].flag.roundstd : Scorecard.teams[p].logo.small;
					$('#' + Scorecard.mid + " tbody").append('<tr><td class = "teams batting"><img src="' + flag + '"></img>' + Scorecard.teams[p].fn +
						'</td><td class="score"> ' + Scorecard.past_ings[0].s.a.r + '/' + Scorecard.past_ings[0].s.a.w + " (" + Scorecard.past_ings[0].s.a.o + ')</td></tr>'); //r-runs w-wicket o-overs

					bowling_team = (p === 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
					flag = Scorecard.teams[bowling_team].flag.roundstd ? Scorecard.teams[bowling_team].flag.roundstd : Scorecard.teams[bowling_team].logo.small;
					$('#' + Scorecard.mid + " tbody").append('<tr><td class = "teams bowling"><img src="' + flag + '"></img>' + Scorecard.teams[bowling_team].fn +
						'</td><td class="score" > ' + Scorecard.past_ings[1].s.a.r + '/' + Scorecard.past_ings[1].s.a.w + " (" + Scorecard.past_ings[1].s.a.o + ')</td></tr>'); //r-runs w-wicket o-overs

					break;
				}
			}
		} else //if the second team is yet to bat, then jason object 'past_ings' is a variable ie., only the batting team score is returned in past_ings
		{
			for (p = 0; p < 2; p++) //match teams with their score and print their names
			{
				if ((Scorecard.teams[p].i).localeCompare(Scorecard.past_ings.s.a.i) === 0) //the current batting team
				{
					flag = Scorecard.teams[p].flag.roundstd ? Scorecard.teams[p].flag.roundstd : Scorecard.teams[p].logo.small;
					$("#" + Scorecard.mid + " tbody").append('<tr><td class = "teams batting"><img src="' + flag + '"></img>' + Scorecard.teams[p].fn +
						'</td><td class="score"> ' + Scorecard.past_ings.s.a.r + '/' + Scorecard.past_ings.s.a.w + " (" + Scorecard.past_ings.s.a.o + ')</td></tr>'); //r-runs w-wicket o-overs 

					bowling_team = (p === 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
					flag = Scorecard.teams[bowling_team].flag.roundstd ? Scorecard.teams[bowling_team].flag.roundstd : Scorecard.teams[bowling_team].logo.small;
					$('#' + Scorecard.mid + " tbody").append('<tr><td class = "teams bowling"><img src="' + flag + '"></img>' + Scorecard.teams[bowling_team].fn +
						'</td><td class="score" style="opacity:0.5;"> yet to bat</td></tr>');

					break;
				}

			}
		}

	}