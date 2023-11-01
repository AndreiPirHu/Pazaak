import { useNavigate } from "react-router-dom";
import "./popup.css";

const Popup = (props) => {
  let playerOneWins = props.playerOneWins;
  let playerTwoWins = props.playerTwoWins;

  let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-text">
          <div className="children-container">{props.children}</div>
        </div>

        <button
          onClick={() => {
            props.setTrigger(false);
            if (playerOneWins === 3 || playerTwoWins === 3) {
              navigateToHome();
            } else {
              props.startGame();
            }
          }}
          className="game-button"
        >
          <span>
            {playerOneWins === 3 || playerTwoWins === 3 ? "Home" : "Next Round"}
          </span>
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
