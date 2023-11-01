import { useNavigate } from "react-router-dom";
import "./home.css";

export const Home = () => {
  let navigate = useNavigate();

  const navigateToLoadout = () => {
    navigate("/loadout");
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
          <button onClick={navigateToLoadout} className="game-button">
            <span>New Game</span>
          </button>
          <button onClick={navigateToRules} className="game-button">
            <span>Rules</span>
          </button>
        </div>
      </div>
    </div>
  );
};
