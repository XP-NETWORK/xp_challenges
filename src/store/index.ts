import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cards, Cards } from "./reducer/cards";
import { mechanics, Mechanics } from "./reducer/mechanics";

export interface ReduxState {
  cards: Cards;
  mechanics: Mechanics;
  global: any;
}

export interface Action {
  type: string;
}

interface AIntersected extends Action {
  payload: {
    sector: string;
    value: boolean;
  };
}

interface AtoggleInfoShow extends Action {
  payload: number;
}

export const global = createSlice({
  name: "global",
  initialState: {
    deck: false,
    cardInfoShow: 0,
  },
  reducers: {
    toggleCardInfo: (state: any, action: AtoggleInfoShow) => {
      state.cardInfoShow = action.payload;
    },
    setIntersected: (state: any, action: AIntersected) => {
      state[action.payload.sector] = action.payload.value;
    },
  },
});

export const { setIntersected, toggleCardInfo } = global.actions;

export default configureStore<ReduxState>({
  reducer: {
    cards: cards.reducer,
    mechanics: mechanics.reducer,
    global: global.reducer,
  },
});
