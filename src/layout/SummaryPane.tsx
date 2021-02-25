import { Heading, StackItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { formatSerializeableBigNumber } from "../lib/SerializeableBigNumber";
import { selectCurrentStatistics } from "../store/gameSlice";
import { useAppSelector } from "../store/hooks";

type Props = {};

const SummaryPane: React.FunctionComponent<Props> = (props) => {
  const currentStatistics = useAppSelector(selectCurrentStatistics);

  const {
    daysElapsed,
    cashAvailable,
    cashEarnedPerDay,
    homesPowered,
    homesInPowerGrid,
    wattsUsedPerHomePerDay,
    pricePerWatt,
    wattsGeneratedPerDay,
    ideasAvailable,
    ideasGeneratedPerDay,
  } = currentStatistics;

  return (
    <>
      <Heading as="h1" size="md" pb={2}>
        Keep the Lights On
      </Heading>
      <VStack pt={4} align="stretch" spacing={4}>
        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Time Elapsed
          </Heading>
          <Text>{formatSerializeableBigNumber(daysElapsed)} days</Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Power Generation
          </Heading>
          <Text pb={1}>{formatSerializeableBigNumber(wattsGeneratedPerDay)} watts per day</Text>
          <Text fontSize="sm" color="gray.400">
            ${formatSerializeableBigNumber(pricePerWatt)} per watt
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Houses Illuminated
          </Heading>
          <Text pb={1}>
            {formatSerializeableBigNumber(homesPowered)} / {formatSerializeableBigNumber(homesInPowerGrid)}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {formatSerializeableBigNumber(wattsUsedPerHomePerDay)} watts used per house per day
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Funds
          </Heading>
          <Text pb={1}>${formatSerializeableBigNumber(cashAvailable)}</Text>
          <Text fontSize="sm" color="gray.400">
            ${formatSerializeableBigNumber(cashEarnedPerDay)} per day
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Research
          </Heading>
          <Text pb={1}>{formatSerializeableBigNumber(ideasAvailable)} ideas thought of</Text>
          <Text fontSize="sm" color="gray.400">
            {formatSerializeableBigNumber(ideasGeneratedPerDay)} ideas per day
          </Text>
        </StackItem>
      </VStack>
    </>
  );
};

export default SummaryPane;
