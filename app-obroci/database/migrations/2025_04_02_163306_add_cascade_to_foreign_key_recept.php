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
        Schema::table('namirnica_recept', function (Blueprint $table) {
            // Drop the old foreign key
            $table->dropForeign(['recept_id']);
            // Add the new foreign key with cascade delete
            $table->foreign('recept_id')
                  ->references('id')->on('recepti')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('namirnica_recept', function (Blueprint $table) {
            $table->dropForeign(['recept_id']);
            $table->foreign('recept_id')
                  ->references('id')->on('recepti');
        });
    }
};
