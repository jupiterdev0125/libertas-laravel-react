<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTwitchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('twitch', function (Blueprint $table) {
            $table->id();
            $table->string('username', 25);
            $table->unsignedBigInteger('channel_id');
            $table->foreignId('guild_id');
            $table->foreignId('embed_id');
            $table->timestamps();
            $table->foreign('guild_id')->references('id')->on('guilds');
            $table->foreign('embed_id')->references('id')->on('embeds');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('twitch');
    }
}
