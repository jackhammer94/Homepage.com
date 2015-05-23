$(document).ready(function() {
	var base_url = 'http://localhost:8080';

	$('#calendar').fullCalendar({
		header: {
			right: 'prev,next today',
			left: 'title',
			center: '' //hide week and day view options
		},
		// contentHeight: 100,
		height: "auto",
		contentHeight:"auto",
		handleWindowResize:true,
		fixedWeekCount: false,
		editable: true,
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			var title = prompt('Event Title:'); //console.log('allday: ',allDay);//console.log(start.format());			
			if (title) {
				var start = start.format(); //returns date in y-m-d, and time in ISO string
				var end = end.format();
				$.ajax({
					url: base_url + '/add_event',
					data: 'title=' + title + '&start=' + start + '&end=' + end,
					type: "POST",
					success: function(result) {
						// alert(result); //eg: 22						
						id = result;
						$("#calendar").fullCalendar('renderEvent', {
								title: title,
								start: start,
								end: end,
								id: id
							},
							true // make the event "stick"
						);
					},
					error: function() {
						alert('update failed!');
					}
				});
			}
			$("#calendar").fullCalendar('unselect');
		},

		eventDrop: function(event, delta) {
			var start = event.start.format();
			var end = event.end.format();
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
		},
		eventResize: function(event) {
			var start = event.start.format();
			var end = event.end.format();
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

		},
		eventLimit: true, // allow "more" link when too many events
		events: {
			url: base_url + '/show_events',
			error: function() {
				$('#script-warning').show();
			}
		},
		eventClick: function(event, jsEvent, view) {
			event_id = event.id;
			//console.log(event_id);

			// $( "#dialog" ).dialog({
			// 	resizable: false,
			// 	height:200,
			// 	width:500,
			// 	modal: true,
			// 	title: 'Want you want to do?',
			// 	buttons: {
			// 		CLOSE: function() {
			// 			$("#dialog").dialog( "close" );
			// 		},
			// 		"DELETE": function() {
			// 			$.ajax({
			// 				type: "POST",
			// 				url: base_url+'/delete_event',
			// 				data: 'title=' + event.title + '&start=' + event.start + '&end=' + event.end + '&id=' + event.id,
			// 				success: function(json) {
			// 					console.log("Updated Successfully");
			// 				},
			// 				error: function(){
			// 					alert('update failed!');
			// 				}
			// 			});
			// 			$('#calendar').fullCalendar('removeEvents',event._id);
			// 		}
			// 	}
			// });
			$("#confirm_event_delete_modal").modal('show');
		},
	});

});
var event_id;

function delete_event() {
	$.ajax({
		type: "POST",
		url: base_url + '/delete_event',
		data: 'id=' + event_id,
		success: function(json) {
			console.log("Updated Successfully");
			$('#calendar').fullCalendar('removeEvents', event_id);
			$("#confirm_event_delete_modal").modal('hide');
		},
		error: function() {
			alert('update failed!');
		}
	});

}