@extends('layouts.master')
@section('head')
<link rel="stylesheet" href="http://cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css">
<script type="text/javascript" src="http://cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('#feeds_table').dataTable();
});
</script>
@stop
@section('title') Dashboard @stop

@section('content_with_no_sidebar')

<div class="container-fluid">
  <h1><i class="fa fa-users"></i> feeds </h1>

  <div class="table" >
    <table id = "feeds_table" class="table table-bordered table-striped">

        <thead>
            <tr>
             <th>feed name</th>
             <th>No of users</th>
            </tr>
        </thead>

        <tbody>
          
              @foreach ($feeds as $feed)
              <tr> 
                <td>{{ $feed->feed_name}}</td>           
                <td>{{$feed->user_count}}</td>  
              </tr>         
             @endforeach
           
        </tbody>

    </table>
</div>



</div>
@stop