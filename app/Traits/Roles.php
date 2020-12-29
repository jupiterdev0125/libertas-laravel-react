<?php

namespace App\Traits;

trait Roles
{
    /**
     * @param string $column
     * @return mixed
     */
    public function assignRoles(string $column)
    {
        return optional(request()->input($column), function ($roles) {
            return json_encode(explode(',', $roles[0]));
        });
    }
}
