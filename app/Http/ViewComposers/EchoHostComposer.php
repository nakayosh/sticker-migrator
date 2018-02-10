<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Config;
use Exception;

class EchoHostComposer
{
    /**
     * @var str
     */
    protected $echo_host;

    /**
     * Create a new wshost composer.
     *
     * @return void
     */
    public function __construct()
    {
        $this->echo_host = Config::get('echo.host');
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('echo_host', $this->echo_host);
    }
}
