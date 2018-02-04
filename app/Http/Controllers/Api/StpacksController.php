<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;
use App\Lib\ImageResizer\Image;
use App\Lib\ImageUploader\Telegram;
use App\Events;
use App\Lib\Constants\StpackStatus;
use Exception;

class StpacksController extends Controller
{
    public function getStpack(Request $request, $stpack_id)
    {
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
        return response()->json($stpacks);
    }

    public function recentStpack(Request $request)
    {
        $validatedData = $request->validate([
            'limit' => 'integer',
            'offset' => 'integer',
        ]);
        $limit = (integer)($request->input('limit') ?? 15);
        $offset = (integer)($request->input('offset') ?? 0);
        $stpacks = Stpack::with('stickers')->orderBy('created_at', 'desc')->skip($offset)->take($limit)->get();
        return response()->json($stpacks);
    }

    private function migrate(Request $request, $stpack_id)
    {
        [$stpack, $return_code] = $this->getStpackData($stpack_id);
        if ($stpack['error']) {
            return response()->json($stpack, $return_code);
        }
        if (!is_null($stpack['url'])) {
            return redirect()->route('api_stpack', ['stpack_id' => $stpack_id]);
        }
        try {
            $stpack = $this->_migrate_compile($stpack);
            $stpack = $this->_migrate_upload($stpack);
        } catch (Exception $e) {
            $stpack->status = StpackStatus::FAILED;
            $stpack->save();
            event(new Events\StickerUploadFailed($stpack));
            $telegram = new Telegram();
            $telegram->upload_rollback($stpack);
        }
        return redirect()->route('api_stpack', ['stpack_id' => $stpack_id]);
    }

    private function _migrate_compile(Stpack $stpack)
    {
        $resizer = new Image();
        $stickers = $stpack['stickers'];
        $stpack->status = StpackStatus::COMPILING;
        $stpack->save();
        event(new Events\StickerCompileStarting($stpack));
        $count = 1;
        foreach ($stickers as $sticker) {
            $resizer->resize($sticker['original_url'], 'resized_stickers', $sticker['id_str']);
            event(new Events\StickerCompiling($stpack, $count));
            $count++;
        }
        event(new Events\StickerCompiled($stpack));
        return $stpack;
    }

    private function _migrate_upload(Stpack $stpack)
    {
        $telegram = new Telegram();
        $stpack->status = StpackStatus::UPLOADING;
        $stpack->save();
        event(new Events\StickerUploadStarting($stpack));
        foreach ($telegram->upload($stpack) as $uploaded_count) {
            event(new Events\StickerUploading($stpack, $uploaded_count));
        }
        $url = 'https://t.me/addstickers/'.$stpack['short_name'];
        $stpack = Stpack::where('id', $stpack_id)->first();
        $stpack->url = $url;
        $stpack->status = StpackStatus::UPLOADED;
        $stpack->save();
        event(new Events\StickerUploaded($stpack));
        return $stpack;
    }

    private function getStpackData(Int $stpack_id)
    {
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
