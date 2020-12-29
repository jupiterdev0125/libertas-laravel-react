<?php

namespace App\Http\Controllers;

use App\Models\Plugin;
use App\Models\PluginConfig;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class PluginController extends Controller
{
    // Clean this up so we can move onto the next thing
    public function show($id)
    {
        // Sort plugins by activiated
        $guilds = User::guilds(true, true);
        $guild = User::guild($id);
        $plugins = Plugin::all();
        $numberedConfigs = $guild->pluginConfigs()->get();
        $stats = $guild->statistic()->first();

        $detailedGuild = Http::withHeaders([
            'Authorization' => 'Bot '.config('services.discord.bot_key'),
        ])->get(sprintf('https://discordapp.com/api/guilds/%d?with_counts=true', $guild->id))->json();

        // Doesn't create config when new plugin is added
        if (count($numberedConfigs) !== count($plugins)) {
            $numberedConfigs = PluginConfig::initializeGuildConfig($id)->toArray();
        }

        $config = [];
        foreach ($numberedConfigs as $numberedConfig) {
            $config[$numberedConfig['name']] = $numberedConfig;
        }

        $plugins = $plugins->toArray();

        /*
         * We want to sort plugins by being enabled or not
         * Though, we only want to sort them if both are released and are not premium
         */
        usort($plugins, static function (array $a, array $b) use ($config) {
            if (($config[$b['name']]['enabled'] && ! $config[$a['name']]['enabled']) && ($b['accessible'])) {
                return 1;
            }

            return 0;
        });

        $theme = 'green-orange-edge';

        return view('plugins', compact('theme', 'guilds', 'guild', 'plugins', 'config', 'stats', 'detailedGuild'));
    }

    public function toggle($id, $plugin)
    {
        if (! request()->ajax()) {
            return redirect('/');
        }

        $config = PluginConfig::firstWhere([['guild_id', $id], ['name', $plugin]]);
        $config->enabled = ! (bool) $config->enabled;
        $config->save();
    }
}
