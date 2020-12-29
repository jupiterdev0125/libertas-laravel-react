<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Response;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $testimonials = cache()->remember('testimonials', 86400, function () {
            return Testimonial::all();
        });
        $theme = 'green-orange-edge';

        return view('index', compact('testimonials', 'theme'));
    }
}
