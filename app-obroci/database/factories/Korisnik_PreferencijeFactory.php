<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Korisnik-Preferencije>
 */
class Korisnik_PreferencijeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'korisnik_id' => \App\Models\Korisnik::factory(),
            'preferencija_id' => \App\Models\Preferencije::factory()
        ];
    }
}
