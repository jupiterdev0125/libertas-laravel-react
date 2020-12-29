<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $invocation command name
 * @property string $type
 * @property string $roles auto-roles
 * @property string $allowed_roles
 * @property string $banned_roles
 * @property int $guild_id
 * @property DateTimeInterface $created_at
 * @property DateTimeInterface $updated_at
 * @method static find(string $id): CustomCommand
 */
class CustomCommand extends Model
{
    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'guild_id' => 'string',
    ];

    /**
     * Get the responses for the custom command.
     */
    public function responses()
    {
        return $this->hasMany(CommandResponse::class);
    }
}
