<?php

declare(strict_types=1);

namespace App\Http\Controllers\ReactionRoles;

use Illuminate\Http\JsonResponse;

final class ListReactionRolesController
{
    public function list(): JsonResponse
    {
        return response()->json([]);
    }
}
