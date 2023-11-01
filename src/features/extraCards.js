import { createAction, createReducer } from "@reduxjs/toolkit";

const addCard = createAction("Add chosen card to player");
const removeCard = createAction("Remove used card from player hand");
const clearCards = createAction("Clears all cards");

const actions = { addCard, removeCard, clearCards };

const initialState = {
  p1Extra1: "",
  p1Extra2: "",
  p1Extra3: "",
  p2Extra1: "",
  p2Extra2: "",
  p2Extra3: "",
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCard, (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }))

    .addCase(removeCard, (state, action) => ({
      ...state,
      [action.payload]: "",
    }))
    .addCase(clearCards, (state, actions) => initialState);
});

export { reducer, actions };
