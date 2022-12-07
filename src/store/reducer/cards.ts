import { createSlice } from "@reduxjs/toolkit";
import { Action } from "..";
import { ICard, IAbility } from "../types";

export interface Cards {
  items: ICard[];
}

export const initialState: Cards = {
  items: [],
};

interface ALoadCards extends Action {
  payload: {
    cards: ICard[];
    abilities: IAbility[];
  };
}

export const cards = createSlice({
  name: "cards",
  initialState,
  reducers: {
    loadCards: (state: Cards, action: ALoadCards) => {
      const abilities = action.payload.abilities;
      state.items = action.payload.cards.map((card) =>
        card.Ability
          ? {
              ...card,
              abilityData: abilities.find(
                (ability) =>
                  ability.Name?.toLowerCase() === card.Ability?.toLowerCase()
              ),
            }
          : card
      );
    },
  },
});

export const { loadCards } = cards.actions;
