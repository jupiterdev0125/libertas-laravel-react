<?php

namespace App\Http\Controllers;

use App\Models\User;

class TiktokController extends Controller
{
    public function index(int $id)
    {
        $guild = User::guild($id);
        $config = $guild->pluginConfigs->firstWhere('name', 'tiktok');

        return view('plugins.tiktok', compact('guild', 'config'));
    }
}
