
<!--add feeds modal-->
<div class="modal fade" id="add_feeds_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div ><h4 class="modal-title"><b>Add feeds</b></h4></div>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="col-sm-12">
            <div class="panel-group" id="accordion">
               <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapse0">
                    Applications</a>
                  </h4>
                </div>
                <div id="collapse0" class="panel-collapse collapse in">
                  <table class="table" >            
                   <tbody>
                      @foreach ($applications as $application)
                    <tr>
                        <td>{{$application->application_logo}} {{ str_replace("_"," ", $application->application_name)}}</td>
                        <td><button id="{{ $application->application_name}}_button" class="btn btn-default btn-xs add_application_button" >add</button></td>          
                    </tr>
                     @endforeach
                  </tbody>
                </table>
              </div>
            </div>

              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                     Top Stories</a>
                   </h4>
                 </div>
                 <div id="collapse1" class="panel-collapse collapse ">
                  <table class="table" >            
                   <tbody>
                     @foreach ($news as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                      @foreach ($entertainment as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                      @foreach ($business as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                    @foreach ($health as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                  @foreach ($technology as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                  @foreach ($science as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                    @foreach ($sports as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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
                   @foreach ($other as $feed)
                    <tr>
                        <td><img height='16' class='lazy' width='16' data-original='{{$feed->feed_logo}}' /> {{ str_replace("_"," ", $feed->feed_name)}}</td>
                        <td><button id="{{ $feed->feed_name}}_button" class="btn btn-default btn-xs add_feed_button" >add</button></td>          
                    </tr>
                     @endforeach
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



<!-- Modal for confirming event edit/deleete-->

<div class="modal fade" id="edit_event_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit event</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
            <div class="row">
                <div class="input-group">
                 <span class="input-group-addon">Name: </span>
                 <input type="text" class="form-control" placeholder="enter event name..">
              </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="save_event_button" type="submit" class="btn btn-info" ><i class="fa fa-save"></i> save</button>
        <button id="delete_event_button" type="submit" class="btn btn-danger" ><i class="fa fa-trash"></i> delete</button>
    </div>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Modal for adding event-->
<div class="modal fade" id="add_event_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add event</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
            <div class="row">
                <div class="input-group">
                 <span class="input-group-addon">Name: </span>
                 <input type="text" class="form-control" placeholder="enter event name..">
              </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="add_event_button" type="submit" class="btn btn-info" ><i class="fa fa-plus"></i> add</button>
    </div>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

