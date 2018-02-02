<?php

namespace App\Lib\ImageResizer;

use Exception;

class Image
{
    public function __construct(){
        //
    }

    /**
     * resize image for telegram
     * @param $picture path to original image
     * @param $save_directory path to directory for save resized image
     * @param $save_name image name to save
     * @return bool
     */
    public function resize($picture, $save_directory, $save_name)
    {
        $picture = \Image::make($picture);
        $save_path = storage_path('app').'/'.$save_directory.'/'.$save_name;
        $picture_mime = $picture->mime();
        if ($picture_mime != image_type_to_mime_type(IMAGETYPE_PNG)) {
            // pngでない画像！エラー
            throw new Exception('Image type shoud be png.');
        }

        $picture_width = $picture->width();
        $picture_height = $picture->height();

        if ($picture_height > $picture_width) {
            // 縦長
            $thumbnail_height = 512;
            $thumbnail_width = null;
        } elseif ($picture_width > $picture_height) {
            // 横長
            $thumbnail_width = 512;
            $thumbnail_height = null;
        } else {
            // 正方形
            $thumbnail_height = 512;
            $thumbnail_width = 512;
        }
        if (is_null($thumbnail_width) or is_null($thumbnail_height)) {
            $picture->resize($thumbnail_width, $thumbnail_height, function ($constraint) {
                $constraint->aspectRatio();
            });
        } else {
            $picture->resize($thumbnail_width, $thumbnail_height);
        }

        // If the specified directory doesn't exist yet, make the directory.
        // it won't check the permission because laravel requires writing permission
        // on storage directory recursively
        if ( !file_exists(storage_path('app'.'/'.$save_directory)) ) {
            mkdir(storage_path('app'.'/'.$save_directory));
        }

        $picture->save($save_path);

        return true;
    }
}
