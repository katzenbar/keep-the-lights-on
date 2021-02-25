import { defaultCurrentStatistics, getNextCurrentStatistics, CurrentStatistics } from "./CurrentStatistics";
import { serializeNumber } from "./SerializeableBigNumber";

describe("CurrentStatistics", () => {
  describe("getNextCurrentStatistics", () => {
    describe("daysElapsed", () => {
      it("does not update when a full day has not passed yet", () => {
        const result = getNextCurrentStatistics(defaultCurrentStatistics, 1);
        expect(result.daysElapsed).toEqual(serializeNumber(0));
      });

      it("updates the daysElapsed when on a multiple of ticksPerDay", () => {
        const result = getNextCurrentStatistics(defaultCurrentStatistics, 0);
        expect(result.daysElapsed).toEqual(serializeNumber(1));
      });
    });

    describe("cashAvailable", () => {
      it("updates the cash available", () => {
        const currentStatistics: CurrentStatistics = {
          ...defaultCurrentStatistics,
          ticksPerDay: 4,
          cashAvailable: serializeNumber(3),
          homesInPowerGrid: serializeNumber(50),
          wattsUsedPerHomePerDay: serializeNumber(2),
          pricePerWatt: serializeNumber(5),
          wattsGeneratedPerDay: serializeNumber(13),
        };

        const result = getNextCurrentStatistics(currentStatistics, 0);
        expect(result.cashAvailable).toEqual(serializeNumber(19.25));
      });

      it("limits the amount of watts consumed per day, based on houses in the grid", () => {
        const currentStatistics: CurrentStatistics = {
          ...defaultCurrentStatistics,
          ticksPerDay: 4,
          cashAvailable: serializeNumber(3),
          homesInPowerGrid: serializeNumber(3),
          wattsUsedPerHomePerDay: serializeNumber(2),
          pricePerWatt: serializeNumber(5),
          wattsGeneratedPerDay: serializeNumber(13),
        };

        const result = getNextCurrentStatistics(currentStatistics, 0);
        expect(result.cashAvailable).toEqual(serializeNumber(10.5));
      });
    });
  });
});
