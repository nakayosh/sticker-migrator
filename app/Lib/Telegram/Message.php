<?php

namespace App\Lib\Telegram;

class Message extends ApiAbstractClass
{
    function __construct($api){
        $this->api = $api;
    }

    protected $namespace = 'message';

    public function sendMessage($chat_id, $text){
        $data = [
            'chat_id' => $chat_id,
            'text' => $text,
        ];
        $send_data = $this->api->createSendDataFromDataAsMultipart($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }
}
