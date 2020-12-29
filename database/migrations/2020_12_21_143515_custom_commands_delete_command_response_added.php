<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CustomCommandsDeleteCommandResponseAdded extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_commands', function (Blueprint $table) {
            $table->boolean('delete_command_response')->nullable();
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
            $table->dropColumn('delete_command_response');
        });
    }
}
