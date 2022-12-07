import { createSlice } from "@reduxjs/toolkit";
import { Action } from "..";
import { IMechanic } from "../types";

export interface Mechanics {
  items: IMechanic[];
}

export const initialState: Mechanics = {
  items: [],
};

interface ALoadCards extends Action {
  payload: {
    mechanics: IMechanic[];
  };
}

export const mechanics = createSlice({
  name: "cards",
  initialState,
  reducers: {
    loadMechanics: (state: Mechanics, action: ALoadCards) => {
      state.items = action.payload.mechanics;
    },
  },
});

export const { loadMechanics } = mechanics.actions;
