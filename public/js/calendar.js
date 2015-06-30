/*!
 * FullCalendar v2.3.2 Google Calendar Plugin
 * Docs & License: http://fullcalendar.io/
 * (c) 2015 Adam Shaw
 */
 
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], factory);
	}
	else if (typeof exports === 'object') { // Node/CommonJS
		module.exports = factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
})(function($) {


var API_BASE = 'https://www.googleapis.com/calendar/v3/calendars';
var fc = $.fullCalendar;
var applyAll = fc.applyAll;


fc.sourceNormalizers.push(function(sourceOptions) {
	var googleCalendarId = sourceOptions.googleCalendarId;
	var url = sourceOptions.url;
	var match;

	// if the Google Calendar ID hasn't been explicitly defined
	if (!googleCalendarId && url) {

		// detect if the ID was specified as a single string.
		// will match calendars like "asdf1234@calendar.google.com" in addition to person email calendars.
		if (/^[^\/]+@([^\/\.]+\.)*(google|googlemail|gmail)\.com$/.test(url)) {
			googleCalendarId = url;
		}
		// try to scrape it out of a V1 or V3 API feed URL
		else if (
			(match = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^\/]*)/.exec(url)) ||
			(match = /^https?:\/\/www.google.com\/calendar\/feeds\/([^\/]*)/.exec(url))
		) {
			googleCalendarId = decodeURIComponent(match[1]);
		}

		if (googleCalendarId) {
			sourceOptions.googleCalendarId = googleCalendarId;
		}
	}


	if (googleCalendarId) { // is this a Google Calendar?

		// make each Google Calendar source uneditable by default
		if (sourceOptions.editable === null) {
			sourceOptions.editable = false;
		}

		// We want removeEventSource to work, but it won't know about the googleCalendarId primitive.
		// Shoehorn it into the url, which will function as the unique primitive. Won't cause side effects.
		// This hack is obsolete since 2.2.3, but keep it so this plugin file is compatible with old versions.
		sourceOptions.url = googleCalendarId;
	}
});


fc.sourceFetchers.push(function(sourceOptions, start, end, timezone) {
	if (sourceOptions.googleCalendarId) {
		return transformOptions(sourceOptions, start, end, timezone, this); // `this` is the calendar
	}
});


function transformOptions(sourceOptions, start, end, timezone, calendar) {
	var url = API_BASE + '/' + encodeURIComponent(sourceOptions.googleCalendarId) + '/events?callback=?'; // jsonp
	var apiKey = sourceOptions.googleCalendarApiKey || calendar.options.googleCalendarApiKey;
	var success = sourceOptions.success;
	var data;
	var timezoneArg; // populated when a specific timezone. escaped to Google's liking

	function reportError(message, apiErrorObjs) {
		var errorObjs = apiErrorObjs || [ { message: message } ]; // to be passed into error handlers
		var consoleObj = window.console;
		var consoleWarnFunc = consoleObj ? (consoleObj.warn || consoleObj.log) : null;

		// call error handlers
		(sourceOptions.googleCalendarError || $.noop).apply(calendar, errorObjs);
		(calendar.options.googleCalendarError || $.noop).apply(calendar, errorObjs);

		// print error to debug console
		if (consoleWarnFunc) {
			consoleWarnFunc.apply(consoleObj, [ message ].concat(apiErrorObjs || []));
		}
	}

	if (!apiKey) {
		reportError("Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/");
		return {}; // an empty source to use instead. won't fetch anything.
	}

	// The API expects an ISO8601 datetime with a time and timezone part.
	// Since the calendar's timezone offset isn't always known, request the date in UTC and pad it by a day on each
	// side, guaranteeing we will receive all events in the desired range, albeit a superset.
	// .utc() will set a zone and give it a 00:00:00 time.
	if (!start.hasZone()) {
		start = start.clone().utc().add(-1, 'day');
	}
	if (!end.hasZone()) {
		end = end.clone().utc().add(1, 'day');
	}

	// when sending timezone names to Google, only accepts underscores, not spaces
	if (timezone && timezone != 'local') {
		timezoneArg = timezone.replace(' ', '_');
	}

	data = $.extend({}, sourceOptions.data || {}, {
		key: apiKey,
		timeMin: start.format(),
		timeMax: end.format(),
		timeZone: timezoneArg,
		singleEvents: true,
		maxResults: 9999
	});

	return $.extend({}, sourceOptions, {
		googleCalendarId: null, // prevents source-normalizing from happening again
		url: url,
		data: data,
		startParam: false, // `false` omits this parameter. we already included it above
		endParam: false, // same
		timezoneParam: false, // same
		success: function(data) {
			var events = [];
			var successArgs;
			var successRes;

			if (data.error) {
				reportError('Google Calendar API: ' + data.error.message, data.error.errors);
			}
			else if (data.items) {
				$.each(data.items, function(i, entry) {
					var url = entry.htmlLink;

					// make the URLs for each event show times in the correct timezone
					if (timezoneArg) {
						url = injectQsComponent(url, 'ctz=' + timezoneArg);
					}

					events.push({
						id: entry.id,
						title: entry.summary,
						start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
						end: entry.end.dateTime || entry.end.date, // same
						url: url,
						location: entry.location,
						description: entry.description
					});
				});

				// call the success handler(s) and allow it to return a new events array
				successArgs = [ events ].concat(Array.prototype.slice.call(arguments, 1)); // forward other jq args
				successRes = applyAll(success, this, successArgs);
				if ($.isArray(successRes)) {
					return successRes;
				}
			}

			return events;
		}
	});
}


