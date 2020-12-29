<?php

namespace App\Events;

use App\Models\Embed;
use App\Models\Guild;
use App\Models\Plugin;
use Illuminate\Queue\SerializesModels;

class GuildCreated
{
    use SerializesModels;

    /** @var Guild */
    public $guild;

    /**
     * Create a new event instance.
     *
     * @param  \App\Guild  $guild
     * @return void
     */
    public function __construct(Guild $guild)
    {
        $guild->statistic()->create([]);

        // This will be removed once the bot is in open beta
        $guild->premiumGuild()->create([]);
    }
}
