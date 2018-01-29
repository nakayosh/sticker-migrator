<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stpack extends Model
{
    protected $fillable = [
        'stpack_id',
        'name',
        'short_name',
        'thumbnail_url',
        'original_url',
    ];

    public function stickers(){
        return $this->hasMany('App\Sticker');
    }
}
