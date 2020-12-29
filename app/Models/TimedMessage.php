<?php

namespace App\Models;

use App\Services\DiscordChannel;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $guild_id
 * @property int $channel_id
 * @property int $interval
 * @property int $next_occurrence (in seconds)
 * @property string $type
 * @property string $name
 * @method static find(string|int $id): self
 */
class TimedMessage extends Model
{
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'guild_id' => 'string',
        'channel_id' => 'string',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'channel',
    ];

    public function responses()
    {
        return $this->hasMany(TimedResponse::class);
    }

    public function getChannelAttribute()
    {
        return new DiscordChannel($this->channel_id);
    }
}
