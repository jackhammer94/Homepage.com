  // 
   var clientId = '51183448959-uqfe8esqtcs5f4obkq40glhhf19ap57c.apps.googleusercontent.com';
      // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
      // The provided key works for this sample only when run from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // To use in your own application, replace this API key with your own.
      var apiKey = 'AIzaSyBKaRnMANldQSuwL0ckiPKb-JRgsA_Yyoo';
      // To enter one or more authentication scopes, refer to the documentation for the API.
      var scopes = 'https://www.googleapis.com/auth/gmail.readonly';
      // Use a button to handle authentication the first time.
      function handleClientLoad() {
            gapi.client.setApiKey(apiKey);
            window.setTimeout(checkAuth, 1);
      }

      function checkAuth() {
            gapi.auth.authorize({
                  client_id: clientId,
                  scope: scopes,
                  immediate: true
            }, handleAuthResult);
      }

      function handleAuthResult(authResult) {
            if(document.getElementById("mail_loader") === null)     //remove loader
            {
                  $("#gmail_unread").append("<div id = 'mail_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");
            }
            var authorizeButton = document.getElementById('authorize-button');
            var authorizeMessage = document.getElementById('authorize-message');
            if (authResult && !authResult.error) {
                  // authorizeButton.style.display = 'none';
                  // authorizeMessage.style.display = 'none';
                  $("#authorize-button").remove();
                  $("#authorize-message").remove();
                  makeApiCall();
            } else {
                  $("#mail_loader").remove();
                  authorizeButton.style.visibility = '';
                  authorizeMessage.style.visibility = '';
                  authorizeButton.onclick = handleAuthClick;
            }
      }

      function handleAuthClick(event) {
                  gapi.auth.authorize({
                        client_id: clientId,
                        scope: scopes,
                        immediate: false
                  }, handleAuthResult);
                  return false;
            }
            // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
            gapi.client.load('gmail', 'v1', function() {
                  var request = gapi.client.gmail.users.messages.list({
                        'userId': 'me',
                        'labelIds': 'INBOX',
                        'maxResults': 10
                              //'q': 'is:unread'
                  });
                  var display_email =  request.execute(function(resp) {

                        console.log(resp);
                        if (resp.messages) {

                             resp.messages.forEach(function(message, index) {
                                    console.log(message.id);
                                    var email = gapi.client.gmail.users.messages.get({
                                          'userId': 'me',
                                          'id': message.id,
                                          'format': 'metadata',
                                          'metadataHeaders': ['From', 'Subject', 'Date']
                                    });

                                    var add_email = email.execute(function(data) {
                                          console.log(data);
                                          //var bodyData = data.payload.body.data;
                                          
                                          var From = (data.payload.headers[0].name == "From") ? data.payload.headers[0].value :
                                                     (data.payload.headers[1].name == "From") ? data.payload.headers[1].value : data.payload.headers[2].value;
                                          var Subject = (data.payload.headers[0].name == "Subject") ? data.payload.headers[0].value :
                                                        (data.payload.headers[1].name == "Subject") ? data.payload.headers[1].value : data.payload.headers[2].value;
                                          var datetime = (data.payload.headers[0].name == "Date") ? data.payload.headers[0].value :
                                                        (data.payload.headers[1].name == "Date") ? data.payload.headers[1].value : data.payload.headers[2].value;

                                          var datetimestring = new Date(datetime);

                                          var timestring =  datetimestring.toLocaleTimeString();
                                          var t=timestring.split(" ");
                                          var slice_length = (t[0].length==7)? 4:5;
                                          var time =  t[0].slice(0,slice_length) +" "+ t[1];

                                          var datestring = datetimestring.toDateString();
                                          var date = datestring.slice(4);

                                          var today = new Date();
                                          if(today.toDateString() === datetimestring.toDateString()){
                                                date = 'Today';
                                          }
                                          else
                                          {
                                                time = ''
                                          }

                                         
                                          var full_time =  (time=='')?date: (date + ", "+time);
                                          if(document.getElementById("mail_loader") !== null)     //remove loader
                                          {
                                                $("#mail_loader").remove();
                                                $("#gmail_middle").mCustomScrollbar({
                                                            setHeight: 480,
                                                            theme: "dark",
                                                            scrollInertia: 200,
                                                            //snapAmount: 480,
                                                            mouseWheel: {
                                                                  scrollAmount: 100
                                                            }
                                                      });
                                               
                                          }
                                          else if(document.getElementById("authorize-message") === null){
                                                  $("#gmail_middle").mCustomScrollbar({
                                                            setHeight: 480,
                                                            theme: "dark",
                                                            scrollInertia: 200,
                                                            //snapAmount: 480,
                                                            mouseWheel: {
                                                                  scrollAmount: 100
                                                            }
                                                      });
                                          }

                                           var labelIds = data.labelIds; var read;

                                          labelIds.forEach(function(label,index){
                                                if(label=="UNREAD")
                                                      {From = From + "<i class='fa fa-envelope' title='new mail'></i>";read=0;}

                                          });
                                          if(read ===0)
                                                $("#gmail_unread").append("<a href = 'https://mail.google.com' target='blank'><div class='mail'><b>" + From + "</b><span style = 'float:right; color:black;'>" + full_time + "</span><br><div style='color:black;'>" + Subject + "</div></div></a><hr>"); //atob( bodyData ); 
                                          else
                                                $("#gmail_read").append("<a href = 'https://mail.google.com' target='blank'><div class='mail'><b>" + From + "</b><span style = 'float:right; color:black;'>" + full_time + "</span><br><div style='color:black;'>" + Subject + "</div></div></a><hr>"); //atob( bodyData ); 
                                          
                 
                                    });

                                   
                              });
                                         
                                   

                              
                        }

                  })

            });
      }


$(window).load(function() {
    
});