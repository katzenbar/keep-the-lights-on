import { Box, Button, chakra, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deserializeGameState } from "../../lib/gameStateSaves";
import { resetGame } from "../../store/gameSlice";

const importWarningMessage =
  "This will overwrite all of your current save data, and cannot be undone. Are you sure you want to continue?";

type Props = {};

const ImportGameState: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const toast = useToast();

  const handleImport = () => {
    if (window.confirm(importWarningMessage)) {
      const parsedValue = deserializeGameState(value);

      if (parsedValue) {
        dispatch(resetGame(parsedValue));

        toast({
          title: "Save Imported",
          description: "Your game save has been imported successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Import Failed",
          description: "Importing the game save failed. Check that you have entered the entire game state.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  return (
    <Box {...props}>
      <Textarea value={value} onChange={(event) => setValue(event.target.value)} />
      <Button mt={2} onClick={handleImport} disabled={!value}>
        Import Data
      </Button>
    </Box>
  );
};

export default chakra(ImportGameState);
