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
