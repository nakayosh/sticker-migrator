<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameUrlColumnToOriginalUrlInStickersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stickers', function (Blueprint $table) {
            $table->renameColumn('url', 'original_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stickers', function (Blueprint $table) {
            $table->renameColumn('original_url', 'url');
        });
    }
}
