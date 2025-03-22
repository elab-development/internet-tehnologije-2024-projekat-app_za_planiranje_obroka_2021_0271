<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Namirnica_ReceptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'namirnica'=> new NamirnicaResource ($this->resource->namirnica),
            'recept'=> new ReceptResource($this->resource->recept),
            'kolicina' => $this->resource->kolicina
        ];
    }
}
