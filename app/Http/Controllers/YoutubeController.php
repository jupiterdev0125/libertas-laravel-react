<?php

namespace App\Http\Controllers;

use App\Models\User;

class YoutubeController extends Controller
{
    public function index(int $id)
    {
        $guild = User::guild($id);
        $config = $guild->pluginConfigs->firstWhere('name', 'youtube');

        return view('plugins.youtube', compact('guild', 'config'));
    }
}
