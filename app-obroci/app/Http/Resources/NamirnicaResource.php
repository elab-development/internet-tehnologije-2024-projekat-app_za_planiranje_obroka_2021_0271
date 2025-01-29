<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NamirnicaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'namirnica';

    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->resource->id,
            'naziv'=>$this->resource->naziv,
            'broj_kalorija'=>$this->resource->broj_kalorija,
            'proteini'=>$this->resource->proteini,
            'masti'=>$this->resource->masti,
            'ugljeni_hidrati'=>$this->resource->ugljeni_hidrati

        ];
    }
}
