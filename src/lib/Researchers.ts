import { linearCostGenerator } from "./costGenerator";
import { add, compare, multiply, SerializeableBigNumber, serializeNumber } from "./SerializeableBigNumber";

export enum ResearcherType {
  juniorResearchAssistant = "juniorResearchAssistant",
  highSchoolStudent = "highSchoolStudent",
  undergraduateStudent = "undergraduateStudent",
  mastersStudent = "mastersStudent",
  researchAssistant = "researchAssistant",
  phdStudent = "phdStudent",
  postdoc = "postdoc",
  assistantProf = "assistantProf",
  tenuredProf = "tenuredProf",
  seniorResearchFellow = "seniorResearchFellow",
  principalResearchFellow = "principalResearchFellow",
  nobelLauriate = "nobelLauriate",
}

export type ResearcherDescription = {
  name: string;
  colorText: string;
  baseIdeasPerDay: SerializeableBigNumber;
  costOfNthResearcher: (n: number) => SerializeableBigNumber;
};

export type ResearcherDescriptions = {
  [key in ResearcherType]: ResearcherDescription;
};

export const researcherDescriptions: ResearcherDescriptions = {
  juniorResearchAssistant: {
    name: '"Junior" Research Assistant',
    colorText: "Maybe recruiting your 12 year old cousin wasn't the best idea.",
    baseIdeasPerDay: serializeNumber(0.5),
    costOfNthResearcher: linearCostGenerator(2, 3),
  },
  highSchoolStudent: {
    name: "High School Student",
    colorText: "The honors students from your high school are interested in your project. They might be helpful.",
    baseIdeasPerDay: serializeNumber(3),
    costOfNthResearcher: linearCostGenerator(11, 13),
  },
  undergraduateStudent: {
    name: "Undergraduate Student",
    colorText: "Undergraduate interns can help speed up your progress cheaply.",
    baseIdeasPerDay: serializeNumber(13),
    costOfNthResearcher: linearCostGenerator(43, 23),
  },
  mastersStudent: {
    name: "Masters Student",
    colorText: "More educated and enthusiastic, masters students will accelerate your progress.",
    baseIdeasPerDay: serializeNumber(41),
    costOfNthResearcher: linearCostGenerator(191, 89),
  },
  researchAssistant: {
    name: "Research Assistant",
    colorText: "Full-time staff that are the workhorse of your research department.",
    baseIdeasPerDay: serializeNumber(109),
    costOfNthResearcher: linearCostGenerator(977, 457),
  },
  phdStudent: {
    name: "PhD Student",
    colorText: "Students that have dedicated their life to the field.",
    baseIdeasPerDay: serializeNumber(317),
    costOfNthResearcher: linearCostGenerator(4861, 2339),
  },
  postdoc: {
    name: "Postdoc Research Fellow",
    colorText: "After graduating with their PhD, they are preparing for the rest of their careers as researchers.",
    baseIdeasPerDay: serializeNumber(1259),
    costOfNthResearcher: linearCostGenerator(27277, 13967),
  },
  assistantProf: {
    name: "Assistant Professor",
    colorText: "Professors starting their career path towards tenure.",
    baseIdeasPerDay: serializeNumber(3769),
    costOfNthResearcher: linearCostGenerator(142799, 72383),
  },
  tenuredProf: {
    name: "Tenured Professor",
    colorText:
      "The highest ranking professors, they bring along their own student researchers to help speed up their work.",
    baseIdeasPerDay: serializeNumber(12721),
    costOfNthResearcher: linearCostGenerator(721451, 362237),
  },
  seniorResearchFellow: {
    name: "Senior Research Fellow",
    colorText: "Full-time, highly trained researchers.",
    baseIdeasPerDay: serializeNumber(39541),
    costOfNthResearcher: linearCostGenerator(3607255, 1804813),
  },
  principalResearchFellow: {
    name: "Principal Research Fellow",
    colorText: "Even more senior full-time researchers.",
    baseIdeasPerDay: serializeNumber(121883),
    costOfNthResearcher: linearCostGenerator(18039319, 9025013),
  },
  nobelLauriate: {
    name: "Nobel Lauriate",
    colorText: "Scientists that have won the most prestigious award in their field, they are worth every penny.",
    baseIdeasPerDay: serializeNumber(549641),
    costOfNthResearcher: linearCostGenerator(90205261, 451031871),
  },
};

export type ResearcherState = {
  numberEmployed: number;
  ideasPerDay: SerializeableBigNumber;
  nextPurchaseCost: SerializeableBigNumber;
};

export type ResearchersState = {
  [key in ResearcherType]: ResearcherState;
};

export const defaultResearchersState: ResearchersState = Object.entries(researcherDescriptions).reduce(
  (acc, [key, value]) => {
    acc[key as ResearcherType] = {
      numberEmployed: 0,
      ideasPerDay: value.baseIdeasPerDay,
      nextPurchaseCost: value.costOfNthResearcher(1),
    };
    return acc;
  },
  {} as ResearchersState,
);

export const researcherTypes = Object.entries(defaultResearchersState)
  .sort(([typeA, researcherA], [typeB, researcherB]) =>
    compare(researcherA.nextPurchaseCost, researcherB.nextPurchaseCost),
  )
  .map(([type, researcher]) => type as ResearcherType) as Array<ResearcherType>;

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
