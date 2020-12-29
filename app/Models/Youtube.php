<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Youtube extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'youtube';

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
     * Get the embed record associated with the YouTube model.
     */
    public function embed()
    {
        return $this->hasOne(Embed::class, 'id', 'embed_id');
    }
}
