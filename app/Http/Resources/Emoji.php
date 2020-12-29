<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Emoji extends JsonResource
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
            'animated' => $this->animated,
            'id' => (string) $this->id,
            'image' => $this->image,
            'managed' => $this->managed,
            'name'=> $this->name,
            'require_colons' => $this->require_colons,
            'roles' => $this->roles,
            'user' => $this->user,
            'image_url' => sprintf('https://cdn.discordapp.com/emojis/%d.png', $this->id),
        ];
    }
}
