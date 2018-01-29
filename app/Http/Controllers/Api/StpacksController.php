<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;

class StpacksController extends Controller
{
    public function getPack(Request $request, $stpack_no){
        $packmodel = Stpack::where('stpack_id', $stpack_no);
        if ($packmodel->exists()) {
            $stpack = $packmodel->first();
        } else {
            $downloader = new Line();
            $stpack = $downloader->download('https://store.line.me/stickershop/product/'.$stpack_no.'/ja');
        }
        return view('test', ['data' => $stpack]);
    }
}
