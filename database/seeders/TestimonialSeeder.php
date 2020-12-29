<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('testimonials')->insert([
            ['description' => 'The Libertas Bot is a revolutionary bot that came up like a Tornado and turned the bot world upside down!'],
            ['description' => 'Our server has been using MEE6 for quite a while, and we are just tired of them building pay-walls for every feature! Freedom has finally arrived!'],
            ['description' => 'Discord brings our community together and Libertas has brought our community-identity alive! Thank you, Libertas!'],
            ['description' => 'I have never seen a bot as customizable as Libertas! It truly is a freeing experience that has brought my server to the next level!'],
            ['description' => 'We were on the fence about leaving FaceBook due to their high-level of censorship... until we found Libertas! The decision was easy and we have no regrets!'],
        ]);
    }
}
