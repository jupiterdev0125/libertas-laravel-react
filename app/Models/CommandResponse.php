<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $custom_command_id
 * @property int $embed_id
 */
class CommandResponse extends Model
{
    /**
     * Get the embed record associated with the random response.
     */
    public function embed()
    {
        return $this->hasOne(Embed::class, 'id', 'embed_id');
    }
}
