<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stpack extends Model
{
    protected $fillable = [
        'id',
        'name',
        'short_name',
        'thumbnail_url',
        'original_url',
    ];

    public $incrementing = false;

    public function stickers(){
        return $this->hasMany('App\Sticker');
    }
}
