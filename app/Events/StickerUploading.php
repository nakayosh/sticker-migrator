<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Stpack;

class StickerUploading implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $stpack;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Stpack $stpack, Int $uploaded_stickers_count)
    {
        $this->stpack = $stpack->replicate();
        $this->stpack['uploaded_stickers_count'] = $uploaded_stickers_count;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('stpacks.'.$this->stpack->id);
    }
}