// Injects a string like "arg=value" into the querystring of a URL
function injectQsComponent(url, component) {
	// inject it after the querystring but before the fragment
	return url.replace(/(\?.*?)?(#|$)/, function(whole, qs, hash) {
		return (qs ? qs + '&' : '?') + component + hash;
	});
}


});

//calendar script

$(document).ready(function() {
	//var base_url = 'http://localhost:8080';
    calendar_container = "#Calendar";
	$(calendar_container).fullCalendar({
		header: {
			right: 'prev,next today',
			left: 'title',
			center: '' //hide week and day view options
		},
		// contentHeight: 100,
		eventBackgroundColor: '#E297F5',
		eventTextColor: 'black',
		eventBorderColor: 'transparent',
		height: "auto",
		contentHeight: "auto",
		handleWindowResize: true,
		fixedWeekCount: false,
		editable: true,
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			event_start = start;
			event_end = end;
			$('#add_event_button').addClass('disabled').attr('disabled','disabled');
			$('#add_event_modal input[type="text"]').val('');
			$('#add_event_modal input[type="text"]').keyup(function() {
				if($(this).val() !== '') 
					$('#add_event_button').removeClass('disabled').removeAttr('disabled');
				else
					$('#add_event_button').addClass('disabled').attr('disabled','disabled');
			});
			$("#add_event_modal").modal('show');
		},
		eventDrop: function(event, delta) {
			var start = event.start.format();
			var end = event.end.format();
			if(event.id){
			$.ajax({
				url: base_url + '/update_event',
				data: 'title=' + event.title + '&start=' + start + '&end=' + end + '&id=' + event.id,
				type: "POST",
				success: function(json) {
					console.log("Updated Successfully");
				},
				error: function() {
					alert('update failed!');
				}
			});
		    }
		    else
		    	console.log('unsaved event updated successfully');
		},
		eventResize: function(event) {
			var start = event.start.format();
			var end = event.end.format();
			if(event.id){
			$.ajax({
				url: base_url + '/update_event',
				data: 'title=' + event.title + '&start=' + start + '&end=' + end + '&id=' + event.id,
				type: "POST",
				success: function(json) {
					console.log("saved event updated Successfully");
				},
				error: function() {
					alert('update failed!');
				}
			});
			}
			else
				console.log('unsaved event updated successfully');

		},
		googleCalendarApiKey: 'AIzaSyBccjc1pHRSKUFe7yM8ltVbYPy_wvXVgWE',
		eventLimit: 2, // allow "more" link when too many events,
		eventSources: [{
			url: base_url + '/show_events',
			error: function() {
				$('#script-warning').show();
			}

		}, {
			googleCalendarId: 'en.indian#holiday@group.v.calendar.google.com',
			className: 'gcal-event',
			backgroundColor: '#ECE2EF',
			borderColor: 'transparent',
			textColor: 'black'
		}],
		eventClick: function(event, jsEvent, view) {
			event_id = event.id ? event.id : event._id;//_id is generated automatically by fulcalendar for events without ids
			event_obj = event;
			//console.log('event', event);
			$('#save_event_button').addClass('disabled').attr('disabled','disabled');
			$('#edit_event_modal input[type="text"]').val(event.title);
			$('#edit_event_modal input[type="text"]').keyup(function() {
				if($(this).val() !== '') 
					$('#save_event_button').removeClass('disabled').removeAttr('disabled');
				else
					$('#save_event_button').addClass('disabled').attr('disabled','disabled');
			});
			if (!event.source || !event.source.googleCalendarId)
				$("#edit_event_modal").modal('show');
			else {
				window.open("https://www.google.co.in/search?q=" + encodeURI(event.title));
				return false;
			}
		}
	});
   $("#delete_event_button").unbind('click').on('click',function(){
   	delete_event();
   });
   $("#save_event_button").unbind('click').on('click',function(){
   	update_event_title();
   });
   $("#add_event_button").unbind('click').on('click',function(){
   	add_event();
   });
   $('#add_event_modal input[type=text]').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			add_event();
			return false;
		}
	});
});

