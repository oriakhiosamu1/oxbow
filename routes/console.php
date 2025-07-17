<?php

use App\Mail\BookingCheckedOut;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::daily()->call(function(){
    $today = Carbon::today();

    $bookings = Booking::where('status', '!=', 'Checked-Out')->whereDate('check_out', '<=', $today)->get();

    foreach($bookings as $booking){
        $booking->status = 'Checked-Out';
        $booking->save();

        Room::where('id', $booking->room_id)->increment('available');

        logger("Booking ID {$booking->id} checked out.");

        Mail::to($booking->email)->send(new BookingCheckedOut($booking));
    }
})->name('auto-checkout');