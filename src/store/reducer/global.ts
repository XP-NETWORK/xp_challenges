import { createSlice } from "@reduxjs/toolkit";
import { Action } from "..";
import { IACHIEVMENT, TelegramUser } from "store/types";

export type GlobalState = {
  achievements: IACHIEVMENT[];
  telegramUser: TelegramUser | undefined;
};

export const initialState: GlobalState = {
  achievements: [],
  telegramUser: undefined,
};

interface ALoadData extends Action {
  payload: {
    achievements: IACHIEVMENT[];
  };
}

interface ALoadTelegramUser extends Action {
  payload: {
    telegramUser: TelegramUser;
  };
}

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAchievements: (state: GlobalState, action: ALoadData) => {
      state.achievements = action.payload.achievements;
    },
    setTelegramUser: (state: GlobalState, action: ALoadTelegramUser) => {
      state.telegramUser = action.payload.telegramUser;
    },
  },
});

export const { setAchievements, setTelegramUser } = global.actions;
