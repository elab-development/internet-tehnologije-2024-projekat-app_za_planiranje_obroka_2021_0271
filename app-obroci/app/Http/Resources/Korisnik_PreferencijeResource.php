<?php

namespace App\Http\Resources;

use App\Models\Preferencije;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Korisnik_PreferencijeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'korisnik'=> new KorisnikResource($this->resource->korisnik),
            'preferencija'=> new PreferencijeResource($this->resource->preferencija),
        ];
    }
}
