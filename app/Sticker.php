<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
    protected $fillable = [
        'url',
        'id',
    ];

    public $incrementing = false;

    public function stpack(){
        return $this->belongsTo('App\Stpack');
    }
}
