<?php

namespace App\Lib\Telegram;

class User extends ApiAbstractClass
{
    function __construct($api){
        $this->api = $api;
    }

    protected $namespace = 'user';
    private $me = null;

    public function getMe(){
        if (!is_null($this->me)) {
            return $this->me;
        }
        $this->me = $this->api->execute(__FUNCTION__);
        return $this->me;
    }

    public function getUserId(){
        $me = $this->getMe();
        return $me['id'];
    }

    public function getUsername(){
        $me = $this->getMe();
        return $me['username'];
    }
}
