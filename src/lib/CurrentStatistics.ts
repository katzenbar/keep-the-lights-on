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
  totalCashEarned: SerializeableBigNumber;
  cashEarnedPerDay: SerializeableBigNumber;

  homesPowered: SerializeableBigNumber;
  homesInPowerGrid: SerializeableBigNumber;
  wattsUsedPerHomePerDay: SerializeableBigNumber;

  pricePerWatt: SerializeableBigNumber;
  wattsGeneratedPerDay: SerializeableBigNumber;
  totalWattsSold: SerializeableBigNumber;

  ideasAvailable: SerializeableBigNumber;
  maxIdeasAvailable: SerializeableBigNumber;
  totalIdeasGenerated: SerializeableBigNumber;
  ideasGeneratedPerDay: SerializeableBigNumber;
};

export const defaultCurrentStatistics: CurrentStatistics = {
  daysElapsed: serializeNumber(0),
  ticksPerDay: 16,

  cashAvailable: serializeNumber(1),
  maxCashAvailable: serializeNumber(0),
  totalCashEarned: serializeNumber(0),
  cashEarnedPerDay: serializeNumber(0),

  homesPowered: serializeNumber(0),
  homesInPowerGrid: serializeNumber(1),
  wattsUsedPerHomePerDay: serializeNumber(20),

  pricePerWatt: serializeNumber(0.03),
  wattsGeneratedPerDay: serializeNumber(0),
  totalWattsSold: serializeNumber(0),

  ideasAvailable: serializeNumber(0),
  maxIdeasAvailable: serializeNumber(0),
  totalIdeasGenerated: serializeNumber(0),
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

const getWattsConsumedPerTick = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { ticksPerDay, homesInPowerGrid, wattsUsedPerHomePerDay, wattsGeneratedPerDay } = currentStatistics;

  const wattsConsumedPerDay = min(wattsGeneratedPerDay, multiply(homesInPowerGrid, wattsUsedPerHomePerDay));

  return divide(wattsConsumedPerDay, serializeNumber(ticksPerDay));
};

const getCashEarnedPerTick = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { pricePerWatt } = currentStatistics;

  return multiply(getWattsConsumedPerTick(currentStatistics), pricePerWatt);
};

const getIdeasPerTick = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { ticksPerDay, ideasGeneratedPerDay } = currentStatistics;

  return divide(ideasGeneratedPerDay, serializeNumber(ticksPerDay));
};

export const getNextCurrentStatistics = (
  currentStatistics: CurrentStatistics,
  tickCounter: number,
): CurrentStatistics => {
  const daysElapsed = getNextDaysElapsed(currentStatistics, tickCounter);

  const cashEarnedPerTick = getCashEarnedPerTick(currentStatistics);
  const cashAvailable = add(currentStatistics.cashAvailable, cashEarnedPerTick);
  const totalCashEarned = add(currentStatistics.totalCashEarned, cashEarnedPerTick);
  const maxCashAvailable = max(cashAvailable, currentStatistics.maxCashAvailable);

  const ideasPerTick = getIdeasPerTick(currentStatistics);
  const ideasAvailable = add(currentStatistics.ideasAvailable, ideasPerTick);
  const totalIdeasGenerated = add(currentStatistics.totalIdeasGenerated, ideasPerTick);
  const maxIdeasAvailable = max(ideasAvailable, currentStatistics.maxIdeasAvailable);

  const totalWattsSold = add(currentStatistics.totalWattsSold, getWattsConsumedPerTick(currentStatistics));

  return {
    ...currentStatistics,
    daysElapsed,
    cashAvailable,
    maxCashAvailable,
    totalCashEarned,
    ideasAvailable,
    maxIdeasAvailable,
    totalIdeasGenerated,
    totalWattsSold,
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
