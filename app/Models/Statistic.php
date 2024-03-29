<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    public function guild()
    {
        return $this->belongsTo(Guild::class);
    }
}
