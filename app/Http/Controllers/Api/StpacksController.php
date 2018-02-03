<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;
use App\Lib\ImageResizer\Image;
use App\Lib\ImageUploader\Telegram;
use DB;

class StpacksController extends Controller
{
    public function getStpack(Request $request, $stpack_id){
        $stpack_id = (integer)$stpack_id;
        [$stpack, $return_code] = $this->getStpackData($stpack_id);
        return response()->json($stpack, $return_code ?: 500);
    }

    public function searchStpack(Request $request){
        $validatedData = $request->validate([
            'q' => 'required|string',
            'limit' => 'integer',
            'offset' => 'integer',
        ]);
        $q = $request->input('q');
        $limit = (integer)($request->input('limit') ?? 15);
        $offset = (integer)($request->input('offset') ?? 0);
        $stpacks = Stpack::with('stickers')->where('name', 'LIKE', '%'.$q.'%')->skip($offset)->take($limit)->get();
        $retval = [
            'results' => $stpacks,
            'next' => $offset + $limit,
            'prev' => $offset - $limit,
        ];
        return response()->json($retval);
    }

    public function recentStpack(Request $request){
        $validatedData = $request->validate([
            'limit' => 'integer',
            'offset' => 'integer',
        ]);
        $limit = (integer)($request->input('limit') ?? 15);
        $offset = (integer)($request->input('offset') ?? 0);
        $stpacks = Stpack::with('stickers')->orderBy('created_at', 'desc')->skip($offset)->take($limit)->get();
        $retval = [
            'results' => $stpacks,
            'next' => $offset + $limit,
            'prev' => $offset - $limit,
        ];
        return response()->json($retval);
    }

    public function patchStpack(Request $request, $stpack_id){
        $validatedData = $request->validate([
            'stickers' => 'required|json',
        ]);
        $stpack_id = (integer)$stpack_id;
        $stickers = json_decode($request->input('stickers'), true);
        [$stpack, $return_code] = $this->getStpackData($stpack_id);
        if ($stpack['error']) {
            return response()->json($stpack, $return_code);
        }
        DB:transaction(function () use ($stpack, $stickers){
            $count = 0;
            foreach ($stpack->stickers as $sticker) {
                $sticker->emojis = $stickers[$count]['emojis'];
                $sticker->save();
                $count++;
            }
        });
        $stpack = Stpack::with('stickers')->where('id', $stpack_id)->first();
        return response()->json($stpack);
    }

    public function test(Request $request, $stpack_id){
        [$stpack, $return_code] = $this->getStpackData($stpack_id);
        if ($stpack['error']) {
            return response()->json($stpack, $return_code);
        }
        if (!is_null($stpack['url'])) {
            return redirect()->route('api_stpack', ['stpack_id' => $stpack_id]);
        }
        ini_set("max_execution_time", 0);
        header('Content-type: text/html; charset=utf-8');
        echo str_pad('',4096).PHP_EOL;
        echo 'Downloading stpack data from LINE server...<br>'.PHP_EOL;
        ob_flush();
        flush();
        $resizer = new Image();
        $stickers = $stpack['stickers'];
        $all_sticker_count = count($stickers);
        echo 'sticker short name is '.$stpack['short_name'].'<br>'.PHP_EOL;
        echo 'Resizing stickers...<br>'.PHP_EOL;
        ob_flush();
        flush();
        $count = 1;
        foreach ($stickers as $sticker) {
            $resizer->resize($sticker['original_url'], 'resized_stickers', $sticker['id_str']);
            echo $count.' of '.$all_sticker_count.' were resized...<br>';
            ob_flush();
            flush();
            $count++;
        }
        $telegram = new Telegram();
        echo PHP_EOL.'uploading sticker to telegram...<br>'.PHP_EOL;
        ob_flush();
        flush();
        foreach ($telegram->upload($stpack) as $uploaded_count) {
            echo $uploaded_count.' of '.$all_sticker_count.' stickers were uploaded.<br>';
            ob_flush();
            flush();
        }
        echo PHP_EOL.'upload finished!<br>'.PHP_EOL;
        $url = 'https://t.me/addstickers/'.$stpack['short_name'];
        echo 'let\'s download sticker from <a href="'.$url.'">'.$url.'</a><br>'.PHP_EOL;
        ob_flush();
        flush();
        $stpack = Stpack::where('id', $stpack_id)->first();
        $stpack->url = $url;
        $stpack->save();
        return redirect()->route('api_stpack', ['stpack_id' => $stpack_id]);
    }

    private function getStpackData(Int $stpack_id){
        $stpack_model = Stpack::where('id', $stpack_id);
        $return_code  = 200;

        if (!$stpack_model->exists()) {
            $downloader = new Line();
            $download   = $downloader->download($stpack_id);

            if ($download['error']) {
                $stpack = [
                    'error' => $download['error'],
                    'error_description' => $download['error_description'],
                ];
                $return_code = 500;
                return  [$stpack, $return_code];
            };
        }
        if ($return_code === 200) {
            $stpack = Stpack::with('stickers')->where('id', $stpack_id)->first();
        } else {
            $stpack = $download;
        }
        return [$stpack, $return_code];
    }
}
