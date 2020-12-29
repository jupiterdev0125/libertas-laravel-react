<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $type
 * @property string $channel_id
 * @property string[] $roles
 * @property int $guild_id
 * @property DateTimeInterface $created_at
 * @property DateTimeInterface $updated_at
 * @property Embed|null $embed
 * @property int|null $embed_id
 * @method static find(string $id): Greeting
 */
class Greeting extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'guild_id', 'embed_id'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'channel_id' => 'string',
        'roles' => 'string',
    ];

    /**
     * Get the embed record associated with the welcome/goodbye plugin.
     */
    public function embed()
    {
        return $this->hasOne(Embed::class, 'id', 'embed_id');
    }
}
