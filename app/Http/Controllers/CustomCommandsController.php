<?php

namespace App\Http\Controllers;

use App\Models\User;

class CustomCommandsController extends Controller
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
        $config = $guild->pluginConfigs()->firstWhere('name', 'custom-commands');

        return view('plugins.custom-commands', compact('guild', 'config'));
    }
}
