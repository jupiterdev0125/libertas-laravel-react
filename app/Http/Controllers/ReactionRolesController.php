<?php

namespace App\Http\Controllers;

use App\Models\User;

class ReactionRolesController extends Controller
{
    public function index(int $id)
    {
        $guild = User::guild($id);
        $config = $guild->pluginConfigs->firstWhere('name', 'reaction-roles');

        return view('plugins.reaction-roles', compact('guild', 'config'));
    }
}
