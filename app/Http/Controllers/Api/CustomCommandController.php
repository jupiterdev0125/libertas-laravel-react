<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CommandResponse;
use App\Models\CustomCommand;
use App\Models\Embed;
use App\Traits\Embeds;
use App\Traits\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;

class CustomCommandController extends Controller
{
    use Embeds, Roles;

    /**
     * Display a listing of the resource.
     *
     * @param int $guildId
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(int $guildId)
    {
        return response()->json(
            CustomCommand::with('responses.embed')
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
        // Create special embed validator if possible
        // We fix this one later
        $request->validate([
            'type' => 'required|in:single,random,flipbook,auto-role',
            'name' => 'required',
        ]);

        DB::beginTransaction();

        $customCommand = new CustomCommand();
        $customCommand->guild_id = $guildId;
        $customCommand->invocation = $request->input('name');
        $customCommand->prefix = $request->input('prefix');
        $customCommand->type = $request->input('type');
        $customCommand->allowed_roles = $this->assignRoles('allowed_roles');
        $customCommand->banned_roles = $this->assignRoles('banned_roles');
        $customCommand->roles = $this->assignRoles('roles');

        $customCommand->message_type = $this->assignRoles('message_type');
        $customCommand->banned_channel = $this->assignRoles('banned_channel');
        $customCommand->response_channel = $request->input('response_channel');
        $customCommand->display_help = $request->input('display_help');
        $customCommand->role_action = $request->input('role_action') === 'true' ? true : false;
        $customCommand->cooldown = $request->input('cooldown');
        $customCommand->cooldown_period = $request->input('cooldown_period');
        $customCommand->cooldown_period_count = $request->input('cooldown_period_count');
        $customCommand->delete_usage_period_count = $request->input('delete_usage_period_count');
        $customCommand->delete_usage_period = $request->input('delete_usage_period');
        $customCommand->delete_command_usage = $request->input('delete_command_usage') === 'true' ? true : false;
        $customCommand->delete_response_period_count = $request->input('delete_response_period_count');
        $customCommand->delete_response_period = $request->input('delete_response_period');
        $customCommand->delete_command_response = $request->input('delete_command_response') === 'true' ? true : false;

        $customCommand->save();

        $embeds = $this->getEmbedsFromRequest();
        if (count($embeds) === 0) {
            throw new InvalidArgumentException('Cannot create a custom command without embeds');
        }

        foreach ($embeds as $embed) {
            $embed->save();

            $commandResponse = new CommandResponse();
            $commandResponse->custom_command_id = $customCommand->id;
            $commandResponse->embed_id = $embed->id;
            $commandResponse->save();
        }

        DB::commit();

        return response()->json(
            CustomCommand::with('responses.embed')
                ->where('id', $customCommand->id)
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
        DB::beginTransaction();

        /** @var CustomCommand $customCommand */
        $customCommand = CustomCommand::find($request->input('id'));
        $customCommand->invocation = $request->input('name');
        $customCommand->prefix = $request->input('prefix');
        $customCommand->allowed_roles = $this->assignRoles('allowed_roles');
        $customCommand->banned_roles = $this->assignRoles('banned_roles');
        $customCommand->roles = $this->assignRoles('roles');

        $customCommand->message_type = $this->assignRoles('message_type');
        $customCommand->banned_channel = $this->assignRoles('banned_channel');
        $customCommand->response_channel = $request->input('response_channel');
        $customCommand->display_help = $request->input('display_help');
        $customCommand->role_action = $request->input('role_action') === 'true' ? true : false;
        $customCommand->cooldown = $request->input('cooldown');
        $customCommand->cooldown_period = $request->input('cooldown_period');
        $customCommand->cooldown_period_count = $request->input('cooldown_period_count');
        $customCommand->delete_response_period_count = $request->input('delete_usage_period_count');
        $customCommand->delete_response_period = $request->input('delete_usage_period');
        $customCommand->delete_command_response = $request->input('delete_command_usage') === 'true' ? true : false;
        $customCommand->delete_response_period_count = $request->input('delete_response_period_count');
        $customCommand->delete_response_period = $request->input('delete_response_period');
        $customCommand->delete_command_response = $request->input('delete_command_response') === 'true' ? true : false;

        $customCommand->save();

        $embeds = $this->getEmbedsFromRequest();
        if (count($embeds) === 0) {
            throw new InvalidArgumentException('Cannot update a custom command without embeds');
        }
        $updatedIds = [];

        foreach ($embeds as $embed) {
            $embed->save();
            $updatedIds[] = $embed->id;

            if ($embed->wasRecentlyCreated === true) {
                $customCommand = new CommandResponse();
                $customCommand->custom_command_id = $request->input('id');
                $customCommand->embed_id = $embed->id;
                $customCommand->save();
            }
        }
        $commandsResponses = CommandResponse::whereNotIn('embed_id', $updatedIds);
        $commandsResponses->delete();

        DB::commit();

        return response('OK');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function destroy(Request $request)
    {
        $customCommand = CustomCommand::find($request->input('id'));

        foreach ($customCommand->responses as $response) {
            $embed = Embed::find($response->embed_id);

            foreach (['footer_image', 'image', 'thumbnail', 'author'] as $item) {
                Storage::delete($embed->{$item});
            }

            $response->delete();
            $embed->delete();
        }

        $customCommand->delete();

        return response('OK');
    }
}
