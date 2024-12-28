<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('namirnica-recept', function (Blueprint $table) {
            $table->unsignedBigInteger('recept_id');
            $table->unsignedBigInteger('namirnica_id');
            $table->foreign('namirnica_id')->references('id')->on('namirnice');
            $table->foreign('recept_id')->references('id')->on('recepti');
            $table->integer('kolicina');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('namirnica-recept');
    }
};
