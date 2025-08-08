<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMenuRequest;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $menus = Menu::where('branch', $branch)->where('category', $category)->orderBy('subCategory')->get()->groupBy('subCategory');
        return response()->json($menus);
    }

    // public function getMenuByBranch(Request $request)
    // {
    //     $branch = $request->query('branch');        // e.g., Swali
    //     $category = $request->query('category');    // e.g., Food or Drink
    //     $subcategory = $request->query('subcategory'); // optional

    //     // Define subcategory orders
    //     $foodSubcategories = [
    //         'Protein',
    //         'Swallow',
    //         'Soup',
    //         'Soup, Swallow and Protein',
    //         'Rice and noodle',
    //         'Breakfast',
    //         'National dishes',
    //         'Special dishes',
    //     ];

    //     $drinkSubcategories = [
    //         'Soft Drinks',
    //         'Beers',
    //         'Wines',
    //         'Juices',
    //         'Cocktails',
    //         'Spirits',
    //     ];

    //     // Choose subcategory order based on category
    //     if (strtolower($category) === 'drink') {
    //         $subcategoryOrder = $drinkSubcategories;
    //     } else {
    //         $subcategoryOrder = $foodSubcategories; // Default to food
    //     }

    //     $query = DB::table('menus');

    //     // Filter by branch if provided
    //     if ($branch) {
    //         $query->where('branch', $branch);
    //     }

    //     // Filter by category if provided
    //     if ($category) {
    //         $query->where('category', $category);
    //     }

    //     // Filter by subcategory if provided
    //     if ($subcategory) {
    //         $query->where('subcategory', $subcategory);
    //     } else {
    //         $query->whereIn('subcategory', $subcategoryOrder);
    //     }

    //     // Fetch and order results
    //     $menus = $query
    //         ->orderByRaw("FIELD(subcategory, '" . implode("','", $subcategoryOrder) . "')")
    //         ->orderBy('name', 'asc')
    //         ->get()
    //         ->groupBy('subcategory');

    //     return response()->json($menus);
    // }
}
