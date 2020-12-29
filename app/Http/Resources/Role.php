<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Role extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'color' => $this->color,
            'hoist' => $this->hoist,
            'id' => (string) $this->id,
            'managed' => $this->managed,
            'mentionable' => $this->mentionable,
            'name' => $this->name,
            'permissions' => $this->permissions,
            'position' => $this->position,
            'hex_color' => '#'.dechex($this->color),
        ];
    }
}
