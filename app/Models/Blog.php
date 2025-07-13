<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'date',
        'excerpt',
        'content',
        'imageUrl',
        'image'
    ];
}
