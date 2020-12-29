<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CustomCommandsDeleteResponseUsageTimeSelectionAdded extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_commands', function (Blueprint $table) {
            $table->string('delete_usage_period')->nullable();
            $table->integer('delete_usage_period_count')->nullable();
            $table->boolean('delete_command_usage')->nullable();
            $table->dropColumn('delete_usage');
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
            $table->dropColumn(['delete_usage_period_count', 'delete_usage_period', 'delete_command_usage']);
            $table->boolean('delete_usage')->nullable();
        });
    }
}
