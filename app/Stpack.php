<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Stpack extends Model
{
    protected $fillable = [
        'id',
        'name',
        'short_name',
        'thumbnail_url',
        'original_url',
    ];

    /**
     * モデルの配列形態に追加するアクセサ
     *
     * @var array
     */
    protected $appends = ['id_str'];

    public $incrementing = false;

    public function getIdStrAttribute(){
        return (string)$this->id;
    }

    public function getCreatedAtAttribute($datetime)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->format('Y/m/d H:i:s');
    }
    
    public function getUpdatedAtAttribute($datetime)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->format('Y/m/d H:i:s');
    }

    public function stickers(){
        return $this->hasMany('App\Sticker');
    }
}
