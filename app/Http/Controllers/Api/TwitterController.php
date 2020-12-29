<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Embed;
use App\Models\Twitter;
use App\Traits\Embeds;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use InvalidArgumentException;

class TwitterController extends Controller
{
    use Embeds;

    /**
     * @param int $guildId
     * @return JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            Twitter::with('embed')
                ->where('guild_id', $guildId)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param Request $request
     * @param int $guildId
     * @return JsonResponse
     */
    public function store(Request $request, int $guildId)
    {
        $embed = $this->getEmbedFromRequest();
        $embed->save();

        $twitter = new Twitter();
        $twitter->twitter_username = optional($request->input('twitter'))[0];
        $twitter->twitter_id = $this->getTwitterIdByUsername($twitter->twitter_username);
        $twitter->channel_id = optional($request->input('channel_id'))[0];
        $twitter->guild_id = $guildId;
        $twitter->embed_id = $embed->id;
        $twitter->save();

        return response()->json(
            Twitter::with('embed')
                ->where('id', $twitter->id)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param Request $request
     * @return Response|ResponseFactory
     */
    public function update(Request $request)
    {
        $embed = $this->getEmbedFromRequest();
        if (! isset($embed->id)) {
            throw new InvalidArgumentException('Embed id is not valid.');
        }
        $embed->save();

        /** @var Twitter $twitter */
        $twitter = Twitter::find($request->input('id'));
        $twitter->twitter_username = optional($request->input('twitter'))[0];
        $twitter->twitter_id = $this->getTwitterIdByUsername($twitter->twitter_username);
        $twitter->channel_id = optional($request->input('channel_id'))[0];
        $twitter->save();

        return response('OK');
    }

    /**
     * @param Request $request
     * @return void
     */
    public function destroy(Request $request)
    {
        Embed::destroy($request->embed_id);
    }

    private function getTwitterIdByUsername($username)
    {
        $response = Http::asForm()->post('https://tweeterid.com/ajax.php', [
            'input' => $username,
        ]);

        if ($response->failed()) {
            // TODO: Raise error instead
            return;
        }

        return $response->body();
    }
}

// Use $request->excepctsJson()
