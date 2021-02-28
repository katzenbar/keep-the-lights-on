import { GameState } from "../store/gameSlice";
import { compare, SerializeableBigNumber, serializeNumber } from "./SerializeableBigNumber";

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
    requiresResearchProjects: [ResearchProjectType.expandGrid1],
    applyResearch: (state) => {
      state.currentStatistics.homesInPowerGrid = serializeNumber(100);
      return state;
    },
  },
];

export const hasRequiredResearchProjects = (
  researchProject: ResearchProjectDescription,
  purchasedResearchProjects: Array<ResearchProjectType>,
): boolean => {
  const purchasedSet = new Set(purchasedResearchProjects);
  return researchProject.requiresResearchProjects.every((rp) => purchasedSet.has(rp));
};

export const canPurchaseResearchProject = (
  ideasAvailable: SerializeableBigNumber,
  researchProject: ResearchProjectDescription,
  purchasedResearchProjects: Array<ResearchProjectType>,
): boolean => {
  if (compare(ideasAvailable, researchProject.cost) === -1) {
    return false;
  }
  return hasRequiredResearchProjects(researchProject, purchasedResearchProjects);
};
