import "./popup.css";

const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-text">{props.children}</div>

        <button onClick={() => props.setTrigger(false)} className="game-button">
          <span>Next Round</span>
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
