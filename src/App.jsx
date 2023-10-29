import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { MultiplayerGame } from "./components/multiplayerGame/multiplayerGame";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MultiplayerGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
