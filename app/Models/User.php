<?php

namespace App\Models;

use App\Models\Guild;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id'];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Get the invoices for the user.
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public static function guild($id)
    {
        return self::guilds()->firstWhere('id', $id);
    }

    public static function guilds($admin = true, $joined = false)
    {
        $fetchedGuilds = cache()->remember(Auth::user()->id.'guilds', 500, function () {
            return Http::withToken(Auth::user()->access_token)
                ->get('https://discordapp.com/api/users/@me/guilds')
                ->json();
        });

        $joinedGuilds = Guild::whereIn('id', array_column($fetchedGuilds, 'id'))->get();

        // I don't seem to get this error???
        // Outputs error if someone leaves or guild get deleted and servers are cached
        $guilds = collect([]);
        foreach ($fetchedGuilds as $guild) {
            $guildModel = new Guild($guild);
            $guildModel->joined = $joinedGuilds->contains($guildModel->id);
            $guilds[] = $guildModel;
        }

        if ($admin === true) {
            $guilds = $guilds->filter(function ($guild) {
                return $guild->hasPermissions(0x8);
            });
        }

        if ($joined === true) {
            $guilds = $guilds->filter(function ($guild) {
                return $guild->joined;
            });
        }

        return $guilds->sort(function ($a, $b) {
            return $a->joined ? -1 : 1;
        });
    }

    /**
     * @return bool
     */
    public function refreshAccessToken()
    {
        $response = Http::asForm()->post('https://discord.com/api/oauth2/token', [
            'client_id' => config('services.discord.client_id'),
            'client_secret' => config('services.discord.client_secret'),
            'grant_type' => 'refresh_token',
            'refresh_token' => $this->refresh_token,
            'redirect_uri' => url(config('services.discord.redirect')),
            'scope' => 'identify guilds email',
        ]);

        if ($response->failed()) {
            $this->access_token = null;
            $this->refresh_token = null;
            $this->refresh_token_at = null;
            $this->save();

            return false;
        }

        $this->access_token = $response->json()['access_token'];
        $this->refresh_token = $response->json()['refresh_token'];
        $this->refresh_token_at = now()->addDays(3);
        $this->save();

        return true;
    }
}
