import { useLocation } from "react-router-dom";

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

export default function PlaceDetails() {
  const location = useLocation();
  const { place } = location.state as { place: Place };

  if (!place) return <div>No place selected</div>;

  return (
    <div>
      <h2>{place.formatted_address}</h2>
      <h3>Coordinates</h3>
      <p>
        Lat: {place.geometry.location.lat}, Lng: {place.geometry.location.lng}
      </p>
      <h3>Categorizations</h3>
      <ul>
        {place.types.map((type) => (
          <li>{type}</li>
        ))}
      </ul>
    </div>
  );
}
