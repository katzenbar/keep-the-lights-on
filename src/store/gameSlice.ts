import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNextCurrentStatistics, CurrentStatistics, defaultCurrentStatistics } from "../lib/CurrentStatistics";
import { RootState } from "./store";

export enum Generator {
  Hamsters = "hamsters",
}

interface GameState {
  currentStatistics: CurrentStatistics;
}

const initialState: GameState = {
  currentStatistics: defaultCurrentStatistics,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    tick: (state, action: PayloadAction<number>) => {
      state.currentStatistics = getNextCurrentStatistics(state.currentStatistics, action.payload);
    },

    buyGenerator: (state, action: PayloadAction<Generator>) => {
      console.log("buy it!");
    },
  },
});

export const { tick, buyGenerator } = gameSlice.actions;

export const selectCurrentStatistics = (state: RootState) => state.game.currentStatistics;

export default gameSlice.reducer;
