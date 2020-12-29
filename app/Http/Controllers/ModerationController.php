<?php

namespace App\Http\Controllers;

use App\Models\User;

class ModerationController
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
        $config = $guild->pluginConfigs->firstWhere('name', 'moderation');

        return view('plugins.moderation', compact('guild', 'config'));
    }
}
