<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmbed extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'plain_text' => 'max:2000',
            'description' => 'max:2048',
            'color' => ['regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'footer_text' => 'max:2048',
            'footer_icon' => 'image|max:5120',
            'image' => 'image|max:5120',
            'thumbnail' => 'image|max:5120',
            'author_name' => 'max:256',
            'author_icon' => 'image|max:5120',
            'field_names' => 'array|max:25',
            'field_names.*' => '',
            'field_values' => 'array|max:25',
            'field_values.*' => '',
            'field_inlines' => 'array|:max25',
            'field_inlines.*' => '',
        ];
    }
}
