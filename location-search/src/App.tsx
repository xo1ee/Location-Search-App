import "./App.css";
import MapSearch from "./components/MapSearch";
import MapResult from "./components/MapResult";
import { useState } from "react";

function App() {
  const [placeId, setPlaceId] = useState<string | null>(null);

  return (
    <>
      <MapSearch onLocationSelect={setPlaceId}></MapSearch>
      {placeId && (
        <>
          <MapResult placeId={placeId}></MapResult>
        </>
      )}
    </>
  );
}

export default App;
