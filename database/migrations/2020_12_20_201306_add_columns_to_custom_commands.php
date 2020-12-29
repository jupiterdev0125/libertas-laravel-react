<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToCustomCommands extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_commands', function (Blueprint $table) {
            $table->json('message_type')->nullable();
            $table->json('response_channel')->nullable();
            $table->json('display_help')->nullable();
            $table->json('cooldown')->nullable();
            $table->json('delete_usage')->nullable();
            $table->json('delete_response_period_count')->nullable();
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
            $table->dropColumn('message_type');
            $table->dropColumn('response_channel');
            $table->dropColumn('display_help');
            $table->dropColumn('cooldown');
            $table->dropColumn('delete_usage');
            $table->dropColumn('delete_response_period_count');
        });
    }
}
