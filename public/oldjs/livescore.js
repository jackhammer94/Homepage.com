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
				for (var i = 0; i < data.query.count; i++) {
					for (var j = 0; j < results.Match[i].Team.length; j++) {
						$(container[cnt]).append('<p>' + results.Match[i].Team[j].Team + '</p>');

					}


					if (results.Match[i].Result) //if results are there, ie if its a recent match
					{

						if (results.Match[i].Result.how != 'abandoned') //if match was abandoned 
						{
							if (results.Match[i].Result.how == "drawn") {
								$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">Match Drawn</p>');
							} else {
								for (var k = 0; k < results.Match[i].Team.length; k++) {

									if ((results.Match[i].Result.Team[k].matchwon).localeCompare("yes")) //find the match winner's id
									{
										for (var l = 0; l < results.Match[i].Team.length; l++) //find the match winner's name
										{
											if ((results.Match[i].Team[l].teamid).localeCompare(results.Match[i].Result.Team[k].id))
												$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">' + results.Match[i].Team[l].Team + ' won by ' + results.Match[i].Result.by + ' ' + results.Match[i].Result.how + '</p>');
										}
									}


								}
							}

						} else {
							$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">Match was abandoned</p>');
						}

					} else //print the date of upcoming match
					{
						var date = new Date(results.Match[i].StartDate);
						date = date.toDateString().substr(0, 10);
						var time = new Date(results.Match[i].StartDate);
						time = time.toTimeString().substr(0, 5);
						var am_pm = new Date(results.Match[i].StartDate);
						am_pm = am_pm.toLocaleTimeString().substr(8, 3);
						$(container[cnt]).append('<p style="border-bottom: 1px solid #555; opacity:0.7;">' + date + ', ' + time + ' ' + am_pm + ' (IST)</p>');
					}
					$(container[cnt]).append('<br>');
				}

			}

		});
	})
});
//LIVE MATCHES
window.setInterval(function() {
	var query = ["select * from cricket.scorecard.live.summary"];
	var container_live = ["div.LIVE", "div.LIVE1", "div.LIVE2", "div.LIVE3", "div.LIVE4"];
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

				$(container_live[cnt]).replaceWith('<div class="LIVE" >');
				if (data.query.count > 0) //if there are live matches
				{
					if (Array.isArray(results.Scorecard)) //if there are multiple live matches then Scorecard is an array
					{
						for (var i = 0; i < results.Scorecard.length; i++) //iterate through matches
						{
							var teams = results.Scorecard[i].teams;
							var past_ings = results.Scorecard[i].past_ings;
							if(teams == null || past_ings == null){
								console.log("error fetching livescore");
								continue;
							}
							if (Array.isArray(results.Scorecard[i].past_ings)) //if the current batting team is chasing target then 'past_ings' is an array
							{ //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
								for (var p = 0; p < 2; p++) //match teams with their score and print their names
								{
									if ((results.Scorecard[i].teams[p].i).localeCompare(results.Scorecard[i].past_ings[0].s.a.i) == 0) {
										var flag = results.Scorecard[i].teams[p].flag.roundstd ? results.Scorecard[i].teams[p].flag.roundstd : results.Scorecard[i].teams[p].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[p].fn +
											'<span class="score"> ' + results.Scorecard[i].past_ings[0].s.a.r + '/' + results.Scorecard[i].past_ings[0].s.a.w + " (" + results.Scorecard[i].past_ings[0].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs

										var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
										var flag = results.Scorecard[i].teams[bowling_team].flag.roundstd ? results.Scorecard[i].teams[bowling_team].flag.roundstd : results.Scorecard[i].teams[bowling_team].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[bowling_team].fn +
											'<span class="score" > ' + results.Scorecard[i].past_ings[1].s.a.r + '/' + results.Scorecard[i].past_ings[1].s.a.w + " (" + results.Scorecard[i].past_ings[1].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs
										$(container_live[cnt]).append('<br>');
										break;
									}
								}
							} else //if the second team is yet to bat, then jason object 'past_ings' is a variable ie., only the batting team score is returned in past_ings
							{
								for (var p = 0; p < 2; p++) //match teams with their score and print their names
								{
									if ((results.Scorecard[i].teams[p].i).localeCompare(results.Scorecard[i].past_ings.s.a.i) == 0) //the current batting team
									{
										var flag = results.Scorecard[i].teams[p].flag.roundstd ? results.Scorecard[i].teams[p].flag.roundstd : results.Scorecard[i].teams[p].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[p].fn +
											'<span class="score"> ' + results.Scorecard[i].past_ings.s.a.r + '/' + results.Scorecard[i].past_ings.s.a.w + " (" + results.Scorecard[i].past_ings.s.a.o + ')</span></p>'); //r-runs w-wicket o-overs 

										var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
										var flag = results.Scorecard[i].teams[bowling_team].flag.roundstd ? results.Scorecard[i].teams[bowling_team].flag.roundstd : results.Scorecard[i].teams[bowling_team].logo.small;
										$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard[i].teams[bowling_team].fn +
											'<span class="score" style="opacity:0.5;"> yet to bat</span></p>');
										$(container_live[cnt]).append('<br>');
										break;
									}

								}
							}
						}
					} else //there is only one live match so Scorecard is a variable
					{
						if (Array.isArray(results.Scorecard.past_ings)) //if the current batting team is chasing target then 'past_ings' is an array
						{ //to make sure the team names match the team score, since the jason string returned always stores the current batting team as team 0 in past_ings array
							var teams = results.Scorecard.teams;
							var past_ings = results.Scorecard.past_ings;
							if(teams == null || past_ings == null){
								console.log("error fetching livescore");
								return;
							}


							for (var p = 0; p < 2; p++) //match teams with their score and print their names
							{
								if ((results.Scorecard.teams[p].i).localeCompare(results.Scorecard.past_ings[0].s.a.i) == 0) {
									var flag = results.Scorecard.teams[p].flag.roundstd ? results.Scorecard.teams[p].flag.roundstd : results.Scorecard.teams[p].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[p].fn +
										'<span class="score"> ' + results.Scorecard.past_ings[0].s.a.r + '/' + results.Scorecard.past_ings[0].s.a.w + " (" + results.Scorecard.past_ings[0].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs

									var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
									var flag = results.Scorecard.teams[bowling_team].flag.roundstd ? results.Scorecard.teams[bowling_team].flag.roundstd : results.Scorecard.teams[bowling_team].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[bowling_team].fn +
										'<span class="score"> ' + results.Scorecard.past_ings[1].s.a.r + '/' + results.Scorecard.past_ings[1].s.a.w + " (" + results.Scorecard.past_ings[1].s.a.o + ')</span></p>'); //r-runs w-wicket o-overs
									$(container_live[cnt]).append('<br>');
									break;
								}
							}
						} else //if the second team is yet to bat, then jason object 'past_ings' is a variable ie., only the batting team score is returned in past_ings
						{
							for (var p = 0; p < 2; p++) //match teams with their score and print their names
							{
								if ((results.Scorecard.teams[p].i).localeCompare(results.Scorecard.past_ings.s.a.i) == 0) //the current batting team
								{
									var flag = results.Scorecard.teams[p].flag.roundstd ? results.Scorecard.teams[p].flag.roundstd : results.Scorecard.teams[p].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[p].fn +
										'<span class="score"> ' + results.Scorecard.past_ings.s.a.r + '/' + results.Scorecard.past_ings.s.a.w + " (" + results.Scorecard.past_ings.s.a.o + ')</span></p>'); //r-runs w-wicket o-overs 

									var bowling_team = (p == 0) ? 1 : 0; //p is the index value of batting team so bowling team's index is the opposite
									var flag = results.Scorecard.teams[bowling_team].flag.roundstd ? results.Scorecard.teams[bowling_team].flag.roundstd : results.Scorecard.teams[bowling_team].logo.small;
									$(container_live[cnt]).append('<p><img src="' + flag + '"></img>' + results.Scorecard.teams[bowling_team].fn + '<span class="score" style="opacity:0.5;"> yet to bat</span></p>');
									$(container_live[cnt]).append('<br>');
									break;
								}

							}
						}
					}

				} else if (data.query.count === 0) //if no live matches 
				{
					$(container_live[cnt]).append('<p>no games in progress</p>');
				}
				$(container_live[cnt]).append('</div>');
			}
		});
	});
}, 10000);