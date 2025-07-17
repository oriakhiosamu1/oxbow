<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'room_id',
        'name',
        'type',
        'branch',
        'check_in',
        'check_out',
        'status',
        'request',
        'email',
        'amount_paid',
        'number_of_days',
    ];

    // RELATIONSHIP WITH ROOM
    public function room(){
        return $this->belongsTo(Room::class);
    }
}
