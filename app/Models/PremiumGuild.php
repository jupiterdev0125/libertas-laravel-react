<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PremiumGuild extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['guild_id', 'invoice_id'];
}
