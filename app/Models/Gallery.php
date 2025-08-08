<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'url',
        'alt',
        'image',
        'branch'
    ];
}
