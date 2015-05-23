@extends('layouts.master')
 
@section('title') Users @stop
 
@section('content')
 
<div class="col-lg-10 col-lg-offset-1">
 
    <h1><i class="fa fa-users"></i> User Administration</h1>
 
    <div class="table">
        <table class="table table-bordered table-striped">
 
            <thead>
                <tr>
                    <th>id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Confirmed</th>
                    <th>Date Joined</th>
                       <th>no of tasks</th>
                       <th>no of events</th>
                    {{--  <th>Edit/Delete</th> --}}
                   
                </tr>
            </thead>
 
            <tbody>
                @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->username }}</td>
                    <td>{{ $user->email }}</td>   
                    <td>{{ $user->confirmed }}</td>                 
                    <td>{{ $user->created_at->format('F d, Y h:ia') }}</td>
                    <td>{{ $no_of_tasks[$i]}}</td>
                    <td>{{ $no_of_events[$i++]}}</td>
                   {{--  <td>
                        <a href="/admin/users/{{ $user->id }}/edit" class="btn btn-xs btn-info pull-left" style="margin-right: 3px;">Edit</a>
                        {{ Form::open(['url' => '/admin/users/' . $user->id, 'method' => 'DELETE']) }}
                        {{ Form::submit('Delete', ['class' => 'btn btn-xs btn-danger '])}}
                        {{ Form::close() }}
                    </td> --}}
                    </tr>
                @endforeach
                
            </tbody>
 
        </table>
        <div class='container'>{{$users->links()}}</div>
    </div>
 
    <a href="/admin/users/create" class="btn btn-success">Add User</a>
 
</div>
 
@stop