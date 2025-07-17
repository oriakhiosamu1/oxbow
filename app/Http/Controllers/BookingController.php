<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admin = Auth::user();

        $booking = Booking::with('room')->where('branch', $admin->branch)->latest()->get();

        return response()->json($booking, 201);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreBookingRequest $request){
        $validated = $request->validated();

        // FETCH ROOM USING TYPE AND BRANCH
        $room = Room::where('type', $validated['type'])->where('branch', $validated['branch'])->first();

        if(!$room){
            return response()->json(['message' => 'Room type not found at the selected branch'], 404);
        }

        if($room->available <= 0){
            return response()->json(['message' => 'No available rooms for this type at the selected branch'], 422);
        }

        // CALCULATE THE NUMBER OF DAYS
        $checkIn = Carbon::parse($validated['check_in']);
        $checkOut = Carbon::parse($validated['check_out']);

        $numberOfDays = $checkIn->diffInDays($checkOut);

        // CALCULATE THE TOTAL AMOUNT
        $amountPaid = $numberOfDays * $room->price;

        DB::beginTransaction();

        try{
            Booking::create([
                'room_id' => $room->id,
                'name' => $validated['name'],
                'type' => $validated['type'],
                'branch' => $validated['branch'],
                'check_in' => $validated['check_in'],
                'check_out' => $validated['check_out'],
                'request' => $validated['request'],
                'email' => $validated['email'],
                'amount_paid' => $amountPaid,
                'number_of_days' => $numberOfDays,
            ]);

            $room->decrement('available');

            DB::commit();

            return response()->json(['message' => 'Booking Successful'], 201);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['message' => "Failed to book room.", 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return response()->json($booking, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(StoreBookingRequest $request, Booking $booking){
        $validated = $request->validated();

        DB::beginTransaction();

        try{
            // FETCH ROOM USING TYPE AND BRANCH
            $room = Room::where('type', $validated['type'])->where('branch', $validated['branch'])->first();

            if(!$room){
                return response()->json(['message' => 'Room type not found at the selected branch'], 404);
            }

            // CALCULATE THE NUMBER OF DAYS
            $checkIn = Carbon::parse($validated['check_in']);
            $checkOut = Carbon::parse($validated['check_out']);

            $numberOfDays = $checkIn->diffInDays($checkOut);

            // CALCULATE THE TOTAL AMOUNT
            $amountPaid = $numberOfDays * $room->price;

            $booking->update([
                'room_id' => $room->id,
                'name' => $validated['name'],
                'type' => $validated['type'],
                'branch' => $validated['branch'],
                'check_in' => $validated['check_in'],
                'check_out' => $validated['check_out'],
                'request' => $validated['request'],
                'email' => $validated['email'],
                'amount_paid' => $amountPaid,
                'number_of_days' => $numberOfDays,
            ]);

            DB::commit();

            return response()->json(['message' => 'Booking Updated Successful']);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['message' => "Failed to update booking.", 'error' => $e->getMessage()], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Booking $booking)
    {
        DB::beginTransaction();

        try{
            $room = Room::where('id', $booking->room_id)->first();
            if($room){
                $room->increment('available');
            }

            $booking->delete();
            DB::commit();

            return response()->json(['message' => 'Booking deleted successfully']);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['message' => 'An error occured while trying to delete booking', 'error' => $e->getMessage()], 500);
        }
    }

    
    public function checkAvailability(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'branch' => 'required|string',
            'type' => 'required|string',
        ]);

        $checkIn =Carbon::parse($validated['check_in']);
        $checkOut =Carbon::parse($validated['check_out']);
        $numberOfDays = $checkIn->diffInDays($checkOut);

        $room = Room::where('branch', $validated['branch'])->where('type', $validated['type'])->where('available', '>', 0)->first();

        if(!$room){
            return response()->json(['message' => 'No Available room found'], 404);
        }

        $amountToPay = $room->price * $numberOfDays;

        return response()->json([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'check_in' => $validated['check_in'],
            'check_out' => $validated['check_out'],
            'branch' => $validated['branch'],
            'type' => $validated['type'],
            'room' => $room,
            'number_of_days' => $numberOfDays,
            'amountToPay' => $amountToPay
        ]);
    }
}
