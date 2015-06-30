  // 
   var clientId = '51183448959-uqfe8esqtcs5f4obkq40glhhf19ap57c.apps.googleusercontent.com';
      
      var apiKey = 'AIzaSyBKaRnMANldQSuwL0ckiPKb-JRgsA_Yyoo';
      
      var scopes = 'https://www.googleapis.com/auth/gmail.readonly';
      
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
            if(document.getElementById("mail_loader") === null)     //after pressing login button again show loader
            {
                  $("#gmail_unread").append("<div id = 'mail_loader' align='center' style='vertical-align:middle;'> <i   class='fa fa-spinner fa-pulse'></i></div>");
            }         
            if (authResult && !authResult.error) //if user is authenticated
            {
                  
                  $("#authorize-message").remove();
                  makeApiCall();
            } 
            else  //if user is not authenticated show login message
            {
                  $("#mail_loader").remove();
                  $("#gmail_unread").append("<p id='authorize-message'>please log in to Gmail <button id='authorize-button' class='btn btn-xs btn-primary' >Log In</button></p>");
                  var authorizeButton = document.getElementById('authorize-button');
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
                        'maxResults': 5
                              //'q': 'is:unread'
                  });
                  var display_email =  request.execute(function(resp) {
                        console.log(resp);
                        $("#mail_loader").remove();
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
                                          var message_id = data.id;
                                          var From = (data.payload.headers[0].name == "From") ? data.payload.headers[0].value :
                                                     (data.payload.headers[1].name == "From") ? data.payload.headers[1].value : data.payload.headers[2].value;
                                          var Subject = (data.payload.headers[0].name == "Subject") ? data.payload.headers[0].value :
                                                        (data.payload.headers[1].name == "Subject") ? data.payload.headers[1].value : data.payload.headers[2].value;
                                          var datetime = (data.payload.headers[0].name == "Date") ? data.payload.headers[0].value :
                                                        (data.payload.headers[1].name == "Date") ? data.payload.headers[1].value : data.payload.headers[2].value;
                                          var snippet = data.snippet? data.snippet:"[empty]";
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
                                                time = '';
                                          }

                                         
                                          var full_time =  (time==='')?date: (date + ", "+time);
                                          var labelIds = data.labelIds; var read;

                                          labelIds.forEach(function(label,index){
                                                if(label=="UNREAD")
                                                      {From = From + "<i class='fa fa-envelope' title='new mail'></i>";read=0;}

                                          });

                                          if(read ===0)
                                                $("#gmail_unread").append("<a href = 'https://mail.google.com/mail/u/0/#inbox/"+message_id+"' target='blank'><div class='mail'><b>" + From + "</b><span style = 'float:right; color:black;'>" + full_time + "</span><br><div style='color:black;'>" + Subject + "</div></div></a><hr>"); //atob( bodyData ); 
                                          else
                                                $("#gmail_read").append("<div class='mail'><b>" + From + "</b><span style = 'float:right; color:black;'>" + full_time + "</span><br><div style='color:black;'>" + Subject + "</div></div><hr>"); //atob( bodyData ); 
                                          
                 
                                    });

                                   
                              });
                                         
                                   

                              
                        }

                  });

            });
      }


