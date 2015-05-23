$(document).ready(function () {

	render_tasks();
	
});
var base_url = 'http://localhost:8080';
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
				for (var i = 0; i < obj.length; i++) {
					$("#todo").append("  <div class='checkbox' id='" + obj[i].id + "'>" +
						"<label><input type='checkbox' class='task_check'> " + obj[i].title + "</label>" +
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
	 $("#add_task_button").html("<i class='fa fa-spinner fa-pulse'></i> adding..");
	var clean=task.replace(/<(?:.|\n)*?>/gm, ''); //console.log('clean: ', clean);
	$.ajax({
		url: base_url+'/add_task',
		data: 'title=' + clean ,
		type: "POST",
		success: function(result) {
			console.log('task saved')	;	
			id=result;	//console.log('id of new task: ', id);
			$("#todo").append("  <div class='checkbox' id='"+id+"'>"+
				"<label><input type='checkbox' class='task_check'>"+clean+"</label>"+
				"</div>");
			console.log('id of new task div: ', id);
			 $("#add_task_button").html("<i class='fa fa-plus'></i> add");
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