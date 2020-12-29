<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToYoutubeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('youtube', function (Blueprint $table) {
            $table->dropForeign(['guild_id']);
            $table->dropForeign(['embed_id']);
            $table->foreign('guild_id')
                ->references('id')
                ->on('guilds')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('embed_id')
                ->references('id')
                ->on('embeds')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('youtube', function (Blueprint $table) {
            $table->dropForeign(['guild_id']);
            $table->dropForeign(['embed_id']);
            $table->foreign('guild_id')
                ->references('id')
                ->on('guilds');
            $table->foreign('embed_id')
                ->references('id')
                ->on('embeds');
        });
    }
}
