<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('greetings', function (Blueprint $table) {
            $table->id();
            $table->string('type', 7);
            $table->unsignedBigInteger('channel_id')->nullable();
            $table->json('roles')->nullable();
            $table->foreignId('guild_id');
            $table->foreignId('embed_id');
            $table->timestamps();
            $table->foreign('guild_id')->references('id')->on('guilds')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('embed_id')->references('id')->on('embeds')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('greetings');
    }
}
