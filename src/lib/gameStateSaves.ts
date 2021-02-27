import { GameState } from "../store/gameSlice";

export const serializeGameState = (gameState: GameState): string => {
  return btoa(JSON.stringify(gameState));
};

export const deserializeGameState = (serializedState: string): GameState | undefined => {
  try {
    return JSON.parse(atob(serializedState));
  } catch (e) {
    return undefined;
  }
};

export const saveGameState = (gameState: GameState): void => {
  localStorage.setItem("gameSave", serializeGameState(gameState));
};

export const loadGameState = (): GameState | undefined => {
  const savedState = localStorage.getItem("gameSave");
  if (savedState) {
    return deserializeGameState(savedState);
  } else {
    return undefined;
  }
};
