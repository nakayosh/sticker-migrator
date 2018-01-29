<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
    protected $fillable = [
        'url',
        'sticker_id',
    ];

    public function stpack(){
        return $this->belongsTo('App\Stpack');
    }
}
