import { combineReducers } from "redux";
import { reducer as extraCardsReducer } from "./extraCards";
import { reducer as playerScoreReducer } from "./playerScore";
export const rootReducer = combineReducers({
  extraCards: extraCardsReducer,
  playerScore: playerScoreReducer,
});
