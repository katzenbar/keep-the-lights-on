import { SerializeableBigNumber, serializeNumber, add, multiply, divide, min, max } from "./SerializeableBigNumber";

export type CurrentStatistics = {
  daysElapsed: SerializeableBigNumber;
  ticksPerDay: number;

  cashAvailable: SerializeableBigNumber;
  maxCashAvailable: SerializeableBigNumber;
  cashEarnedPerDay: SerializeableBigNumber;

  homesPowered: SerializeableBigNumber;
  homesInPowerGrid: SerializeableBigNumber;
  wattsUsedPerHomePerDay: SerializeableBigNumber;

  pricePerWatt: SerializeableBigNumber;
  wattsGeneratedPerDay: SerializeableBigNumber;
};

export const defaultCurrentStatistics: CurrentStatistics = {
  daysElapsed: serializeNumber(0),
  ticksPerDay: 8,

  cashAvailable: serializeNumber(0),
  maxCashAvailable: serializeNumber(0),
  cashEarnedPerDay: serializeNumber(0),

  homesPowered: serializeNumber(0),
  homesInPowerGrid: serializeNumber(1),
  wattsUsedPerHomePerDay: serializeNumber(2),

  pricePerWatt: serializeNumber(0.01),
  wattsGeneratedPerDay: serializeNumber(5),
};

const getNextDaysElapsed = (currentStatistics: CurrentStatistics, tickCounter: number): SerializeableBigNumber => {
  const { daysElapsed, ticksPerDay } = currentStatistics;

  if (tickCounter % ticksPerDay === 0) {
    return add(daysElapsed, serializeNumber(1));
  } else {
    return daysElapsed;
  }
};

const getNextCashAvailable = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const {
    ticksPerDay,
    cashAvailable,
    homesInPowerGrid,
    wattsUsedPerHomePerDay,
    pricePerWatt,
    wattsGeneratedPerDay,
  } = currentStatistics;

  const wattsConsumedPerDay = min(wattsGeneratedPerDay, multiply(homesInPowerGrid, wattsUsedPerHomePerDay));
  const cashEarnedPerDay = multiply(wattsConsumedPerDay, pricePerWatt);

  return add(cashAvailable, divide(cashEarnedPerDay, serializeNumber(ticksPerDay)));
};

export const getNextCurrentStatistics = (
  currentStatistics: CurrentStatistics,
  tickCounter: number,
): CurrentStatistics => {
  const daysElapsed = getNextDaysElapsed(currentStatistics, tickCounter);

  const cashAvailable = getNextCashAvailable(currentStatistics);
  const maxCashAvailable = max(cashAvailable, currentStatistics.maxCashAvailable);

  return {
    ...currentStatistics,
    daysElapsed,
    cashAvailable,
    maxCashAvailable,
  };
};
