<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PremiumFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('premium_features')->insert([
            ['name' => 'advanced-embeds'],
            ['name' => 'unlimited-custom-commands'],
            ['name' => 'flip-book'],
            ['name' => 'unlimited-polls'],
            ['name' => 'activity-reports'],
            ['name' => 'event-planning'],
        ]);
    }
}
