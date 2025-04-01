<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BMICalculatorController extends Controller
{
    public function calculateBMI(Request $request)
    {
        $request->validate([
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
        ]);
    
        $weightInLbs = $request->input('weight') * 2.20462;  // kg to lbs
        $heightInInches = $request->input('height') * 0.393701;  // cm to inches
    
        $apiUrl = "https://smart-body-mass-index-calculator-bmi.p.rapidapi.com/api/BMI/imperial";
    
        $response = Http::withHeaders([
            'X-RapidAPI-Key' => env('RAPIDAPI_KEY'),
            'X-RapidAPI-Host' => 'smart-body-mass-index-calculator-bmi.p.rapidapi.com',
        ])->get($apiUrl, [
            'lbs' => $weightInLbs,
            'inches' => $heightInInches,
        ]);
    
        if ($response->successful()) {
            $data = $response->json();
    
            
            $categoryTranslations = [
                'Underweight' => 'Premala telesna težina',
                'Normal' => 'Normalna telesna težina',
                'Overweight' => 'Prekomerna telesna težina',
                'Obese' => 'Gojaznost',
                'Severely obese' => 'Teška gojaznost',
            ];
    
          
            $category = $data['bmiCategoryForAdults']['category'];
            $translatedCategory = $categoryTranslations[$category] ?? $category;
    
          
            $weightInKg = $data['weight_in_lbs'] * 0.453592;  // lbs to kg
            $heightInCm = $data['height_in_inches'] * 2.54;   // inches to cm
    
           
            $translatedResponse = [
                'bmi' => round($data['bmi'], 2),
                'height_in_cm' => round($heightInCm, 2), 
                'weight_in_kg' => round($weightInKg, 2),  
                'bmiCategoryForAdults' => [
                    'category' => $translatedCategory,
                    'range' => $data['bmiCategoryForAdults']['range'],
                    'normalRange' => $data['bmiCategoryForAdults']['normalRange'],
                ],
            ];
    
            return response()->json($translatedResponse);
        } else {
            return response()->json([
                'error' => 'Failed to fetch BMI data',
                'message' => $response->body(),
            ], $response->status());
        }
    }
}
