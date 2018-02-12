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
        $initial_state = [];
        $initial_state['stpack'] = $stpack->toArray();
        $initial_state['stickers'] = $stpack->stickers->toArray();
        $sticker_ids = [];
        foreach ($initial_state['stickers'] as $sticker) {
            $sticker_ids[] = $sticker['id_str'];
        }
        $initial_state['stpack']['stickers'] = $sticker_ids;
        return view('stpack', ['stpack' => $stpack, 'initial_state' => $initial_state]);
    }
}
