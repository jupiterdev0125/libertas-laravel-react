<?php

namespace App\Http\Controllers;

use App\Models\User;

class TwitterController extends Controller
{
    public function index(int $id)
    {
        $guild = User::guild($id);
        $config = $guild->pluginConfigs->firstWhere('name', 'twitter');

        return view('plugins.twitter', compact('guild', 'config'));
    }
}
