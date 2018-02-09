<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Exception;

class WsHostComposer
{
    /**
     * @var str
     */
    protected $ws_host;

    /**
     * Create a new wshost composer.
     *
     * @return void
     */
    public function __construct()
    {
        $path = base_path().'/laravel-echo-server.json';
        $json = json_decode(file_get_contents($path), True);
        try {
            $this->ws_host = $json['host'];
        } catch(Exception $e) {
            $this->ws_host = 'ws.smigrator.tk';
        }
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('websocket_host', $this->ws_host);
    }
}
