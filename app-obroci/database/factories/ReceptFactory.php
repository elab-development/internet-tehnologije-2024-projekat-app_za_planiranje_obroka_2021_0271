<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recept>
 */
class ReceptFactory extends Factory
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
            'opis' => $this->faker->paragraph(),
            'veganski' => $this->faker->boolean(),
            'vegetarijanski' => $this->faker->boolean(),
            'bez_laktoze' => $this->faker->boolean(),
            'bez_glutena' => $this->faker->boolean(),
            'posno' => $this->faker->boolean(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
