import { useNavigate } from "react-router-dom";
import "./rules.css";

export const Rules = () => {
  let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="Rules">
      <div className="text-container">
        <h1>Rules</h1>
        <p>
          Pazaak is a card game where the goal is to get to 20 or as close to 20
          as possible without going over. The player that has the highest score
          wins the round. First player to win 3 rounds wins the game.
        </p>
        <p>
          To their disposal, players have the ability to choose up to 3 extra
          usable cards that they can play whenever on their turn to reach the
          desired score.
        </p>
      </div>
      <div className="button-container">
        <button onClick={navigateToHome} className="game-button">
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};
