<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        // $guards = empty($guards) ? [null] : $guards;

        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {

        //         if ($request->expectsJson()) {
        //             // クライアントからJSONレスポンスを要求されている場合はリダイレクトさせず、　JSON形式メッセージをレスポンスする。
        //             return response()->json(['message' => 'すでにログインされています。'], 200);
        //         }

        //         return redirect(RouteServiceProvider::HOME);
        //     }
        // }

        if (Auth::guard($guard)->check()) {
            return redirect()->route('user');
        }
    

        return $next($request);
    }
}
