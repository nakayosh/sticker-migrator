<?php

namespace App\Lib\ImageUploader;

use App\Lib\ImageResizer;
use \unreal4u\TelegramAPI\TgLog;
use \unreal4u\TelegramAPI\Telegram\Types\Custom\InputFile;
use \unreal4u\TelegramAPI\Telegram\Methods\CreateNewStickerSet;
use \unreal4u\TelegramAPI\Telegram\Methods\AddStickerToSet;

class Telegram
{
    public function __construct(){
        //
    }

    /**
     * @param  Array  $stickers  An array that includes 'emoji' and 'path' child
     */
    public function upload($stickers){

        foreach ($stickers as $sticker) {
            if( !count($sticker['emoji']) > 0 || !$sticker['id'] || !$sticker['path'] ) {
                return [ 'error' => 'sticker data invalid', 'error_description' => 'Thrown sticker data is invalid'];
            }

            // $image_resizer = new ImageResizer();
            // $image_resizer->resize($sticker['url'], 'resized_stickers', strval($sticker['id']));

            // $upload_sticker_file = new UploadStickerFile();
            // $upload_sticker_file->png_sticker = new InputFile(storage_path('app').'/resized_stickers/'.strval($sticker['id']));

            // $tg_log = new TgLog(config('telegram.authorization_token'));
            // $promise = $tg_log->performApiRequest($upload_sticker_file);

            // $promise->then(
            //     function ($response) {

            //     },
            //     function (\Exception $exception) {
            //         return [ 'error' => 'sicker upload failed', 'error_description' => 'Uploading sicker image failed'];
            //     }
            // );
        }
    }
}
