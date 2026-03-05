import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  types: string[];
};

type Props = {
  onLocationSelect: (placeId: string) => void;
};

export default function MapSearch({ onLocationSelect }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput); // triggers useEffect
  };

  const handleNavigate = (place: Place) => {
    navigate("/details", { state: { place } });
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
        onLocationSelect(data.results[0].place_id);
        // For simplicity, select the first location in the array of possible matches
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, [query, onLocationSelect]);
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

      {places.length != 0 && (
        <label htmlFor="locations">Possible location(s):</label>
      )}

      <ul id="locations">
        {places.map((place) => (
          <li key={place.place_id}>
            {place.formatted_address}{" "}
            <a onClick={() => handleNavigate(place)}>Want More Info?</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
