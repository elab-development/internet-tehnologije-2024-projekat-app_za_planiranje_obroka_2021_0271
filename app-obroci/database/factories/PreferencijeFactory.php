<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Preferencije>
 */
class PreferencijeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->randomElement(['veganski', 'vegetarijanski', 'bez_laktoze', 'bez_glutena', 'posno'])
        ];
    }
}
