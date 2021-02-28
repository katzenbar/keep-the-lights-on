import { startCase } from "lodash";
import { GameState } from "../store/gameSlice";
import {
  compare,
  formatMoney,
  formatStandardNumber,
  SerializeableBigNumber,
  serializeNumber,
  truncate,
} from "./SerializeableBigNumber";

export type ResearchProjectDescription = {
  identifier: string;
  name: string;
  description: string;
  cost: SerializeableBigNumber;
  requiresResearchProjects: Array<string>;
  applyResearch: (state: GameState) => GameState;
};

const expandTheGridProjects: Array<ResearchProjectDescription> = [
  "street",
  "neighborhood",
  "town",
  "city",
  "state",
  "country",
  "continent",
  "planet",
  "galaxy",
  "universe",
  "multiverse",
].map((type, index, types) => {
  const capitalizedName = startCase(type);

  const previousProject = types[index - 1];
  let requiresResearchProjects: Array<string> = [];
  if (previousProject) {
    requiresResearchProjects = [`expandGrid_${previousProject}`];
  }

  let cost = serializeNumber(100);
  if (index === 0) {
    cost = serializeNumber(100);
  } else if (index === 1) {
    cost = serializeNumber(2500);
  } else if (index === 2) {
    cost = serializeNumber(10301);
  } else {
    cost = truncate(
      serializeNumber(
        14257681 * (index - 3) * (index - 3) * (index - 3) + 25667 * (index - 2) * (index - 2) + 8647 * index,
      ),
    );
  }

  const numHomes = serializeNumber(Math.pow(10, index + 1));

  return {
    identifier: `expandGrid_${type}`,
    name: `Power the ${capitalizedName}`,
    description: `Expand your power grid to provide power to the ${type} with a base of ${formatStandardNumber(
      numHomes,
      0,
    )} homes`,
    cost,
    requiresResearchProjects,
    applyResearch: (state) => {
      state.currentStatistics.homesInPowerGrid = numHomes;
      return state;
    },
  };
});

const salesPowerProjects: Array<ResearchProjectDescription> = [
  "basic",
  "beginner",
  "intermediate",
  "advanced",
  "professional",
  "excellent",
  "award-winning",
  "world-renown",
].map((type, index, types) => {
  const capitalizedName = startCase(type);

  const previousProject = types[index - 1];
  let requiresResearchProjects: Array<string> = [];
  if (previousProject) {
    requiresResearchProjects = [`salesPower_${previousProject}`];
  }

  let cost = serializeNumber(500);
  if (index === 0) {
    cost = serializeNumber(500);
  } else if (index === 1) {
    cost = serializeNumber(7500);
  } else if (index === 2) {
    cost = serializeNumber(19739);
  } else {
    cost = truncate(
      serializeNumber(
        34260761 * (index - 3) * (index - 3) * (index - 3) + 47501 * (index - 2) * (index - 2) + 8647 * index,
      ),
    );
  }

  const pricePerWatt = serializeNumber(0.03 + 0.01 * (index + 1) + 0.01 * (index * index));

  return {
    identifier: `salesPower_${type}`,
    name: `${capitalizedName} Sales`,
    description: `Hire ${type} sales people to increase the base price per watt to $${formatMoney(pricePerWatt)}`,
    cost,
    requiresResearchProjects,
    applyResearch: (state) => {
      state.currentStatistics.pricePerWatt = pricePerWatt;
      return state;
    },
  };
});

export const researchProjects: Array<ResearchProjectDescription> = [...expandTheGridProjects, ...salesPowerProjects];

export const hasRequiredResearchProjects = (
  researchProject: ResearchProjectDescription,
  purchasedResearchProjects: Array<string>,
): boolean => {
  const purchasedSet = new Set(purchasedResearchProjects);
  return researchProject.requiresResearchProjects.every((rp) => purchasedSet.has(rp));
};

export const canPurchaseResearchProject = (
  ideasAvailable: SerializeableBigNumber,
  researchProject: ResearchProjectDescription,
  purchasedResearchProjects: Array<string>,
): boolean => {
  if (compare(ideasAvailable, researchProject.cost) === -1) {
    return false;
  }
  return hasRequiredResearchProjects(researchProject, purchasedResearchProjects);
};
