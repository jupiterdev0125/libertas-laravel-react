<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePremiumGuildFeaturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('premium_guild_features', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('guild_id');
            $table->string('name');
            $table->timestamps();
            $table->foreign('guild_id')->references('id')->on('guilds')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('name')->references('name')->on('premium_features')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('premium_guild_features');
    }
}
