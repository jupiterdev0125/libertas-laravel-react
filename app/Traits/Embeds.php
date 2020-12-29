<?php

namespace App\Traits;

use App\Models\Embed;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

trait Embeds
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function getEmbedsFromRequest()
    {
        return collect(request()->embeds ?? [])->map(function ($item) {
            return collect($item);
        })->map(function ($item, $i) {
            $embed = $item->get('id') ? Embed::find($item['id']) : new Embed();
            $embed->plain_text = $item->get('plain_text');
            $embed->description = $item->get('description');
            $embed->color = $item->get('color') ? hexdec(substr($item['color'], 1)) : 11722190;
            $embed->setFooter($item->get('footer_text'), $this->saveImageFromRequest($i, 'footer_image'));
            $embed->setImage($this->saveImageFromRequest($i, 'image'));
            $embed->setThumbnail($this->saveImageFromRequest($i, 'thumbnail'));
            $embed->setAuthor($item->get('title'), $this->saveImageFromRequest($i, 'author'));
            $embed->fields = $item->get('fields');

            return $embed;
        });
    }

    /**
     * @return \App\Models\Embed
     */
    public function getEmbedFromRequest()
    {
        return optional($this->getEmbedsFromRequest())[0] ?? new Embed();
    }

    /**
     * @param mixed $index
     * @param mixed $property
     * @return string|void
     */
    private function saveImageFromRequest($index, $property)
    {
        $file = optional(request()->embeds[$index])[$property];
        if ($file instanceof UploadedFile) {
            $filePath = $file->storeAs('public/embeds', Str::random(40).'.webp');

            return asset(str_replace('public', 'storage', $filePath));
        } elseif (is_string($file)) {
            $filePath = str_replace(asset('storage'), 'public', $file);

            // *Technically* it is possible for users to use images of other servers/users here.
            // The likelihood for this is 62^40 (26 letters upper and lowercase, 10 digits to the power of characters)
            // 62^40 = 4.96e71
            if (Storage::exists($filePath)) {
                return $file;
            }

            throw new RuntimeException(sprintf('The user has submitted a non-existing image path (%s) for his upload of %s.', $filePath, $property));
        }
    }
}
