<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePluginsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plugins', function (Blueprint $table) {
            $table->dropColumn('unreleased');
            $table->string('subtitle')->nullable()->after('full_name');
            $table->boolean('premium')->default(false)->change();
            $table->boolean('accessible')->default(true)->after('premium');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plugins', function (Blueprint $table) {
            $table->dropColumn(['subtitle', 'accessible']);
            $table->boolean('premium')->change();
            $table->boolean('unreleased');
        });
    }
}
