<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Namirnica-Recept>
 */
class Namirnica_ReceptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'recept_id' => \App\Models\Recept::factory(),
            'namirnica_id' => \App\Models\Namirnica::factory(),
            'kolicina' => $this->faker->numberBetween(1, 500),
        ];
    }
}
