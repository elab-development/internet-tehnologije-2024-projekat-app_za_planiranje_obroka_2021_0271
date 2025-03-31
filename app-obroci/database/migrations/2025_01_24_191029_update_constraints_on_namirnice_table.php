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
        Schema::table('namirnice', function (Blueprint $table) {
            $table->string('naziv', 40)->change();
        });

        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_broj_kalorija CHECK (broj_kalorija > 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_proteini CHECK (proteini > 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_masti CHECK (masti > 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_ugljeni_hidrati CHECK (ugljeni_hidrati > 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('namirnice', function (Blueprint $table) {
            $table->string('naziv',255)->change();
        });

        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT check_broj_kalorija");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT check_proteini");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT check_masti");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT check_ugljeni_hidrati");
    }
};
