<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReactionRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reaction_roles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('message_id');
            $table->text('reaction_roles');
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
        Schema::dropIfExists('reaction_roles');
    }
}
