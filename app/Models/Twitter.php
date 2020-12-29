<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $guild_id
 * @property int $channel_id
 * @property int $twitter_id
 * @property int $embed_id
 * @property string $type
 * @property string $name
 * @method static find(string|int $id): self
 */
class Twitter extends Model
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
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'twitter';

    /**
     * Get the embed record associated with the Twitter model.
     */
    public function embed()
    {
        return $this->hasOne(Embed::class, 'id', 'embed_id');
    }
}
