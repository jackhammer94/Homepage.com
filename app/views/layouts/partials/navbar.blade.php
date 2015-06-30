
<nav class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li  ><a href="/">Home</a></li>
        <li><a href="/deals">deals</a></li>
        <li><a href="/games">games</a></li>
        @if(Auth::check()&&Auth::user()->username==='admin')
        <li><a href="/admin">admin</a></li>
        @endif
      </ul>
      @if(Auth::guest())
      <ul class="nav navbar-nav navbar-right">
        <li><a href="/register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
          
            @else
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">{{Auth::user()->username}} <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="/settings"><span class="glyphicon glyphicon-cog"></span> settings</a></li> 
                  <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span> logout</a></li> 
                </ul>
              </li>
            </ul>
            @endif

          </div><!--/.nav-collapse -->
        </div>
      </nav>
