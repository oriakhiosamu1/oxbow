<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::latest()->get();

        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'guestName' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
            'date' => 'required|date'
        ]);

        Review::create($data);

        return response()->json(['message' => 'Review submitted successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        return response()->json($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        $data = $request->validate([
            'guestName' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
            'date' => 'required|date'
        ]);

        $review->update($data);

        return response()->json(['message' => 'Review updated successfully'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
