<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $plain_text
 * @property string $description
 * @property int $color
 * @property array $footer
 * @property array $image
 * @property array $thumbnail
 * @property array $author
 * @property array $fields
 * @method static find(string|int $id): self
 */
class Embed extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'plain_text',
        'description',
        'color',
        'footer',
        'image',
        'thumbnail',
        'author',
        'fields',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'footer' => 'collection',
        'image' => 'collection',
        'thumbnail' => 'collection',
        'author' => 'collection',
        'fields' => 'collection',
        'id' => 'string',
    ];

    public function setFooter($text, $icon_url)
    {
        $this->footer = ['text' => $text, 'icon_url' => $icon_url];
    }

    public function setImage($url)
    {
        $this->image = ['url' => $url];
    }

    public function setThumbnail($url)
    {
        $this->thumbnail = ['url' => $url];
    }

    public function setAuthor($name, $icon_url)
    {
        $this->author = ['name' => $name, 'icon_url' => $icon_url];
    }
}
