<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\User\PayStackController;
use App\Http\Controllers\User\SendContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/signup', [AdminAuthController::class, 'signup']);
Route::post('/signin', [AdminAuthController::class, 'signin']);

Route::middleware('auth:sanctum')->group(function(){
    // ADMIN ROUTES FOR ROOMS MANAGEMENT====================================================================================
    Route::post('/admin/rooms', [RoomController::class, 'store']); #CREATES NEW ROOM
    Route::get('/admin/get-all-rooms', [RoomController::class, 'index']); #FETCHES ALL ROOMS
    Route::get('/admin/rooms/{room}', [RoomController::class, 'show']); #SHOWS A PARTICULAR ROOM
    Route::delete('/admin/rooms/{room}', [RoomController::class, 'delete']); #DELETES A PARTICULAR ROOM
    Route::put('/admin/rooms/{room}', [RoomController::class, 'update']); #UPDATES A PARTICULAR ROOM
    // ADMIN ROUTES FOR ROOM MANAGEMENT ====================================================================================


    // ADMIN ROUTES FOR BOOKING MANAGEMENT ==================================================================================
    Route::post('/admin/create-booking', [BookingController::class, 'store']); #CREATES NEW BOOKINGS 
    Route::get('/admin/get-bookings', [BookingController::class, 'index']); #FETCHES ALL BOOKINGS IN DATABASE
    Route::get('/admin/show-booking/{booking}', [BookingController::class, 'show']); #FETCHES A PARTICULAR BOOKING BY ID
    Route::put('/admin/booking/update/{booking}', [BookingController::class, 'update']); #UPDATES A PARTCULAR BOOKING
    Route::delete('/admin/delete-booking/{booking}', [BookingController::class, 'destroy']); #DESTROYS A PARTICULAR BOOKING
    // ADMIN ROUTES FOR BOOKING MANAGEMENT ==================================================================================


    // ADMIN ROUTES FOR FOOD AND DINNING MENU ==============================================================================
    Route::post('/admin/menu/store', [MenuController::class, 'store']); #CREATES NEW MENU ITEM
    Route::get('/admin/menu/index', [MenuController::class, 'index']); #FETCHES ALL MENU
    Route::get('/admin/menu/show/{menu}', [MenuController::class, 'show']); #FETCHES A PARTICULAR MENU ITEM
    Route::put('/admin/menu/update/{menu}', [MenuController::class, 'update']); #UPDATES A PARTICULAR MENU ITEM
    Route::delete('/admin/menu/delete/{menu}', [MenuController::class, 'destroy']); #DELETES A PARTICULAR MENU ITEM
    // ADMIN ROUTES FOR FOOD AND DINNING MENU ==============================================================================


    // ADMIN ROUTE FOR BLOG MANAGEMENT =====================================================================================
    Route::post('/admin/blogs/store', [BlogController::class, 'store']); #STORES NEW BLOG POST
    Route::get('/admin/blogs', [BlogController::class, 'index']); #FETCHES ALL BLOG POSTS
    Route::get('/admin/show/{blog}', [BlogController::class, 'show']); #SHOWS A PARTICULAR BLOG POST
    Route::put('/admin/blog/update/{blog}', [BlogController::class, 'update']); #EDITS A PARTICULAR POST
    Route::delete('/admin/blog/{blog}', [BlogController::class, 'destroy']); #DELETES A PARTICULAR POST
    // ADMIN ROUTE FOR BLOG MANAGEMENT =====================================================================================


    // ADMIN ROUTES FOR GALLERY MANAGEMENT ================================================================================
    Route::post('/admin/gallery/store', [GalleryController::class, 'store']); #CREATES NEW IMAGE GALLERY
    Route::get('/admin/gallery/index', [GalleryController::class, 'index']); #FETCHES ALL GALLERY IMAGES
    Route::delete('/admin/gallery/delete/{gallery}', [GalleryController::class, 'destroy']); #DELETES A GALLERY IMAGE
    // ADMIN ROUTES FOR GALLERY MANAGEMENT ENDS HERE =======================================================================


    // ADMIN ROUTES FOR REVIEWS ==========================================================================================
    Route::get('/admin/reviews/index', [ReviewController::class, 'index']); #FETCHES ALL REVIEWS
    Route::get('/admin/reviews/show/{review}', [ReviewController::class, 'show']); #DISPLAYS A PARTICULAR REVIEW
    Route::post('/admin/reviews/store', [ReviewController::class, 'store']); #CREATES REVIEW
    Route::put('/admin/reviews/update/{review}', [ReviewController::class, 'update']); #UPDATES A PARTICULAR REVIEW
    Route::delete('/admin/reviews/destroy/{review}', [ReviewController::class, 'destroy']); #DELETES A PARTICULAR REVIEW
    // ADMIN ROUTES FOR REVIEWS ENDS HERE =================================================================================


    Route::post('/logout', [AdminAuthController::class, 'logout']);
});



// ROUTES FOR USER STARTS HERE ============================================================================================
Route::post('/contact', [SendContactMessage::class, 'sendMailToAdmin']); #HANDLES SENDING OF CONTACT FORM TO ADMIN
Route::get('/user/reviews/index', [ReviewController::class, 'index']); #FETCHES ALL REVIEWS TO THE USER PAGE
Route::get('/user/blogs/index', [BlogController::class, 'index']); #FETCHES ALL BLOG POSTS TO THE USER PAGE
Route::get('/rooms/branch/{branch}', [RoomController::class, 'getRoomsByBranch']); #FETCHES ROOMS BY BRANCH
Route::get('/menu/branch/{branch}/category/{category}', [MenuController::class, 'getMenuByBranch']); #FETCHES MENU ITEM BY BRANCH AND CATEGORY
Route::post('/check/room/availability', [BookingController::class, 'checkAvailability']); #CHECKS IF ROOM IS AVAILABLE AND RETURNS ROOM DATA
Route::post('/verify/payment', [PayStackController::class, 'verifyPayment']); #VERIFIES PAYSTACK PAYMENT AND CREATES NEW BOOKING
Route::get('/user/gallery/{branch}', [GalleryController::class, 'fetchImagesByBranch']); #FETCHES ALL GALLERY IMAGES TO THE USER PAGE
