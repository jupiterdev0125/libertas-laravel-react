@extends('layouts.main')

@section('title', 'Plugins')

@section('content')
<div class="container m-bot-4">
    <div class="row text-center m-top-bot-4">
        <div class="col-12 title d-flex">
            <img src="{{ $guild->icon_url }}">
            @if(count($guilds) > 1)
                <li class="nav-item d-block dropdownserver sm-text-center">
                    <a class="nav-link dropdown-toggle" href="#" id="serverDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $guild->name }}</a>
                    <div class="dropdown-menu ml-4" aria-labelledby="serverDropdown" id="dropdownmenuserver">
                        {{-- Naming this guild overwrites $guild given by the controller --}}
                        @foreach($guilds as $object)
                            @continue($object->id == request()->id)
                            @continue(!$object->joined)
                            <a class="dropdown-item"
                                href="{{ url("plugins/$object->id") }}">{{ $object->name }}</a>
                        @endforeach
                    </div>
                </li>
            @else
                <li class="nav-item d-block sm-text-center">
                    <p class="font-weight-bold text-nowrap" href="#!">{{ $guild->name }}</p>
                </li>
            @endif
        </div>
    </div>
    <div class="row text-center m-top-bot-2">
        <div class="col-12 col-sm-6 col-lg-3 m-top-bot-1">
            <div class="enabled d-flex justify-content-center align-items-center">
                <div class="text-uppercase server-stats-card">
                    <h5>Total messages</h5>
                    <h4>{{ $stats->message_count }}</h4>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3 m-top-bot-1">
            <div class="enabled d-flex justify-content-center align-items-center">
                <div class="text-uppercase server-stats-card">
                    <h5>+/- members</h5>
                    <h4>+{{ $stats->joined_count }} -{{ $stats->left_count }}</h4>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3 m-top-bot-1">
            <div class="enabled d-flex justify-content-center align-items-center">
                <div class="text-uppercase server-stats-card">
                    <h5>Online members</h5>
                    <h4>{{ $detailedGuild['approximate_presence_count'] }}</h4>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3 m-top-bot-1">
            <div class="enabled d-flex justify-content-center align-items-center">
                <div class="text-uppercase server-stats-card">
                    <h5>Total members</h5>
                    <h4>{{ $detailedGuild['approximate_member_count'] }}</h4>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        @foreach($plugins as $plugin)
            <div
                class="col-12 col-sm-6 col-lg-4 plugin-card m-top-bot-1 {{ !$plugin['accessible'] ? 'premium-plugin' : null }}">
                <a class="{{ $config[$plugin['name']]['enabled'] ? '' : 'toggleable-feature' }} premium-details"
                    href="{{ url("plugins/$guild->id/" . $plugin['name']) }}">
                    <div
                        class="{{ $config[$plugin['name']]['enabled'] && $plugin['accessible'] ? 'enabled' : 'disabled' }}">
                        <div class="row h-100">
                            <div class="col-4 offset-4 offset-lg-0 col-lg-4 my-auto">
                                <img src="{{ asset(sprintf('images/%s.png', $plugin['name'])) }}"
                                    class="img-fluid ml-lg-3">
                            </div>
                            <div class="col-12 col-lg-8 my-auto md-text-center">
                                <p>{{ $plugin['full_name'] }}</p>
                                @isset($plugin['subtitle'])
                                    <span>{{ $plugin['subtitle'] }}</span>
                                @endisset
                            </div>
                        </div>
                    </div>
                </a>
                <div class="premium-cta">
                    <a href="#!">
                        <div class="disabled">
                            <div class="row h-100">
                                <div class="col-4 offset-4 offset-lg-0 col-lg-4 my-auto">
                                    <img src="{{ asset(sprintf('images/%s.png', $plugin['name'])) }}"
                                        class="img-fluid ml-lg-3">
                                </div>
                                <div class="col-12 col-lg-8 my-auto md-text-center">
                                    <p>{{ $plugin['full_name'] }}</p>
                                    <span>No access</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
    </div>
</div>
<script>
    document.querySelectorAll('.toggleable-feature').forEach(link => {
        link.addEventListener('click', (e) => {
            fetch(
                link.href + '/toggle', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-Token': '{{ csrf_token() }}',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            )
        });
    })
</script>
@endsection
