<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menu = Menu::where('branch', Auth::user()->branch)->get();
        return response()->json($menu, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuRequest $request)
    {
        $menu = $request->validated();

        Menu::create($menu);

        return response()->json(['message' => 'Menu Item created'], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        return response()->json($menu, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $request->validate([
            'branch' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'subCategory' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'price' => 'required'
        ]);

        $menu->update([
            'branch' => $request->branch,
            'category' => $request->category,
            'subCategory' => $request->subCategory,
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return response()->json(['message' => 'Menu Item updated successfully'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();
        return response()->json(['message' => 'Menu Item successfully deleted'], Response::HTTP_OK);
    }

    public function getMenuByBranch($branch, $category){
        $menus = Menu::where('branch', $branch)->where('category', $category)->select('name', 'price')->get();

        if($menus->isEmpty()){
            return response()->json(['message' => "No menu Item found for $branch and $category"], 404);
        }

        return response()->json($menus);
    }
}
