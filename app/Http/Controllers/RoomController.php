<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RoomController extends Controller
{
    public function store(StoreRoomRequest $request){
        $data = $request->validated();

        Room::create($data);

        return response()->json(['message' => 'Room added successfully'], Response::HTTP_OK);
    }

    public function index(){
        $rooms = Room::all();
        return response()->json($rooms, Response::HTTP_OK);
    }

    public function show(Room $room){
        return response()->json($room);
    }

    public function delete(Room $room){
        $room->delete();
        return response()->json(['message' => 'Room deleted successfully']);
    }

    public function update(Room $room, UpdateRoomRequest $request){
        $data = $request->validated();
        $room->update($data);
        return response()->json(['message' => 'Update successful!'], Response::HTTP_OK);
    }
}
