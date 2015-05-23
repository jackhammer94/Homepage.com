@extends('layouts.master')

@section('title') Dashboard @stop

@section('content')

<div class="container-fluid">
  <h1><i class="fa fa-users"></i> feeds </h1>

  <div class="table">
    <table class="table table-bordered table-striped">

        <thead>
            <tr>
                <th>user</th>
                <th>feeds</th>              

            </tr>
        </thead>

        <tbody>
              @foreach ($feeds as $feed)
            <tr>
                <td>{{ $feed->user}}</td>
                <td>{{ $feed->feeds}}</td>          

            </tr>
             @endforeach
        </tbody>

    </table>
     <div class='container'>{{$feeds->links()}}</div>
</div>



</div>
@stop