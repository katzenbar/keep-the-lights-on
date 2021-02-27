import { useInterval } from "@chakra-ui/react";
import React from "react";
import { saveGameState } from "../lib/gameStateSaves";
import { selectGameState } from "../store/gameSlice";
import { useAppSelector } from "../store/hooks";

type Props = {};

const GameAutosaver: React.FunctionComponent<Props> = (props) => {
  const gameState = useAppSelector(selectGameState);

  useInterval(() => {
    saveGameState(gameState);
  }, 30 * 1000);

  return null;
};

export default GameAutosaver;
