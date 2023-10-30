import { createAction, createReducer } from "@reduxjs/toolkit";

const addCard = createAction("Add chosen card to player", (key, value) => ({
  payload: { key, value },
}));
const removeCard = createAction("Remove used card from player hand");

const actions = { addCard, removeCard };

const initialState = {
  p1Extra1: "ExtraCard-1.png",
  p1Extra2: "ExtraCard+4.png",
  p1Extra3: "ExtraCard-3.png",
  p2Extra1: "ExtraCard-2.png",
  p2Extra2: "ExtraCard+3.png",
  p2Extra3: "ExtraCard-4.png",
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
    }));
});

export { reducer, actions };
