// components/route/place-search.tsx
"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Loader2 } from "lucide-react";

interface PlaceSearchProps {
  onSelect: (lat: number, lng: number, name: string, desc: string) => void;
}

export function PlaceSearch({ onSelect }: PlaceSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1`);
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border-2 border-border p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-primary" /> Buscar Lugares
      </h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: Torre Eiffel..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Buscar'}
        </Button>
      </form>

      <div className="space-y-2 max-h-52 overflow-y-auto">
        {results.map(res => (
          <button 
            key={res.place_id}
            onClick={() => {
              const name = res.display_name.split(',')[0]; // Nombre corto
              const desc = res.display_name; // Dirección completa
              onSelect(parseFloat(res.lat), parseFloat(res.lon), name, desc);
              setResults([]); // Limpiar resultados tras elegir
              setQuery('');
            }}
            className="w-full text-left p-3 hover:bg-surface-secondary border-b last:border-0 transition-colors flex items-start gap-2"
          >
            <MapPin className="w-4 h-4 mt-1 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{res.display_name.split(',')[0]}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{res.display_name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}