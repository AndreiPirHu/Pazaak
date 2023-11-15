import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { Rules } from "./components/rules/rules";
import { MultiplayerGame } from "./components/multiplayerGame/multiplayerGame";
import { MultiplayerLoadout } from "./components/multiplayerLoadout/multiplayerLoadout";
import { SingleplayerGame } from "./components/singleplayerGame/singleplayerGame";
import { SingleplayerLoadout } from "./components/singleplayerLoadout/singleplayerLoadout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/multiplayer-loadout" element={<MultiplayerLoadout />} />
          <Route path="/multiplayer" element={<MultiplayerGame />} />
          <Route
            path="/singleplayer-loadout"
            element={<SingleplayerLoadout />}
          />
          <Route path="/singleplayer" element={<SingleplayerGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
