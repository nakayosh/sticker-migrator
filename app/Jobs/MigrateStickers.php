<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Stpack;
use App\Lib\Constsnts\StpackStatus;
use App\Events;
use Exception;
use App\Lib\ImageResizer\Image;
use App\Lib\ImageUploader\Telegram;

class MigrateStickers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $stpack_id;

    /**
     * Create a new job instance.
     * @param Int $stpack_id id of stpack
     * @return void
     */
    public function __construct(Int $stpack_id)
    {
        $this->stpack_id = $stpack_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        return $this->migrate($this->stpack_id);
    }

    private function migrate(Int $stpack_id)
    {
        $stpack = Stpack::with('stickers')->where('id', $stpack_id)->first();
        try {
            $stpack = $this->_migrate_compile($stpack);
            $stpack = $this->_migrate_upload($stpack);
        } catch (Exception $e) {
            $this->_migrate_failed($stpack);
        }
        return $stpack;
    }

    private function _migrate_compile(Stpack $stpack)
    {
        $resizer = new Image();
        $stickers = $stpack['stickers'];
        $stpack->status = StpackStatus::COMPILING;
        $stpack->save();
        event(new Events\StickerCompileStarting($stpack));
        $count = 1;
        foreach ($stickers as $sticker) {
            $resizer->resize($sticker['original_url'], 'resized_stickers', $sticker['id_str']);
            event(new Events\StickerCompiling($stpack, $count));
            $count++;
        }
        event(new Events\StickerCompiled($stpack));
        return $stpack;
    }

    private function _migrate_upload(Stpack $stpack)
    {
        $telegram = new Telegram();
        $stpack->status = StpackStatus::UPLOADING;
        $stpack->save();
        event(new Events\StickerUploadStarting($stpack));
        foreach ($telegram->upload($stpack) as $uploaded_count) {
            event(new Events\StickerUploading($stpack, $uploaded_count));
        }
        $url = 'https://t.me/addstickers/'.$stpack['short_name'];
        $stpack = Stpack::where('id', $stpack_id)->first();
        $stpack->url = $url;
        $stpack->status = StpackStatus::UPLOADED;
        $stpack->save();
        event(new Events\StickerUploaded($stpack));
        return $stpack;
    }

    private function _migrate_failed(Stpack $stpack)
    {
        $stpack->status = StpackStatus::FAILED;
        $stpack->save();
        event(new Events\StickerUploadFailed($stpack));
        $telegram = new Telegram();
        $telegram->upload_rollback($stpack);
    }
}
