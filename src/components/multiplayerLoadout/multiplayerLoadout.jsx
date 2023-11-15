import "./multiplayerLoadout.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/extraCards";
import { useNavigate } from "react-router-dom";

export const MultiplayerLoadout = () => {
  const p1ExtraCardsKeys = ["p1Extra1", "p1Extra2", "p1Extra3"];
  const p2ExtraCardsKeys = ["p2Extra1", "p2Extra2", "p2Extra3"];

  const [p1ExtraCardsDeck, setP1ExtraCardsDeck] = useState({
    p1c1: "ExtraCard+1.png",
    p1c2: "ExtraCard+2.png",
    p1c3: "ExtraCard+3.png",
    p1c4: "ExtraCard+4.png",
    p1c5: "ExtraCard+5.png",
    p1c6: "ExtraCard-1.png",
    p1c7: "ExtraCard-2.png",
    p1c8: "ExtraCard-3.png",
    p1c9: "ExtraCard-4.png",
  });
  const [p2ExtraCardsDeck, setP2ExtraCardsDeck] = useState({
    p2c1: "ExtraCard+1.png",
    p2c2: "ExtraCard+2.png",
    p2c3: "ExtraCard+3.png",
    p2c4: "ExtraCard+4.png",
    p2c5: "ExtraCard+5.png",
    p2c6: "ExtraCard-1.png",
    p2c7: "ExtraCard-2.png",
    p2c8: "ExtraCard-3.png",
    p2c9: "ExtraCard-4.png",
  });
  const [playersReady, setPlayersReady] = useState(false);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  //redux object with chosen cards
  let extraCards = useSelector((state) => state.extraCards);

  //gets the right key in the object based on the value that we have
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const chooseExtraCard = (chosenCard, player) => {
    let cardPressedKey;
    let cardKey;

    //ends the function if the pressed card has no value
    if (chosenCard == "") {
      return;
    }

    if (player == "p1") {
      //checks which cardslot is empty to fill it in order
      for (let card of p1ExtraCardsKeys) {
        if (extraCards[card] == "") {
          cardKey = card;
          break;
        }
      }
      //checks if cardkey has been defined after the loop check, otherwise it stops the func and does not assign a new card
      if (cardKey === undefined) {
        return;
      }
      //get the right key for the pressed card based on value.
      cardPressedKey = getKeyByValue(p1ExtraCardsDeck, chosenCard);

      //Remove the used card so that it disappears from board
      setP1ExtraCardsDeck((prev) => ({
        ...prev,
        [cardPressedKey]: "",
      }));
    } else if (player == "p2") {
      for (let card of p2ExtraCardsKeys) {
        if (extraCards[card] == "") {
          cardKey = card;
          break;
        }
      }
      //checks if cardkey has been defined after the loop check, otherwise it stops the func and does not assign a new card
      if (cardKey === undefined) {
        return;
      }
      //get the right key for the pressed card based on value.
      cardPressedKey = getKeyByValue(p2ExtraCardsDeck, chosenCard);
      //Remove the used card so that it disappears from board
      setP2ExtraCardsDeck((prev) => ({
        ...prev,
        [cardPressedKey]: "",
      }));
    }

    //uses redux to set one of the extra cards
    dispatch(
      actions.addCard({
        key: cardKey,
        value: chosenCard,
      })
    );
  };

  const removeExtraCard = (key, player) => {
    let playerDeckKey;

    //returns the func if nothing is on the card
    if (extraCards[key] == "") {
      return;
    }

    //check what value the card was to get the correct key to add it back correctly in playerDeck
    switch (extraCards[key]) {
      case "ExtraCard+1.png":
        player == "p1" ? (playerDeckKey = "p1c1") : (playerDeckKey = "p2c1");

        break;
      case "ExtraCard+2.png":
        player == "p1" ? (playerDeckKey = "p1c2") : (playerDeckKey = "p2c2");
        break;
      case "ExtraCard+3.png":
        player == "p1" ? (playerDeckKey = "p1c3") : (playerDeckKey = "p2c3");
        break;
      case "ExtraCard+4.png":
        player == "p1" ? (playerDeckKey = "p1c4") : (playerDeckKey = "p2c4");
        break;
      case "ExtraCard+5.png":
        player == "p1" ? (playerDeckKey = "p1c5") : (playerDeckKey = "p2c5");
        break;
      case "ExtraCard-1.png":
        player == "p1" ? (playerDeckKey = "p1c6") : (playerDeckKey = "p2c6");
        break;
      case "ExtraCard-2.png":
        player == "p1" ? (playerDeckKey = "p1c7") : (playerDeckKey = "p2c7");
        break;
      case "ExtraCard-3.png":
        player == "p1" ? (playerDeckKey = "p1c8") : (playerDeckKey = "p2c8");
        break;
      case "ExtraCard-4.png":
        player == "p1" ? (playerDeckKey = "p1c9") : (playerDeckKey = "p2c9");
        break;
    }

    //Re-add the card to the player deck
    if (player == "p1") {
      setP1ExtraCardsDeck((prev) => ({
        ...prev,
        [playerDeckKey]: extraCards[key],
      }));
    } else {
      setP2ExtraCardsDeck((prev) => ({
        ...prev,
        [playerDeckKey]: extraCards[key],
      }));
    }

    //Uses redux to remove the card with the correct key
    dispatch(actions.removeCard(key));
  };

  const checkIfReady = () => {
    //creates an array of the values in the object extraCards
    let values = Object.values(extraCards);

    //check if any of the values are "", which means not all cards chosen
    //if all cards are not chosen, it sets playersReady to false and stops the func
    //if all cards are chosen it sets playersReady to true
    for (let value of values) {
      if (value == "") {
        setPlayersReady(false);
        return;
      }
    }
    setPlayersReady(true);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToMultiplayer = () => {
    navigate("/multiplayer");
  };

  useEffect(() => {
    //whenever a card is added or removed it checks if all cards are there or not so the player can start the game
    checkIfReady();
  }, [extraCards]);

  useEffect(() => {
    dispatch(actions.clearCards());
  }, []);
  return (
    <div className="MultiplayerLoadout">
      <div className="board">
        <div className="card-container">
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c1, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c1}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c2, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c2}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c3, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c3}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c4, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c4}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c5, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c5}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c6, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c6}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c7, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c7}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c8, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c8}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p2ExtraCardsDeck.p2c9, "p2")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p2ExtraCardsDeck.p2c9}`}></div>
          </div>
        </div>

        <div className="extra-cards-container">
          <div
            onClick={() => removeExtraCard("p2Extra1", "p2")}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p2Extra1}`}></div>
          </div>
          <div
            onClick={() => removeExtraCard("p2Extra2", "p2")}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p2Extra2}`}></div>
          </div>
          <div
            onClick={() => removeExtraCard("p2Extra3", "p2")}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p2Extra3}`}></div>
          </div>
        </div>
      </div>

      <div id="board-divider"></div>
      <div className="board">
        <div className="card-container">
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c1, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c1}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c2, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c2}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c3, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c3}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c4, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c4}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c5, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c5}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c6, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c6}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c7, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c7}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c8, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c8}`}></div>
          </div>
          <div
            onClick={() => chooseExtraCard(p1ExtraCardsDeck.p1c9, "p1")}
            className={`card-slot`}
          >
            <div className={` card-slot-image ${p1ExtraCardsDeck.p1c9}`}></div>
          </div>
        </div>

        <div className="extra-cards-container">
          <div
            onClick={() => removeExtraCard("p1Extra1", "p1")}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p1Extra1}`}></div>
          </div>
          <div
            onClick={() => removeExtraCard("p1Extra2", "p1")}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p1Extra2}`}></div>
          </div>
          <div
            onClick={() => removeExtraCard("p1Extra3", "p1")}
            className="extra-card-slot card-slot"
          >
            <div className={` card-slot-image ${extraCards.p1Extra3}`}></div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={navigateToHome} className="game-button">
          <span>Back</span>
        </button>
        {playersReady ? (
          <button onClick={navigateToMultiplayer} className="game-button">
            <span>Start</span>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
