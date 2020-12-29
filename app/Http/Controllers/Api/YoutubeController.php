<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Embed;
use App\Models\Youtube;
use App\Traits\Embeds;
use Illuminate\Http\Request;
use InvalidArgumentException;

class YoutubeController extends Controller
{
    use Embeds;

    /**
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            Youtube::with('embed')
                ->where('guild_id', $guildId)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param int $guildId
     * @return \Illuminate\Http\JsonRespons
     */
    public function store(Request $request, int $guildId)
    {
        $embed = $this->getEmbedFromRequest();
        $embed->save();

        $youtube = new Youtube();
        $youtube->youtube_id = optional($request->input('youtube'))[0];
        $youtube->channel_id = optional($request->input('channel_id'))[0];
        $youtube->guild_id = $guildId;
        $youtube->embed_id = $embed->id;
        $youtube->save();

        return response()->json(
            Youtube::with('embed')
                ->where('id', $youtube->id)
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
        $embed = $this->getEmbedsFromRequest();
        if (! isset($embed->id)) {
            throw new InvalidArgumentException('Embed id is not valid.');
        }
        $embed->save();

        $youtube = Youtube::find($request->input('id'));
        $youtube->youtube_id = optional($request->input('youtube'))[0];
        $youtube->channel_id = optional($request->input('channel_id'))[0];
        $youtube->save();

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
}
