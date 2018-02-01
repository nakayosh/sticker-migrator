<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lib\ImageResizer\Image;

use React\EventLoop\Factory;
use unreal4u\TelegramAPI\HttpClientRequestHandler;

use unreal4u\TelegramAPI\Telegram\Methods\SendMessage;
use unreal4u\TelegramAPI\TgLog;

class TestController extends Controller
{
    public function index(Request $request){
        // $origin_url = 'https://avatars2.githubusercontent.com/u/19276905?s=460&v=4';

        // $resizer = new Image();
        // $resizer->resize($origin_url, 'resized_stickers', 'me.test.png');

        $loop = Factory::create();
        $tg_log = new TgLog(config('telegram.authorization_token'), new HttpClientRequestHandler($loop));

        $sendMessage = new SendMessage();
        $sendMessage->chat_id = -1001331940682;
        $sendMessage->text    = 'はじめまして！今日からお世話になります！';

        $promise = $tg_log->performApiRequest($sendMessage);

        $loop->run();

        $promise->then(
            function ($response) {
                echo $response;
            },
            function (\Exception $exception) {
                echo $exception;
            }
        );
    }
}
