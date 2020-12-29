<?php

namespace App\Http\Controllers;

use App\Models\User;

class TimedMessageController extends Controller
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
        $config = $guild->pluginConfigs->firstWhere('name', 'timed-messages');

        return view('plugins.timed-messages', compact('guild', 'config'));
    }
}
