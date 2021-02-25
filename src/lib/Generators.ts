import { add, compare, multiply, SerializeableBigNumber, serializeNumber } from "./SerializeableBigNumber";

export enum GeneratorType {
  hamsters = "hamsters",
  pinwheels = "pinwheels",
  bicycle = "bicycle",
}

export type GeneratorDescription = {
  name: string;
  colorText: string;
  baseCost: SerializeableBigNumber;
  costOfNthGenerator: (n: number) => SerializeableBigNumber;
};

export type GeneratorDescriptions = {
  [key in GeneratorType]: GeneratorDescription;
};

export const generatorDescriptions: GeneratorDescriptions = {
  hamsters: {
    name: "Hamster",
    colorText: "Watch those little legs go!",
    baseCost: serializeNumber(0.25),
    costOfNthGenerator: (n) => serializeNumber(n * 0.25),
  },
  pinwheels: {
    name: "Pinwheel",
    colorText: "One day you'll build a great wind farm.",
    baseCost: serializeNumber(2),
    costOfNthGenerator: (n) => serializeNumber(n * 2),
  },
  bicycle: {
    name: "Human-powered Bicycle",
    colorText: "You can make it up the hill, just keep pedaling!",
    baseCost: serializeNumber(20),
    costOfNthGenerator: (n) => serializeNumber((n - 1) * 5 + 20),
  },
};

export const generatorTypes = Object.keys(GeneratorType).sort((a, b) =>
  compare(generatorDescriptions[a as GeneratorType].baseCost, generatorDescriptions[b as GeneratorType].baseCost),
) as Array<GeneratorType>;

export type GeneratorState = {
  numberOwned: number;
  wattsPerDay: SerializeableBigNumber;
  nextPurchaseCost: SerializeableBigNumber;
};

export type GeneratorsState = {
  [key in GeneratorType]: GeneratorState;
};

export const defaultGeneratorsState: GeneratorsState = {
  hamsters: {
    numberOwned: 0,
    wattsPerDay: serializeNumber(0.5),
    nextPurchaseCost: generatorDescriptions.hamsters.baseCost,
  },
  pinwheels: {
    numberOwned: 0,
    wattsPerDay: serializeNumber(2),
    nextPurchaseCost: generatorDescriptions.pinwheels.baseCost,
  },
  bicycle: {
    numberOwned: 0,
    wattsPerDay: serializeNumber(10),
    nextPurchaseCost: generatorDescriptions.pinwheels.baseCost,
  },
};

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
