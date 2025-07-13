<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::latest()->get();

        return response()->json($blogs, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'date' => 'required|date',
            'imageUrl' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $path = $request->file('image')->store('blogs', 'public');
        // $validated['imageUrl'] = asset('storage/'. $path);

        $blog = Blog::create([
            'title' => $request->title,
            'excerpt' =>  $request->excerpt,
            'content' =>  $request->content,
            'date' =>  $request->date,
            'imageUrl' =>  asset('storage/'. $path),
            'image' =>  $path
        ]);
        return response()->json(['message' => 'Blog created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return response()->json($blog, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        if(!$blog){
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'date' => 'required|date',
            'imageUrl' => 'nullable|url',
            'image' => 'nullable|image|max:2048'
        ]);

        if($request->hasFile('image')){
            if($blog->image){
                Storage::disk('public')->delete($blog->image);
            }
        }

        $path = $request->file('image')->store('blogs', 'public');
        // $validated['imageUrl'] = asset('storage/'. $path);

        $blog->update([
            'title' => $request->title,
            'excerpt' =>  $request->excerpt,
            'content' =>  $request->content,
            'date' =>  $request->date,
            'imageUrl' =>  asset('storage/'. $path),
            'image' =>  $path
        ]);
        return response()->json(['message' => 'Blog updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if(!$blog){
            return response()->json(['message'=>'Blog not found'], 404);
        }

        if($blog->image){
            Storage::disk('public')->delete($blog->image);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully'], 200);
    }
}
