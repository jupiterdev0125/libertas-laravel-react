<?php

namespace App\Http\Controllers;

use App\Models\User;

class GreetingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param int $guildId
     * @return Response
     */
    public function index(int $guildId)
    {
        $guild = User::guild($guildId);
        $config = $guild->pluginConfigs->firstWhere('name', 'welcome-goodbye');

        return view('plugins.greeting', compact('guild', 'config'));
    }
}
