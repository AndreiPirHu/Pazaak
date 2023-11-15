import { useNavigate } from "react-router-dom";
import "./home.css";

export const Home = () => {
  let navigate = useNavigate();

  const navigateToMultiplayerLoadout = () => {
    navigate("/multiplayer-loadout");
  };
  const navigateToSingleplayerLoadout = () => {
    navigate("/singleplayer-loadout");
  };

  const navigateToRules = () => {
    navigate("/rules");
  };

  return (
    <div className="home">
      <div className="menu-container">
        <div className="title-container">
          <h1>Pazaak</h1>
        </div>

        <div className="button-container">
          <button
            onClick={navigateToSingleplayerLoadout}
            className="game-button"
          >
            <span>Singleplayer</span>
          </button>
          <button
            onClick={navigateToMultiplayerLoadout}
            className="game-button"
          >
            <span>Multiplayer</span>
          </button>
          <button onClick={navigateToRules} className="game-button">
            <span>Rules</span>
          </button>
        </div>
      </div>
    </div>
  );
};
