import { createSlice } from "@reduxjs/toolkit";
import { Action } from "..";

export type Global = {
  items: any;
};

export const initialState: Global = {
  items: [],
};

interface ALoadItems extends Action {
  payload: {
    items: any;
  };
}

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    loadItems: (state: Global, action: ALoadItems) => {
      state.items = action.payload.items;
    },
  },
});

export const { loadItems } = global.actions;
