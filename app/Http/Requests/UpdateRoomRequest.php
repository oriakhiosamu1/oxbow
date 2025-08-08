<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'branch' => 'required|string|max:255',
            'type' => 'required|string',
            'price' => 'required',
            'available' => 'required',
            'description' => 'required',
            'imageUrl' => 'required|url',
            'imageUrl1' => 'required|url',
            'imageUrl2' => 'required|url',
            'imageUrl3' => 'required|url',
            'imageUrl4' => 'required|url',
            'features' => 'nullable|string',
        ];
    }
}
