
<!--add feeds modal-->
<div class="modal fade" id="add_feeds_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div align="center"><h4 class="modal-title"><b>Add feeds</b></h4></div>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="col-sm-12">
            <div class="panel-group" id="accordion">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                     Top Stories</a>
                   </h4>
                 </div>
                 <div id="collapse1" class="panel-collapse collapse in">
                  <table class="table" >            
                   <tbody>
                    
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://www.google.co.in' /> Google news - India</td>
                      <td><button id= "Google_News_-_India_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_India')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - India</td>
                      <td><button id="BBC_News_-_India_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_India')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.huffingtonpost.in' /> Huffington post - India</td>
                      <td><button id="huffington_post_-_India_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('huffington_post_-_India')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://ibnlive.in.com' /> IBNlive</td>
                      <td><button id="ibnlive_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('ibnlive')">add</button</td>          
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.hindustantimes.com' /> Hindustan Times</td>
                      <td><button id="hindustan_times_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('hindustan_times')">add</button</td>          
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://indianexpress.com' /> Indian Express</td>
                      <td><button id="Indian_express_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Indian_express')">add</button</td>          
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://answers.yahoo.com' /> Yahoo news - India</td>
                      <td><button id="Yahoo_News_-_India_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Yahoo_News_-_India')">add</button</td>          
                    </tr>
                     <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://www.cnn.com' /> CNN - World</td>
                      <td><button id="CNN_-_World_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('CNN_-_World')">add</button</td>          
                    </tr>
                     <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://www.nytimes.com' /> The New York Times - World</td>
                      <td><button id="The_New_York_Times_-_World_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('The_New_York_Times_-_World')">add</button</td>          
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - World</td>
                      <td><button id="BBC_News_-_World_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_World')">add</button</td>  
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--entertainment-->
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                    Entertainment</a>
                  </h4>
                </div>
                <div id="collapse2" class="panel-collapse collapse">
                  <table class="table" >            
                   <tbody>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://answers.yahoo.com' /> Yahoo Movies</td>
                      <td><button id="Yahoo_News_-_movies_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Yahoo_News_-_movies')">add</button</td>  
                    </tr>         
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://www.google.co.in' /> Google news - Entertainment</td>
                      <td><button id= "Google_News_-_entertainment_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_entertainment')">add</button</td>  
                    </tr> 
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://www.empireonline.com' /> Empire News - Hollywood</td>
                      <td><button id= "empire_online_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('empire_online')">add</button</td>  
                    </tr> 
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.rollingstone.com' /> Rollingstone</td>
                      <td><button id= "rollingstone_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('rollingstone')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.ign.com' /> IGN</td>
                      <td><button id= "ign_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('ign')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.cracked.com' /> Cracked</td>
                      <td><button id= "cracked_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('cracked')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bollywoodhungama.com' /> Bollywood Hungama</td>
                      <td><button id= "bollywood_hungama_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('bollywood_hungama')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.nowrunning.com' /> nowrunning - Bollywood</td>
                      <td><button id= "nowrunning_bollywood_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('nowrunning_bollywood')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.nowrunning.com' /> nowrunning - Kollywood</td>
                      <td><button id= "nowrunning_kollywood_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('nowrunning_kollywood')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.tamilstar.com' /> Tamilstar</td>
                      <td><button id= "tamilstar_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('tamilstar')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.filmibeat.com' /> Filmibeat - Kollywood</td>
                      <td><button id= "filmibeat_kollywood_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('filmibeat_kollywood')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.filmibeat.com' /> Filmibeat - Bollywood</td>
                      <td><button id= "filmibeat_bollywood_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('filmibeat_bollywood')">add</button</td>  
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--business-->
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                    Business</a>
                  </h4>
                </div>
                <div id="collapse3" class="panel-collapse collapse">
                  <table class="table" >            
                   <tbody>
                     <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=https://www.google.com' /> Google news - Business</td>
                      <td><button id= "Google_News_-_business_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_business')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - Business</td>
                      <td><button id="BBC_News_-_business_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_business')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.forbes.com' /> Forbes</td>
                      <td><button id="forbes_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('forbes')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.cnn.com' /> CNN Money</td>
                      <td><button id="CNN_money_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('CNN_money')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.inc.com' /> Inc.com</td>
                      <td><button id="inc_dot_com_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('inc_dot_com')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.businessinsider.com' /> Business Insider</td>
                      <td><button id="business_insider_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('business_insider')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.wsj.com' /> Wall Street Journal</td>
                      <td><button id="wall_street_journal_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('wall_street_journal')">add</button</td>  
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--health-->
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">
                    Health</a>
                  </h4>
                </div>
                <div id="collapse4" class="panel-collapse collapse">
                  <table class="table" >            
                   <tbody>
                     <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.google.com' /> Google news - Health</td>
                      <td><button id= "Google_News_-_health_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_health')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - Health</td>
                      <td><button id="BBC_News_-_health_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_health')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.webmd.com' /> Webmd</td>
                      <td><button id="webmd_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('webmd')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://answers.yahoo.com' /> Yahoo Lifestyle</td>
                      <td><button id="Yahoo_News_-_lifestyle_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Yahoo_News_-_lifestyle')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.healthline.com' /> Healthline</td>
                      <td><button id="healthline_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('healthline')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.medicalnewstoday.com' /> Medical News Today</td>
                      <td><button id="medical_news_today_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('medical_news_today')">add</button</td>  
                    </tr>
                    <tr>
                      <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.health.com' /> Health.com</td>
                      <td><button id="health_dot_com_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('health_dot_com')">add</button</td>  
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!--tech-->
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">
                   Technology</a>
                 </h4>
               </div>
               <div id="collapse5" class="panel-collapse collapse">
                <table class="table" >            
                 <tbody>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.google.com' /> Google news - Technology</td>
                    <td><button id= "Google_News_-_technology_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_technology')">add</button</td>  
                  </tr>            
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - Technology</td>
                    <td><button id="BBC_News_-_technology_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_technology')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://gizmodo.com' /> Gizmodo</td>
                    <td><button id="gizmodo_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('gizmodo')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://techcrunch.com' /> TechCrunch</td>
                    <td><button id="techcrunch_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('techcrunch')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.thenextweb.com' /> The Next Web</td>
                    <td><button id="the_next_web_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('the_next_web')">add</button</td>
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.techradar.com' /> TechRadar</td>
                    <td><button id="techradar_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('techradar')">add</button</td>
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://answers.yahoo.com' /> Yahoo Technology</td>
                    <td><button id="Yahoo_News_-_technology_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Yahoo_News_-_technology')">add</button</td>          
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

          <!--science-->

          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">
                  Science</a>
               </h4>
             </div>
             <div id="collapse6" class="panel-collapse collapse">
               <table class="table" >            
                 <tbody>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - Science</td>
                    <td><button id="BBC_News_-_science_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_science')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.google.com' /> Google news - Science</td>
                    <td><button id= "Google_News_-_science_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_science')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://spotthestation.nasa.gov' /> NASA</td>
                    <td><button id="NASA_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('NASA')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.scientificamerican.com' /> Scientific American</td>
                    <td><button id="scientific_american_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('scientific_american')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.sciencedaily.com' /> Science Daily</td>
                    <td><button id="science_daily_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('science_daily')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.sciencemag.org' /> Science Mag</td>
                    <td><button id="science_mag_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('science_mag')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.livescience.com' /> Live Science</td>
                    <td><button id="live_science_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('live_science')">add</button</td>  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--sports-->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse7">
                  Sports</a>
                </h4>
              </div>
              <div id="collapse7" class="panel-collapse collapse">
                <table class="table" >            
                 <tbody>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.google.com' /> Google news - Sports</td>
                    <td><button id= "Google_News_-_sports_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Google_News_-_sports')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - Football</td>
                    <td><button id="BBC_News_-_football_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_football')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.goal.com' /> Goal.com</td>
                    <td><button id="goal_dot_com_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('goal_dot_com')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://bleacherreport.com' /> Bleacherreport</td>
                    <td><button id="bleacherreport_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('bleacherreport')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.espncricinfo.com' /> Espncricinfo</td>
                    <td><button id="espncricinfo_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('espncricinfo')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://answers.yahoo.com' /> Yahoo cricket</td>
                    <td><button id="Yahoo_News_-_cricket_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('Yahoo_News_-_cricket')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://www.bbc.com' /> BBC news - Cricket</td>
                    <td><button id="BBC_News_-_cricket_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('BBC_News_-_cricket')">add</button</td>  
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
          <!--other-->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse8">
                  Other</a>
                </h4>
              </div>
              <div id="collapse8" class="panel-collapse collapse">
                <table class="table" >            
                 <tbody>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://en.wikipedia.org' /> wikiquote - quote of the day</td>
                    <td><button id="wikiquote_-_quote_of_the_day_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('wikiquote_-_quote_of_the_day')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://en.wikipedia.org' /> wikipedia - did you know?</td>
                    <td><button id="wikipedia_-_did_you_know_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('wikipedia_-_did_you_know')">add</button</td>  
                  </tr>
                  <tr>
                    <td><img height='16' width='16' src='http://www.google.com/s2/favicons?domain=http://en.wikipedia.org' /> wikipedia - on this day</td>
                    <td><button id="wikipedia_-_on_this_day_button" class="btn btn-default btn-xs add_feed_button" onclick="addFeed('wikipedia_-_on_this_day')">add</button</td>  
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div><!--end of panel-group-->
      </div><!--end colm-->
    </div><!--end container-->
  </div><!--end modal-body-->
</div><!-- end modal-content -->
</div><!-- end modal-dialog -->
</div><!-- end modal -->


<!-- Modal for saving user defined bookmars-->

<div class="modal fade" id="login_alert_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Enter bookmark info</h4>
      </div>
      <div class="modal-body">
       <p> please log in to save your preferences!  <a href="/login"><button class="btn btn-primary">log in</button></a></p>
       <p> Don't have an account? <a href="/login"><button class="btn btn-primary">Sign up</button></a></p>
     </div>
     <div class="modal-footer">       
      <button type="submit" class="btn btn-primary" onclick="add_from_tile()">save</button>
    </div>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Modal for confirming event deletion-->

<div class="modal fade" id="confirm_event_delete_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">confirm event delete</h4>
      </div>
      <div class="modal-body">
       <p>Are you sure you want to delete event?</p>
     </div>
     <div class="modal-footer">       
      <button type="submit" class="btn btn-primary" onclick="delete_event()">yes</button>
    </div>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

