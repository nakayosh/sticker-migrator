<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
    public function stpack(){
        return $this->belongsTo('App\Stpack');
    }
}
