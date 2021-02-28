import { binomialCostGenerator, linearCostGenerator, trinomialCostGenerator } from "./costGenerator";
import { add, compare, multiply, SerializeableBigNumber, serializeNumber } from "./SerializeableBigNumber";

export enum GeneratorType {
  hamsters = "hamsters",
  pinwheels = "pinwheels",
  handCrank = "handCrank",
  bicycle = "bicycle",
  solarPanel = "solarPanel",
  picoHydro = "picoHydro",
  biomass = "biomass",
  tidalStream = "tidalStream",
  solarDish = "solarDish",
  ethanol = "ethanol",
  smallHydro = "smallHydro",
  windTurbine = "windTurbine",
  coal = "coal",
  oil = "oil",
  solarPowerTower = "solarPowerTower",
  naturalGas = "naturalGas",
  hydroelectricDam = "hydroelectricDam",
  nuclearFission = "nuclearFission",
  spaceSolarArray = "spaceSolarArray",
  nuclearFusion = "nuclearFusion",
  dysonSphere = "dysonSphere",
}

export type GeneratorDescription = {
  name: string;
  colorText: string;
  baseWattsPerDay: SerializeableBigNumber;
  costOfNthGenerator: (n: number) => SerializeableBigNumber;
};

export type GeneratorDescriptions = {
  [key in GeneratorType]: GeneratorDescription;
};

export const generatorDescriptions: GeneratorDescriptions = {
  hamsters: {
    name: "Hamster",
    colorText: "Watch those little legs go!",
    baseWattsPerDay: serializeNumber(0.5),
    costOfNthGenerator: linearCostGenerator(0.25, 0),
  },
  pinwheels: {
    name: "Pinwheel",
    colorText: "One day you'll build a great wind farm.",
    baseWattsPerDay: serializeNumber(3),
    costOfNthGenerator: linearCostGenerator(1, 1),
  },
  handCrank: {
    name: "Hand Crank",
    colorText: "Skip the gym and make some money.",
    baseWattsPerDay: serializeNumber(11),
    costOfNthGenerator: linearCostGenerator(7, 3),
  },
  bicycle: {
    name: "Human-powered Bicycle",
    colorText: "You can make it up the hill, just keep pedaling!",
    baseWattsPerDay: serializeNumber(127),
    costOfNthGenerator: linearCostGenerator(31, 23),
  },
  solarPanel: {
    name: "Solar Panel",
    colorText: "The photo-voltaic cells soak up the sun's rays and turn it into a modest amount of electricity.",
    baseWattsPerDay: serializeNumber(307),
    costOfNthGenerator: linearCostGenerator(101, 43),
  },
  picoHydro: {
    name: "Pico Hydro",
    colorText: "These small power plants generate electricity using water from nearby streams.",
    baseWattsPerDay: serializeNumber(1669),
    costOfNthGenerator: linearCostGenerator(569, 83),
  },
  biomass: {
    name: "Biomass Power Plant",
    colorText: "These power plants burn things like plants, trees, and even garbage to generate electricity.",
    baseWattsPerDay: serializeNumber(4229),
    costOfNthGenerator: linearCostGenerator(2143, 257),
  },
  tidalStream: {
    name: "Tidal Stream Generator",
    colorText: "It's like a wind turbine, for the sea!",
    baseWattsPerDay: serializeNumber(16_903),
    costOfNthGenerator: linearCostGenerator(9157, 1409),
  },
  solarDish: {
    name: "Solar Dish",
    colorText: "A parabolic dish that focuses energy from the sun onto a receiver.",
    baseWattsPerDay: serializeNumber(69_427),
    costOfNthGenerator: linearCostGenerator(26_927, 6373),
  },
  ethanol: {
    name: "Ethanol Power Plant",
    colorText: "A power plant that burns ethanol to generate electricity.",
    baseWattsPerDay: serializeNumber(251_393),
    costOfNthGenerator: linearCostGenerator(94583, 18_661),
  },
  smallHydro: {
    name: "Small Hydro",
    colorText: "A hydroelectric powerplant located on a small river",
    baseWattsPerDay: serializeNumber(969_503),
    costOfNthGenerator: binomialCostGenerator(7, 173_431, 22_769),
  },
  windTurbine: {
    name: "Wind Turbine",
    colorText: "Finally, the wind farm that you've always dreamed of!",
    baseWattsPerDay: serializeNumber(3_117_467),
    costOfNthGenerator: binomialCostGenerator(31, 340_801, 83_341),
  },
  coal: {
    name: "Coal Power Plant",
    colorText: "A power plant that burns coal to generate electricity. This is a bit dirty...",
    baseWattsPerDay: serializeNumber(12_138_481),
    costOfNthGenerator: binomialCostGenerator(101, 999_983, 243_197),
  },
  oil: {
    name: "Oil Power Plant",
    colorText: "A power plant that burns oil to generate electricity.",
    baseWattsPerDay: serializeNumber(42_666_601),
    costOfNthGenerator: binomialCostGenerator(569, 2_804_569, 976_909),
  },
  solarPowerTower: {
    name: "Solar Power Tower",
    colorText: "A collection of mirrors that focus sunlight on a central tower to generate heat.",
    baseWattsPerDay: serializeNumber(369_671_453),
    costOfNthGenerator: binomialCostGenerator(2143, 9_009_163, 3_914_269),
  },
  naturalGas: {
    name: "Natural Gas Power Plant",
    colorText: "A power plant that burns natural gas to generate electricity.",
    baseWattsPerDay: serializeNumber(2_429_698_879),
    costOfNthGenerator: binomialCostGenerator(9157, 32_046_979, 15_662_723),
  },
  hydroelectricDam: {
    name: "Hydroelectric Dam",
    colorText: "A large hydroelectric dam that generates a large amount of power.",
    baseWattsPerDay: serializeNumber(9_679_695_049),
    costOfNthGenerator: binomialCostGenerator(26927, 132_045_167, 62_659_657),
  },
  nuclearFission: {
    name: "Nuclear Fission Reactor",
    colorText: "A power plant that uses controlled nuclear fission reactions to generate electricity.",
    baseWattsPerDay: serializeNumber(31_679_723_617),
    costOfNthGenerator: trinomialCostGenerator(7, 94583, 373_202_677, 250_641_211),
  },
  spaceSolarArray: {
    name: "Space Solar Panel Array",
    colorText: "With nothing in the way, we can generate even more solar power!",
    baseWattsPerDay: serializeNumber(187_679_724_691),
    costOfNthGenerator: trinomialCostGenerator(31, 173431, 923_212_441, 1_002_572_119),
  },
  nuclearFusion: {
    name: "Nuclear Fusion Reactor",
    colorText: "An even more efficient form of nuclear power.",
    baseWattsPerDay: serializeNumber(969_679_760_479),
    costOfNthGenerator: trinomialCostGenerator(101, 340801, 2_735_208_481, 4_010_292_701),
  },
  dysonSphere: {
    name: "Dyson Sphere",
    colorText: "Capture energy from stars across the universe.",
    baseWattsPerDay: serializeNumber(42_000_000_000_000),
    costOfNthGenerator: trinomialCostGenerator(569, 999983, 6_135_210_871, 16_041_259_051),
  },
};

