<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [\App\Console\Commands\ObrisiStareObroke::class];

    protected function schedule(Schedule $schedule)
    {
        // php artisan obroci:obrisi-stare - ovo je komanda za testiranje ovog automatizovanog brisanja obroka
        $schedule->command('obroci:obrisi-stare')->daily();
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}