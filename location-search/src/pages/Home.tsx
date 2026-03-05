// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapSearch from "../components/MapSearch";
import MapResult from "../components/MapResult";
import { useState } from "react";

export default function Home() {
  const [placeId, setPlaceId] = useState<string | null>(null);

  return (
    <div>
      <MapSearch onLocationSelect={setPlaceId}></MapSearch>
      {placeId && (
        <div>
          <MapResult placeId={placeId}></MapResult>
        </div>
      )}
    </div>
  );
}
