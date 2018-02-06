<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
    protected $fillable = [
        'original_url',
        'id',
    ];

    /**
     * モデルの配列形態に追加するアクセサ
     *
     * @var array
     */
    protected $appends = ['id_str', 'stpack_id_str'];

    public $incrementing = false;

    public function stpack(){
        return $this->belongsTo('App\Stpack');
    }

    public function getIdStrAttribute(){
        return (string)$this->id;
    }

    public function getStpackIdStrAttribute(){
        return (string)$this->stpack_id;
    }

    public function getEmojisAttribute($value){
        return preg_split('//u', $value, null, PREG_SPLIT_NO_EMPTY);
    }

    public function setEmojisAttribute($value){
        $this->attributes['emojis'] = implode($value);
    }
}
