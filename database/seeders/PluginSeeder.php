<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PluginSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plugins')->insert([
            [
                'name' => 'welcome-goodbye',
                'full_name' => 'Welcome/Goodbye',
                'subtitle' => null,
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'custom-commands',
                'full_name' => 'Custom Commands',
                'subtitle' => null,
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'timed-messages',
                'full_name' => 'Timed Messages',
                'subtitle' => null,
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'moderation',
                'full_name' => 'Moderation',
                'subtitle' => null,
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'reaction-roles',
                'full_name' => 'Reaction Roles',
                'subtitle' => 'IMPROVEMENTS COMING SOON',
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'youtube',
                'full_name' => 'YouTube',
                'subtitle' => 'IMPROVEMENTS COMING SOON',
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'twitter',
                'full_name' => 'Twitter',
                'subtitle' => 'IMPROVEMENTS COMING SOON',
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'twitch',
                'full_name' => 'Twitch',
                'subtitle' => 'IMPROVEMENTS COMING SOON',
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'reddit',
                'full_name' => 'Reddit',
                'subtitle' => 'IMPROVEMENTS COMING SOON',
                'premium' => false,
                'accessible' => true,
            ],
            [
                'name' => 'tiktok',
                'full_name' => 'TikTok',
                'subtitle' => 'COMING SOON',
                'premium' => false,
                'accessible' => false,
            ],
        ]);
    }
}
