<?php

namespace App\Lib\Telegram;

use Storage;

class Sticker extends ApiAbstractClass
{
    function __construct($api){
        $this->api = $api;
    }

    protected $namespace = 'sticker';

    public function createNewStickerSet($user_id, $name, $title, $png_sticker, $emojis, $contains_masks=null, $mask_position=null){
        $data = [
            'user_id' => $user_id,
            'name' => $name.'_by_'.$this->api->user->getUsername(),
            'title' => $title,
            'png_sticker' => $png_sticker,
            'emojis' => $emojis,
        ];
        if (!is_null($contains_masks)) {
            $data['contains_masks'] = $contains_masks;
        }
        if (!is_null($mask_position)) {
            $data['mask_position'] = $mask_position;
        }
        $send_data = $this->api->createSendDataFromDataAsMultipart($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }

    public function uploadStickerFile($png_sticker, $user_id=null){
        $data = [];
        if (is_null($user_id)) {
            $data['user_id'] = $this->api->user->getUserId();
        } else {
            $data['user_id'] = $user_id;
        }
        $data['png_sticker'] = fopen(storage_path($png_sticker), 'rb');
        $send_data = $this->api->createSendDataFromDataAsMultipart($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }

    public function addStickerToSet($user_id, $name, $png_sticker, $emojis, $mask_position=null){
        $data = [
            'user_id' => $user_id,
            'name' => $name,
            'png_sticker' => $png_sticker,
            'emojis' => $emojis,
        ];
        if (!is_null($mask_position)) {
            $data['mask_position'] = $mask_position;
        }
        $send_data = $this->api->createSendDataFromDataAsFormParams($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }

    public function getStickerSet($name){
        $data = [
            'name' => $name,
        ];
        $send_data = $this->api->createSendDataFromDataAsFormParams($data);
        return $this->api->execute(__FUNCTION__, $send_data);
    }
}
