<?php

use App\Http\Controllers\Api\GuildController;
use App\Http\Controllers\Api\ImageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('upload/validate', [ImageController::class, 'validation']);

    Route::get('guilds/{guild_id}/channels', [GuildController::class, 'channels']);
    Route::get('guilds/{guild_id}/emojis', [GuildController::class, 'emojis']);
    Route::get('guilds/{guild_id}/roles', [GuildController::class, 'roles']);

    Route::apiResources([
        'plugins/{id}/welcome-goodbye' => Api\GreetingController::class,
        'plugins/{id}/custom-commands' => Api\CustomCommandController::class,
        'plugins/{id}/timed-messages' => Api\TimedMessageController::class,
        'plugins/{id}/reddit' => Api\RedditController::class,
        'plugins/{id}/twitch' => Api\TwitchController::class,
        'plugins/{id}/twitter' => Api\TwitterController::class,
        'plugins/{id}/youtube' => Api\YoutubeController::class,
        'plugins/{id}/moderation' => Api\ModerationController::class,
    ], ['except' => ['show']]);
});
