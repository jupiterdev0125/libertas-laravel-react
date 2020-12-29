<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $guild_id
 * @property int $channel_id
 * @property string $subreddit
 * @property int $embed_id
 * @property string $type
 * @property string $name
 * @method static find(string|int $id): self
 */
class Reddit extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'reddit';

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
     * Get the embed record associated with the Reddit model.
     */
    public function embed()
    {
        return $this->hasOne(Embed::class, 'id', 'embed_id');
    }
}
