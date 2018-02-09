<?php

namespace App\Lib\Telegram;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class Api
{
    function __construct($bot_token){
        $this->api_classes = [
            'User',
            'Sticker',
            'Message',
            'Chat',
        ];
        $this->api_prefix = 'https://api.telegram.org/bot'.$bot_token.'/';
        $this->client = new Client([
            'base_uri' => $this->api_prefix,
        ]);
        $this->apiCreate();
    }

    public function execute($path, $post_data = null){
        if (is_null($post_data)) {
            try {
                $response = $this->client->request('GET', $path);
            } catch (RequestException $e) {
                $response = $e->getResponse();
            }
        } else {
            try {
                $response = $this->client->request('POST', $path, $post_data);
            } catch (RequestException $e) {
                $response = $e->getResponse();
            }
        }
        $res_data = json_decode($response->getBody()->getContents(), true);
        if ($res_data['ok']) {
            return $res_data['result'];
        } else {
            return $res_data;
        }
    }

    private function apiCreate(){
        foreach ($this->api_classes as $class) {
            $class_name = 'App\Lib\Telegram\\'.$class;
            $class_instance = new $class_name($this);
            $this->{$class_instance->getNamespace()} = $class_instance;
        }
    }

    public function createSendDataFromDataAsFormParams($data){
        return [
            'form_params' => $data,
        ];
    }

    public function createSendDataFromDataAsMultipart($data){
        $send_data = [
            'multipart' => [],
        ];
        foreach ($data as $key => $value) {
            $data_piece = [
                'name' => $key,
                'contents' => $value,
            ];
            $send_data['multipart'][] = $data_piece;
        }
        return $send_data;
    }
}
