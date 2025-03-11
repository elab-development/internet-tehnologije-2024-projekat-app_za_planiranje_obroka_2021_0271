<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReceptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'recept';

    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'naziv'=>$this->resource->naziv,
            'opis'=>$this->resource->opis,
            'veganski'=>$this->resource->veganski,
            'vegetarijanski'=>$this->resource->vegetarijanski,
            'bez_laktoze'=>$this->resource->bez_laktoze,
            'bez_glutena'=>$this->resource->bez_glutena,
            'posno'=>$this->resource->posno,
        ];
    }
}
