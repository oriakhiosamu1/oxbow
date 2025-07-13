<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $booking = Booking::with('room')->latest()->get();

        return response()->json($booking, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        $data = $request->validated();

        // LOGIC TO ENSURE CHECK-IN AND CHECK-OUT IS EXACTLY 24HRS
        $checkIn =Carbon::createFromFormat('Y-m-d\TH:i', $data['check_in']);
        $checkOut = Carbon::createFromFormat('Y-m-d\TH:i', $data['check_out']);

        if(!$checkOut->equalTo($checkIn->copy()->addDay())){
            return response()->json(['message' => 'Check-out must be 24hrs after check-in'], 422);
        }

        // LOGIC TO GET ROOM ID
        $room= Room::where('branch', $data['branch'])->where('type', $data['type'])->first();

        if(!$room){
            return response()->json(['message' => 'No matching room found'], 404);
        }

        $data['room_id'] = $room->id;

        Booking::create($data);
        return response()->json(['message' => 'Bookings added!'], Response::HTTP_CREATED);
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
    public function update(StoreBookingRequest $request, Booking $booking)
    {
        $data = $request->validated();

        // LOGIC TO ENSURE CHECK-IN AND CHECK-OUT IS EXACTLY 24HRS
        $checkIn =Carbon::createFromFormat('Y-m-d\TH:i', $data['check_in']);
        $checkOut = Carbon::createFromFormat('Y-m-d\TH:i', $data['check_out']);

        if(!$checkOut->equalTo($checkIn->copy()->addDay())){
            return response()->json(['message' => 'Check-out must be 24hrs after check-in'], 422);
        }

        // LOGIC TO GET ROOM ID
        $room= Room::where('branch', $data['branch'])->where('type', $data['type'])->first();

        if(!$room){
            return response()->json(['message' => 'No matching room found'], 404);
        }

        $data['room_id'] = $room->id;

        $booking->update($data);
        return response()->json(['message' => 'Bookings updated successfully!'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }
}
