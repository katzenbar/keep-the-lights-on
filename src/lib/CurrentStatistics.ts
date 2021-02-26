import { calculateWattsGenerated, GeneratorsState } from "./Generators";
import { calculateIdeasCreated, ResearchersState } from "./Researchers";
import {
  SerializeableBigNumber,
  serializeNumber,
  add,
  multiply,
  divide,
  min,
  max,
  subtract,
} from "./SerializeableBigNumber";

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

  ideasAvailable: SerializeableBigNumber;
  maxIdeasAvailable: SerializeableBigNumber;
  ideasGeneratedPerDay: SerializeableBigNumber;
};

export const defaultCurrentStatistics: CurrentStatistics = {
  daysElapsed: serializeNumber(0),
  ticksPerDay: 8,

  cashAvailable: serializeNumber(1),
  maxCashAvailable: serializeNumber(0),
  cashEarnedPerDay: serializeNumber(0),

  homesPowered: serializeNumber(0),
  homesInPowerGrid: serializeNumber(1),
  wattsUsedPerHomePerDay: serializeNumber(20),

  pricePerWatt: serializeNumber(0.03),
  wattsGeneratedPerDay: serializeNumber(0),

  ideasAvailable: serializeNumber(0),
  maxIdeasAvailable: serializeNumber(0),
  ideasGeneratedPerDay: serializeNumber(0),
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

const getNextIdeasAvailable = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { ticksPerDay, ideasAvailable, ideasGeneratedPerDay } = currentStatistics;

  const ideasPerTick = divide(ideasGeneratedPerDay, serializeNumber(ticksPerDay));

  return add(ideasAvailable, ideasPerTick);
};

export const getNextCurrentStatistics = (
  currentStatistics: CurrentStatistics,
  tickCounter: number,
): CurrentStatistics => {
  const daysElapsed = getNextDaysElapsed(currentStatistics, tickCounter);

  const cashAvailable = getNextCashAvailable(currentStatistics);
  const maxCashAvailable = max(cashAvailable, currentStatistics.maxCashAvailable);

  const ideasAvailable = getNextIdeasAvailable(currentStatistics);
  const maxIdeasAvailable = max(ideasAvailable, currentStatistics.maxCashAvailable);

  return {
    ...currentStatistics,
    daysElapsed,
    cashAvailable,
    maxCashAvailable,
    ideasAvailable,
    maxIdeasAvailable,
  };
};

export const updateCachedStatistics = (
  currentStatistics: CurrentStatistics,
  generators: GeneratorsState,
  researchersState: ResearchersState,
) => {
  const wattsGeneratedPerDay = calculateWattsGenerated(generators);
  const wattsConsumedPerDay = min(
    wattsGeneratedPerDay,
    multiply(currentStatistics.homesInPowerGrid, currentStatistics.wattsUsedPerHomePerDay),
  );
  const cashEarnedPerDay = multiply(wattsConsumedPerDay, currentStatistics.pricePerWatt);
  const homesPowered = min(
    currentStatistics.homesInPowerGrid,
    divide(wattsGeneratedPerDay, currentStatistics.wattsUsedPerHomePerDay),
  );
  const ideasGeneratedPerDay = calculateIdeasCreated(researchersState);

  return { ...currentStatistics, cashEarnedPerDay, homesPowered, wattsGeneratedPerDay, ideasGeneratedPerDay };
};

export const makePurchase = (
  currentStatistics: CurrentStatistics,
  purchaseCost: SerializeableBigNumber,
): CurrentStatistics => {
  const cashAvailable = subtract(currentStatistics.cashAvailable, purchaseCost);
  currentStatistics.cashAvailable = cashAvailable;
  return currentStatistics;
};
