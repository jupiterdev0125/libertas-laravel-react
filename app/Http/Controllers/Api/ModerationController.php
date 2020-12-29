<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Greeting;
use Illuminate\Http\Request;

class ModerationController extends Controller
{
    //

    public function index(int $guildId)
    {
        return response()->json([]);
    }
}
