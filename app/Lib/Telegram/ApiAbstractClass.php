<?php

namespace App\Lib\Telegram;

abstract class ApiAbstractClass {
    public function getNamespace(){
        return $this->namespace;
    }
}
