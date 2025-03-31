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
        Schema::table('korisnik_preferencije', function (Blueprint $table) {
            // Drop the old foreign key
            $table->dropForeign(['preferencija_id']);
            // Add the new foreign key with cascade delete
            $table->foreign('preferencija_id')
                  ->references('id')->on('preferencije')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('korisnik_preferencije', function (Blueprint $table) {
            // Drop the old foreign key
            $table->dropForeign(['preferencija_id']);
            // Add the new foreign key with cascade delete
            $table->foreign('preferencija_id')
                  ->references('id')->on('preferencije');
        });
    }
};
