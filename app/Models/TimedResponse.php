<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $timed_message_id
 * @property int $embed_id
 */
class TimedResponse extends Model
{
    /**
     * Get the embed record associated with the timed message.
     */
    public function embed()
    {
        return $this->hasOne(Embed::class, 'id', 'embed_id');
    }
}
