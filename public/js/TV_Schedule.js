 $(document).ready(function() {
   if(document.getElementsByClassName("channel_outer").length===0){ //execute if user is newly addin widget, don't if page is loading since its already done on serverside
   $.ajax({
     type: "GET",
     url: base_url + '/get_channels',
     success: function(channels) {
       console.log("retrieved channels Successfully", channels);
       if (!isEmpty(channels)) {

         channels.forEach(function(channel, index) {
           if (channel.channel_name !== "void_channel")
             addChannel(channel, "load");
         });

       }
     },
     error: function() {
       console.log('error fetching channels!');
     }

   });
}
   $('.channel_outer').each(function(index, elt){
    var name = $(this).find('.channels').attr('id');
    $("[title='" + name.replace(/_/g, " ") + "']").prop("disabled", true);
    $("[title='" + name.replace(/_/g, " ") + "']").css("opacity", 0.4);
  });

   $('#tv_schedule_modal').on("shown.bs.modal", function() {
     $("#tv_schedule_modal img.lazy").lazyload({
       skip_invisible: true,
       container: $("#tv_schedule_modal")
     });
   });

   $("#add_channel_button").unbind('click').on("click", function() { //when + button is clicked open dialog

     $("#tv_schedule_modal").modal('show');
   });

   $(".channelLogoBox").unbind('click').on("click", function() { //when + button is clicked open dialog

     addChannel(this.title, 'add');
   });


 });
var tv_schedule_container = "#TV_Schedule";
 function isEmpty(obj) {
   for (var prop in obj) {
     if (obj.hasOwnProperty(prop))
       return false;
   }

   return true;
 }

 function getChannelWithNoID(channel_name) {

   $.ajax({
     type: "GET",
     url: base_url + '/get_channel_id',
     data: {
       channel_name: channel_name
     },
     success: function(channel) {
       //console.log("retrieved channel id Successfully", channel);
       getChannel(channel_name, channel[0].id);
     },
     error: function() {
       console.log('error fetching channel id!');
     }

   });

 }

 function addChannel(channel, op) {
   //console.log('button', name);

   var name, id;
   if (op === "load") {
     name = channel.channel_name;
     id = channel.id;
     $("[title='" + name + "']").prop("disabled", true); //enables add buttons for deleted channels
     $("[title='" + name + "']").css("opacity", 0.4);
     $(tv_schedule_container).append("<div class='channel_outer well'><h3><b> " + name + "</b><span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_channel(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><table class='table '><tbody id='" + name.replace(/\s/g, "_") + "' class='channels'></tbody></table></div>");
     getChannel(name, id);
   } else {
     name = channel;
     $("[title='" + name + "']").prop("disabled", true); //enables add buttons for deleted channels
     $("[title='" + name + "']").css("opacity", 0.4);
     $(tv_schedule_container).prepend("<div class='channel_outer well'><h3><b> " + name + "</b><span><button  class='remove_button btn btn-xs btn-default pull-right' onclick='remove_channel(\"" + name + "\")'><i class='fa fa-times'></i></button></span></h3><table class='table '><tbody id='" + name.replace(/\s/g, "_") + "' class='channels'></tbody></table ></div>");
     save_channel(name);
     getChannelWithNoID(name);
   }
 }

 function getChannel(channel_name, channel_id) {

   var api_url = "http://tv.burrp.com/UpcomingSchedules.php?ID=" + channel_id + "&channelName=" + channel_name;
   var query = 'select * from html where url="' + encodeURI(api_url) + '"';
   $.ajax({
     url: "https://query.yahooapis.com/v1/public/yql",
     dataType: "json",
     data: {
       q: query,       
       format: "json"
     },
     // Work with the response
     success: function(data) {
       
       var body = data.query.results.body;
       console.log("fetched " + channel_name + " channel info");
       var time = body.content.trim().replace(/\s\s+/g, ' ').split(' ');
       var show = body.a;
       var sup_class = "";
       var full_schedule = body.p.a.href;
       //console.log(body);
       show.forEach(function(elt, index) {
         
         sup_class = (index === 0)?"<sup class='now'>Playing Now</sup>":"";
         
         $("#" + channel_name.replace(/\s/g, "_")).append("<tr><th>" + time[index] + "</th><td>" +
           "<a href = '" + elt.href + "' target = 'blank' ><strong>" + elt.strong + "</strong></a>" +
           sup_class + "</td></tr>");
       });
       $("#" + channel_name.replace(/\s/g, "_")).append("<tr><th></th><td align='right'><p class='more'><a href=" + full_schedule + " target='blank'>Full schedule</a></p></td></tr>");

     },
     error: function() {
       console.log('error fetching ' + channel_name);
     }
   });
 }

 function save_channel(name) {


   $.ajax({
     url: base_url + "/add_channel",
     type: 'POST',
     data: 'channel=' + name,
     // Work with the response
     success: function(data) {
       console.log(name + ' channel saved successfully');
     },
     error: function() {
       console.log('error saving ' + name + ' channel');
     }
   });

 }

 function remove_channel(name) {

   $("#" + name.replace(/\s/g, "_")).parents('.channel_outer').remove();
   $("[title='" + name + "']").prop("disabled", false); //enables add buttons for deleted channels
   $("[title='" + name + "']").css("opacity", 1);
   $.ajax({
     url: base_url + "/remove_channel",
     type: 'POST',
     data: 'channel=' + name,
     // Work with the response
     success: function(data) {
       console.log(name + ' removed successfully');
     },
     error: function() {
       console.log('error removing ' + name + ' channel');
     }
   });
   console.log(name + ' deleted successfully');

   //if user has removed all channels, save void channel
   var channel_set = [];
   $(".channels").each(function(index, elt) {
     channel_set[index] = $(".channels").eq(index).attr('id');
   });

   if (channel_set.length === 0)
     save_channel("void_channel");
 }