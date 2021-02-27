import { Button, Heading, Select, StackItem, VStack } from "@chakra-ui/react";
import React from "react";
import { selectTicksPerDay, updateTicksPerDay, resetGame } from "../store/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ColorModeSwitcher } from "./SettingsTab/ColorModeSwitcher";

const resetWarning =
  "This will reset all of your progress with no benefit, and cannot be undone. Are you sure you want to continue?";

type Props = {};

const SettingsTab: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();
  const ticksPerDay = useAppSelector(selectTicksPerDay);

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
          Reset
        </Heading>
        <Button onClick={handleResetSession}>Reset Current Session</Button>
      </StackItem>

      {process.env.NODE_ENV !== "production" && (
        <StackItem>
          <Heading as="h2" size="sm" pb={2}>
            Ticks per Second (Development Mode)
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
    </VStack>
  );
};

export default SettingsTab;
