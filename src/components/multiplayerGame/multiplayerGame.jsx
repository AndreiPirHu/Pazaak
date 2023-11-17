import { useEffect, useState } from "react";
import "./multiplayerGame.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/extraCards";
import Popup from "../popup/popup";

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
  const [triggerPopup, setTriggerPopup] = useState(false);
  const [popupText, setPopupText] = useState({
    title: "",
    text: "",
  });
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);

  const originalDeck = [
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
  ];

  const playerOneScoreClass =
    playerOneScore > 20 ? "highScoreColor" : "lowScoreColor";

  const playerTwoScoreClass =
    playerTwoScore > 20 ? "highScoreColor" : "lowScoreColor";

  const [playerOneDeck, setPlayerOneDeck] = useState(originalDeck);

  const [playerTwoDeck, setPlayerTwoDeck] = useState(originalDeck);

  const dispatch = useDispatch();

  let extraCards = useSelector((state) => state.extraCards);

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
  //reset game board
  const resetBoard = () => {
    //reset board card arrays to empty again
    setCardClasses({});
    //reset arrays with cardnames to full again
    setPlayerOneDeck(originalDeck);
    setPlayerTwoDeck(originalDeck);
    //reset score
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    //reset turn counter
    setPlayerOneTurnCounter(1);
    setPlayerTwoTurnCounter(1);
    //reset player stand booleans
    setPlayerOneStand(false);
    setPlayerTwoStand(false);
    //set turn to player one
    setPlayerOneTurn(true);
    //startGame function triggers when player presses next Round button in popup
  };

  const nextRound = (winner) => {
    //if there is a winner with 3 points, game ends
    if (
      (winner == "playerOne" && playerOneWins == 2) ||
      (winner == "playerTwo" && playerTwoWins == 2)
    ) {
      //sets final score so game knows if it is the last round
      if (winner === "playerOne") {
        setPopupText((prevState) => ({
          ...prevState,
          title: `Player One won the game!!!`,
          text: `Congratulations!`,
        }));
        setPlayerOneWins(playerOneWins + 1);
      } else {
        setPopupText((prevState) => ({
          ...prevState,
          title: `Player Two won the game!!!`,
          text: `Congratulations!`,
        }));
        setPlayerTwoWins(playerTwoWins + 1);
      }
      //triggers popup
      setTriggerPopup(true);
      //Go to winner screen through ternary in popup based on wins
      return;
    }

    //checks who won or if it is a tie
    //add score to correct winner
    if (winner === "playerOne") {
      setPopupText((prevState) => ({
        ...prevState,
        title: `Player One won this round!`,
        text: `Ready for the next round?`,
      }));
      setPlayerOneWins(playerOneWins + 1);
    } else if (winner === "playerTwo") {
      setPopupText((prevState) => ({
        ...prevState,
        title: `Player Two won this round!`,
        text: `Ready for the next round?`,
      }));
      setPlayerTwoWins(playerTwoWins + 1);
    } else {
      setPopupText((prevState) => ({
        ...prevState,
        title: `It's a Tie!`,
        text: `Ready for the next round?`,
      }));
    }

    //reset game
    // resetBoard();

    //brings up popup
    setTriggerPopup(true);
  };

  const useExtraCard = (cardKey) => {
    //get the card name
    let cardName = extraCards[cardKey];
    //stops func if card already used
    if (cardName == "") {
      console.log("returned");
      return;
    }
    //score added from extra card
    let extraScore = 0;

    //add the score
    switch (cardName) {
      case "ExtraCard-1.png":
        extraScore = -1;
        break;
      case "ExtraCard-2.png":
        extraScore = -2;
        break;
      case "ExtraCard-3.png":
        extraScore = -3;
        break;
      case "ExtraCard-4.png":
        extraScore = -4;
        break;
      case "ExtraCard+1.png":
        extraScore = 1;
        break;
      case "ExtraCard+2.png":
        extraScore = 2;
        break;
      case "ExtraCard+3.png":
        extraScore = 3;
        break;
      case "ExtraCard+4.png":
        extraScore = 4;
        break;
      case "ExtraCard+5.png":
        extraScore = 5;
        break;
    }

    if (playerOneTurn) {
      //check if the other player is standing, changes how it interacts with turncounter depending.
      //if other player is standing, it does not add a +1 to turncounter before adding the card. It does it after
      //otherwise it adds the +1 before
      let p1CardSlot;
      if (!playerTwoStand) {
        //updated turncounter for correct card slot
        let updatedTurnCounter = playerOneTurnCounter + 1;
        //checks turn to add the right card
        p1CardSlot = `p1c${updatedTurnCounter}`;
        //player turn counter to new one
        setPlayerOneTurnCounter(updatedTurnCounter);
      } else {
        p1CardSlot = `p1c${playerOneTurnCounter}`;
        //player turn counter to new one
        setPlayerOneTurnCounter(playerOneTurnCounter + 1);
      }

      //adds the right card class to the right card-slot element
      setCardClasses((prevState) => {
        return { ...prevState, [p1CardSlot]: cardName };
      });

      setPlayerOneScore(playerOneScore + extraScore);
      //remove the already used card from the array
      dispatch(actions.removeCard(cardKey));
    } else {
      //check if tuncounter is correct already before giving it +1 by checking if its spot in the object is empty or not
      let p2CardSlot;
      if (!playerOneStand) {
        //updated turncounter for correct card slot
        let updatedTurnCounter = playerTwoTurnCounter + 1;
        //checks turn to add the right card
        p2CardSlot = `p2c${updatedTurnCounter}`;
        //player turn counter to new one
        setPlayerTwoTurnCounter(updatedTurnCounter);
      } else {
        p2CardSlot = `p2c${playerTwoTurnCounter}`;
        //player turn counter to new one
        setPlayerTwoTurnCounter(playerTwoTurnCounter + 1);
      }
      //adds the right card class to the right card-slot element
      setCardClasses((prevState) => {
        return { ...prevState, [p2CardSlot]: cardName };
      });

      setPlayerTwoScore(playerTwoScore + extraScore);
      //remove the already used card from the array
      dispatch(actions.removeCard(cardKey));
    }
  };

  const playerStand = () => {
    //sets true for the player that pressed stand
    if (playerOneTurn) {
      setPlayerOneStand(true);
    } else {
      setPlayerTwoStand(true);
    }
    //changes triggers useEffect that ends the turn
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
    //if a player gets 20 in score on their turn, they automatically stand
    if (
      (playerOneTurn && playerOneScore == 20) ||
      (!playerOneTurn && playerTwoScore == 20)
    ) {
      playerStand();
    }
  };

  const startGame = () => {
    //random number for the first card
    let newCard = Math.floor(Math.random() * originalDeck.length);
    let p1CardSlot = "p1c1";

    //adds the right card class to the right card-slot element
    setCardClasses((prevState) => {
      return { ...prevState, [p1CardSlot]: originalDeck[newCard] };
    });

    //add the score
    setPlayerOneScore(() => {
      return 0 + scoreCounter(originalDeck[newCard]);
    });

    //remove the already used card from the array after adding the score
    setPlayerOneDeck(() => {
      //filters the card in the array that is at the correct index point
      return originalDeck.filter((_, index) => index !== newCard);
    });
  };

  const newEndTurn = () => {
    //1. check if player has over 20 for instant loss
    if (playerOneTurn) {
      if (playerOneScore > 20) {
        //Player one loses
        //send player two as winner
        nextRound("playerTwo");
        return;
      }
    } else {
      if (playerTwoScore > 20) {
        //Player two loses
        //send player one as winner
        nextRound("playerOne");
        return;
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
      setPlayerOneScore((prevState) => {
        return prevState + scoreCounter(playerOneDeck[newCard]);
      });
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

  useEffect(() => {
    //checks if both players have pressed stand and then checks win conditions
    if (playerOneStand && playerTwoStand) {
      //check if both have the same score = tie
      if (playerOneScore === playerTwoScore) {
        nextRound("tie");
        return;
      }
      //check if one has higher than the other = winner
      if (playerOneScore > playerTwoScore) {
        nextRound("playerOne");
        return;
      } else {
        nextRound("playerTwo");
        return;
      }
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
    console.log(playerOneScore, playerTwoScore);
  }, [playerOneScore, playerTwoScore]);

  //Runs only once on first render
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div id="board">
      <div className={`playerTwoBoard ${playerOneTurn ? "" : "activeBorder"}`}>
        {playerTwoStand ? (
          <div id="p2-stand-overlay" className="stand-overlay puff-in-center">
            <h3>STANDING</h3>
          </div>
        ) : (
          ""
        )}
        <div className="card-container">
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c1}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c2}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c3}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c4}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c5}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c6}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c7}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c8}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p2c9}`}></div>
          </div>
          <div className={`playerScore ${playerTwoScoreClass}`}>
            {playerTwoScore}
          </div>
        </div>
        <div className="extra-cards-container">
          <div
            onClick={() => (!playerOneTurn ? useExtraCard("p2Extra1") : null)}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p2Extra1}`}></div>
          </div>
          <div
            onClick={() => (!playerOneTurn ? useExtraCard("p2Extra2") : null)}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p2Extra2}`}></div>
          </div>
          <div
            onClick={() => (!playerOneTurn ? useExtraCard("p2Extra3") : null)}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p2Extra3}`}></div>
          </div>
          <div className="score-container">
            <div
              className={`score-circle ${
                playerTwoWins > 0 ? "score-circle-active" : ""
              }`}
            ></div>
            <div
              className={`score-circle ${
                playerTwoWins > 1 ? "score-circle-active" : ""
              }`}
            ></div>
            <div
              className={`score-circle ${
                playerTwoWins > 2 ? "score-circle-active" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
      <div id="board-divider"></div>
      <div className={`playerOneBoard ${playerOneTurn ? "activeBorder" : ""}`}>
        {playerOneStand ? (
          <div id="p1-stand-overlay" className="stand-overlay puff-in-center">
            <h3>STANDING</h3>
          </div>
        ) : (
          ""
        )}
        <div className="card-container">
          <div className={`card-slot`}>
            <div className={`card-slot-image ${cardClasses.p1c1}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c2}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c3}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c4}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c5}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c6}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={`card-slot-image ${cardClasses.p1c7}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c8}`}></div>
          </div>
          <div className={`card-slot`}>
            <div className={` card-slot-image ${cardClasses.p1c9}`}></div>
          </div>
          <div className={`playerScore ${playerOneScoreClass}`}>
            {playerOneScore}
          </div>
        </div>
        <div className="extra-cards-container">
          <div
            onClick={() => (playerOneTurn ? useExtraCard("p1Extra1") : null)}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p1Extra1}`}></div>
          </div>
          <div
            onClick={() => (playerOneTurn ? useExtraCard("p1Extra2") : null)}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p1Extra2}`}></div>
          </div>
          <div
            onClick={() => (playerOneTurn ? useExtraCard("p1Extra3") : null)}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p1Extra3}`}></div>
          </div>
          <div className="score-container">
            <div
              className={`score-circle ${
                playerOneWins > 0 ? "score-circle-active" : ""
              }`}
            ></div>
            <div
              className={`score-circle ${
                playerOneWins > 1 ? "score-circle-active" : ""
              }`}
            ></div>
            <div
              className={`score-circle ${
                playerOneWins > 2 ? "score-circle-active" : ""
              }`}
            ></div>
          </div>
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

      <Popup
        trigger={triggerPopup}
        setTrigger={setTriggerPopup}
        startGame={startGame}
        playerOneWins={playerOneWins}
        playerTwoWins={playerTwoWins}
        resetBoard={resetBoard}
      >
        <div className="children-container">
          <h3 className="children-container">{popupText.title}</h3>
          <p className="children-container">{popupText.text}</p>
        </div>
      </Popup>
    </div>
  );
};
