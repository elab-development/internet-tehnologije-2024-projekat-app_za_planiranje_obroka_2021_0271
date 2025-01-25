<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Obrok>
 */
class ObrokFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'datum' => $this->faker->dateTimeInInterval('+0 days', '+7 days')->format('Y-m-d'),
            'tip' => $this->faker->randomElement(['dorucak', 'rucak', 'uzina', 'vecera']),
            'korisnik_id' => \App\Models\Korisnik::factory(),
            'recept_id' => \App\Models\Recept::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
