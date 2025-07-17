<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendContactMessage extends Controller
{
    public function sendMailToAdmin(Request $request){
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::to('info@oxbowlakehotel.com.ng')->send(new ContactFormMail($data));

        return response()->json(['message' => 'Message sent successfully']);
    }
}
