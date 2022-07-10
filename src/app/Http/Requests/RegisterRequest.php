<?php

namespace App\Http\Requests;

use App\Rules\AlphaNumHalf;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'max:255', 'min:8', 'confirmed', new AlphaNumHalf],
            'password_confirmation' => ['required']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        // $res = response()->json([
        //     'status' => Response::HTTP_BAD_REQUEST,
        //     'errors' => $validator->errors(),
        // ], Response::HTTP_BAD_REQUEST);
        // throw new HttpResponseException($res);

        $response['errors'] = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
    }
}
