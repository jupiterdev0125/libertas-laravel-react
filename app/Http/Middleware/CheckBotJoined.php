<?php

namespace App\Http\Middleware;

use App\Models\Guild;
use Closure;

class CheckBotJoined
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (empty(Guild::firstWhere('id', $request->route('id')))) {
            return redirect('dashboard');
        }

        return $next($request);
    }
}
