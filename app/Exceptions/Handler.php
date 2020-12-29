<?php

namespace App\Exceptions;

use GuzzleHttp\Command\Exception\CommandClientException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Render an exception into an HTTP response.
     *
     * @param Request  $request
     * @param Throwable $exception
     * @return Response
     *
     * @throws Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof CommandClientException) {
            return response()->json([
                'message' => $exception->getResponse()->getReasonPhrase(),
            ], $exception->getResponse()->getStatusCode());
        }

        return parent::render($request, $exception);
    }
}
