import { useEffect, useState } from "react";
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

  const startGame = () => {
    //random number for the first card
    let newCard = Math.floor(Math.random() * playerOneDeck.length);
    let p1CardSlot = "p1c1";

    //adds the right card class to the right card-slot element
    setCardClasses((prevState) => {
      return { ...prevState, [p1CardSlot]: playerOneDeck[newCard] };
    });

    //add the score
    setPlayerOneScore(playerOneScore + scoreCounter(playerOneDeck[newCard]));

    //remove the already used card from the array after adding the score
    setPlayerOneDeck(
      //filters the card in the array that is at the correct index point
      playerOneDeck.filter((_, index) => index !== newCard)
    );
  };

  const endTurn = () => {
    //random number for the next card
    let newCard = Math.floor(Math.random() * playerOneDeck.length);

    if (!playerOneTurn) {
      //checks turn to add the right card
      let p1CardSlot = `p1c${turnCounter}`;

      //adds the right card class to the right card-slot element
      setCardClasses((prevState) => {
        return { ...prevState, [p1CardSlot]: playerOneDeck[newCard] };
      });

      //add the score
      setPlayerOneScore(playerOneScore + scoreCounter(playerOneDeck[newCard]));

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

      //add the score
      setPlayerTwoScore(playerTwoScore + scoreCounter(playerTwoDeck[newCard]));

      //remove the already used card from the array
      setPlayerTwoDeck(
        //filters the card in the array that is at the correct index point
        playerTwoDeck.filter((_, index) => index !== newCard)
      );

      //end turn
      setTurnCounter(turnCounter + 1);
      //end player 2 turn
      setPlayerOneTurn(!playerOneTurn);
    }
  };

  const scoreCounter = (card) => {
    switch (card) {
      case "NormalCard+1.png":
        return 1;
      case "NormalCard+2.png":
        return 2;
      case "NormalCard+3.png":
        return 3;
      case "NormalCard+4.png":
        return 4;
      case "NormalCard+5.png":
        return 5;
      case "NormalCard+6.png":
        return 6;
      case "NormalCard+7.png":
        return 7;
      case "NormalCard+8.png":
        return 8;
      case "NormalCard+9.png":
        return 9;
      case "NormalCard+10.png":
        return 10;
    }
  };

  //Runs only once on first render
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div id="board">
      <div className={`playerOneBoard ${playerOneTurn ? "activeBorder" : ""}`}>
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
          <div className="playerScore">{playerOneScore}</div>
        </div>
        <div className="extra-cards-container">
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
        </div>
      </div>
      <div id="board-divider"></div>
      <div className={`playerTwoBoard ${playerOneTurn ? "" : "activeBorder"}`}>
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
          <div className="playerScore">{playerTwoScore}</div>
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
