<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the Discord authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider()
    {
        return Socialite::with('discord')
            ->setScopes(['identify', 'guilds', 'email'])
            ->redirect();
    }

    /**
     * Obtain the user information from Discord.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        try {
            $user = Socialite::driver('discord')->user();
        } catch (Exception $e) {
            return $this->redirectToProvider();
        }

        $userModel = User::firstWhere('id', $user->id) ?? new User;
        $userModel->id = $user->id;
        $userModel->nickname = $user->nickname;
        $userModel->name = $user->name;
        $userModel->email = $user->email;
        $userModel->avatar = $user->avatar;
        $userModel->access_token = $user->token;
        $userModel->refresh_token = $user->refreshToken;
        $userModel->refresh_token_at = now()->addDays(3);
        $userModel->save();

        Auth::login($userModel, true);

        return redirect('dashboard');
    }
}
