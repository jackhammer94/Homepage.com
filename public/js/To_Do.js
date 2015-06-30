$(document).ready(function () {

	render_tasks();
	$("#add_task_button").unbind('click').on('click', function(){
		add_task();
	});
	$('#task').keypress(function(event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			add_task();
			return false;
		}
	});
});
var todo_container = "#To_Do"; //might change so global
function render_tasks() {

	$.ajax({
		url: base_url + '/show_tasks',
		type: "GET",
		success: function(result) {
			console.log('tasks retrieved successfully');
			//console.log(result);
			if (result) {
				var obj = JSON.parse(result); //console.log(obj);
				//console.log(obj[0]);
				var clean;
				for (var i = 0; i < obj.length; i++) {
					clean = htmlEscape(obj[i].title);
					$(todo_container).append("  <div class='checkbox' id='" + obj[i].id + "'>" +
						"<label><input type='checkbox' class='task_check'> " + clean + "</label>" +
						"</div>");
					activate_delete_task_functionality();
				}
			}
		},
		error: function() {
			console.log('error: cannot retrieve tasks!');
		}
	});


}
function add_task(){
   
	var id;
	var task=$("#task").val();
	if(task){
	 $("#add_task_button").attr("disabled", "disabled");
	 $("#add_task_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
	var clean=htmlEscape(task);  //console.log('clean: ', clean);
	$.ajax({
		url: base_url+'/add_task',
		data: 'title=' + task ,
		type: "POST",
		success: function(result) {
			console.log('task saved')	;	
			id=result;	//console.log('id of new task: ', id);
			$(todo_container).append("  <div class='checkbox' id='"+id+"'>"+
				"<label><input type='checkbox' class='task_check'>"+clean+"</label>"+
				"</div>");
			console.log('id of new task div: ', id);
			 $("#add_task_button").html("<i class='fa fa-plus'></i> add");
			 $("#add_task_button").removeAttr('disabled');
			 $("#task").val('');
			activate_delete_task_functionality();

		},
		error: function(){

			console.log('error: task not saved!');

		}
	});
   }
   else{
   	console.log('no task entered!');
   }
	
}
function activate_delete_task_functionality() {

	$('.task_check').click(function() {

		id = $(this).closest('div').attr('id');
		console.log('id of task removed: ', id);
		$.ajax({
			type: "POST",
			url: base_url + '/delete_task',
			data: 'id=' + id,
			success: function(json) {
				console.log("deleted task Successfully");
				
			},
			error: function() {
				console.log('update failed!');
			}
		});
		$(this).closest('div').remove();
	});
}

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

