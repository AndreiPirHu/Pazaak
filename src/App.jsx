import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { MultiplayerGame } from "./components/multiplayerGame/multiplayerGame";
import { Home } from "./components/home/home";
import { Rules } from "./components/rules/rules";
import { Loadout } from "./components/loadout/loadout";
import { SingleplayerGame } from "./components/singleplayerGame/singleplayerGame";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/game" element={<MultiplayerGame />} />
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/loadout" element={<Loadout />} />
          <Route path="/singleplayer" element={<SingleplayerGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
