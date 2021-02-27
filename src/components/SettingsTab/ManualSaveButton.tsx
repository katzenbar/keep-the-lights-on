import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import { saveGameState } from "../../lib/gameStateSaves";
import { selectGameState } from "../../store/gameSlice";
import { useAppSelector } from "../../store/hooks";

const ManualSaveButton: React.FunctionComponent<ButtonProps> = (props) => {
  const gameState = useAppSelector(selectGameState);

  const handleSave = () => {
    saveGameState(gameState);
  };

  return (
    <Button {...props} onClick={handleSave}>
      Save
    </Button>
  );
};

export default ManualSaveButton;
