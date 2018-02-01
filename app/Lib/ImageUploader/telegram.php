<?php

namespace App\Lib\ImageUploader;

use App\Lib\ImageResizer\Image;

use \unreal4u\TelegramAPI\TgLog;
use \React\EventLoop\Factory;
use \unreal4u\TelegramAPI\HttpClientRequestHandler;
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
        $loop   = Factory::create();
        $tg_log = new TgLog(config('telegram.authorization_token'), new HttpClientRequestHandler($loop));

        $sticker_items = count($stpack['stickers']);

        foreach ($stpack['stickers'] as $key => $sticker) {
            if( !$sticker['emojis'] || !$sticker['id'] || !$sticker['url'] ) {
                return [ 'error' => 'sticker data invalid', 'error_description' => 'Thrown sticker data is invalid'];
            }

            $image_resizer = new Image();
            $image_resizer->resize($sticker['url'], 'resized_stickers', "{$sticker['id_str']}.png");

            $sticker_image = storage_path("app/resized_stickers/{$sticker['id_str']}.png");

            if ($key === 0) {
                $create_new_sticker_set = new CreateNewStickerSet();
                $create_new_sticker_set->user_id     = config('telegram.owner_user_id');
                $create_new_sticker_set->title       = $stpack['name'];
                $create_new_sticker_set->name        = $stpack['short_name'];
                $create_new_sticker_set->emojis      = implode('', $sticker['emojis']);
                $create_new_sticker_set->png_sticker = new InputFile($sticker_image);

                $promise = $tg_log->performApiRequest($create_new_sticker_set);
                $loop->run();

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
                $add_sticker_to_set->user_id     = config('telegram.owner_user_id');
                $add_sticker_to_set->name        = $stpack['short_name'];
                $add_sticker_to_set->emojis      = implode('', $sticker['emojis']);
                $add_sticker_to_set->png_sticker = new InputFile($sticker_image);

                $promise = $tg_log->performApiRequest($add_sticker_to_set);
                $loop->run();

                $promise->then(
                    function ($response) {
                        if ($key === $sticker_items) {
                            return [ 'state' => 'success' ];
                        }
                    },
                    function (\Exception $exception) {
                        return [ 'error' => 'sicker add failed', 'error_description' => 'Adding sicker to set failed'];
                    }
                );
            }
        }
    }
}
