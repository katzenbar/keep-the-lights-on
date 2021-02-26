import { add, compare, multiply, SerializeableBigNumber, serializeNumber } from "./SerializeableBigNumber";

export enum ResearcherType {
  juniorResearchAssistant = "juniorResearchAssistant",
  researchAssistant = "researchAssistant",
}

export type ResearcherDescription = {
  name: string;
  colorText: string;
  baseCost: SerializeableBigNumber;
  costOfNthResearcher: (n: number) => SerializeableBigNumber;
};

export type ResearcherDescriptions = {
  [key in ResearcherType]: ResearcherDescription;
};

export const researcherDescriptions: ResearcherDescriptions = {
  juniorResearchAssistant: {
    name: "Junior Research Assistant",
    colorText: "Maybe recruiting your 12 year old cousin wasn't the best idea.",
    baseCost: serializeNumber(5),
    costOfNthResearcher: (n) => serializeNumber(n * 2 + 3),
  },
  researchAssistant: {
    name: "Research Assistant",
    colorText: "The honors students from your high school are interested in your project. They might be helpful.",
    baseCost: serializeNumber(25),
    costOfNthResearcher: (n) => serializeNumber(n * 10 + 15),
  },
};

export const researcherTypes = Object.keys(ResearcherType).sort((a, b) =>
  compare(researcherDescriptions[a as ResearcherType].baseCost, researcherDescriptions[b as ResearcherType].baseCost),
) as Array<ResearcherType>;

export type ResearcherState = {
  numberEmployed: number;
  ideasPerDay: SerializeableBigNumber;
  nextPurchaseCost: SerializeableBigNumber;
};

export type ResearchersState = {
  [key in ResearcherType]: ResearcherState;
};

export const defaultResearchersState: ResearchersState = {
  juniorResearchAssistant: {
    numberEmployed: 0,
    ideasPerDay: serializeNumber(0.5),
    nextPurchaseCost: researcherDescriptions.juniorResearchAssistant.baseCost,
  },
  researchAssistant: {
    numberEmployed: 0,
    ideasPerDay: serializeNumber(3),
    nextPurchaseCost: researcherDescriptions.researchAssistant.baseCost,
  },
};

export const canPurchaseResearcher = (cashAvailable: SerializeableBigNumber, researcher: ResearcherState): boolean =>
  compare(cashAvailable, researcher.nextPurchaseCost) !== -1;

export const purchaseResearcher = (researcherType: ResearcherType, researcher: ResearcherState): ResearcherState => {
  const { numberEmployed } = researcher;

  const nextPurchaseCost = researcherDescriptions[researcherType].costOfNthResearcher(numberEmployed + 2);

  return {
    ...researcher,
    numberEmployed: numberEmployed + 1,
    nextPurchaseCost,
  };
};

export const calculateIdeasCreated = (researchers: ResearchersState): SerializeableBigNumber =>
  Object.values(researchers).reduce(
    (acc, researcher) => add(acc, multiply(serializeNumber(researcher.numberEmployed), researcher.ideasPerDay)),
    serializeNumber(0),
  );
