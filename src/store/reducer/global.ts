import { createSlice } from "@reduxjs/toolkit";
import { Action } from "..";
import {
  IACHIEVMENT,
  TelegramUser,
  AchievementsUpdateEvent,
} from "store/types";

import { UserData } from "store/models/user";

export type GlobalState = {
  achievements: IACHIEVMENT[];
  telegramUser: TelegramUser | undefined;
  userData: UserData | undefined;
  init: boolean;
  currentProject: number;
  justCompleted: number[];
};

const mock = undefined && {
  id: BigInt(1062713330),
  first_name: "Alex",
  last_name: "Teisheira",
  username: "darylMussasi",
  photo_url:
    "https://t.me/i/userpic/320/NhgyFmJtk4F8zLFdeT4lrgEfSIyY9SS9UOMMiu88ud4.jpg",
  auth_date: BigInt(1062713330),
  hash: "876b55925d0281e291dae5f00a0e073915577c1edd4b4886e1101000322b546a",
};

export const initialState: GlobalState = {
  achievements: [],
  telegramUser: mock,
  userData: undefined,
  init: false,
  currentProject: 1,
  justCompleted: [],
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

interface ALoadUserData extends Action {
  payload: {
    userData: UserData;
  };
}

interface AToggleInit extends Action {
  payload: boolean;
}

interface AUpdateProgress extends Action {
  payload: AchievementsUpdateEvent;
}

interface AJustCompleted extends Action {
  payload: number[];
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
    setUserData: (state: GlobalState, action: ALoadUserData) => {
      state.userData = action.payload.userData;
    },
    setJustCompleted: (state: GlobalState, action: AJustCompleted) => {
      state.justCompleted = action.payload;
    },
    updateProgress: (state: GlobalState, action: AUpdateProgress) => {
      const { achievements } = state;
      const { payload } = action;
      for (const progressIndex of payload.achievments) {
        const achievementData = achievements.find(
          (a) => a.achievmentNumber === progressIndex
        );

        const project = state.userData?.projectParticipations?.find(
          (p) => p.projectNumber === payload.projectNumber
        );

        const achievement = project?.achievments.find(
          (a) => a.achievmentNumber === progressIndex
        );
        console.log(achievement);
        console.log(achievementData, "achievementData");
        console.log(payload, "payload");
        if (achievement && achievementData) {
          const currentStatus =
            payload.currentProgressNumber >= achievementData?.progressBarLength;

          achievement.progressNumber = payload.currentProgressNumber;
          if (currentStatus !== achievement.completed) {
            state.justCompleted = [
              ...state.justCompleted,
              achievements.findIndex(
                (a) => a.achievmentNumber === achievement.achievmentNumber
              ),
            ];
          }
          achievement.completed = currentStatus;
        }

        //state.userData?.projectParticipations[action.payload.projectNumber].
      }
    },
    toggleInit: (state: GlobalState, action: AToggleInit) => {
      state.init = action.payload;
    },
  },
});

export const {
  setAchievements,
  setTelegramUser,
  toggleInit,
  setUserData,
  updateProgress,
  setJustCompleted,
} = global.actions;
