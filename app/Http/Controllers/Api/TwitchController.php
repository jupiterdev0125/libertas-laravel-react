<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Embed;
use App\Models\Twitch;
use App\Traits\Embeds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use InvalidArgumentException;

class TwitchController extends Controller
{
    use Embeds;

    /**
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            Twitch::with('embed')
                ->where('guild_id', $guildId)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param \Illuminate\Http\Request $requet
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, int $guildId)
    {
        $this->validateUser(optional($request->input('twitch'))[0]);

        $embed = $this->getEmbedFromRequest();
        $embed->save();

        $twitch = new Twitch();
        $twitch->username = strtolower(optional($request->input('twitch'))[0]);
        $twitch->channel_id = optional($request->input('channel_id'))[0];
        $twitch->guild_id = $guildId;
        $twitch->embed_id = $embed->id;
        $twitch->save();

        return response()->json(
            Twitch::with('embed')
                ->where('id', $twitch->id)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function update(Request $request)
    {
        $this->validateUser(optional($request->input('twitch'))[0]);

        $embed = $this->getEmbedFromRequest();
        if (! isset($embed->id)) {
            throw new InvalidArgumentException('Embed id is not valid.');
        }
        $embed->save();

        $twitch = Twitch::find($request->input('id'));
        $twitch->username = strtolower(optional($request->input('twitch'))[0]);
        $twitch->channel_id = optional($request->input('channel_id'))[0];
        $twitch->save();

        return response('OK');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function destroy(Request $request)
    {
        Embed::destroy($request->embed_id);
    }

    private function validateUser($username)
    {
        $response = Http::withHeaders([
            'Client-ID' => config('services.twitch.client_id'),
            'Authorization' => 'Bearer '.config('services.twitch.access_token'),
        ])->get('https://api.twitch.tv/helix/users', [
            'login' => $username,
        ]);

        if (empty($response->json()['data'])) {
            throw new InvalidArgumentException('Twitch user does not exist');
        }
    }
}
