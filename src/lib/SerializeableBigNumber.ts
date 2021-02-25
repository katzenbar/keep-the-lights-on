import Decimal, { DecimalSource } from "break_infinity.js";

export type SerializeableBigNumber = {
  man: number;
  exp: number;
};

const toDecimal = (serialized: SerializeableBigNumber): Decimal =>
  Decimal.fromMantissaExponent(serialized.man, serialized.exp);

export const serializeNumber = (value: DecimalSource): SerializeableBigNumber => {
  const decimalValue = new Decimal(value);

  return {
    man: decimalValue.mantissa,
    exp: decimalValue.exponent,
  };
};

export const add = (a: SerializeableBigNumber, b: SerializeableBigNumber): SerializeableBigNumber =>
  serializeNumber(Decimal.add(toDecimal(a), toDecimal(b)));

export const subtract = (a: SerializeableBigNumber, b: SerializeableBigNumber): SerializeableBigNumber =>
  serializeNumber(Decimal.subtract(toDecimal(a), toDecimal(b)));

export const multiply = (a: SerializeableBigNumber, b: SerializeableBigNumber): SerializeableBigNumber =>
  serializeNumber(Decimal.multiply(toDecimal(a), toDecimal(b)));

export const divide = (a: SerializeableBigNumber, b: SerializeableBigNumber): SerializeableBigNumber =>
  serializeNumber(Decimal.divide(toDecimal(a), toDecimal(b)));

export const max = (a: SerializeableBigNumber, b: SerializeableBigNumber): SerializeableBigNumber =>
  serializeNumber(Decimal.max(toDecimal(a), toDecimal(b)));

export const min = (a: SerializeableBigNumber, b: SerializeableBigNumber): SerializeableBigNumber =>
  serializeNumber(Decimal.min(toDecimal(a), toDecimal(b)));

export const compare = (a: SerializeableBigNumber, b: SerializeableBigNumber): number =>
  Decimal.compare(toDecimal(a), toDecimal(b));

export const formatSerializeableBigNumber = (a: SerializeableBigNumber): string => toDecimal(a).toString();
