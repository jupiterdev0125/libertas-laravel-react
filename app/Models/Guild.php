<?php

namespace App\Models;

use App\Events\GuildCreated;
use Illuminate\Database\Eloquent\Model;

class Guild extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'icon',
        'owner',
        'permissions',
        'features',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'features' => 'array',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'icon_url',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => GuildCreated::class,
    ];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Create a new guild instance.
     *
     * @param  array  $attributes
     * @return void
     */
    public function __construct($attributes = [])
    {
        parent::__construct($attributes);
    }

    /**
     * Get the plugin configs for the guild.
     */
    public function pluginConfigs()
    {
        return $this->hasMany(PluginConfig::class);
    }

    /**
     * Get the premium guild record associated with the guild.
     */
    public function premiumGuild()
    {
        return $this->hasOne(PremiumGuild::class);
    }

    /**
     * Get the premium features for the guild.
     */
    public function premiumGuildFeatures()
    {
        return $this->hasMany(PremiumGuildFeature::class);
    }

    /**
     * Get the greetings for the guild.
     */
    public function greetings()
    {
        return $this->hasMany(Greeting::class);
    }

    /**
     * Get the statistics for the guild.
     */
    public function statistic()
    {
        return $this->hasOne(Statistic::class);
    }

    public function hasPermissions(int $permissions)
    {
        return $permissions & $this->permissions;
    }

    public function getIconUrlAttribute()
    {
        if ($this->icon !== null) {
            if (strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') !== false) {
                return sprintf('https://cdn.discordapp.com/icons/%d/%s.webp', $this->id, $this->icon);
            }

            return sprintf('https://cdn.discordapp.com/icons/%d/%s.jpg', $this->id, $this->icon);
        }

        return 'https://ui-avatars.com/api/?name='.urlencode($this->name).'&color=7F9CF5&background=EBF4FF';
    }

    public function hasPremiumFeature($name = null)
    {
        return optional($this->premiumGuild)->exists() || $this->premiumGuildFeatures->where('name', $name)->isNotEmpty();
    }
}
