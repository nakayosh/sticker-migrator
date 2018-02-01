<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\ImageDownloader\Line;
use App\Lib\ImageUploader\Telegram;
use App\Stpack;

class StpacksController extends Controller
{
    public function getStpack(Request $request, $stpack_id){
        $stpack_model = Stpack::where('id', $stpack_id);
        $return_code  = 200;

        if (!$stpack_model->exists()) {
            $downloader = new Line();
            $download   = $downloader->download($stpack_id);

            if ($download['error']) {
                return response()->json([
                    'error' => $download['error'],
                    'error_description' => $download['error_description']
                ], 500);
            };
        }

        if ($return_code === 200) {
            $stpack = Stpack::with('stickers')->where('id', $stpack_id)->first();
        } else {
            $stpack = $download;
        }

        return response()->json($stpack, $return_code ?: 500);
    }

    public function patchStpack(Request $request, $stpack_id){
        // $stpack_model = Stpack::where('id', $stpack['id']);

        // if (!$stpack_model->exists()) {
        //     return response()->json([
        //         'error' => 'stpack not found',
        //         'error_description' => 'Specified stpack does not exists or it haven\'t fetched yet'
        //     ], 500);
        // }

        // $stpack = Stpack::with('stickers')->where('id', $stpack['id'])->first();

        $uploader = new Telegram();
        $upload   = $uploader->upload($request->all());

        if ( $upload['error'] ) {
            return response()->json([
                'error' => $upload['error'],
                'error_description' => $upload['error_description']
            ], 500);
        }

        var_dump($upload);
    }
}
