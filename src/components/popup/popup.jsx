import "./popup.css";

const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-text">
          <div className="children-container">{props.children}</div>
        </div>

        <button
          onClick={() => {
            props.setTrigger(false), props.startGame();
          }}
          className="game-button"
        >
          <span>Next Round</span>
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
