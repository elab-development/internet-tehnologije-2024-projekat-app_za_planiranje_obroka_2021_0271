<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KorisnikResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'korisnik';
    
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'ime'=>$this->resource->ime,
            'prezime'=>$this->resource->prezime,
            'email'=>$this->resource->email,
            'korisnicko_ime'=>$this->resource->korisnicko_ime
            
        ];
    }
}
