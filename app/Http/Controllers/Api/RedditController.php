<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Embed;
use App\Models\Reddit;
use App\Traits\Embeds;
use Illuminate\Http\Request;
use InvalidArgumentException;

class RedditController extends Controller
{
    use Embeds;

    /**
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            Reddit::with('embed')
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
        $embed = $this->getEmbedFromRequest();
        $embed->save();

        $reddit = new Reddit();
        $reddit->subreddit = strtolower(optional($request->input('reddit'))[0]);
        $reddit->channel_id = optional($request->input('channel_id'))[0];
        $reddit->guild_id = $guildId;
        $reddit->embed_id = $embed->id;
        $reddit->save();

        return response()->json(
            Reddit::with('embed')
                ->where('id', $reddit->id)
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
        $embed = $this->getEmbedFromRequest();
        if (! isset($embed->id)) {
            throw new InvalidArgumentException('Embed id is not valid.');
        }
        $embed->save();

        $reddit = Reddit::find($request->input('id'));
        $reddit->subreddit = strtolower(optional($request->input('reddit'))[0]);
        $reddit->channel_id = optional($request->input('channel_id'))[0];
        $reddit->save();

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
