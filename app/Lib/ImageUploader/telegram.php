<?php

namespace App\Lib\ImageUploader;

use App\Lib\Telegram\Api;
use Config;

class Telegram
{
    public function __construct(){
        $this->api = new Api(Config::get('telegram.authorization_token'));
        $this->user_id = Config::get('telegram.owner_user_id');
    }

    public function upload($stpack){
        $stickers = $stpack['stickers'];
        $first_sticker = $stickers[0];
        $uploaded_sticker = $this->api->sticker->uploadStickerFile('app/resized_stickers/'.$first_sticker['id_str']);
        $sticker_set = $this->api->sticker->createNewStickerSet($this->user_id, $stpack['short_name'], $stpack['name'], $uploaded_sticker['file_id'], implode('', $first_sticker['emojis'] ?? ['☺']));
        $first_sticker->file_id = $uploaded_sticker['file_id'];
        $first_sticker->save();
        $uploaded_sticker_count = 1;
        yield $uploaded_sticker_count;
        $body_stickers = $stickers->slice(1);
        foreach ($body_stickers as $sticker) {
            $this->addStickerToStickerSet($stpack['short_name'], $sticker);
            yield ++$uploaded_sticker_count;
        }
    }

    public function addStickerToStickerSet($sticker_set_name, $sticker){
        $uploaded_sticker = $this->api->sticker->uploadStickerFile('app/resized_stickers/'.$sticker['id_str']);
        $sticker->file_id = $uploaded_sticker['file_id'];
        $sticker->save();
        return $this->api->sticker->addStickerToSet($this->user_id, $sticker_set_name, $uploaded_sticker['file_id'], implode('', $sticker['emojis'] ?? ['☺']));
    }
}
