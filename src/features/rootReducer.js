import { combineReducers } from "redux";
import { reducer as extraCardsReducer } from "./extraCards";

export const rootReducer = combineReducers({
  extraCards: extraCardsReducer,
});
