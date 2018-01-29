<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStpacksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stpacks', function (Blueprint $table) {
            $table->integer('id')->unique();
            $table->string('name');
            $table->string('short_name');
            $table->string('thumbnail_url');
            $table->string('url')->nullable()->default(null);
            $table->string('original_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stpacks');
    }
}