var event_id;
var event_obj;
var event_start;
var event_end;

function delete_event() {
	if(event_obj.id){
	$.ajax({
		type: "POST",
		url: base_url + '/delete_event',
		data: 'id=' + event_id,
		success: function(json) {
			
			if (event_id) {
				console.log("saved event deleted Successfully");
				$(calendar_container).fullCalendar('removeEvents', event_id);
				$("#edit_event_modal").modal('hide');
			} 
		},
		error: function() {
			alert('update failed!');
		}
	});
 }
 else{
 	console.log("unsaved event deleted Successfully");
 	$(calendar_container).fullCalendar('removeEvents', event_id);
	$("#edit_event_modal").modal('hide');
 }

}
function update_event_title() {
	event_obj.title = $('#edit_event_modal input[type="text"]').val();
	if(event_obj.id){
	$.ajax({
		type: "POST",
		url: base_url + '/update_event_title',
		data: {
			id:event_obj.id,
			title:event_obj.title
		},
		success: function(json) {
			
				console.log("saved event title updated Successfully");
				$(calendar_container).fullCalendar('updateEvent', event_obj);
				$("#edit_event_modal").modal('hide');
		},
		error: function() {
			alert('update failed!');
		}
	});
    }
    else{
    	console.log("unsaved event title updated Successfully");
		$(calendar_container).fullCalendar('updateEvent', event_obj);
		$("#edit_event_modal").modal('hide');
    }
}
function add_event(){
	var title =$('#add_event_modal input[type="text"]').val();// console.log('title ', title);
	if (title) {
				var start = event_start.format(); //returns date in y-m-d, and time in ISO string
				var end = event_end.format();
				$.ajax({
					url: base_url + '/add_event',
					data: 'title=' + title + '&start=' + start + '&end=' + end,
					type: "POST",
					success: function(result) {
						//console.log(result); //eg: 22						
						id = result;
						if (id) {
							$(calendar_container).fullCalendar('renderEvent', {
								title: title,
								start: start,
								end: end,
								id: id
							}
								);
						} else {
							$(calendar_container).fullCalendar('renderEvent', {
								title: title,
								start: start,
								end: end
							},
								true // make the event "stick"
								);
						}
						$("#add_event_modal").modal('hide');
					},
					error: function() {
						alert('update failed!');
					}
				});
			}
			$(calendar_container).fullCalendar('unselect');

}