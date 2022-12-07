import { configureStore } from "@reduxjs/toolkit";
import { Global, global } from "./reducer/global";

export interface ReduxState {
  global: Global;
}

export interface Action {
  type: string;
}

/*interface AIntersected extends Action {
  payload: {
    sector: string;
    value: boolean;
  };
}

interface AtoggleInfoShow extends Action {
  payload: number;
}*/

export default configureStore<ReduxState>({
  reducer: {
    global: global.reducer,
  },
});
