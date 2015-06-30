

$(document).ready(function () {
 prepare_tab()
 insert_tiles();
 animate_caption_overflow(); //for first tabp

 
});  
// actual addTab function: adds new tab using the input from the form above and saves order and content of tabs to cookie
var base_url="http://localhost:8080";
  function prepare_tab(tab_id, tab_header ) { //tab_id is of the form  #tab-1, prepares the tab divs into which tiles can be inserted


    $("div#favorites").append( 
      "<div class='grid'></div>"    
      );       
  }


function insert_tiles() { //tab id is of the form #tab-1, inserts tiles for new tabs and restores the tiles in tabs after page reload and makes them sortable

  var add_class;
  $.ajax({
    type: "GET",
    url: base_url + '/show_favorites',    
    success: function(result) {
      console.log("retrieved favorites Successfully",result);
      if(result!="[]"&&result!=""){
         var favorites_obj= JSON.parse(result);console.log('retrieved favorites_obj: ',favorites_obj); //retrievs the urls as string
         var url= JSON.parse(favorites_obj[0].urls);console.log(url);  //parses the string to array
         var name=JSON.parse(favorites_obj[0].names);console.log(name);

       }
       else
       {
         var url=["http://www.facebook.com","http://www.youtube.com","http://www.flipkart.com","http://www.amazon.in", "http://www.snapdeal.com","http://en.wikipedia.org","http://www.espncricinfo.com","http://www.twitter.com","http://www.linkedin.com","http://www.blogspot.in"];       
         var name=["facebook","youtube","flipkart","amazon","snapdeal","wikipedia","espncricinfo","twitter","linkedin","blogspot"];
       }
       for(var j=0;j<10;j++)
       {
         var id           = j;  //tile ids are of the form 1
         var $dvContainer = $("<div id='"+id+"'class='well tile filled'>" +  "<a class='url' href='" + url[j] + "'target='blank'> " +
          "<img height='16' width='16' src='http://www.google.com/s2/favicons?domain=" + url[j] + "' />" +
          "</a><br>" +
          "<div class='caption-text'><span  class='bookmark_name'>" + name[j] + "</span></div>" +
          "<button class='create btn btn-xs btn-default filled' ><span class='glyphicon glyphicon-pencil'></span></button></div>");
         $(".grid").eq(0).append($dvContainer);         //appends to the first elt with grid class if more elts are there with grid class iterate  
       } 
        create_add_button();
     },
     error: function() {
      alert('cannot retrive favorites!');
    }
  });


return;

}

  function add_from_tile() { //create new tile       

   var url     = $("#url"),
   name        = $("#name"),
   allFields   = $([]).add(name).add(url),
   full_id     = '#' + tile_id,
   entered_url = url.val(),
   entered_name= name.val(),
   cleaned_name,
   encoded_url,
   corrected_url,
   url_set=[],
   name_set=[];


   console.log('entered url: ',entered_url);
       //console.log('http check',entered_url.substr(0, 7));
      //autocomplete url
      if(entered_url!="")
      {
        // if(entered_name=="")
        //   entered_name=entered_url;
        if (entered_url.substr(0, 4) == "www.") {   //user enters www.google.com
          if(entered_name=="")
            entered_name=entered_url.substr(4);
          corrected_url = "http://" + url.val();
          console.log('corrected url with just www to: ', corrected_url);
        }
         else if (entered_url.substr(0, 7) == "http://") {             //the user is copying and pasting link address eg: http://jsfiddle.net/xs5vrrso/
          if(entered_name=="")
          { 
             if(entered_url.substr(0,11)=="http://www.")               //url is http://wwww.reddit.com
              entered_name=entered_url.substr(11); 
            else         
                entered_name=entered_url.substr(7);                    //url is http://jsfiddle.net
            } 
            corrected_url = url.val();
            console.log('url with http', corrected_url);       
          } 
          else if (entered_url.substr(0,8) == "https://"){
            if(entered_name=="")
              entered_name=entered_url.substr(8);
            corrected_url = url.val();
            console.log('url with https', corrected_url);     
          }
        else // user enters only google.com
        { 
          if(entered_name=="")
            entered_name=entered_url;
          corrected_url = "http://www." + url.val();
          console.log('corrected url with just sitename to: ', corrected_url);
        }
        cleaned_name=entered_name.replace(/<(?:.|\n)*?>/gm, '');
        encoded_url = encodeURI(corrected_url);

        if (tile_id.substr(0, 6) != 'filled') //if its an empty tile change its id to filled so that we can easily find empty tiles for add_from_link()
          tile_id = "filled" + tile_id; //tile_id is got from create_add_button()
        $(full_id).replaceWith("<div id='" + tile_id + "' class='well tile filled'>" +
          "<a class='url' href='" + encoded_url + "'target='blank'> " +
          "<img height='16' width='16' src='http://www.google.com/s2/favicons?domain=" + url.val() + "' />" +
          "</a><br>" +
          "<div class='caption-text'><span class='bookmark_name'>" + cleaned_name + "</span></div>" +
          "<button class='create btn btn-xs btn-default filled' ><span class='glyphicon glyphicon-pencil' ></span></button>" +
          "</div>");

        $(".url").each(function(index,elt){
          url_set[index]=$(".url").eq(index).attr('href');
          name_set[index]=$(".bookmark_name").eq(index).text();
        });
        var stringified_url_set = JSON.stringify(url_set);
        var stringified_name_set= JSON.stringify(name_set);
        console.log(stringified_url_set); console.log(stringified_name_set);
        $.ajax({
          type: "POST",
          url: base_url + '/add_favorite',
          data: 'urls=' + stringified_url_set + '&names='+stringified_name_set ,
          success: function(json) {
            console.log("favorites saved Successfully");
            
          },
          error: function() {
            alert('save failed!');
          }
        });

        $("#myModal").modal('hide');
        create_add_button(); // add buttons should be regenerated else they won't work
        animate_caption_overflow(); //animate overflowing caption text by scrolling to reveal the hidden overflow text

      }
    }   

    function animate_caption_overflow(){
      $('.caption-text span').mouseover(function() {
        //alert('hi');
        if (this.offsetWidth > this.parentNode.offsetWidth) {
          $(this).animate({
            'left': '-' + (this.offsetWidth) + 'px'
          }, 2000, function() {
            this.style.left = '0px';
          });
        }
      }).mouseout(function() {
        $(this).stop();
        this.style.left = '0px';
      });
    }

    function create_add_button(){

    $(".create").button().on("click", function() { //when + button is clicked open dialog

      tile_id = $(this).closest('div').attr('id'); //closest div to the + button is the tile div
      var existing_name = $(this).closest('div').text();
      var existing_url = $(this).parent().find('a').attr('href'); console.log(existing_url);
      $("#name").val(existing_name);         //prevent the form from including previously entered data
      $("#url").val(existing_url);
      $("#myModal").modal('show');
    });
  }

