<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimedMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timed_messages', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->unsignedBigInteger('channel_id');
            $table->unsignedBigInteger('interval');
            $table->timestamp('next_occurrence');
            $table->foreignId('guild_id');
            $table->timestamps();
            $table->foreign('guild_id')->references('id')->on('guilds')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timed_messages');
    }
}
