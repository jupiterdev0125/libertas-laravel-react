<?php

use App\Http\Controllers\CustomCommandsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscordController;
use App\Http\Controllers\GreetingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ModerationController;
use App\Http\Controllers\PluginController;
use App\Http\Controllers\ReactionRoles\ListReactionRolesController;
use App\Http\Controllers\ReactionRolesController;
use App\Http\Controllers\RedditController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\TiktokController;
use App\Http\Controllers\TimedMessageController;
use App\Http\Controllers\TwitchController;
use App\Http\Controllers\TwitterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YoutubeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::view('policies', 'policies');
    Route::redirect('support', config('services.discord.support_invite'));

    Route::get('invite', [DiscordController::class, 'redirectToInvite'])->name('invite');
    Route::get('invite/callback', [DiscordController::class, 'handleInviteCallback'])->name('invite.callback');

    Route::get('login', [SocialiteController::class, 'redirectToProvider'])->middleware('guest')->name('login');
    Route::get('login/callback', [SocialiteController::class, 'handleProviderCallback'])->middleware('guest')->name('login.callback');

    Route::group(['middleware' => ['auth', 'refresh']], function () {
        Route::get('logout', [UserController::class, 'revokeAccessToken']);

        Route::get('dashboard', [DashboardController::class, 'index']);

        Route::group(['middleware' => ['joined', 'admin']], function () {
            Route::get('plugins/{id}', [PluginController::class, 'show']);

            // Plugin
            Route::post('plugins/{id}/{plugin}/toggle', [PluginController::class, 'toggle']);

            Route::get('plugins/{id}/welcome-goodbye', [GreetingController::class, 'index'])->name('greetings.index');
            Route::get('plugins/{id}/custom-commands', [CustomCommandsController::class, 'index'])->name('customCommands.index');
            Route::get('plugins/{id}/timed-messages', [TimedMessageController::class, 'index'])->name('timed.index');
            Route::get('plugins/{id}/reddit', [RedditController::class, 'index']);
            Route::get('plugins/{id}/tiktok', [TiktokController::class, 'index']);
            Route::get('plugins/{id}/twitch', [TwitchController::class, 'index']);
            Route::get('plugins/{id}/twitter', [TwitterController::class, 'index']);
            Route::get('plugins/{id}/youtube', [YoutubeController::class, 'index']);
            Route::get('plugins/{id}/moderation', [ModerationController::class, 'index']);

            // Reaction roles
            Route::get('plugins/{id}/reaction-roles', [ReactionRolesController::class, 'index'])->name('reactionRoles.index');
            Route::get('plugins/{id}/reaction-roles/list', [ListReactionRolesController::class, 'list'])->name('reactionRoles.list');
        });
    });
});
