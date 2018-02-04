<?php

namespace App\Lib\Telegram;

class Chat extends ApiAbstractClass
{
    function __construct($api){
        $this->api = $api;
    }

    protected $namespace = 'chat';

    public function getChat($chat_id){
        $data = [
            'chat_id' => $chat_id,
        ];
        $send_data = $this->api->createSendDataFromDataAsFormParams($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }

    public function getChatAdministrators($chat_id){
        $data = [
            'chat_id' => $chat_id,
        ];
        $send_data = $this->api->createSendDataFromDataAsFormParams($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }
}
