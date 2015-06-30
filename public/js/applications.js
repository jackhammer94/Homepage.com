var base_url = window.location.origin;

$(document).ready(function(){

  $('.application').each(function(index, elt){
    var name = $(this).find('.application-inner').attr('id');
    $("#"+name + "_button").prop("disabled", true);
    $("#" + name + "_button").html("added");
  });

	$(".add_application_button").on('click', function(){
	  var name = $(this).attr('id'); //console.log('btnname ', name.slice(0,-7));
    $("#" + name ).html("<i class='fa fa-spinner fa-pulse'></i> adding..");
    $("#" + name ).prop("disabled", true); //disables add buttons for feeds already added
    addApp(name.slice(0, -7), 'add');
	});
});

function addApp(app_name, op){
$.ajax({
    type: "GET",
    url: base_url + '/get_app',
    data: {
      application_name: app_name
    },
    success: function(app) {
      console.log("retrieved app Successfully", app);
      $("#"+app_name+"_slot").append(app[0].html);
      if(app[0].dependency)
        $("#"+app_name+"_slot").append('<script id="'+app_name+'_dependency" src="'+app[0].dependency+'"></script>');
      $("#"+app_name+"_slot").append('<script id="'+app_name+'_js" src="'+app[0].js+'"></script>');

      $("#" + app_name + "_button").html("added");

      $("#add_feeds_modal").modal('hide');
      $('html, body').animate({
        scrollTop: $("#"+app_name).closest('.application').offset().top
    }, 2000);

    },
    error: function() {
      console.log('error fetching app!');
    }

  });
saveApp(app_name);

}

function saveApp(app_name){
$.ajax({
    url: base_url + "/save_app",
    type: 'POST',
    data: 'application_name=' +app_name,
    // Work with the response
    success: function(data) {
      console.log(app_name + ' added successfully');
    },
    error: function() {
      console.log('error saving ' + app_name + ' app');
    }
  });

}
function removeApp(app_name){
//console.log('name', name);
if(document.getElementById(app_name+"_slot")===null)
  $("#"+app_name).closest('.application').after('<div id="'+app_name+'_slot"></div>');

  $("#" + app_name).parents('.application').remove();
  $("#"+app_name+"_js").remove();
  $("#"+app_name+"_dependency").remove();

  $("#" + app_name + "_button").prop("disabled", false); //enables add buttons for deleted applications
  $("#" + app_name + "_button").html("add");
  //save_applications();
  $.ajax({
    url: base_url + "/remove_app",
    type: 'POST',
    data: 'application_name=' + app_name,
    // Work with the response
    success: function(data) {
      console.log(app_name + ' removed successfully');
    },
    error: function() {
      console.log('error removing ' + app_name + ' application');
    }
  });
  console.log(app_name + ' deleted successfully');

  //if user has removed all applications, save void application
  var application_set = [];
  $(".application").each(function(index, elt) {
    application_set[index] = $(".application").eq(index).attr('id');
  });

  if (application_set.length === 0)
    saveApp("void_application");
}