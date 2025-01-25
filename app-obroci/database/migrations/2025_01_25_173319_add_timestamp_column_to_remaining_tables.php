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
            $table->timestamps();
        });

        Schema::table('namirnica_recept', function (Blueprint $table) {
            $table->timestamps();
        });

        Schema::table('alergije', function (Blueprint $table) {
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('korisnik_preferencije', function (Blueprint $table) {
            $table->dropTimestamps();
        });
    
        Schema::table('namirnica_recept', function (Blueprint $table) {
            $table->dropTimestamps();
        });
    
        Schema::table('alergije', function (Blueprint $table) {
            $table->dropTimestamps();
        });
    }
};
