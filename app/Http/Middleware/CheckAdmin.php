<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;

class CheckAdmin
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
        if (empty(User::guild($request->route('id'), true))) {
            return redirect('dashboard');
        }

        return $next($request);
    }
}
