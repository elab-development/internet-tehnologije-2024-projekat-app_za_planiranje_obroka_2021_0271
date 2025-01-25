<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Namirnica>
 */
class NamirnicaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->word(),
            'broj_kalorija' => $this->faker->numberBetween(50, 800),
            'proteini' => $this->faker->numberBetween(1, 50),
            'masti' => $this->faker->numberBetween(1, 50),
            'ugljeni_hidrati' => $this->faker->numberBetween(1, 100),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
