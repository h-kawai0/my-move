<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class ItemRequest extends FormRequest
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

    public function attributes()
    {
        $attributes = [];

        foreach ($this->child_item as $key => $val) {
            $childNum = $key + 1;
            $attributes = array_merge(
                $attributes,
                [
                    "child_item.$key.name" => "MyMove$childNum のタイトル",
                    "child_item.$key.cleartime" => "MyMove$childNum の目安達成時間",
                    "child_item.$key.detail" => "MyMove$childNum の説明"

                ]
            );
        }
        return $attributes;
    }

    protected function prepareForValidation()
    {

        $child_item = [];

        foreach ($this->child_item as $key => $val) {

            $child_item[] = json_decode($this->child_item[$key], true);
        }

        // 加工したchild_itemを更新
        $this->merge(['child_item' => $child_item]);

        Log::debug($this);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'parent_name' => ['required', 'string', 'max:40'],
            'category_id' => ['required', 'not_in:0'],
            'parent_cleartime' => ['required', 'numeric', 'not_in:0', 'regex:/\A\d{1,3}(\.\d{1,1})?\z/'],
            'parent_detail' => ['required', 'string', 'max:500'],
            'pic' => ['nullable','file', 'image', 'mimes:jpeg,png,jpg,gif', 'max:3072', 'dimensions:min_width=1900,min_height=800,max_width=4000,max_height=4000'],
            'child_item.*.name' => ['required_with:child_item.*.cleartime', 'required_with:child_item.*.detail', 'nullable', 'string', 'max:40'],
            'child_item.*.cleartime' => ['required_with:child_item.*.name', 'required_with:child_item.*.detail', 'nullable', 'numeric', 'not_in:0', 'regex:/\A\d{1,3}(\.\d{1,1})?\z/'],
            'child_item.*.detail' => ['required_with:child_item.*.name', 'required_with:child_item.*.cleartime', 'nullable', 'string', 'max:500'],
            'child_item.0.name' => ['required', 'string', 'max:40'],
            'child_item.0.cleartime' => ['required', 'numeric', 'not_in:0', 'regex:/\A\d{1,3}(\.\d{1,1})?\z/'],
            'child_item.0.detail' => ['required', 'string', 'max:500']
        ];
    }
    
}
