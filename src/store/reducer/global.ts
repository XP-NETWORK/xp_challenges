import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "..";
import {
  IACHIEVMENT,
  AchievementsUpdateEvent,
  IModal,
  IPROJECT,
  ILeader,
} from "store/types";

import { UserData, IWallet } from "store/models/user";
import { axiosInstance } from "services/axios";

export const getUserByUniqueId = createAsyncThunk(
  "getUsersByregisteredId?registeredId",
  async (uniqueId: string, thunkAPI) => {
    try {
      const response = await axiosInstance(
        "https://demo-challenge.herokuapp.com/"
      ).get(`getUsersByregisteredId?registeredId=${uniqueId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "An error occured ! => " + (error as { message: string }).message
      );
    }
  }
);

export type GlobalState = {
  achievements: IACHIEVMENT[];
  telegramUser: UserData | undefined;
  userData: UserData | undefined;
  init: boolean;
  currentProject: number;
  justCompleted: number[];
  modal: IModal | undefined;
  trxModal: boolean;
  clickedAchiev: number[];
  project: IPROJECT | undefined;
  wallet: IWallet | undefined;
  leaders: ILeader[] | undefined;
};

export const initialState: GlobalState = {
  project: undefined,
  achievements: [],
  telegramUser: undefined,
  userData: undefined,
  init: false,
  currentProject: 1,
  justCompleted: [],
  modal: undefined,
  trxModal: false,
  clickedAchiev: [],
  wallet: undefined,
  leaders: undefined,
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

/*interface ALoadTelegramUser extends Action {
  payload: {
    telegramUser: TelegramUser;
  };
}*/

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
interface ATrxModal extends Action {
  payload: boolean;
}

interface ASetWallet extends Action {
  payload: IWallet | undefined;
}

interface ASetLeaders extends Action {
  payload: ILeader[] | undefined;
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
    setTelegramUser: (state: GlobalState, action: any) => {
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

        // console.log(achievementData);

        const project = state.userData?.projectParticipations?.find(
          (p) => p.projectNumber === payload.projectNumber
        );

        const achievement = project?.achievments.find(
          (a) => a.achievmentNumber === progressIndex
        );

        // console.log(achievement);

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

          // console.log(currentStatus);
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
    setTrxModal: (state: GlobalState, action: ATrxModal) => {
      state.trxModal = action.payload;
    },
    setClickedAchiev: (state: GlobalState, action: AModal) => {
      if (action?.payload?.achievmentNumber) {
        state?.clickedAchiev.push(action?.payload?.achievmentNumber)
      }
    },
    setWallet: (state: GlobalState, action: ASetWallet) => {
      state.wallet = action.payload;
    },
    setLeaders: (state: GlobalState, action: ASetLeaders) => {
      state.leaders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserByUniqueId.pending, (state: any, action: any) => {
      console.log(action.payload);
    });
    builder.addCase(getUserByUniqueId.fulfilled, (state: any, action: any) => {
      state.telegramUser = action.payload;
      state.userData = action.payload;
    });
    builder.addCase(getUserByUniqueId.rejected, (state, action) => {
      console.log(action.payload);
    });
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
  setTrxModal,
  setClickedAchiev,
  setLeaders,
  setWallet,
} = global.actions;
