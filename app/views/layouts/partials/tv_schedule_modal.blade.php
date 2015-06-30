<!--Modal for TV schedule-->

<div class="modal fade" id="tv_schedule_modal" tabindex="-1" role="dialog" >
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" ><span >&times;</span></button>
        <div ><h4 class="modal-title"><b>Add channels</b></h4></div>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="col-md-12">
            <div class="panel-group" id="channel_accordion">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#channel_accordion" href="#entertainment">
                      Entertainment</a>
                    </h4>
                  </div>
                  <div id="entertainment" class="panel-collapse collapse in">
                    @foreach ($entertainment_channels as $channel)                 
                    <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                      <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                    </button>
                    @endforeach
                  </div>
                </div>
                <!--movies-->
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" data-parent="#channel_accordion" href="#movies">
                        Movies</a>
                      </h4>
                    </div>
                    <div id="movies" class="panel-collapse collapse">
                      @foreach ($movies_channels as $channel)                   
                      <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                        <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                      </button>
                      @endforeach
                    </div>
                  </div>
                  <!--kids-->
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#channel_accordion" href="#kids">
                          Kids</a>
                        </h4>
                      </div>
                      <div id="kids" class="panel-collapse collapse">
                       @foreach ($kids_channels as $channel)                   
                       <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                        <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                      </button>
                      @endforeach                   
                    </div>
                  </div>
                  <!--documentary-->
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#channel_accordion" href="#documentary">
                          Documentary</a>
                        </h4>
                      </div>
                      <div id="documentary" class="panel-collapse collapse">
                       @foreach ($documentary_channels as $channel)                   
                       <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                        <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                      </button>
                      @endforeach
                    </div>
                  </div>
                  <!--Music-->
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#channel_accordion" href="#music">
                         Music</a>
                       </h4>
                     </div>
                     <div id="music" class="panel-collapse collapse">
                      @foreach ($music_channels as $channel)
                      <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                        <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                      </button>
                      @endforeach
                    </div>
                  </div>
                  <!--news-->
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#channel_accordion" href="#news">
                         News</a>
                       </h4>
                     </div>
                     <div id="news" class="panel-collapse collapse">
                       @foreach ($news_channels as $channel)                   
                       <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                        <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                      </button>
                      @endforeach
                    </div>
                  </div>
                  <!--spiritual-->
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#channel_accordion" href="#devotional">
                          Devotional</a>
                        </h4>
                      </div>
                      <div id="devotional" class="panel-collapse collapse">
                        @foreach ($devotional_channels as $channel)                   
                        <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                          <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                        </button>
                        @endforeach
                      </div>
                    </div>
                    <!--sports-->
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h4 class="panel-title">
                          <a data-toggle="collapse" data-parent="#channel_accordion" href="#sports">
                            Sports</a>
                          </h4>
                        </div>
                        <div id="sports" class="panel-collapse collapse">
                         @foreach ($sports_channels as $channel)                   
                         <button class="channelLogoBox btn btn-default"  title="{{$channel->channel_name}}">
                          <img class="lazy" data-original="{{$channel->channel_logo}}" alt="{{$channel->channel_name}}"/>
                        </button>
                        @endforeach
                      </div>
                    </div>

                  </div><!--end of panel-group-->
                </div><!--end colm-->
              </div><!--end container-->
            </div><!--end modal-body-->
          </div><!-- end modal-content -->
        </div><!-- end modal-dialog -->
</div><!-- end modal -->