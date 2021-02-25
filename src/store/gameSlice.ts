import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNextCurrentStatistics,
  CurrentStatistics,
  defaultCurrentStatistics,
  updateStatisticsOnGeneratorPurchase,
} from "../lib/CurrentStatistics";
import {
  canPurchaseGenerator,
  defaultGeneratorsState,
  GeneratorsState,
  GeneratorType,
  purchaseGenerator,
} from "../lib/Generators";
import { RootState } from "./store";

export interface GameState {
  currentStatistics: CurrentStatistics;
  generators: GeneratorsState;
}

const initialState: GameState = {
  currentStatistics: defaultCurrentStatistics,
  generators: defaultGeneratorsState,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    tick: (state, action: PayloadAction<number>) => {
      state.currentStatistics = getNextCurrentStatistics(state.currentStatistics, action.payload);
    },

    buyGenerator: (state, action: PayloadAction<GeneratorType>) => {
      const generatorType = action.payload;

      const { currentStatistics, generators } = state;
      const cashAvailable = currentStatistics.cashAvailable;
      const generator = generators[generatorType];

      if (canPurchaseGenerator(cashAvailable, generator)) {
        const purchaseCost = generator.nextPurchaseCost;

        state.generators[generatorType] = purchaseGenerator(generatorType, generator);
        state.currentStatistics = updateStatisticsOnGeneratorPurchase(currentStatistics, purchaseCost, generators);
      }
    },
  },
});

export const { tick, buyGenerator } = gameSlice.actions;

export const selectGenerator = (generator: GeneratorType) => (state: RootState) => state.game.generators[generator];
export const selectGenerators = (state: RootState) => state.game.generators;

export const selectCurrentStatistics = (state: RootState) => state.game.currentStatistics;
export const selectCashAvailable = (state: RootState) => state.game.currentStatistics.cashAvailable;
export const selectMaxCashAvailable = (state: RootState) => state.game.currentStatistics.maxCashAvailable;

export default gameSlice.reducer;
