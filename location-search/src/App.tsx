import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PlaceDetails from "./components/PlaceDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/details" element={<PlaceDetails />} />
    </Routes>
  );
}

export default App;
