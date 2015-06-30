@extends('layouts.master')

@section('title') Dashboard @stop

@section('content_with_no_sidebar')

<div class="container-fluid">
    <h1><i class="fa fa-film"></i> movies</h1>

<div class="table">
    <table class="table table-bordered table-striped">

        <thead>
            <tr>
                <th>title</th>
                <th>image_link</th>
                <th>Overview</th>
                <th>release date</th>
                <th>type</th>
                <th> 
                    {{ Form::open(['url' => '/admin/delete_all_movies', 'method' => 'POST']) }}
                    {{ Form::submit('Delete All', ['class' => 'btn btn-xs btn-danger '])}}
                    {{ Form::close() }}
                </th>
            </tr>
        </thead>

        <tbody>
            @foreach ($movies as $movie)
            <tr>
                <td>{{ $movie->title }}</td>
                <td>{{ $movie->image }}</td>
                <td>{{ $movie->overview }}</td> 
                 <td>{{ $movie->release_date }}</td> 
                  <td>{{ $movie->type }}</td> 
                <td>
                    <a href="/admin/edit_movie/{{$movie->id}}" class="btn btn-xs btn-info pull-left" style="margin-right: 3px;">Edit</a>
                    {{ Form::open(['url' => '/admin/delete_movie/'.$movie->id, 'method' => 'POST']) }}
                    {{ Form::submit('Delete', ['class' => 'btn btn-xs btn-danger '])}}
                    {{ Form::close() }}
                </td>  

            </tr>
            @endforeach

        </tbody>

    </table>
     <div class='container'>{{$movies->links()}}</div>
</div>

<div > 

    <button class="btn btn-primary"  onclick="backup()"> backup nowshowing movies </button>
    <button class="btn btn-primary"  onclick="backup_upcoming_movies()"> backup upcoming movies </button>

    <h3> Add movies</h3>

    {{ Form::open( ['role' => 'form', 'url' => '/admin/add_movie', 'method' => 'P0ST']) }}
    <div class='form-group'>
        {{ Form::label('title', 'title') }}
        {{ Form::text('title', null,  ['required'=>'required', 'placeholder' => 'title', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::label('image', 'image link') }}
        {{ Form::text('image', null,  ['required'=>'required','placeholder' => 'image', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::label('overview', 'overview') }}
        {{ Form::textarea('overview', null, ['required'=>'required','placeholder' => 'overview', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::label('release_date', 'release_date ') }}
        {{ Form::text('release_date', null,  ['required'=>'required','placeholder' => 'release_date', 'class' => 'form-control']) }}
    </div>
    <div class='form-group'>
        {{ Form::label('type', 'type ') }}
        {{ Form::text('type', null,  ['required'=>'required','placeholder' => 'type', 'class' => 'form-control']) }}
    </div>

    <div class='form-group'>
        {{ Form::submit('save', ['class' => 'btn btn-primary']) }}
    </div>

    {{ Form::close() }}

</div>
</div>
<script type="text/javascript">
var base_url="http://localhost:8080";
function backup(){
    
    $.ajax({
        url: "https://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: 'select * from html where url="http://in.bookmyshow.com/chennai/movies/nowshowing" and xpath="//*[@id=\'divComingSoon\']/ul[1]" limit 10',
            format: "json"
        },
        // Work with the response
        success: function(data) {
          // console.log(data);
          console.log('nowplaying: ',data);
          var results = data.query.results;
          if(results){
            // console.log('img ', results.ul.li[0].div.div[0].img.src )
            // console.log('title', results.ul.li[0].div.div[1].ul.li[0].a.content);
            // console.log('plot ', results.ul.li[0].div.div[1].ul.li[1].blockquote.content);
            for (var i=0;i<10;i++){
                var title = results.ul.li[i].div.div[1].ul.li[0].a.content;
                var img_src  = results.ul.li[i].div.div[0].img.src;
                var overview  = results.ul.li[i].div.div[1].ul.li[1].blockquote.content;
                var release_date = "released";
                var type = "nowplaying";

                $.ajax({
                    url:base_url+"/admin/add_movie",
                    type:"POST",
                    async:false,
                    data:{
                        title:title,
                        image: img_src,
                        overview:overview, 
                        release_date:release_date,
                        type:type
                    },
                    success:function(data){
                        console.log('movie added');

                    }
                });



            }
            alert('movies backed up successfully') ;
        }
    },
    error: function(){
        alert('error fetching movies');
    }
});

}

function backup_upcoming_movies(){
   
    $.ajax({
        url: "https://query.yahooapis.com/v1/public/yql",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            q: 'select * from html where url="http://in.bookmyshow.com/chennai/movies/comingsoon" and xpath="//*[@id=\'divComingSoon\']/ul[1]" limit 10',
            format: "json"
        },
        // Work with the response
        success: function(data) {
          // console.log(data);
          console.log('nowplaying: ',data);
          var results = data.query.results;
          if(results){
            // console.log('img ', results.ul.li[0].div.div[0].img.src )
            // console.log('title', results.ul.li[0].div.div[1].ul.li[0].a.content);
            // console.log('plot ', results.ul.li[0].div.div[1].ul.li[1].blockquote.content);
            for (var i=0;i<10;i++){
                var title = results.ul.li[i].div.div[1].ul.li[0].a.content;
                var img_src  = results.ul.li[i].div.div[0].img.src;
                var overview  = results.ul.li[i].div.div[1].ul.li[1].blockquote.content;
                var release_date = results.ul.li[i].div.div[2].div.span.content;
                var type = "upcoming";

                $.ajax({
                    url:base_url+"/admin/add_movie",
                    type:"POST",
                    async:false,
                    data:{
                        title:title,
                        image: img_src,
                        overview:overview, 
                        release_date:release_date,
                        type:type
                    },
                    success:function(data){
                        console.log('upcoming movie added');

                    }
                });



            }
            alert('upcoming movies backed up successfully') ;
        }
    },
    error: function(){
        alert('error fetching upcoming movies');
    }
});

}

</script>
</div>
@stop