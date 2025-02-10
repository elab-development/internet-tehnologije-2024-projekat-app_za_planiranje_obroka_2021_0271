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

        $namirnice = $query->paginate($request->get('per_page', 10));
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
            'broj_kalorija' => 'required|integer|min:1',
            'proteini' => 'required|integer|min:1',
            'masti' => 'required|integer|min:1',
            'ugljeni_hidrati' => 'required|integer|min:1'
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



    public function uzmiNutritivneVrednostiAPI($namirnica)
{
    // Proveri da li proizvod postoji u bazi
    $postojeciProizvod = Namirnica::where('naziv', 'like', '%' . $namirnica . '%')->first();

    if ($postojeciProizvod) {
        return response()->json([
            'naziv' => $postojeciProizvod->naziv,
            'proteini' => $postojeciProizvod->proteini,
            'ugljeni_hidrati' => $postojeciProizvod->ugljeni_hidrati,
            'masti' => $postojeciProizvod->masti,
            'broj_kalorija' => $postojeciProizvod->broj_kalorija,
        ]);
    }

    // Pretraga proizvoda po nazivu u API-u
    $searchResponse = Http::get("https://world.openfoodfacts.org/cgi/search.pl", [
        'search_terms' => $namirnica,
        'search_simple' => 1,
        'action' => 'process',
        'page_size' => 5,
        'json' => 1
    ]);

    if ($searchResponse->failed() || empty($searchResponse['products'])) {
        return response()->json(['error' => 'Podaci nisu pronađeni'], 404);
    }

    $proizvodi = $searchResponse['products'];
    $rezultat = [];

    foreach ($proizvodi as $proizvod) {
        if (empty($proizvod['nutriments'])) {
            continue; // Ako nema nutritivnih podataka, preskoči proizvod
        }

        $nutrijenti = $proizvod['nutriments'];
        $rezultat[] = [
            'naziv' => $proizvod['product_name'] ?? 'Nepoznato',
            'proteini' => $nutrijenti['proteins_100g'] ?? null,
            'ugljeni_hidrati' => $nutrijenti['carbohydrates_100g'] ?? null,
            'masti' => $nutrijenti['fat_100g'] ?? null,
            'kalorije' => $nutrijenti['energy-kcal_100g'] ?? null
        ];
    }

    if (empty($rezultat)) {
        return response()->json(['error' => 'Nutritivni podaci nisu dostupni za bilo koji proizvod'], 404);
    }

    return response()->json($rezultat);
} 
    


}
