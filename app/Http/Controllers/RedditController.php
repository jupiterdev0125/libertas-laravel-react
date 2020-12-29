<?php

namespace App\Http\Controllers;

use App\Models\User;

class RedditController extends Controller
{
    public function index(int $id)
    {
        $guild = User::guild($id);
        $config = $guild->pluginConfigs->firstWhere('name', 'reddit');

        return view('plugins.reddit', compact('guild', 'config'));
    }
}
