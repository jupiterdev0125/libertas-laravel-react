<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCustomCommandsFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_commands', function (Blueprint $table) {
            $table->string('response_channel')->change();
            $table->string('display_help')->change();
            $table->integer('cooldown')->change();
            $table->boolean('delete_usage')->change();
            $table->integer('delete_response_period_count')->change();
            $table->string('delete_response_period')->nullable();
            $table->integer('cooldown_period_count')->nullable();
            $table->string('cooldown_period')->nullable();
            $table->json('banned_channel')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('custom_commands', function (Blueprint $table) {
            $table->json('response_channel')->change();
            $table->json('display_help')->change();
            $table->json('cooldown')->change();
            $table->json('delete_usage')->change();
            $table->json('delete_response_period_count')->change();
            $table->droColumn(['cooldown_period_count', 'cooldown_period', 'banned_channel']);
        });
    }
}
