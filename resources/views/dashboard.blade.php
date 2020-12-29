@extends('layouts.main')

@section('title', 'Dashboard')

@section('content')
    <div class="container m-bot-4">
        <div class="row text-center m-top-bot-4">
            <div class="col-12">
                <h1 class="font-weight-bold">Server selection</h1>
            </div>
        </div>
        <div class="row">
            @foreach ($guilds as $guild)
                <div class="col-12 server-card m-top-bot-1">
                    <div class="row p-top-bot-1">
                        <div class="col-12 col-sm-2 col-lg-2 sm-text-center">
                            <img src="{{ $guild->icon_url }}" class="img-fluid logo" alt="{{ $guild->name }} logo">
                        </div>
                        <div class="col-12 col-sm-6 col-lg-7 sm-text-center sm-p-top-bot-1 my-auto">
                            <span class="text-uppercase">{{ $guild->name }}</span>
                        </div>
                        <div class="col-12 col-sm-4 col-lg-3 sm-text-center md-text-right my-auto">
                            @if ($guild->joined)
                                <a href="{{ url("plugins/$guild->id") }}" class="btn btn-view">Plugins</a>
                            @else
                                <a href="{{ url("invite?guild_id=$guild->id") }}" class="btn btn-add">Add to server</a>
                            @endif
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
