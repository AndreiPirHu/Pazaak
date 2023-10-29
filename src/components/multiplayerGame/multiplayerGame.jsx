import { useEffect, useState } from "react";
import "./multiplayerGame.css";

export const MultiplayerGame = () => {
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [playerOneTurnCounter, setPlayerOneTurnCounter] = useState(1);
  const [playerTwoTurnCounter, setPlayerTwoTurnCounter] = useState(1);
  const [playerOneStand, setPlayerOneStand] = useState(false);
  const [playerTwoStand, setPlayerTwoStand] = useState(false);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
  const [cardClasses, setCardClasses] = useState({});
  const [playerOneExtraCards, setPlayerOneExtraCards] = useState({});
  const [playerTwoExtraCards, setPlayerTwoExtraCards] = useState({});
  const playerOneScoreClass =
    playerOneScore > 20 ? "highScoreColor" : "lowScoreColor";

  const playerTwoScoreClass =
    playerTwoScore > 20 ? "highScoreColor" : "lowScoreColor";

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

  const playerStand = () => {
    //sets true for the player that pressed stand
    if (playerOneTurn) {
      setPlayerOneStand(true);
    } else {
      setPlayerTwoStand(true);
    }
    //change triggers useEffect that ends the turn
  };

  const checkForOver20 = () => {
    //updates currentPlayerScore useState to disable or enable stand button
    if (playerOneTurn) {
      setCurrentPlayerScore(playerOneScore);
    } else {
      setCurrentPlayerScore(playerTwoScore);
    }
  };

  const checkFor20 = () => {
    if (
      (playerOneTurn && playerOneScore == 20) ||
      (!playerOneTurn && playerTwoScore == 20)
    ) {
      playerStand();
    }
  };

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

  const newEndTurn = () => {
    //1. check if player has over 20 for instant loss
    if (playerOneTurn) {
      if (playerOneScore > 20) {
        TODO; //Player one loses
      }
    } else {
      if (playerTwoScore > 20) {
        TODO; //Player two loses
      }
    }

    //2. check if a player has pressed stand or not and set turn accordingly

    //2.1.1 go over to player 2 turn

    if (playerOneTurn && !playerTwoStand) {
      //random number for the next card
      let newCard = Math.floor(Math.random() * playerTwoDeck.length);
      //checks turn to add the right card
      let p2CardSlot = `p2c${playerTwoTurnCounter}`;
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
      //player turn counter +1 for next card slot
      setPlayerOneTurnCounter(playerOneTurnCounter + 1);
      //end player 1 turn
      setPlayerOneTurn(!playerOneTurn);
    }
    //2.1.2 replay player 1 turn since player two stands
    else if (playerOneTurn && playerTwoStand) {
      //random number for the next card
      let newCard = Math.floor(Math.random() * playerOneDeck.length);
      //player turn counter +1 for next card slot
      setPlayerOneTurnCounter(playerOneTurnCounter + 1);
      //checks turn to add the right card
      let p1CardSlot = `p1c${playerOneTurnCounter}`;
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
      //does not end player one turn
    }

    //2.2.1 go over to player 1 turn

    if (!playerOneTurn && !playerOneStand) {
      //random number for the next card
      let newCard = Math.floor(Math.random() * playerOneDeck.length);
      //checks turn to add the right card
      let p1CardSlot = `p1c${playerOneTurnCounter}`;
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
      //player turn counter +1 for next card slot
      setPlayerTwoTurnCounter(playerTwoTurnCounter + 1);
      //end player 2 turn
      setPlayerOneTurn(!playerOneTurn);
    }
    //2.2.2 replay player 2 turn since player 1 stands
    else if (!playerOneTurn && playerOneStand) {
      //random number for the next card
      let newCard = Math.floor(Math.random() * playerTwoDeck.length);
      //player turn counter +1 for next card slot
      setPlayerTwoTurnCounter(playerTwoTurnCounter + 1);
      //checks turn to add the right card
      let p2CardSlot = `p2c${playerTwoTurnCounter}`;
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
      //does not end player one turn
    }
  };

  const endTurn = () => {
    //random number for the next card
    let newCard = Math.floor(Math.random() * playerOneDeck.length);

    if (!playerOneTurn) {
      //checks turn to add the right card
      let p1CardSlot = `p1c${playerOneTurnCounter}`;

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

      //Checks if player 2 has pressed stand before passing turn, otherwise p1 replays
      if (playerTwoStand) {
        setPlayerOneTurnCounter(playerOneTurnCounter + 1);
      } else {
        //player turn counter +1 for next card slot
        setPlayerTwoTurnCounter(playerTwoTurnCounter + 1);
        //end player 1 turn
        setPlayerOneTurn(!playerOneTurn);
      }
    } else {
      //checks turn to add the right card
      let p2CardSlot = `p2c${playerTwoTurnCounter}`;

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
      //Checks if player 2 has pressed stand before passing turn, otherwise p1 replays
      if (playerOneStand) {
        setPlayerTwoTurnCounter(playerTwoTurnCounter + 1);
      } else {
        //player turn counter +1 for next card slot
        setPlayerOneTurnCounter(playerOneTurnCounter + 1);
        //end player 2 turn
        setPlayerOneTurn(!playerOneTurn);
      }
    }
  };

  useEffect(() => {
    //checks if both players have pressed stand and then checks win conditions
    if (playerOneStand && playerTwoStand) {
      TODO; //winCondition chekc that checks if both players have 20 or who has closest to 20 and not over
    } else if (playerOneStand || playerTwoStand) {
      if (playerOneStand) {
        setPlayerTwoTurnCounter(playerTwoTurnCounter + 1);
      } else if (playerTwoStand) {
        setPlayerOneTurnCounter(playerOneTurnCounter + 1);
      }
      //otherwise it goes to the next player
      newEndTurn();
    }
  }, [playerOneStand, playerTwoStand]);

  useEffect(() => {
    checkFor20();
    checkForOver20();
  }, [playerOneScore, playerTwoScore]);

  //Runs only once on first render
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div id="board">
      <div className={`playerTwoBoard ${playerOneTurn ? "" : "activeBorder"}`}>
        <div className="card-container">
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c1}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c2}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c3}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c4}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c5}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c6}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c7}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c8}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p2c9}`}></div>
          </div>
          <div className={`playerScore ${playerTwoScoreClass}`}>
            {playerTwoScore}
          </div>
        </div>
        <div className="extra-cards-container">
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
        </div>
      </div>
      <div id="board-divider"></div>
      <div className={`playerOneBoard ${playerOneTurn ? "activeBorder" : ""}`}>
        <div className="card-container">
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c1}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c2}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c3}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c4}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c5}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c6}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c7}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c8}`}></div>
          </div>
          <div className={`card-slot`}>
            <div id="card-slot-image" className={`${cardClasses.p1c9}`}></div>
          </div>
          <div className={`playerScore ${playerOneScoreClass}`}>
            {playerOneScore}
          </div>
        </div>
        <div className="extra-cards-container">
          <div className="extra-card-slot card-slot">
            <div id="card-slot-image" className={`${cardClasses.p1c7}`}></div>
          </div>
          <div className="extra-card-slot card-slot"></div>
          <div className="extra-card-slot card-slot"></div>
        </div>
      </div>
      <div id="buttons-container">
        <button
          onClick={playerStand}
          disabled={currentPlayerScore > 20}
          className="game-button"
        >
          <span id={`${currentPlayerScore > 20 ? "button-disabled" : ""}`}>
            Stand
          </span>
        </button>
        <button onClick={newEndTurn} className="game-button">
          <span>End Turn</span>
        </button>
      </div>
    </div>
  );
};
