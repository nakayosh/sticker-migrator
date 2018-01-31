<?php

namespace App\Lib\ImageDownloader;

use Goutte\Client as GoutteClient;
use Ramsey\Uuid\Uuid;
use GuzzleHttp\Exception\RequestException;
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
    public function download($id) {
        $client = new GoutteClient();

        try {
            $crawler = $client->request('GET', 'https://store.line.me/stickershop/product/'.$id.'/ja');
            $status_code = $response->getStatusCode();
        } catch(RequestException $e) {
            return [
                'code' => $e->getResponse()->getStatusCode(),
                'error' => $this->getStatusStr($status_code),
                'error_description' => 'LINE server returned an ERROR',
            ];
        }

        $name         = $crawler->filter('.mdCMN08Ttl')->text();
        $short_name   = str_replace('-', '_', Uuid::uuid4()->toString());
        $original_url = 'https://store.line.me/stickershop/product/'.$id.'/ja';
        $sticker_urls = $crawler->filter('.mdCMN09Image')->each(function ($node) {
            return $this->getNodeBackgroundImage($node);
        });

        if (count($sticker_urls) === 0) {
            return [
                'code' => 404,
                'error' => $this->getStatusStr(404),
                'error_description' => 'There are no stickers',
            ];
        }

        $stickers       = [];
        $sticker_models = [];

        foreach ($sticker_urls as $url) {
            $formatted_url = explode(';', $url)[0];
            $sticker_id    = $this->getStickerIdFromUrl($formatted_url);

            $sticker = [
                'id'  => $sticker_id,
                'url' => $formatted_url,
            ];

            $stickers[]       = $sticker;
            $sticker_models[] = new Sticker($sticker);
        }

        $retval = [
            'id'            => $id,
            'name'          => $name,
            'short_name'    => $short_name,
            'thumbnail_url' => $stickers[0]['url'],
            'original_url'  => $original_url,
            'stickers'      => $stickers,
        ];

        $stpack = Stpack::create($retval);
        $stpack->stickers()->saveMany($sticker_models);

        return $stpack;
    }

    /**
     * Get sticker ID from its image's URL
     * @param   string  $url         Image URL for the sticker
     * @return  string  $sticker_id  ID for the sticker
     */
    protected function getStickerIdFromUrl($url) {
        preg_match('/sticker\/(.+?)\//', $url, $sticker_id);

        return $sticker_id[1];
    }

    /**
     * Get background-image from DOM node
     * @param   Crawler  $node              DOM node
     * @return  string   $background_image  Value of background-image
     */
    protected function getNodeBackgroundImage($node) {
        preg_match(
            '/\s?background-image:\s?url\([\'\"]*(.+?)[\'\"]*\)/',
            $node->attr('style'),
            $matches
        );

        return $matches[1];
    }

    public function getStatusStr($code) {
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
