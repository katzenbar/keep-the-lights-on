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

export type AscensionMultiplier = "wattsUsedMultiplier" | "priceMultiplier" | "wattsMultiplier" | "ideasMultiplier";

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

  timesAscended: number;
  nextAscensionPrice: SerializeableBigNumber;
  wattsUsedMultiplier: SerializeableBigNumber;
  priceMultiplier: SerializeableBigNumber;
  wattsMultiplier: SerializeableBigNumber;
  ideasMultiplier: SerializeableBigNumber;
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

  timesAscended: 0,
  nextAscensionPrice: serializeNumber(1_000_000),
  wattsUsedMultiplier: serializeNumber(1),
  priceMultiplier: serializeNumber(1),
  wattsMultiplier: serializeNumber(1),
  ideasMultiplier: serializeNumber(1),
};

const getNextDaysElapsed = (currentStatistics: CurrentStatistics, tickCounter: number): SerializeableBigNumber => {
  const { daysElapsed, ticksPerDay } = currentStatistics;

  if (tickCounter % ticksPerDay === 0) {
    return add(daysElapsed, serializeNumber(1));
  } else {
    return daysElapsed;
  }
};

const getWattsUsedWithMulti = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { wattsUsedPerHomePerDay, wattsUsedMultiplier } = currentStatistics;
  return multiply(wattsUsedPerHomePerDay, wattsUsedMultiplier);
};

const getWattsGeneratedWithMulti = (
  currentStatistics: CurrentStatistics,
  generators: GeneratorsState,
): SerializeableBigNumber => {
  const { wattsMultiplier } = currentStatistics;
  const wattsGeneratedPerDay = calculateWattsGenerated(generators);
  return multiply(wattsGeneratedPerDay, wattsMultiplier);
};

const getIdeasGeneratedWithMulti = (
  currentStatistics: CurrentStatistics,
  researchersState: ResearchersState,
): SerializeableBigNumber => {
  const { ideasMultiplier } = currentStatistics;
  const ideasGeneratedPerDay = calculateIdeasCreated(researchersState);
  return multiply(ideasGeneratedPerDay, ideasMultiplier);
};

const getWattsConsumedPerTick = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { ticksPerDay, homesInPowerGrid, wattsGeneratedPerDay } = currentStatistics;

  const wattsConsumedPerDay = min(
    wattsGeneratedPerDay,
    multiply(homesInPowerGrid, getWattsUsedWithMulti(currentStatistics)),
  );

  return divide(wattsConsumedPerDay, serializeNumber(ticksPerDay));
};

const getCashEarnedPerTick = (currentStatistics: CurrentStatistics): SerializeableBigNumber => {
  const { pricePerWatt, priceMultiplier } = currentStatistics;

  return multiply(getWattsConsumedPerTick(currentStatistics), multiply(pricePerWatt, priceMultiplier));
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
  const wattsGeneratedPerDay = getWattsGeneratedWithMulti(currentStatistics, generators);
  const wattsConsumedPerDay = min(
    wattsGeneratedPerDay,
    multiply(currentStatistics.homesInPowerGrid, getWattsUsedWithMulti(currentStatistics)),
  );
  const cashEarnedPerDay = multiply(
    wattsConsumedPerDay,
    multiply(currentStatistics.pricePerWatt, currentStatistics.priceMultiplier),
  );
  const homesPowered = min(
    currentStatistics.homesInPowerGrid,
    divide(wattsGeneratedPerDay, getWattsUsedWithMulti(currentStatistics)),
  );
  const ideasGeneratedPerDay = getIdeasGeneratedWithMulti(currentStatistics, researchersState);

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
