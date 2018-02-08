<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class StickerUploading implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $stpack;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Array $stpack, Int $uploaded_stickers_count)
    {
        $this->stpack = $stpack;
        $this->stpack['uploaded_stickers_count'] = $uploaded_stickers_count;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('stpacks.'.$this->stpack['id']);
    }
}
