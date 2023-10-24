import { Route, Routes } from "react-router-dom";
import { MultiplayerGame } from "./components/multiplayerGame/multiplayerGame";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MultiplayerGame />} />
      </Routes>
    </div>
  );
}

export default App;
