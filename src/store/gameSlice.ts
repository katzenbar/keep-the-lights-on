import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNextCurrentStatistics,
  CurrentStatistics,
  defaultCurrentStatistics,
  updateCachedStatistics,
  makePurchase,
  AscensionMultiplier,
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
import { canPurchaseResearchProject, researchProjects } from "../lib/ResearchProjects";
import { add, multiply, serializeNumber, subtract } from "../lib/SerializeableBigNumber";
import { RootState } from "./store";

export interface GameState {
  currentStatistics: CurrentStatistics;
  generators: GeneratorsState;
  researchers: ResearchersState;
  purchasedResearchProjects: Array<string>;
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

    purchaseResearchProject: (state, action: PayloadAction<string>) => {
      const researchProject = researchProjects.find((project) => project.identifier === action.payload);

      if (
        researchProject &&
        canPurchaseResearchProject(
          state.currentStatistics.ideasAvailable,
          researchProject,
          state.purchasedResearchProjects,
        )
      ) {
        state = researchProject.applyResearch(state);
        state.currentStatistics.ideasAvailable = subtract(state.currentStatistics.ideasAvailable, researchProject.cost);
        state.purchasedResearchProjects.push(action.payload);
        state.currentStatistics = updateCachedStatistics(state.currentStatistics, state.generators, state.researchers);
      }
    },

    ascend: (state, action: PayloadAction<AscensionMultiplier>) => {
      const { currentStatistics } = state;
      const updatedCurrentStatistics = {
        ...initialState.currentStatistics,
        timesAscended: currentStatistics.timesAscended + 1,
        nextAscensionPrice: multiply(currentStatistics.nextAscensionPrice, serializeNumber(10)),
        wattsUsedMultiplier: currentStatistics.wattsUsedMultiplier,
        priceMultiplier: currentStatistics.priceMultiplier,
        wattsMultiplier: currentStatistics.wattsMultiplier,
        ideasMultiplier: currentStatistics.ideasMultiplier,
      };

      updatedCurrentStatistics[action.payload] = add(updatedCurrentStatistics[action.payload], serializeNumber(0.1));

      return {
        ...initialState,
        currentStatistics: updateCachedStatistics(
          updatedCurrentStatistics,
          initialState.generators,
          initialState.researchers,
        ),
      };
    },

    resetGame: (state, action: PayloadAction<GameState | undefined>) => {
      if (action.payload) {
        return action.payload;
      }
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
  ascend,
} = gameSlice.actions;

export const selectGameState = (state: RootState) => state.game;

export const selectGenerators = (state: RootState) => state.game.generators;
export const selectResearchers = (state: RootState) => state.game.researchers;

export const selectTicksPerDay = (state: RootState) => state.game.currentStatistics.ticksPerDay;

export const selectCurrentStatistics = (state: RootState) => state.game.currentStatistics;
export const selectCashAvailable = (state: RootState) => state.game.currentStatistics.cashAvailable;
export const selectMaxCashAvailable = (state: RootState) => state.game.currentStatistics.maxCashAvailable;

export const selectIdeasAvailable = (state: RootState) => state.game.currentStatistics.ideasAvailable;
export const selectMaxIdeasAvailable = (state: RootState) => state.game.currentStatistics.maxIdeasAvailable;
export const selectPurchasedResearchProjects = (state: RootState) => state.game.purchasedResearchProjects;

export const selectMaxCollected = (state: RootState) => ({
  maxCashAvailable: state.game.currentStatistics.maxCashAvailable,
  maxIdeasAvailable: state.game.currentStatistics.maxIdeasAvailable,
});

export const selectTotalCollected = (state: RootState) => ({
  totalCashEarned: state.game.currentStatistics.totalCashEarned,
  totalIdeasGenerated: state.game.currentStatistics.totalIdeasGenerated,
  totalWattsSold: state.game.currentStatistics.totalWattsSold,
});

export const selectWattsMultiplier = (state: RootState) => state.game.currentStatistics.wattsMultiplier;
export const selectIdeasMultiplier = (state: RootState) => state.game.currentStatistics.ideasMultiplier;

export const selectAscensionStats = (state: RootState) => {
  const currentStatistics = state.game.currentStatistics;
  const {
    timesAscended,
    nextAscensionPrice,
    wattsUsedMultiplier,
    priceMultiplier,
    wattsMultiplier,
    ideasMultiplier,
  } = currentStatistics;

  return {
    timesAscended,
    nextAscensionPrice,
    wattsUsedMultiplier,
    priceMultiplier,
    wattsMultiplier,
    ideasMultiplier,
  };
};

export default gameSlice.reducer;
