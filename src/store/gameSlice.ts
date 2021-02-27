import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNextCurrentStatistics,
  CurrentStatistics,
  defaultCurrentStatistics,
  updateCachedStatistics,
  makePurchase,
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
import { researchProjects, ResearchProjectType } from "../lib/ResearchProjects";
import { compare, subtract } from "../lib/SerializeableBigNumber";
import { RootState } from "./store";

export interface GameState {
  currentStatistics: CurrentStatistics;
  generators: GeneratorsState;
  researchers: ResearchersState;
  purchasedResearchProjects: Array<ResearchProjectType>;
}

const initialState: GameState = {
  currentStatistics: defaultCurrentStatistics,
  generators: defaultGeneratorsState,
  researchers: defaultResearchersState,
  purchasedResearchProjects: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    tick: (state, action: PayloadAction<number>) => {
      state.currentStatistics = getNextCurrentStatistics(state.currentStatistics, action.payload);
    },

    updateTicksPerDay: (state, action: PayloadAction<number>) => {
      state.currentStatistics.ticksPerDay = action.payload;
    },

    buyGenerator: (state, action: PayloadAction<GeneratorType>) => {
      const generatorType = action.payload;

      const { currentStatistics, generators, researchers } = state;
      const cashAvailable = currentStatistics.cashAvailable;
      const generator = generators[generatorType];

      if (canPurchaseGenerator(cashAvailable, generator)) {
        const purchaseCost = generator.nextPurchaseCost;

        state.generators[generatorType] = purchaseGenerator(generatorType, generator);
        state.currentStatistics = makePurchase(currentStatistics, purchaseCost);
        state.currentStatistics = updateCachedStatistics(currentStatistics, generators, researchers);
      }
    },

    buyResearcher: (state, action: PayloadAction<ResearcherType>) => {
      const researcherType = action.payload;

      const { currentStatistics, generators, researchers } = state;
      const cashAvailable = currentStatistics.cashAvailable;
      const researcher = researchers[researcherType];

      if (canPurchaseResearcher(cashAvailable, researcher)) {
        const purchaseCost = researcher.nextPurchaseCost;

        state.researchers[researcherType] = purchaseResearcher(researcherType, researcher);
        state.currentStatistics = makePurchase(currentStatistics, purchaseCost);
        state.currentStatistics = updateCachedStatistics(currentStatistics, generators, researchers);
      }
    },

    purchaseResearchProject: (state, action: PayloadAction<ResearchProjectType>) => {
      const researchProject = researchProjects.find((project) => project.identifier === action.payload);

      if (researchProject && compare(state.currentStatistics.ideasAvailable, researchProject.cost) !== -1) {
        state = researchProject.applyResearch(state);
        state.currentStatistics.ideasAvailable = subtract(state.currentStatistics.ideasAvailable, researchProject.cost);
        state.purchasedResearchProjects.push(action.payload);
      }
    },

    resetGame: () => {
      return initialState;
    },
  },
});

export const {
  tick,
  buyGenerator,
  buyResearcher,
  purchaseResearchProject,
  updateTicksPerDay,
  resetGame,
} = gameSlice.actions;

export const selectGenerators = (state: RootState) => state.game.generators;

export const selectResearchers = (state: RootState) => state.game.researchers;

export const selectTicksPerDay = (state: RootState) => state.game.currentStatistics.ticksPerDay;

export const selectCurrentStatistics = (state: RootState) => state.game.currentStatistics;
export const selectCashAvailable = (state: RootState) => state.game.currentStatistics.cashAvailable;
export const selectMaxCashAvailable = (state: RootState) => state.game.currentStatistics.maxCashAvailable;

export const selectIdeasAvailable = (state: RootState) => state.game.currentStatistics.ideasAvailable;
export const selectMaxIdeasAvailable = (state: RootState) => state.game.currentStatistics.maxIdeasAvailable;
export const selectPurchasedResearchProjects = (state: RootState) => state.game.purchasedResearchProjects;

export default gameSlice.reducer;
