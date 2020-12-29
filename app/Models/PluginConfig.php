<?php

namespace App\Models;

use App\Models\Plugin;
use Illuminate\Database\Eloquent\Model;

class PluginConfig extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'plugin_config';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['guild_id', 'name', 'payload'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'payload' => 'array',
    ];

    public static function initializeGuildConfig($id)
    {
        $plugins = Plugin::all()->pluck('name');

        $plugins->each(function ($plugin) use ($id) {
            self::firstOrCreate([
                'guild_id' => $id,
                'name' => $plugin,
            ]);
        });

        return self::where('guild_id', $id)->get();
    }
}
