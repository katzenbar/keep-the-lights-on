import {
  calculateWattsGenerated,
  canPurchaseGenerator,
  GeneratorsState,
  GeneratorState,
  GeneratorType,
  generatorTypes,
  purchaseGenerator,
} from "./Generators";
import { serializeNumber } from "./SerializeableBigNumber";

describe("Generators", () => {
  describe("generatorTypes", () => {
    it("returns the generator types in order of increasing base cost", () => {
      expect(generatorTypes).toEqual(["hamsters", "pinwheels", "bicycle"]);
    });
  });

  describe("canPurchaseGenerator", () => {
    const generator: GeneratorState = {
      numberOwned: 1,
      wattsPerDay: serializeNumber(0.5),
      nextPurchaseCost: serializeNumber(10),
    };

    it("returns false when we don't have enough money", () => {
      const result = canPurchaseGenerator(serializeNumber(0.1), generator);
      expect(result).toEqual(false);
    });

    it("returns true when we have exactly enough money", () => {
      const result = canPurchaseGenerator(serializeNumber(10), generator);
      expect(result).toEqual(true);
    });

    it("returns true when we have more than enough money", () => {
      const result = canPurchaseGenerator(serializeNumber(10.1), generator);
      expect(result).toEqual(true);
    });
  });

  describe("purchaseGenerator", () => {
    const generator: GeneratorState = {
      numberOwned: 3,
      wattsPerDay: serializeNumber(0.5),
      nextPurchaseCost: serializeNumber(10),
    };

    it("updates the numbered owned", () => {
      const updatedGenerator = purchaseGenerator(GeneratorType.pinwheels, generator);
      expect(updatedGenerator.numberOwned).toEqual(4);
    });

    it("updates the nextPurchaseCost", () => {
      const updatedGenerator = purchaseGenerator(GeneratorType.pinwheels, generator);
      expect(updatedGenerator.nextPurchaseCost).toEqual(serializeNumber(10));
    });
  });

  describe("calculateWattsGenerated", () => {
    const generatorsState: GeneratorsState = {
      hamsters: {
        numberOwned: 13,
        wattsPerDay: serializeNumber(3),
        nextPurchaseCost: serializeNumber(10),
      },
      pinwheels: {
        numberOwned: 7,
        wattsPerDay: serializeNumber(11),
        nextPurchaseCost: serializeNumber(15),
      },
      bicycle: {
        numberOwned: 5,
        wattsPerDay: serializeNumber(19),
        nextPurchaseCost: serializeNumber(20),
      },
    };

    it("sums the watts per day generated for the different generator types", () => {
      const result = calculateWattsGenerated(generatorsState);
      expect(result).toEqual(serializeNumber(13 * 3 + 7 * 11 + 5 * 19));
    });
  });
});
