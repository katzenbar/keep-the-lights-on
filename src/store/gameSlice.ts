import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNextCurrentStatistics,
  CurrentStatistics,
  defaultCurrentStatistics,
  updateStatisticsOnGeneratorPurchase,
  updateStatisticsOnResearcherPurchase,
} from "../lib/CurrentStatistics";
import {
  canPurchaseGenerator,
  defaultGeneratorsState,
  GeneratorsState,
  GeneratorType,
  purchaseGenerator,
} from "../lib/Generators";
import {
  canPurchaseResearcher,
  defaultResearchersState,
  purchaseResearcher,
  ResearchersState,
  ResearcherType,
} from "../lib/Researchers";
import { RootState } from "./store";

export interface GameState {
  currentStatistics: CurrentStatistics;
  generators: GeneratorsState;
  researchers: ResearchersState;
}

const initialState: GameState = {
  currentStatistics: defaultCurrentStatistics,
  generators: defaultGeneratorsState,
  researchers: defaultResearchersState,
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

    buyResearcher: (state, action: PayloadAction<ResearcherType>) => {
      const researcherType = action.payload;

      const { currentStatistics, researchers } = state;
      const cashAvailable = currentStatistics.cashAvailable;
      const researcher = researchers[researcherType];

      if (canPurchaseResearcher(cashAvailable, researcher)) {
        const purchaseCost = researcher.nextPurchaseCost;

        state.researchers[researcherType] = purchaseResearcher(researcherType, researcher);
        state.currentStatistics = updateStatisticsOnResearcherPurchase(currentStatistics, purchaseCost, researchers);
      }
    },
  },
});

export const { tick, buyGenerator, buyResearcher } = gameSlice.actions;

export const selectGenerators = (state: RootState) => state.game.generators;

export const selectResearchers = (state: RootState) => state.game.researchers;

export const selectCurrentStatistics = (state: RootState) => state.game.currentStatistics;
export const selectCashAvailable = (state: RootState) => state.game.currentStatistics.cashAvailable;
export const selectMaxCashAvailable = (state: RootState) => state.game.currentStatistics.maxCashAvailable;

export default gameSlice.reducer;
