<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_broj_kalorija");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_proteini");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_masti");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_ugljeni_hidrati");

        // Add new constraints with >= 0
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_broj_kalorija CHECK (broj_kalorija >= 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_proteini CHECK (proteini >= 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_masti CHECK (masti >= 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_ugljeni_hidrati CHECK (ugljeni_hidrati >= 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_broj_kalorija");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_proteini");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_masti");
        DB::statement("ALTER TABLE namirnice DROP CONSTRAINT IF EXISTS check_ugljeni_hidrati");

        // Revert to the original constraints (i.e., > 0)
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_broj_kalorija CHECK (broj_kalorija > 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_proteini CHECK (proteini > 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_masti CHECK (masti > 0)");
        DB::statement("ALTER TABLE namirnice ADD CONSTRAINT check_ugljeni_hidrati CHECK (ugljeni_hidrati > 0)");
    }
};
