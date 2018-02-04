<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\Imagedownloader\Line;
use App\Stpack;
use DB;
use App\Jobs\MigrateStickers;

class StpacksController extends Controller
{
    public function getStpack(Request $request, $stpack_id)
    {
        $stpack_id = (integer)$stpack_id;
        [$stpack, $return_code] = $this->_getStpackData($stpack_id);
        return response()->json($stpack, $return_code ?: 500);
    }

    public function searchStpack(Request $request)
    {
        $validatedData = $request->validate([
            'q' => 'required|string',
            'limit' => 'integer',
            'offset' => 'integer',
        ]);
        $q = $request->input('q');
        $limit = (integer)($request->input('limit') ?? 15);
        $offset = (integer)($request->input('offset') ?? 0);
        $query = Stpack::with('stickers')->where('name', 'LIKE', '%'.$q.'%');
        $stpacks = $query->skip($offset)->take($limit)->get();
        $retval = [
            'results' => $stpacks,
            'next' => $this->getNextStpackOffset($query, $offset, $limit),
            'prev' => $this->getPrevStpackOffset(null, $offset, $limit),
        ];
        return response()->json($retval);
    }

    public function recentStpack(Request $request)
    {
        $validatedData = $request->validate([
            'limit' => 'integer',
            'offset' => 'integer',
        ]);
        $limit = (integer)($request->input('limit') ?? 15);
        $offset = (integer)($request->input('offset') ?? 0);
        $query = Stpack::with('stickers')->orderBy('created_at', 'desc');
        $stpacks = $query->skip($offset)->take($limit)->get();
        $retval = [
            'results' => $stpacks,
            'next' => $this->getNextStpackOffset($query, $offset, $limit),
            'prev' => $this->getPrevStpackOffset(null, $offset, $limit),
        ];
        return response()->json($retval);
    }

    public function patchStpack(Request $request, $stpack_id)
    {
        $validatedData = $request->validate([
            'stickers' => 'required|json',
        ]);
        $stpack_id = (integer)$stpack_id;
        $stickers = json_decode($request->input('stickers'), true);
        [$stpack, $return_code] = $this->_getStpackData($stpack_id);
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
        dispatch(new MigrateStickers($stpack_id));
        return response()->json($stpack);
    }

    private function _getStpackData(Int $stpack_id)
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

    private function getNextStpackOffset($query, Int $offset, Int $limit)
    {
        return $query->skip($offset + $limit)->exists() ? $offset + $limit : null;
    }

    private function getPrevStpackOffset($query, Int $offset, Int $limit)
    {
        return $offset - $limit >= 0 ? $offset - $limit : null;
    }
}
