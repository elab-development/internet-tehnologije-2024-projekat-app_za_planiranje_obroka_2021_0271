<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToForeignKeys extends Migration
{
    public function up()
    {
        // Add cascade delete to the foreign key on 'korisnik_preferencije'
        Schema::table('korisnik_preferencije', function (Blueprint $table) {
            // Drop the old foreign key
            $table->dropForeign(['korisnik_id']);
            
            // Add the new foreign key with cascade delete
            $table->foreign('korisnik_id')
                  ->references('id')->on('korisnici')
                  ->onDelete('cascade');
        });

        // Add cascade delete to the foreign key on 'alergije'
        Schema::table('alergije', function (Blueprint $table) {
            // Drop the old foreign key
            $table->dropForeign(['korisnik_id']);
            
            // Add the new foreign key with cascade delete
            $table->foreign('korisnik_id')
                  ->references('id')->on('korisnici')
                  ->onDelete('cascade');
        });

    }

    public function down()
    {
        // Rollback the changes made in the 'up' method
        Schema::table('korisnik_preferencije', function (Blueprint $table) {
            $table->dropForeign(['korisnik_id']);
            $table->foreign('korisnik_id')
                  ->references('id')->on('korisnici');
        });

        Schema::table('alergije', function (Blueprint $table) {
            $table->dropForeign(['korisnik_id']);
            $table->foreign('korisnik_id')
                  ->references('id')->on('korisnici');
        });

    }
}

