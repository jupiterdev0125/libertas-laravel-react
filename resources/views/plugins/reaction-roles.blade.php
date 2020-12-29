@extends('layouts.main')

@section('title', 'Reaction roles')

@section('content')
    <div
            id="reaction-roles-page"
            data-is_premium="{{ $guild->hasPremiumFeature('advanced-embeds') ? "true" : "false" }}"
            data-has_advanced_embeds="{{ $guild->hasPremiumFeature('advanced-embeds') ? "true" : "false" }}"
            data-csrf_token="{{ csrf_token() }}"
            data-guild_id="{{ $guild->id }}"
            data-guild_name="{{ $guild->name }}"
            data-plugin_enabled="{{ $config->enabled ? 'true' : 'false'}}"
    ></div>
@endsection
