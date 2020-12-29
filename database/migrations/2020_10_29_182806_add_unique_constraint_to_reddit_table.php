<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUniqueConstraintToRedditTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('reddit', function (Blueprint $table) {
            $table->unique(['subreddit', 'guild_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('reddit', function (Blueprint $table) {
            $table->dropUnique('reddit_subreddit_guild_id_unique');
        });
    }
}
