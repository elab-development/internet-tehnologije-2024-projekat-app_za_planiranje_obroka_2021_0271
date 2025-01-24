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
        Schema::table('recepti', function (Blueprint $table) {
            $table->boolean('veganski');
            $table->boolean('vegetarijanski');
            $table->boolean('bez_laktoze');
            $table->boolean('bez_glutena');
            $table->boolean('posno');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recepti', function (Blueprint $table) {
            $table->dropColumn('veganski');
            $table->dropColumn('vegetarijanski');
            $table->dropColumn('bez_laktoze');
            $table->dropColumn('bez_glutena');
            $table->dropColumn('posno');
        });
    }
};
