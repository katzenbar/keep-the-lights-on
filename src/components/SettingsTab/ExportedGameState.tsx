import { Box, Button, chakra, Textarea, useClipboard } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { serializeGameState } from "../../lib/gameStateSaves";
import { selectGameState } from "../../store/gameSlice";
import { useAppSelector } from "../../store/hooks";

type Props = {};

const ExportedGameState: React.FunctionComponent<Props> = (props) => {
  const [exportedGameState, setExportedGameState] = useState<string>("");
  const gameState = useAppSelector(selectGameState);
  const { hasCopied, onCopy } = useClipboard(exportedGameState);

  useEffect(() => {
    setExportedGameState(serializeGameState(gameState));
    // Only update the exported game state when this component is initially rendered. Intentionally leave out
    // gameState as a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setExportedGameState]);

  return (
    <Box {...props} position="relative">
      <Textarea readOnly value={exportedGameState} height={250} />
      <Button
        onClick={onCopy}
        variant="solid"
        colorScheme="teal"
        size="xs"
        textTransform="uppercase"
        position="absolute"
        zIndex={1}
        top={3}
        right={6}
      >
        {hasCopied ? "Copied!" : "Copy"}
      </Button>
    </Box>
  );
};

export default chakra(ExportedGameState);
