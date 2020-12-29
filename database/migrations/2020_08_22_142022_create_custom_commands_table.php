<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomCommandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_commands', function (Blueprint $table) {
            $table->id();
            $table->string('invocation');
            $table->string('type');
            $table->json('roles')->nullable();
            $table->json('allowed_roles')->nullable();
            $table->json('banned_roles')->nullable();
            $table->foreignId('guild_id');
            $table->timestamps();
            $table->unique(['guild_id', 'invocation']);
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
        Schema::dropIfExists('custom_commands');
    }
}
