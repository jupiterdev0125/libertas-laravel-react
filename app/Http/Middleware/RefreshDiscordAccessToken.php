<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RefreshDiscordAccessToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (now() > $request->user()->refresh_token_at) {
            if ($request->user()->refreshAccessToken() === false) {
                Auth::logout();

                return redirect('login');
            }
        }

        return $next($request);
    }
}
