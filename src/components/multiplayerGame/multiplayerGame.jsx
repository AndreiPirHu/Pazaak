import { useState } from "react";
import "./multiplayerGame.css";

export const MultiplayerGame = () => {
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [turnCounter, setTurnCounter] = useState(1);

  const [cardClasses, setCardClasses] = useState({
    p1c1: "",
    p1c2: "",
    p1c3: "",
    p1c4: "",
    p1c5: "",
    p1c6: "",
    p1c7: "",
    p1c8: "",
    p1c9: "",
    p1c10: "",
  });

  const [playerOneDeck, setPlayerOneDeck] = useState([
    "NormalCard+1.png",
    "NormalCard+2.png",
    "NormalCard+3.png",
    "NormalCard+4.png",
    "NormalCard+5.png",
    "NormalCard+6.png",
    "NormalCard+7.png",
    "NormalCard+8.png",
    "NormalCard+9.png",
    "NormalCard+10.png",
  ]);

  const endTurn = () => {
    //random number for the card
    let newCard = Math.floor(Math.random() * playerOneDeck.length);
    //checks turn to add the right card
    let p1CardSlot = `p1c${turnCounter}`;

    //adds the right class to the right card
    setCardClasses(
      //(prevState) => {
      //return { ...prevState, [p1CardSlot]: playerOneDeck[newCard] };
      //}
      (cardClasses[p1CardSlot] = playerOneDeck[newCard])
    );
    //remove the already used card from the array
    setPlayerOneDeck(
      //filters the card in the array that is at the correct index point
      playerOneDeck.filter((_, index) => index !== newCard)
    );

    setTurnCounter(turnCounter + 1);
  };

  return (
    <div id="board">
      <div className="playerOneBoard">
        <div className="card-container">
          <div className={`card-slot ${cardClasses.p1c1} `}></div>
          <div className={`card-slot ${cardClasses.p1c2} `}></div>
          <div className={`card-slot ${cardClasses.p1c3} `}></div>
          <div className={`card-slot ${cardClasses.p1c4} `}></div>
          <div className={`card-slot ${cardClasses.p1c5} `}></div>
          <div className={`card-slot ${cardClasses.p1c6} `}></div>
          <div className={`card-slot ${cardClasses.p1c7} `}></div>
          <div className={`card-slot ${cardClasses.p1c8} `}></div>
          <div className={`card-slot ${cardClasses.p1c9} `}></div>
        </div>
        <div className="extra-cards-container">
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
        </div>
      </div>
      <div id="board-divider"></div>
      <div className="playerTwoBoard">
        <div className="card-container">
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
          <div className="card-slot"></div>
        </div>
        <div className="extra-cards-container">
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
        </div>
      </div>
      <div id="buttons-container">
        <button className="game-button">
          <span>Stand</span>
        </button>
        <button onClick={endTurn} className="game-button">
          <span>End Turn</span>
        </button>
      </div>
    </div>
  );
};
