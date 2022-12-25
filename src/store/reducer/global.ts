import { createSlice } from "@reduxjs/toolkit";
import { Action } from "..";
import {
  IACHIEVMENT,
  TelegramUser,
  AchievementsUpdateEvent,
  IModal,
  IPROJECT,
} from "store/types";

import { UserData, IWallet } from "store/models/user";

export type GlobalState = {
  achievements: IACHIEVMENT[];
  telegramUser: TelegramUser | undefined;
  userData: UserData | undefined;
  init: boolean;
  currentProject: number;
  justCompleted: number[];
  modal: IModal | undefined;
  project: IPROJECT | undefined;
  wallet: IWallet | undefined;
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
  project: undefined,
  achievements: [],
  telegramUser: mock,
  userData: undefined,
  init: false,
  currentProject: 1,
  justCompleted: [],
  modal: undefined,
  wallet: undefined,
};

interface ALoadData extends Action {
  payload: {
    achievements: IACHIEVMENT[];
  };
}

interface ALoadProject extends Action {
  payload: {
    project: IPROJECT;
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

interface AModal extends Action {
  payload: IModal | undefined;
}

interface ASetWallet extends Action {
  payload: IWallet | undefined;
}

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    setProject: (state: GlobalState, action: ALoadProject) => {
      state.project = action.payload.project;
    },
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

      for (let i = 0; i < payload.achievments.length; i++) {
        const progressIndex = payload.achievments[i];
        const achievementData = achievements.find(
          (a) => a.achievmentNumber === progressIndex
        );

        const project = state.userData?.projectParticipations?.find(
          (p) => p.projectNumber === payload.projectNumber
        );

        const achievement = project?.achievments.find(
          (a) => a.achievmentNumber === progressIndex
        );

        console.log(payload, "payload");
        if (achievement && achievementData) {
          let currentStatus: boolean;
          if (payload.currentProgressNumber.length && payload.completed) {
            currentStatus = payload.completed[i];
            achievement.progressNumber = payload.currentProgressNumber[i];
          } else {
            currentStatus =
              payload.currentProgressNumber >=
              achievementData?.progressBarLength;

            achievement.progressNumber = payload.currentProgressNumber;
          }

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
    setModal: (state: GlobalState, action: AModal) => {
      state.modal = action.payload;
    },
    setWallet: (state: GlobalState, action: ASetWallet) => {
      state.wallet = action.payload;
    },
  },
});

export const {
  setProject,
  setAchievements,
  setTelegramUser,
  toggleInit,
  setUserData,
  updateProgress,
  setJustCompleted,
  setModal,
  setWallet,
} = global.actions;
