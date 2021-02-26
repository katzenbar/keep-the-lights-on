import { Box, Heading, Select, StackItem, VStack } from "@chakra-ui/react";
import React from "react";
import { selectTicksPerDay, updateTicksPerDay } from "../store/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ColorModeSwitcher } from "./SettingsTab/ColorModeSwitcher";

type Props = {};

const SettingsTab: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();
  const ticksPerDay = useAppSelector(selectTicksPerDay);

  return (
    <VStack align="flex-start" spacing={4}>
      <StackItem>
        <Heading as="h2" size="sm" pb={1}>
          Theme
        </Heading>
        <ColorModeSwitcher />
      </StackItem>

      {process.env.NODE_ENV !== "production" && (
        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Ticks per Second (Development Mode)
          </Heading>
          <Box>
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
          </Box>
        </StackItem>
      )}
    </VStack>
  );
};

export default SettingsTab;
