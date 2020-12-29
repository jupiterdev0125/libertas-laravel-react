<?php

namespace App\Rules;

use Exception;
use Illuminate\Contracts\Validation\Rule;
use RestCord\DiscordClient;

class ChannelExists implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->client = new DiscordClient(['token' => config('services.discord.bot_key')]);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        try {
            $channel = $this->client->channel->getChannel(['channel.id' => (int) $value]);
        } catch (Exception $e) {
            return false;
        }

        return request()->route('id') == $channel->guild_id;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This channel does not exist';
    }
}
