import { useState } from "react";
import "./multiplayerGame.css";

export const MultiplayerGame = () => {
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [turnCounter, setTurnCounter] = useState(1);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [cardClasses, setCardClasses] = useState({});

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

  const [playerTwoDeck, setPlayerTwoDeck] = useState([
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
    //random number for the next card
    let newCard = Math.floor(Math.random() * playerOneDeck.length);

    if (playerOneTurn == true) {
      //checks turn to add the right card
      let p1CardSlot = `p1c${turnCounter}`;

      //adds the right card class to the right card-slot element
      setCardClasses((prevState) => {
        return { ...prevState, [p1CardSlot]: playerOneDeck[newCard] };
      });

      //remove the already used card from the array
      setPlayerOneDeck(
        //filters the card in the array that is at the correct index point
        playerOneDeck.filter((_, index) => index !== newCard)
      );

      //end player 1 turn
      setPlayerOneTurn(!playerOneTurn);
    } else {
      //checks turn to add the right card
      let p2CardSlot = `p2c${turnCounter}`;

      //adds the right card class to the right card-slot element
      setCardClasses((prevState) => {
        return { ...prevState, [p2CardSlot]: playerTwoDeck[newCard] };
      });

      //remove the already used card from the array
      setPlayerTwoDeck(
        //filters the card in the array that is at the correct index point
        playerTwoDeck.filter((_, index) => index !== newCard)
      );

      setTurnCounter(turnCounter + 1);
      //end player 2 turn
      setPlayerOneTurn(!playerOneTurn);
    }
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
          <div className={`card-slot ${cardClasses.p2c1} `}></div>
          <div className={`card-slot ${cardClasses.p2c2} `}></div>
          <div className={`card-slot ${cardClasses.p2c3} `}></div>
          <div className={`card-slot ${cardClasses.p2c4} `}></div>
          <div className={`card-slot ${cardClasses.p2c5} `}></div>
          <div className={`card-slot ${cardClasses.p2c6} `}></div>
          <div className={`card-slot ${cardClasses.p2c7} `}></div>
          <div className={`card-slot ${cardClasses.p2c8} `}></div>
          <div className={`card-slot ${cardClasses.p2c9} `}></div>
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
