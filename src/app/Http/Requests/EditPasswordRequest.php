<?php

namespace App\Http\Requests;

use App\Rules\AlphaNumHalf;
use App\Rules\PassCheck;
use Illuminate\Foundation\Http\FormRequest;

class EditPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'pass_old' => ['required', 'string', new AlphaNumHalf, 'max:255', 'min:8', new PassCheck],
            'pass_new' => ['required', 'string', new AlphaNumHalf, 'max:255', 'min:8', 'different:pass_old', 'confirmed'],
            'pass_new_confirmation' => ['required']

        ];
    }
}
