<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;

class StpacksController extends Controller
{
    public function getPack(Request $request, $stpack_no){
        $packmodel = Stpack::where('id', $stpack_no);
        $return_code = 200;
        if (!$packmodel->exists()) {
            $downloader = new Line();
            $download = $downloader->download('https://store.line.me/stickershop/product/'.$stpack_no.'/ja');
            if (is_array($download)) {
                $return_code = $download['code'];
            }
        }
        $packmodel = Stpack::where('id', $stpack_no)->first();
        $stpack = $packmodel::with('stickers')->first();
        return response()->json($stpack, is_null($return_code) ? 500 : $return_code);
    }
}
