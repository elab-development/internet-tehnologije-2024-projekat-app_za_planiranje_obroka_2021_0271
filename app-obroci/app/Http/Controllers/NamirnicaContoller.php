<?php

namespace App\Http\Controllers;

use App\Models\Namirnica;
use App\Http\Controllers\Controller;
use App\Http\Resources\NamirnicaCollection;
use App\Http\Resources\NamirnicaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class NamirnicaContoller extends Controller
{

    public function index(Request $request)
    {
        $query = Namirnica::query();

        
        if ($request->has('naziv')) {
            $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }

        if ($request->has('broj_kalorija')) {
            $broj_kalorija = $request->get('broj_kalorija');
            $operacija = $request->get('broj_kalorija_operator', '='); // Default operator '>'
            $query->where('broj_kalorija', $operacija, $broj_kalorija);
        }
    
       
        if ($request->has('proteini')) {
            $proteini = $request->get('proteini');
            $operacija = $request->get('proteini_operator', '='); // Default operator '>'
            $query->where('proteini', $operacija, $proteini);
        }
    

        if ($request->has('masti')) {
            $masti = $request->get('masti');
            $operacija = $request->get('masti_operator', '='); 
            $query->where('masti', $operacija, $masti);
        }
    
       
        if ($request->has('ugljeni_hidrati')) {
            $ugljeni_hidrati = $request->get('ugljeni_hidrati');
            $operacija = $request->get('ugljeni_hidrati_operator', '='); 
            $query->where('ugljeni_hidrati', $operacija, $ugljeni_hidrati);
        }

        $query->orderBy('naziv', 'asc');
    
        $namirnice = $query->get();
        return new NamirnicaCollection($namirnice);
    }

    public function show($namirnica_id)
    {
        $namirnica = Namirnica::find($namirnica_id);
        if(is_null($namirnica)){
            return response()->json('Namirnica nije pronadjena', 404 );
        }
        return new NamirnicaResource($namirnica);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'broj_kalorija' => 'required|integer|min:0',
            'proteini' => 'required|integer|min:0',
            'masti' => 'required|integer|min:0',
            'ugljeni_hidrati' => 'required|integer|min:0'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
    
        $namirnica = Namirnica::create([
            'naziv' => $request->naziv,
            'broj_kalorija' => $request->broj_kalorija,
            'proteini' => $request->proteini,
            'masti' => $request->masti,
            'ugljeni_hidrati' => $request->ugljeni_hidrati
        ]);
    
        return response()->json(['Namirnica je uspesno dodata.', new NamirnicaResource($namirnica)]);
    }

    
    public function update(Request $request, $id)
    {
        $namirnica = Namirnica::findOrFail($id);

        Log::info('Updating namirnica:', ['namirnica' => $namirnica]);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'broj_kalorija' => 'required|integer|min:0',
            'proteini' => 'required|integer|min:0',
            'masti' => 'required|integer|min:0',
            'ugljeni_hidrati' => 'required|integer|min:0'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $namirnica->naziv = $request->naziv;
        $namirnica->broj_kalorija = $request->broj_kalorija;
        $namirnica->proteini = $request->proteini;
        $namirnica->masti = $request->masti;
        $namirnica->ugljeni_hidrati = $request->ugljeni_hidrati;
        
        $namirnica->save();
    
        return response()->json(['message' => 'Namirnica je uspešno izmenjena.', 'namirnica' => $namirnica]);
    }

    public function destroy($id)
    {
        $namirnica = Namirnica::findOrFail($id);

        $namirnica->delete();

        return response()->json(['Namirnica je uspesno obrisana.']);
    }


    // public function uzmiNutritivneVrednostiAPI($namirnica)
    // {
    //     // Check if the product exists in the local database
    //     $existingProduct = Namirnica::where('naziv', 'like', '%' . $namirnica . '%')->first();
    
    //     if ($existingProduct) {
    //         return response()->json([
    //             'naziv' => $existingProduct->naziv,
    //             'proteini' => $existingProduct->proteini,
    //             'ugljeni_hidrati' => $existingProduct->ugljeni_hidrati,
    //             'masti' => $existingProduct->masti,
    //             'broj_kalorija' => $existingProduct->broj_kalorija,
    //         ]);
    //     }
    
    //     // Search for the product via the Open Food Facts API
    //     try {
    //         $searchResponse = Http::get("https://world.openfoodfacts.org/cgi/search.pl", [
    //             'search_terms' => $namirnica,
    //             'search_simple' => 1,
    //             'action' => 'process',
    //             'page_size' => 5,
    //             'json' => 1
    //         ]);
    
    //         if ($searchResponse->failed() || empty($searchResponse['products'])) {
    //             return response()->json(['error' => 'Podaci nisu pronađeni'], 404);
    //         }
    
    //         $products = $searchResponse['products'];
    //         $results = [];
    
    //         // Loop through the products and extract nutritional data
    //         foreach ($products as $product) {
    //             if (empty($product['nutriments']) || empty($product['product_name'])) {
    //                 continue; // Skip products without nutritional data or product name
    //             }
    
    //             $nutrients = $product['nutriments'];
    //             $results[] = [
    //                 'naziv' => $product['product_name'] ?? 'Nepoznato',
    //                 'proteini' => $nutrients['proteins_100g'] ?? null,
    //                 'ugljeni_hidrati' => $nutrients['carbohydrates_100g'] ?? null,
    //                 'masti' => $nutrients['fat_100g'] ?? null,
    //                 'kalorije' => $nutrients['energy-kcal_100g'] ?? null
    //             ];
    //         }
    
    //         if (empty($results)) {
    //             return response()->json(['error' => 'Nutritivni podaci nisu dostupni za bilo koji proizvod'], 404);
    //         }
    
    //         return response()->json($results);
    //     } catch (\Exception $e) {
    //         // Handle any errors in the API call
    //         return response()->json(['error' => 'Došlo je do greške prilikom pretrage podataka.'], 500);
    //     }
    // }
    





    public function uzmiNutritivneVrednostiAPI($namirnica)
    {
        //$apiKey = 'QIxj6zrJS1KrbUezmCL8YhdtgGdaXfZJD9ecDWBe';  // Replace with your actual USDA API key
        $apiKey = env('USDA_API_KEY');
        $url = "https://api.nal.usda.gov/fdc/v1/foods/search";
    
        try {
            // Make the API request to USDA API
            $response = Http::get($url, [
                'api_key' => $apiKey,
                'query' => $namirnica,  // Searching for the product name
                'pageSize' => 3,        // Get multiple results
            ]);
    
            // Check if the response is successful
            if ($response->failed()) {
                return response()->json(['error' => 'Error fetching data from USDA API.'], 500);
            }
    
            $foodData = $response->json();
            
            // Check if data is available
            if (isset($foodData['foods']) && count($foodData['foods']) > 0) {
                $results = []; // Array to store multiple results
    
                foreach ($foodData['foods'] as $food) {
                    // Extract the relevant data
                    $foodDescription = $food['description'];
    
                    // Find the relevant nutrients
                    $calories = $this->getNutrientValue($food['foodNutrients'], 'Energy');
                    $fat = $this->getNutrientValue($food['foodNutrients'], 'Total lipid (fat)');
                    $protein = $this->getNutrientValue($food['foodNutrients'], 'Protein');
                    $carbs = $this->getNutrientValue($food['foodNutrients'], 'Carbohydrate, by difference');
    
                    // Store each food result in the array
                    $results[] = [
                       'naziv' => $foodDescription,
                        'broj_kalorija' => round($calories),   // Round to the nearest integer
                        'masti' => round($fat),                // Round to the nearest integer
                        'proteini' => round($protein),         // Round to the nearest integer
                        'ugljeni_hidrati' => round($carbs)     // Round to the nearest integer
                    ];
                }
    
                // Return all results
                return response()->json($results);
            }
    
            return response()->json(['error' => 'No food data found.'], 404);
    
        } catch (\Exception $e) {
            // Handle any exceptions during the API call
            return response()->json(['error' => 'There was an error while searching for data.'], 500);
        }
    }


    private function getNutrientValue($nutrients, $nutrientName)
{
    // Search for the nutrient by name and return the value, or 0 if not found
    foreach ($nutrients as $nutrient) {
        if (strcasecmp($nutrient['nutrientName'], $nutrientName) == 0) {
            return $nutrient['value'];
        }
    }
    return 0;  // Return 0 if nutrient is not found
}


  




















}
