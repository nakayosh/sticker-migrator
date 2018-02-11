<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Stpack;
use Exception;

class StpacksController extends Controller
{
    public function getStpack(Request $request, $stpack_id)
    {
        $stpack = Stpack::with('stickers')->where('id', $stpack_id)->first();
        if (is_null($stpack)) {
            return view('index');
        }
        return view('stpack', ['stpack' => $stpack]);
    }
}
