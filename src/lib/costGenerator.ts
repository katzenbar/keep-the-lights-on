import { serializeNumber } from "./SerializeableBigNumber";

export const linearCostGenerator = (a: number, b: number) => (n: number) => serializeNumber(a * n + b);

export const binomialCostGenerator = (a: number, b: number, c: number) => (n: number) =>
  serializeNumber(a * n * n + b * n + c);

export const trinomialCostGenerator = (a: number, b: number, c: number, d: number) => (n: number) =>
  serializeNumber(a * n * n * n + b * n * n + c * n + d);
