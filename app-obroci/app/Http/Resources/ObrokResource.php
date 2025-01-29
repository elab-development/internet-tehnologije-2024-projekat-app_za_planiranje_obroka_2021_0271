<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ObrokResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'obrok';

    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'datum'=>$this->resource->datum,
            'tip'=>$this->resource->tip,
            'korisnik'=> new KorisnikResource($this->resource->korisnik),
            'recept'=> new ReceptResource($this->resource->recept)
        ];
    }
}
