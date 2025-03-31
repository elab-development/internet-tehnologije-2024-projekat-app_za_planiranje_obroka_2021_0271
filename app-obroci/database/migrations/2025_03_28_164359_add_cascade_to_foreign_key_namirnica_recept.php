<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Add cascade delete to the foreign key on 'korisnik_preferencije'
        Schema::table('namirnica_recept', function (Blueprint $table) {
            // Drop the old foreign key
            $table->dropForeign(['namirnica_id']);
            // Add the new foreign key with cascade delete
            $table->foreign('namirnica_id')
                  ->references('id')->on('namirnice')
                  ->onDelete('cascade');
        });

    }


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Rollback the changes made in the 'up' method
        Schema::table('namirnica_recept', function (Blueprint $table) {
            $table->dropForeign(['namirnica_id']);
            $table->foreign('namirnica_id')
                  ->references('id')->on('namirnice');
        });

        

    }
};
