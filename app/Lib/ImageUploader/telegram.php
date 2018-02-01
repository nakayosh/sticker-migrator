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
     * @param  Array  $stpack
     */
    public function upload($stpack){
        $tg_log = new TgLog(config('telegram.authorization_token'));

        foreach ($stpack['stickers'] as $key => $sticker) {
            if( !count($sticker['emoji']) > 0 || !$sticker['id'] || !$sticker['url'] ) {
                return [ 'error' => 'sticker data invalid', 'error_description' => 'Thrown sticker data is invalid'];
            }

            $image_resizer = new ImageResizer();
            $image_resizer->resize($sticker['url'], 'resized_stickers', $sticker['id_str']);

            $compressed_image_path = storage_path('app/resized_stickers'.$sticker['id_str']);

            if ($key === 0) {
                $create_new_sticker_set = new CreateNewStickerSet();
                $create_new_sticker_set->title       = $stpack['name'];
                $create_new_sticker_set->name        = $stpack['short_name'];
                $create_new_sticker_set->emojis      = implode('', $stpack['emojis']);
                $create_new_sticker_set->png_sticker = new InputFile($compressed_image_path);

                $promise = $tg_log->performApiRequest($create_new_sticker_set);

                $promise->then(
                    function ($response) {
                        // noop
                    },
                    function (\Exception $exception) {
                        return [ 'error' => 'sicker upload failed', 'error_description' => 'Creating new sicker set failed'];
                    }
                );
            } else {
                $add_sticker_to_set = new AddStickerToSet();
                $add_sticker_to_set->name        = $stpack['short_name'];
                $add_sticker_to_set->png_sticker = new InputFile($compressed_image_path);
                $add_sticker_to_set->emojis      = implode('', $stpack['emojis']);

                $promise = $tg_log->performApiRequest($create_new_sticker_set);

                $promise->then(
                    function ($response) {
                        // noop
                    },
                    function (\Exception $exception) {
                        return [ 'error' => 'sicker upload failed', 'error_description' => 'Creating new sicker set failed'];
                    }
                );
            }
        }
    }
}
