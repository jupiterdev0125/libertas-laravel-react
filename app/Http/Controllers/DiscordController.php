<?php

namespace App\Http\Controllers;

use App\Models\Guild;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class DiscordController extends Controller
{
    /**
     * Redirect the user to the Discord bot authentication page.
     *
     * @param Request $request
     * @return Response
     */
    public function redirectToInvite(Request $request)
    {
        return Socialite::with('discord')
            ->with(['guild_id' => $request->guild_id, 'permissions' => 8])
            ->redirectUrl(route('invite.callback'))
            ->setScopes(['bot'])
            ->redirect();
    }

    /**
     * Obtain the user's information from Discord.
     *
     * @param Request $request
     * @return Response
     */
    public function handleInviteCallback(Request $request)
    {
        try {
            $user = Socialite::with('discord')
                ->redirectUrl(route('invite.callback'))
                ->setScopes(['bot'])
                ->user();
        } catch (Exception $e) {
            return $this->redirectToInvite($request);
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

        $guild = User::guild($request->guild_id);
        Guild::firstOrCreate(['id' => $guild->id], $guild->toArray());

        return redirect(sprintf('plugins/%d', $request->guild_id));
    }
}
