<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('command_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('custom_command_id');
            $table->foreignId('embed_id');
            $table->timestamps();
            $table->foreign('custom_command_id')->references('id')->on('custom_commands')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('command_responses');
    }
}