export type GeneratorState = {
  numberOwned: number;
  wattsPerDay: SerializeableBigNumber;
  nextPurchaseCost: SerializeableBigNumber;
};

export type GeneratorsState = {
  [key in GeneratorType]: GeneratorState;
};

export const defaultGeneratorsState: GeneratorsState = Object.entries(generatorDescriptions).reduce(
  (acc, [key, value]) => {
    acc[key as GeneratorType] = {
      numberOwned: 0,
      wattsPerDay: value.baseWattsPerDay,
      nextPurchaseCost: value.costOfNthGenerator(1),
    };
    return acc;
  },
  {} as GeneratorsState,
);

export const generatorTypes = Object.entries(defaultGeneratorsState)
  .sort(([typeA, generatorA], [typeB, generatorB]) => compare(generatorA.nextPurchaseCost, generatorB.nextPurchaseCost))
  .map(([type, generator]) => type as GeneratorType) as Array<GeneratorType>;

export const canPurchaseGenerator = (cashAvailable: SerializeableBigNumber, generator: GeneratorState): boolean =>
  compare(cashAvailable, generator.nextPurchaseCost) !== -1;

export const purchaseGenerator = (generatorType: GeneratorType, generator: GeneratorState): GeneratorState => {
  const { numberOwned } = generator;

  const nextPurchaseCost = generatorDescriptions[generatorType].costOfNthGenerator(numberOwned + 2);

  return {
    ...generator,
    numberOwned: numberOwned + 1,
    nextPurchaseCost,
  };
};

export const calculateWattsGenerated = (generators: GeneratorsState): SerializeableBigNumber =>
  Object.values(generators).reduce(
    (acc, generator) => add(acc, multiply(serializeNumber(generator.numberOwned), generator.wattsPerDay)),
    serializeNumber(0),
  );
