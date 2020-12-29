<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    public function revokeAccessToken()
    {
        $response = Http::asForm()->post('https://discord.com/api/oauth2/token/revoke', [
            'client_id' => config('services.discord.client_id'),
            'client_secret' => config('services.discord.client_secret'),
            'token' => Auth::user()->access_token,
        ]);

        if ($response->successful()) {
            User::where('id', Auth::user()->id)->update([
                'access_token' => null,
                'refresh_token' => null,
                'refresh_token_at' => null,
            ]);
        }

        Auth::logout();

        return redirect('/');
    }
}
