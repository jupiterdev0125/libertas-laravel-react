<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;
use RuntimeException;

final class FileUploader
{
    public function doesFileExistInRequest(string $fileName, Request $request): bool
    {
        return $request->filled($fileName);
    }

    public function saveFileFromRequest(string $fileName, Request $request): string
    {
        if (! $this->doesFileExistInRequest($fileName, $request)) {
            throw new InvalidArgumentException(sprintf('The file %s does not exist in request', $fileName));
        }

        // The user just re-submits existing images
        if (! $request->hasFile($fileName)) {
            $filePath = str_replace('/storage/', 'public/', $request->input($fileName));

            // *Technically* it is possible for users to use images of other servers/users here.
            // The likelihood for this is 62^40 (26 letters upper and lowercase, 10 digits to the power of characters)
            // 62^40 = 4.96e71
            if (Storage::exists($filePath)) {
                return $filePath;
            }

            throw new RuntimeException(sprintf('The user has submitted a non-existing image path (%s) for his upload of %s.', $filePath, $fileName));
        }

        $filePath = $request->file($fileName)->storeAs('public/embed', Str::random(40).'.webp');

        if (false === $filePath) {
            throw new RuntimeException('Could not save file.');
        }

        return $filePath;
    }

    public function saveFile(UploadedFile $file)
    {
        $filePath = $file->storeAs('public/embed', Str::random(40).'.webp');

        if (false === $filePath) {
            throw new RuntimeException('Could not save file.');
        }

        return $filePath;
    }
}
