<?php

namespace App\Lib\ImageDownloader;
use GuzzleHttp\Client;
use Ramsey\Uuid\Uuid;
use App\Stpack;
use App\Sticker;
use GuzzleHttp\Exception\RequestException;

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
        try{
            $response = $client->get($stpack_url);
            $status_code = $response->getStatusCode();
        } catch(RequestException $e) {
            $response = $e->getResponse();
            $status_code = $response->getStatusCode();
            $message = 'LINE server returned an ERROR.';
            return [
                'code' => $status_code,
                'error' => $this->getStatusStr($status_code),
                'error_description' => $message,
            ];
        }
        preg_match_all('/;\s?background-image:\s?url\([\'\"]*(.+?)[\'\"]*\);/', $response->getBody(), $matches_url);
        preg_match('/<h3\s?class=[\'\"]*mdCMN08Ttl[\'\"]*>(.+?)<\/h3>/', $response->getBody(), $sticker_name);
        preg_match('/product\/(.+?)\//', $stpack_url, $stpack_id);
        $stickers = array();
        $sticker_models = [];
        if (count($matches_url[1]) === 0) {
            return [
                'code' => 404,
                'error' => $this->getStatusStr(404),
                'error_description' => 'There are no stickers',
            ];
        }
        foreach ($matches_url[1] as $url) {
            $correct_url = explode(';', $url)[0];
            preg_match('/sticker\/(.+?)\//', $correct_url, $st_id);
            $pack = [
                'url' => $correct_url,
                'id' => $st_id[1],
            ];
            $stickers[] = $pack;
            $sticker_models[] = new Sticker($pack);
        }
        $retval = [
            'id' => $stpack_id[1],
            'name' => $sticker_name[1],
            'short_name' => $short_name,
            'thumbnail_url' => $stickers[0]['url'],
            'original_url' => $stpack_url,
            'stickers' => $stickers,
        ];
        $stpack = Stpack::create($retval);
        $stpack->stickers()->saveMany($sticker_models);
        return $stpack;
    }

    public function getStatusStr($code){
        switch ($code) {
            case 100: $text = 'Continue'; break;
            case 101: $text = 'Switching Protocols'; break;
            case 200: $text = 'OK'; break;
            case 201: $text = 'Created'; break;
            case 202: $text = 'Accepted'; break;
            case 203: $text = 'Non-Authoritative Information'; break;
            case 204: $text = 'No Content'; break;
            case 205: $text = 'Reset Content'; break;
            case 206: $text = 'Partial Content'; break;
            case 300: $text = 'Multiple Choices'; break;
            case 301: $text = 'Moved Permanently'; break;
            case 302: $text = 'Moved Temporarily'; break;
            case 303: $text = 'See Other'; break;
            case 304: $text = 'Not Modified'; break;
            case 305: $text = 'Use Proxy'; break;
            case 400: $text = 'Bad Request'; break;
            case 401: $text = 'Unauthorized'; break;
            case 402: $text = 'Payment Required'; break;
            case 403: $text = 'Forbidden'; break;
            case 404: $text = 'Not Found'; break;
            case 405: $text = 'Method Not Allowed'; break;
            case 406: $text = 'Not Acceptable'; break;
            case 407: $text = 'Proxy Authentication Required'; break;
            case 408: $text = 'Request Time-out'; break;
            case 409: $text = 'Conflict'; break;
            case 410: $text = 'Gone'; break;
            case 411: $text = 'Length Required'; break;
            case 412: $text = 'Precondition Failed'; break;
            case 413: $text = 'Request Entity Too Large'; break;
            case 414: $text = 'Request-URI Too Large'; break;
            case 415: $text = 'Unsupported Media Type'; break;
            case 500: $text = 'Internal Server Error'; break;
            case 501: $text = 'Not Implemented'; break;
            case 502: $text = 'Bad Gateway'; break;
            case 503: $text = 'Service Unavailable'; break;
            case 504: $text = 'Gateway Time-out'; break;
            case 505: $text = 'HTTP Version not supported'; break;
            default:
                $text = 'unknown status code';
            break;
        }
        return $text;
    }
}
