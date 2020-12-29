<?php

namespace App\Http\Controllers;

use App\Models\User;

class TwitchController extends Controller
{
    public function index(int $id)
    {
        $guild = User::guild($id);
        $config = $guild->pluginConfigs->firstWhere('name', 'twitch');

        return view('plugins.twitch', compact('guild', 'config'));
    }
}
