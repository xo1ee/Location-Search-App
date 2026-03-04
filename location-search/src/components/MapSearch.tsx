import { useState, useEffect } from "react";

type Place = {
  place_id: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export default function MapSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput); // triggers useEffect
  };
  useEffect(() => {
    if (!query) return;

    async function fetchPlaces() {
      try {
        setLoading(true);
        setError("");

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }

        const data = await response.json();

        setPlaces(data.results);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, [query]);
  return (
    <div>
      <h1>Type a Location</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="ie Seattle"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Used for debugging */}
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>{place.formatted_address}</li>
        ))}
      </ul>
    </div>
  );
}
