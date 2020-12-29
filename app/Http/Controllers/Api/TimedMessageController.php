<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Hydrators\TimedMessageHydrator;
use App\Models\Embed;
use App\Models\TimedMessage;
use App\Models\TimedResponse;
use App\Traits\Embeds;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;

class TimedMessageController extends Controller
{
    use Embeds;

    /** @var TimedMessageHydrator */
    private $timedMessageHydrator;

    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct(TimedMessageHydrator $timedMessageHydrator)
    {
        $this->timedMessageHydrator = $timedMessageHydrator;
    }

    /**
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            TimedMessage::with('responses.embed')
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
        DB::beginTransaction();

        $timedMessage = $this->timedMessageHydrator->hydrateFromRequest($request);
        $timedMessage->guild_id = $guildId;
        $timedMessage->type = $request->input('type');
        $timedMessage->save();

        $embeds = $this->getEmbedsFromRequest();
        if (count($embeds) === 0) {
            throw new InvalidArgumentException('Cannot update a custom command without embeds');
        }

        foreach ($embeds as $embed) {
            $embed->save();

            $timedResponse = new TimedResponse();
            $timedResponse->timed_message_id = $timedMessage->id;
            $timedResponse->embed_id = $embed->id;
            $timedResponse->save();
        }
        DB::commit();

        $timedMessage->channel->send($embeds->random());

        return response()->json(
            TimedMessage::with('responses.embed')
                ->where('id', $timedMessage->id)
                ->get()
                ->toArray()
        );
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        DB::beginTransaction();

        $timedMessage = $this->timedMessageHydrator->hydrateFromRequest($request);
        $timedMessage->save();

        $embeds = $this->getEmbedsFromRequest();
        if (count($embeds) === 0) {
            throw new InvalidArgumentException('Cannot update a custom command without embeds');
        }

        foreach ($embeds as $embed) {
            $embed->save();

            if ($embed->wasRecentlyCreated === true) {
                $timedResponse = new TimedResponse();
                $timedResponse->timed_message_id = $timedMessage->id;
                $timedResponse->embed_id = $embed->id;
                $timedResponse->save();
            }
        }

        $this->removeUnusedTimedResponses($timedMessage->id, $embeds);

        DB::commit();

        $timedMessage->channel->send($embeds->random());

        return response('OK');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function destroy(Request $request)
    {
        DB::beginTransaction();

        $timedMessages = TimedMessage::with('responses')
            ->where('id', $request->input('id'))
            ->get();

        if (count($timedMessages) !== 1) {
            return response('No valid response(s) found given given id');
        }

        $timedMessage = $timedMessages[0];

        /** @var TimedResponse $response */
        foreach ($timedMessage->responses as $response) {
            $embed = Embed::find($response->embed_id);

            foreach (['footer_image', 'image', 'thumbnail', 'author'] as $item) {
                Storage::delete($embed->{$item});
            }

            $response->delete();
            $embed->delete();
        }

        $timedMessage->delete();
        DB::commit();

        return response('OK');
    }

    /**
     * @param int $timedMessageId
     * @param array $embeds
     * @return void
     */
    private function removeUnusedTimedResponses(int $timedMessageId, Collection $embeds)
    {
        /** @var Collection|TimedResponse[] $timedResponses */
        $timedResponses = TimedResponse::where('timed_message_id', $timedMessageId)->get();
        $timedResponsesEmbedIds = array_map(static function (array $timedResponses) {
            return $timedResponses['embed_id'];
        }, $timedResponses->toArray());

        $existingEmbedIds = [];
        foreach ($embeds as $embed) {
            $existingEmbedIds[] = $embed->id;
        }

        $missingEmbeds = array_diff($timedResponsesEmbedIds, $existingEmbedIds);
        foreach ($timedResponses as $timedResponse) {
            if (in_array($timedResponse->embed_id, $missingEmbeds, true)) {
                Embed::destroy($timedResponse->embed_id);
                $timedResponse->delete();
            }
        }
    }
}
