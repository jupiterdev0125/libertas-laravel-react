<?php

namespace App\Providers;

use App\Hydrators\EmbedHydrator;
use App\Services\FileUploader;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use RestCord\DiscordClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(DiscordClient::class, function () {
            return new DiscordClient([
                'token' => config('services.discord.bot_key'),
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->isLocal()) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }

        Schema::defaultStringLength(191);
    }
}
