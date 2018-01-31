<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;

class StpacksController extends Controller
{
    public function getPack(Request $request, $stpack_id){
        $stpack_model = Stpack::where('id', $stpack_id);
        $return_code  = 200;

        if (!$stpack_model->exists()) {
            $downloader = new Line();
            $download   = $downloader->download($stpack_id);

            if (is_array($download)) {
                $return_code = $download['code'];
            }
        }
        if ($return_code === 200) {
            $stpack_model = Stpack::where('id', $stpack_id)->first();
            $stpack       = $stpack_model::with('stickers')->first();
        } else {
            $stpack = $download;
        }
        return response()->json($stpack, $return_code ?: 500);
    }
}
