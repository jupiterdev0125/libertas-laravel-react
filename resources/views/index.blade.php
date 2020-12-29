@extends('layouts.main')

@section('title', 'Home')

@section('content')
    <div class="container-fluid text-center home-bg">
        <div class="row home thanks-ie text-center">
            <div class="col-12 my-auto">
                <h1>Libertas</h1>
                <a class="btn btn-view home-button-spacing mob-m-bot-1" href="{{ url('invite') }}">Add to server</a>
                @auth
                    <a class="btn btn-add home-button-spacing mob-m-bot-1" href="{{url('dashboard')}}">Dashboard</a>
                @else
                    <a class="btn btn-add home-button-spacing mob-m-bot-1" href="{{url('login')}}">Dashboard</a>
                @endauth
            </div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row m-bot-2 about">
            <div class="col-12">
                <div class="row m-top-bot-2 server-card">
                    <div class="col-12 col-md-6">
                        <img src="{{ asset('images/custom-embed-home.png') }}" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-6 my-auto text-about-l">
                        <h3 class="font-weight-bold">Custom Embed Builders!</h3>
                        <p>
                            Libertas unlocks your creativity and allows you to build unique and personalized embeds for
                            every single feature that is offered!
                        </p>
                    </div>
                </div>
                <div class="row m-top-bot-2 server-card">
                    <div class="col-12 col-md-6 my-auto text-about-r order-2 order-md-1">
                        <h3 class="font-weight-bold">Welcome &amp; Goodbye!</h3>
                        <p>
                            Libertas gives you the tools necessary to make new server members feel welcome from the
                            second they join! In addition to that, organize your server automatically by assigning roles
                            to
                            those that join!
                        </p>
                    </div>
                    <div class="col-12 col-md-6 order-1 order-md-2">
                        <img src="{{ asset('images/welcome-goodbye-home.png') }}" class="img-fluid">
                    </div>
                </div>
                <div class="row m-top-bot-2 server-card">
                    <div class="col-12 col-md-6">
                        <img src="{{ asset('images/custom-command-home.png') }}" class="img-fluid">
                    </div>
                    <div class="col-12 col-md-6 my-auto text-about-l">
                        <h3 class="font-weight-bold">Custom Commands!</h3>
                        <p>
                            Libertas offers a variety of custom command options! Choose between our responsive single,
                            random, flip-book, and auto-role commands!
                        </p>
                    </div>
                </div>
                <div class="row m-top-bot-2 server-card">
                    <div class="col-12 col-md-6 my-auto text-about-r order-md-1 order-2">
                        <h3 class="font-weight-bold">Timed Messages!</h3>
                        <p>
                            Libertas provides peace-of-mind through reliable timed messages! Simply create a
                            personalized
                            message, choose a time interval, and let convenience take over.
                        </p>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-1 ">
                        <img src="{{ asset('images/timed-messages-home.png') }}" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid reviews">
        <div class="blocks mx-auto">
            <div class="animation review-wrapper">
                @foreach ($testimonials as $testimonial)
                    <div class="{{ $loop->first ? 'first' : '' }} review-blocks">
                        <div class="row h-100">
                            <div class="col-4 offset-4 offset-sm-0 col-sm-2 spacing-logo">
                                <img src="{{ asset("images/$testimonial->id.png") }}" class="img-fluid">
                            </div>
                            <div class="col-12 col-sm-10 spacing-text">
                                <p>
                                    {{ $testimonial->description }}
                                </p>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection

@section('footer')
    @include('layouts/footer')
@endsection
