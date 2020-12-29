<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Embed;
use App\Models\Greeting;
use App\Traits\Embeds;
use App\Traits\Roles;
use Illuminate\Http\Request;
use InvalidArgumentException;

class GreetingController extends Controller
{
    use Embeds, Roles;

    /**
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            Greeting::with('embed')
                ->where('guild_id', $guildId)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, int $guildId)
    {
        $embed = $this->getEmbedFromRequest();
        $embed->save();

        $greeting = new Greeting();
        $greeting->embed_id = $embed->id;
        $greeting->type = $request->input('type');
        $greeting->guild_id = $guildId;
        $greeting->channel_id = optional($request->input('channel_id'))[0];
        $greeting->roles = $this->assignRoles('roles');
        $greeting->save();

        return response()->json(
            Greeting::with('embed')
                ->where('id', $greeting->id)
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

        $greeting = Greeting::find($request->input('id'));
        $greeting->channel_id = optional($request->input('channel_id'))[0];
        $greeting->roles = $this->assignRoles('roles');
        $greeting->save();

        return response('OK');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function destroy(Request $request)
    {
        Greeting::destroy($request->input('id'));
        Embed::destroy($request->input('embed_id'));
    }
}
