<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Emoji;
use App\Http\Resources\Role;
use Illuminate\Http\Request;
use RestCord\DiscordClient;

class GuildController extends Controller
{
    /** @var DiscordClient */
    private $client;

    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->client = new DiscordClient(['token' => config('services.discord.bot_key')]);
    }

    /**
     * Get all channels in a guild.
     *
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function channels(int $guildId)
    {
        return response()->json(
            collect($this->client->guild->getGuildChannels([
                'guild.id' => $guildId,
            ]))->map(function ($channel) {
                $channel->id = (string) $channel->id;

                return $channel;
            })
        );
    }

    /**
     * Get all emoji's in a guild.
     *
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function emojis(Request $request, int $guildId)
    {
        $emojis = $this->client->emoji->listGuildEmojis([
            'guild.id' => $guildId,
        ]);

        return response()->json(
            collect($emojis)->map(function ($emoji) use ($request) {
                return (new Emoji($emoji))->toArray($request);
            })
        );
    }

    /**
     * Get all roles in a guild.
     *
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function roles(Request $request, int $guildId)
    {
        $roles = $this->client->guild->getGuildRoles([
            'guild.id' => $guildId,
        ]);

        return response()->json(
            collect($roles)->map(function ($role) use ($request) {
                return (new Role($role))->toArray($request);
            })
        );
    }
}
