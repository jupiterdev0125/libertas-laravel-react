<nav class="navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <div class="row sm-w-100">
            <div class="col-10 col-lg-3 libertastext-logo">
                <a class="navbar-brand-logo" href="{{ url('/') }}">
                    <img src="{{ asset('images/logo.png') }}" class="nav-logo" alt="Libertas | logo">
                </a>
            </div>
            <div class="col-2 col-lg-9 d-block d-lg-none my-auto">
                <div class="w-100">
                    <button class="navbar-toggler float-right" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div class="col-12 col-lg-9 my-auto">
                <div class="collapse navbar-collapse w-100" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mob-w-100">
                        <li class="nav-item {{ request()->is('/') ? 'active' : '' }}">
                            <a class="nav-link" href="{{ url('/') }}">HOME <span class="sr-only">(current)</span></a>
                        </li>
                        @auth
                            <li class="nav-item {{ request()->is('dashboard') ? 'active' : '' }}">
                                <a class="nav-link" href="{{ url('dashboard') }}">DASHBOARD</a>
                            </li>
                        @endauth
                        <li class="nav-item">
                            <a class="nav-link" href="{{ url('support') }}" target="_blank">SUPPORT</a>
                        </li>
                        @auth
                            <li class="nav-item dropdown">
                                <a class="nav-link" href="#"
                                   id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="false">
                                    ACCOUNT
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="dropdownmenu">
                                    <a class="dropdown-item" href="{{ url('logout') }}">Logout</a>
                                </div>
                            </li>
                        @else
                            <li class="nav-item">
                                <a class="nav-link" href="{{ url('login') }}">LOGIN</a>
                            </li>
                        @endauth
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
