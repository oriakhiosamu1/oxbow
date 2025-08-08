<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries = Gallery::where('branch', Auth::user()->branch)->get();

        return response()->json($galleries, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'url' => 'required|url',
            'alt' => 'required|string',
            'image' => 'nullable|image|mimes:png,jpg,jpeg',
            'branch' => 'required|string'
        ]);

        Gallery::create($data);

        return response()->json(['message' => 'Image uploaded successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        if(!$gallery){
            return response()->json(['message' => 'Gallery Item not found'], 404);
        }

        if($gallery->image){
            Storage::disk('public')->delete($gallery->image);
        }

        $gallery->delete();

        return response()->json(['message' => 'Gallery Item deleted successfully'], 200);
    }

    public function fetchImagesByBranch($branch)
    {
        $galleries = Gallery::where('branch', $branch)->get();

        return response()->json($galleries);
    }
}
