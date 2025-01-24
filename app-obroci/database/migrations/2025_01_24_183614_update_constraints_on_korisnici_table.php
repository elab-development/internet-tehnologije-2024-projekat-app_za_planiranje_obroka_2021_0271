<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('korisnici', function (Blueprint $table) {
            $table->string('ime', 50)->change();
            $table->string('prezime', 50)->change(); 
            $table->string('korisnicko_ime',50)->change();
            $table->string('sifra', 40)->change();

        });

        DB::statement("ALTER TABLE korisnici ADD CONSTRAINT check_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$')");
        DB::statement("ALTER TABLE korisnici ADD CONSTRAINT check_sifra_length CHECK (length(sifra) >= 10 AND length(sifra) <= 40)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('korisnici', function (Blueprint $table) {
            $table->string('ime', 255)->change();
            $table->string('prezime', 255)->change();
            $table->string('korisnicko_ime', 255)->change();
            $table->string('sifra', 255)->change();
        });

        DB::statement("ALTER TABLE korisnici DROP CONSTRAINT check_email_format");
        DB::statement("ALTER TABLE korisnici DROP CONSTRAINT check_sifra_length");
    }
};
