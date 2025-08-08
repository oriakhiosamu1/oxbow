<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\BookingConfirmationMail;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class PayStackController extends Controller
{
    public function verifyPayment(Request $request){
        $reference = $request->reference;
        $myObject = $request->myObject;
        $branch = $myObject['branch'];

        $paystackSecret = $branch === 'swali' ? env('SWALI_PAYSTACK_SECRET_KEY') : env('GBARANTORU_PAYSTACK_SECRET_KEY');

        // VERIFY PAYMENT FROM PAYSTACK ============================================================================================================================
        $response = Http::withToken($paystackSecret)->get("https://api.paystack.co/transaction/verify/{$reference}");

        $paystackData = $response->json();

        if(!$response->successful() || $paystackData['data']['status'] !== 'success'){
            return response()->json(['status' => 'error', 'message' => 'Payment Verification Failed'], 400);
        }

        // CHECK ROOM AVAILABILITY ============================================================================================================================
        $room = Room::find($myObject['room']['id']);
        if(!$room || $room->available < 1){
            return response()->json(['status' => 'error', 'message' => 'Room not available'], 400);
        }

        // CREATE BOOKING ============================================================================================================================
        DB::beginTransaction();
        try{
            $booking = Booking::create([
                'room_id' => $room->id,
                'name' => $myObject['name'],
                'email' => $myObject['email'],
                'check_in' => $myObject['check_in'],
                'check_out' => $myObject['check_out'],
                'branch' => $myObject['branch'],
                'type' => $myObject['type'],
                'status' => 'Confirmed',
                'request' => 'Made upon Arrival',
                'amount_paid' => $myObject['amountToPay'],
                'number_of_days' => $myObject['number_of_days']
            ]);

            $room->available -= 1;
            $room->save();

            DB::commit();

            Mail::to($booking->email)->send(new BookingConfirmationMail($booking));
            
            return response()->json(['status' => 'success', 'booking' => $booking]);
        }catch(\Exception $e){
            DB::rollBack();

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
