<?php

namespace App\Lib\ImageDownloader;
use GuzzleHttp\Client;
use Ramsey\Uuid\Uuid;
use App\Stpack;
use App\Sticker;

class Line
{
    public function __construct(){}

    /**
     * downlolad sticker from line
     * @param $url url for line sticker page
     * @return model App\Stpack
     */
    public function download($stpack_url){
        $short_name_hf = Uuid::uuid4()->toString();
        $short_name = str_replace('-', '_', $short_name_hf);
        $client = new Client();
        $response = $client->request('GET', $stpack_url);
        preg_match_all('/background-image:\s?url\([\'\"]*(.+?);.*?[\'\"]*\);/', $response->getBody(), $matches_url);
        preg_match('/<h3\s?class=[\'\"]*mdCMN08Ttl[\'\"]*>(.+?)<\/h3>/', $response->getBody(), $sticker_name);
        preg_match('/product\/(.+?)\//', $stpack_url, $stpack_id);
        $stickers = array();
        $sticker_models = [];
        foreach ($matches_url[1] as $url) {
            preg_match('/sticker\/(.+?)\//', $url, $st_id);
            $pack = [
                'url' => $url,
                'sticker_id' => $st_id[1],
            ];
            $stickers[] = $pack;
            $sticker_models[] = new Sticker($pack);
        }
        $retval = [
            'stpack_id' => $stpack_id[1],
            'name' => $sticker_name[1],
            'short_name' => $short_name,
            'thumbnail_url' => $stickers[0]['url'],
            'original_url' => $stpack_url,
            'stickers' => $stickers,
        ];
        $stpack = Stpack::create($retval);
        $stpack->saveMany($sticker_models);
        return $stpack;
    }
}
