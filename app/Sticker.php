<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Emoji;

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
        $emojis = Emoji\detect_emoji($value);
        $retval = [];
        foreach ($emojis as $emoji) {
            $retval[] = $emoji['emoji'];
        }
        return $retval;
    }

    public function setEmojisAttribute($value){
        $this->attributes['emojis'] = implode($value);
    }

    public function getCreatedAtAttribute($datetime)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->format('Y/m/d H:i:s');
    }
    
    public function getUpdatedAtAttribute($datetime)
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->format('Y/m/d H:i:s');
    }
}
