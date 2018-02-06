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

class StickerUploadFailed
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $stpack;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Stpack $stpack)
    {
        $this->stpack = $stpack;
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
