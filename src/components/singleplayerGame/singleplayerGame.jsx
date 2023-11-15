import { useEffect, useState } from "react";
import "./singleplayerGame.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/extraCards";
import Popup from "../popup/popup";

export const SingleplayerGame = () => {
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

  const AITurnLogic = () => {
    //does not run if it is not player two turn or if player two is standing
    if (playerTwoStand) {
      return;
    }

    console.log("playing AI turn");

    //get all extra card names belonging to p2
    let AIExtraCards = [
      extraCards.p2Extra1,
      extraCards.p2Extra2,
      extraCards.p2Extra3,
    ];

    let AIExtraCardsKeys = ["p2Extra1", "p2Extra2", "p2Extra3"];

    let AIExtraCardsValue = [];

    let bestPossibleTotalScore = {
      index: 0,
      value: 0,
    };

    //fill the card value array with card values
    for (let card of AIExtraCards) {
      switch (card) {
        case "ExtraCard-1.png":
          AIExtraCardsValue.push(-1);
          break;
        case "ExtraCard-2.png":
          AIExtraCardsValue.push(-2);
          break;
        case "ExtraCard-3.png":
          AIExtraCardsValue.push(-3);
          break;
        case "ExtraCard-4.png":
          AIExtraCardsValue.push(-4);
          break;
        case "ExtraCard+1.png":
          AIExtraCardsValue.push(1);
          break;
        case "ExtraCard+2.png":
          AIExtraCardsValue.push(2);
          break;
        case "ExtraCard+3.png":
          AIExtraCardsValue.push(3);
          break;
        case "ExtraCard+4.png":
          AIExtraCardsValue.push(4);
          break;
        case "ExtraCard+5.png":
          AIExtraCardsValue.push(5);
          break;
        case "":
          AIExtraCardsValue.push(0);
          break;
      }
    }

    //check own score
    if (playerTwoScore > 20) {
      // check if own score + an extra card = 20
      for (const [index, value] of AIExtraCardsValue.entries()) {
        if (playerTwoScore + value == 20) {
          //if true, uses the extra card and stops the function
          useExtraCard(AIExtraCardsKeys[index]);
          console.log("had over 20 score,used extra card to get 20");
          return;
        } else {
          //checks if the card gives a score under 20 and which one is the best if so
          if (
            playerTwoScore + value < 20 &&
            playerTwoScore + value > bestPossibleTotalScore.value
          ) {
            bestPossibleTotalScore.index = index;
            bestPossibleTotalScore.value = playerTwoScore + value;
          }
        }
      }
      //uses the card to get the best possible score if one was found
      if (bestPossibleTotalScore.value !== 0) {
        useExtraCard(AIExtraCardsKeys[bestPossibleTotalScore.index]);

        //gets the current score to check for next best move
        let currentScore = bestPossibleTotalScore.value;

        //stands after using it if the score is higher than player one
        if (currentScore <= 20 && currentScore >= playerOneScore) {
          playerStand();
          console.log(
            "had over 20 score,used extra card to get under 20 and more than p1"
          );
          return;
        } else if (playerOneScore >= currentScore && playerOneScore <= 20) {
          //if score is still lower than player one, it ends turn
          newEndTurn();
          console.log(
            "had over 20 score,used extra card to get under 20 and took chance to get more than p1"
          );
          console.log(playerOneScore, playerTwoScore);
          return;
        } else {
          playerStand();
          console.log("Standing because no good options?");

          return;
        }
      } else {
        //if no best possible score was found, the AI stands
        newEndTurn();

        console.log("had over 20 score, could not do anything but end turn");
        return;
      }
    } else {
      //if score is lower than 20:

      //check if player 1 is standing and if own score is higher, stand if true.
      if (playerOneStand && playerTwoScore >= playerOneScore) {
        playerStand();

        console.log(
          "stands because score higher than or equal to p1 and p1 is standing"
        );
        return;
      }

      //check if player 1 is standing and if own score + new card is better to do or instead if it's better to use an extra card
      if (playerOneStand && playerTwoScore <= playerOneScore) {
        let cardValuesLeft = [];
        let usableCardValues = [];
        //makes an array of all card values left in deck
        for (let card of playerTwoDeck) {
          switch (card) {
            case "NormalCard+1.png":
              cardValuesLeft.push(1);
              break;
            case "NormalCard+2.png":
              cardValuesLeft.push(2);
              break;
            case "NormalCard+3.png":
              cardValuesLeft.push(3);
              break;
            case "NormalCard+4.png":
              cardValuesLeft.push(4);
              break;
            case "NormalCard+5.png":
              cardValuesLeft.push(5);
              break;
            case "NormalCard+6.png":
              cardValuesLeft.push(6);
              break;
            case "NormalCard+7.png":
              cardValuesLeft.push(7);
              break;
            case "NormalCard+8.png":
              cardValuesLeft.push(8);
              break;
            case "NormalCard+9.png":
              cardValuesLeft.push(9);
              break;
            case "NormalCard+10.png":
              cardValuesLeft.push(10);
              break;
          }
        }

        //checks how many values give a higher score than player one and less than or equal to 20
        for (let value of cardValuesLeft) {
          if (
            playerTwoScore + value <= 20 &&
            playerTwoScore + value >= playerOneScore
          ) {
            usableCardValues.push(value);
          }
        }

        //checks if there is a higher chance of getting a good card rather than a bad
        if (
          usableCardValues.length >
          cardValuesLeft.length - usableCardValues.length
        ) {
          //if true, ends the turn for another card
          newEndTurn();

          console.log("end turn because good chance of good card");
          return;
        } else {
          //if false, check if own score + extra card = higher than player one but less than or equal to 20
          for (const [index, value] of AIExtraCardsValue.entries()) {
            //checks all extra cards for the one that gives the best possible total score
            if (
              playerTwoScore + value <= 20 &&
              playerTwoScore + value > playerOneScore
            ) {
              if (playerTwoScore + value > bestPossibleTotalScore.value) {
                bestPossibleTotalScore.index = index;
                bestPossibleTotalScore.value = value;
              }
            }
          }
          //if there was a card that gave the desired score, use it
          if (bestPossibleTotalScore.value !== 0) {
            useExtraCard(AIExtraCardsKeys[bestPossibleTotalScore.index]);

            console.log(
              `used extra card ${
                AIExtraCards[bestPossibleTotalScore.index]
              } to get higher score than p1 who is standing`
            );

            if (playerTwoScore + bestPossibleTotalScore.value !== 20) {
              playerStand();
              console.log("standing afer using extra card");

              return;
            }
            console.log(
              "Not standing after using extra card since score is 20"
            );
            return;
          } else {
            //if there was no card that gave the desired score, the AI takes a chance on a new card instead
            newEndTurn();

            console.log(
              "took a chance on a new card due to no better option while p1 is standing"
            );
            return;
          }
        }
      }

      //if player one is not standing, check if own score + an extra card == 20
      if (!playerOneStand) {
        //check if own score + extra card == 20
        for (const [index, value] of AIExtraCardsValue.entries()) {
          //checks all extra cards for the one that gives the desired total score
          if (playerTwoScore + value == 20) {
            if (playerTwoScore + value > bestPossibleTotalScore.value) {
              bestPossibleTotalScore.index = index;
              bestPossibleTotalScore.value = value;
            }
          }
        }
        //if there was a card that gave the desired score, use it
        if (bestPossibleTotalScore.value !== 0) {
          useExtraCard(AIExtraCardsKeys[bestPossibleTotalScore.index]);
          playerStand();

          console.log(
            `used extra ${
              AIExtraCards[bestPossibleTotalScore.index]
            }card to get 20`
          );
          return;
        } else {
          //if no extra cards work, check cards left in deck and check if any of them give a score lower or equal to 20, otherwise stand

          let cardValuesLeft = [];
          let usableCardValues = [];
          //makes an array of all card values left in deck
          for (let card of playerTwoDeck) {
            switch (card) {
              case "NormalCard+1.png":
                cardValuesLeft.push(1);
                break;
              case "NormalCard+2.png":
                cardValuesLeft.push(2);
                break;
              case "NormalCard+3.png":
                cardValuesLeft.push(3);
                break;
              case "NormalCard+4.png":
                cardValuesLeft.push(4);
                break;
              case "NormalCard+5.png":
                cardValuesLeft.push(5);
                break;
              case "NormalCard+6.png":
                cardValuesLeft.push(6);
                break;
              case "NormalCard+7.png":
                cardValuesLeft.push(7);
                break;
              case "NormalCard+8.png":
                cardValuesLeft.push(8);
                break;
              case "NormalCard+9.png":
                cardValuesLeft.push(9);
                break;
              case "NormalCard+10.png":
                cardValuesLeft.push(10);
                break;
            }
          }

          //checks how many values give a score less than or equal to 20
          for (let value of cardValuesLeft) {
            if (playerTwoScore + value <= 20) {
              usableCardValues.push(value);
            }
          }

          //checks if there is a higher chance of getting a good card rather than a bad
          if (
            usableCardValues.length >=
            cardValuesLeft.length - (usableCardValues.length + 1)
          ) {
            //if true, ends the turn for another card
            newEndTurn();

            console.log("high chance of getting a good card, ended turn");
            return;
          }

          //always tries for higher score if the other player is standing on 20
          if (playerOneScore == 20) {
            newEndTurn();

            console.log(
              "p1 standing on 20, tries to get better no matter what"
            );
            return;
          }

          //if nothing has worked until now, check if score is higher than other player, if yes, stand, otherwise, end turn
          if (playerTwoScore >= playerOneScore) {
            playerStand();

            console.log(
              "Nothing else has been used, stands if score is higher than p1"
            );
            return;
          } else {
            newEndTurn();

            console.log(
              "Nothing else has been used, ends turn if score is lower than p1"
            );
            return;
          }
        }
      }
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
      setPopupText((prevState) => ({
        ...prevState,
        title: `${winner} won the game!!!`,
        text: `Congratulations!`,
      }));
      //sets final score so game knows if it is the last round
      if (winner === "playerOne") {
        setPlayerOneWins(playerOneWins + 1);
      } else {
        setPlayerTwoWins(playerTwoWins + 1);
      }
      //triggers popup
      setTriggerPopup(true);
      //Go to winner screen through ternary in popup based on wins
      return;
    }

    setPopupText((prevState) => ({
      ...prevState,
      title: `${winner} won this round!`,
      text: `Ready for the next round?`,
    }));
    //checks if it is a tie or else who won

    //add score to correct winner
    switch (winner) {
      case "tie":
        setPopupText((prevState) => ({
          ...prevState,
          title: `Tie!`,
          text: `Ready for the next round?`,
        }));
        break;
      case "playerOne":
        setPlayerOneWins(playerOneWins + 1);
        break;
      case "playerTwo":
        setPlayerTwoWins(playerTwoWins + 1);
        break;
    }
    //reset game
    resetBoard();
    //brings up popup
    setTriggerPopup(true);
  };

  const useExtraCard = (cardKey) => {
    //get the card name
    let cardName = extraCards[cardKey];
    //stops func if card already used
    if (cardName == "") {
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

      /////////////////////////HERE/////////////////
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
      //does not end player two turn
    }
  };

  useEffect(() => {
    setTimeout(() => {}, 1000);
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
    setTimeout(() => {}, 1000);
    checkFor20();
    checkForOver20();
    console.log(playerOneScore, playerTwoScore);
  }, [playerOneScore, playerTwoScore]);

  useEffect(() => {
    //checking for score 20 and 0 to not run even after round is over or after already standing
    if (!playerOneTurn && playerTwoScore !== 20 && playerTwoScore !== 0) {
      setTimeout(AITurnLogic, 1000);
    }
  }, [playerTwoDeck]);

  //Runs only once on first render
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div id="board">
      <div className={`playerTwoBoard ${playerOneTurn ? "" : "activeBorder"}`}>
        {playerTwoStand ? (
          <div id="p2-stand-overlay" className="stand-overlay puff-in-center">
            STANDING
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
          <div className="extra-card-slot card-slot">
            <div className={` card-slot-image ${extraCards.p2Extra1}`}></div>
          </div>
          <div className="extra-card-slot card-slot">
            <div className={` card-slot-image ${extraCards.p2Extra2}`}></div>
          </div>
          <div className="extra-card-slot card-slot">
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
            STANDING
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
          disabled={currentPlayerScore > 20 || !playerOneTurn}
          className="game-button"
        >
          <span id={`${currentPlayerScore > 20 ? "button-disabled" : ""}`}>
            Stand
          </span>
        </button>
        <button
          onClick={newEndTurn}
          disabled={!playerOneTurn}
          className="game-button"
        >
          <span>End Turn</span>
        </button>
      </div>

      <Popup
        trigger={triggerPopup}
        setTrigger={setTriggerPopup}
        startGame={startGame}
        playerOneWins={playerOneWins}
        playerTwoWins={playerTwoWins}
      >
        <div className="children-container">
          <h3 className="children-container">{popupText.title}</h3>
          <p className="children-container">{popupText.text}</p>
        </div>
      </Popup>
    </div>
  );
};
