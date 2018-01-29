<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;

class testController extends Controller
{
    public function index(Request $request, $stpack_no){
        $downloader = new Line();
        $data = $downloader->download('https://store.line.me/stickershop/product/'.$stpack_no.'/ja');
        return view('test', ['data' => $data]);
    }
}
