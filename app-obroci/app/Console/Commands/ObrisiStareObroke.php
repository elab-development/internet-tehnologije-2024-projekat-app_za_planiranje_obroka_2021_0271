<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Obrok;
use Carbon\Carbon;

class ObrisiStareObroke extends Command
{
    protected $signature = 'obroci:obrisi-stare';
    protected $description = 'Brisanje obroka čiji je datum manji od današnjeg.';

    public function handle()
    {
        $danas = Carbon::today();

        $broj = Obrok::where('datum', '<', $danas)->delete();

        $this->info("Obrisano $broj obroka starijih od današnjeg datuma.");
    }
}