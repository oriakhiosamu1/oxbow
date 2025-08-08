<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'branch',
        'type',
        'price',
        'available',
        'description',
        'imageUrl',
        'imageUrl1',
        'imageUrl2',
        'imageUrl3',
        'imageUrl4',
        'features',
    ];
}
