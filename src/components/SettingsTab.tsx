import { Button, Heading, HStack, Link, Select, StackItem, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { selectTicksPerDay, updateTicksPerDay, resetGame } from "../store/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ColorModeSwitcher } from "./SettingsTab/ColorModeSwitcher";
import ExportedGameState from "./SettingsTab/ExportedGameState";
import ImportGameState from "./SettingsTab/ImportGameState";
import ManualSaveButton from "./SettingsTab/ManualSaveButton";

const resetWarning =
  "This will reset all of your progress with no benefit, and cannot be undone. Are you sure you want to continue?";

type Props = {};

const SettingsTab: React.FunctionComponent<Props> = (props) => {
  const [showExportedGameState, setShowExportedGameState] = useState(false);
  const [showImportGameState, setShowImportGameState] = useState(false);

  const dispatch = useAppDispatch();
  const ticksPerDay = useAppSelector(selectTicksPerDay);

  const toggleShowExportedGameState = () => {
    setShowImportGameState(false);
    setShowExportedGameState(!showExportedGameState);
  };

  const toggleShowImportameState = () => {
    setShowExportedGameState(false);
    setShowImportGameState(!showImportGameState);
  };

  const handleResetSession = () => {
    if (window.confirm(resetWarning)) {
      dispatch(resetGame());
    }
  };

  return (
    <VStack align="flex-start" spacing={8}>
      <StackItem>
        <Heading as="h2" size="sm" pb={2}>
          Theme
        </Heading>
        <ColorModeSwitcher />
      </StackItem>

      <StackItem>
        <Heading as="h2" size="sm" pb={2}>
          Manual Game Saves
        </Heading>
        <HStack spacing={4}>
          <ManualSaveButton />
          <Button onClick={toggleShowExportedGameState}>Export Game Save</Button>
          <Button onClick={toggleShowImportameState}>Import Game Save</Button>
          <Button onClick={handleResetSession}>Reset</Button>
        </HStack>
        {showExportedGameState && <ExportedGameState mt={4} />}
        {showImportGameState && <ImportGameState mt={4} />}
      </StackItem>

      {process.env.NODE_ENV !== "production" && (
        <StackItem>
          <Heading as="h2" size="sm" pb={2}>
            Ticks per Day (Development Mode)
          </Heading>

          <Select
            placeholder="Select option"
            value={ticksPerDay}
            onChange={(event) => dispatch(updateTicksPerDay(parseInt(event.target.value, 10)))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
          </Select>
        </StackItem>
      )}

      <StackItem>
        <Heading as="h2" size="sm" mb={2}>
          About the Game
        </Heading>
        <Text color="gray.500" fontStyle="italic">
          Version 0.0.1 &mdash;{" "}
          <Link color="teal.500" href="https://github.com/katzenbar/keep-the-lights-on">
            https://github.com/katzenbar/keep-the-lights-on
          </Link>
        </Text>

        <Text mt={2}>
          This game was developed as part of the{" "}
          <Link color="teal.500" href="https://itch.io/jam/incremental-game-jam-2">
            Incremental Game Jam 2
          </Link>{" "}
          on itch.io, over the course of one week in February 2021. Because of the time limit, the game may not be very
          balanced and may have a few bugs. However, I hope that it is still enjoyable.
        </Text>
      </StackItem>
    </VStack>
  );
};

export default SettingsTab;
