import { GameState } from "../store/gameSlice";
import { SerializeableBigNumber, serializeNumber } from "./SerializeableBigNumber";

export enum ResearchProjectType {
  expandGrid1 = "expandGrid1",
  expandGrid2 = "expandGrid2",
}

export type ResearchProjectDescription = {
  identifier: ResearchProjectType;
  name: string;
  description: string;
  cost: SerializeableBigNumber;
  requiresResearchProjects: Array<ResearchProjectType>;
  applyResearch: (state: GameState) => GameState;
};

export const researchProjects: Array<ResearchProjectDescription> = [
  {
    identifier: ResearchProjectType.expandGrid1,
    name: "Power the Street",
    description: "Expand your power grid to provide power to your whole street",
    cost: serializeNumber(100),
    requiresResearchProjects: [],
    applyResearch: (state) => {
      state.currentStatistics.homesInPowerGrid = serializeNumber(10);
      return state;
    },
  },
  {
    identifier: ResearchProjectType.expandGrid2,
    name: "Power the Neighborhood",
    description: "Expand your power grid to provide power to your whole street",
    cost: serializeNumber(2000),
    requiresResearchProjects: [],
    applyResearch: (state) => {
      state.currentStatistics.homesInPowerGrid = serializeNumber(100);
      return state;
    },
  },
];
