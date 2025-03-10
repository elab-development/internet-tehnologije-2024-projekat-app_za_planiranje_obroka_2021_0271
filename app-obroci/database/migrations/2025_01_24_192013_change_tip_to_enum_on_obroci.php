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
        Schema::table('obroci', function (Blueprint $table) {
            $table->enum('tip', ['dorucak', 'rucak', 'uzina', 'vecera'])->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('obroci', function (Blueprint $table) {
            $table->string('tip')->change();
        });
    }
};
