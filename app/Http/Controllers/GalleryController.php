<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries = Gallery::all();

        return response()->json($galleries, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'url' => 'nullable|string',
            'alt' => 'nullable|string',
            'image' => 'nullable|image|mimes:png,jpg,jpeg'
        ]);

        if($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('galleries', 'public');
        }

        // $path = $request->file('image')->store('galleries', 'public');
        // $data['image'] = $path;

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
}
