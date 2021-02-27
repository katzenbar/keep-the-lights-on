import { Heading, StackItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { divide, multiply, serializeNumber, formatStandardNumber, formatMoney } from "../lib/SerializeableBigNumber";
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

  const percentOfHomesPowered = multiply(serializeNumber(100), divide(homesPowered, homesInPowerGrid));

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
          <Text>{formatStandardNumber(daysElapsed)} days</Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Funds
          </Heading>
          <Text pb={1}>${formatMoney(cashAvailable)}</Text>
          <Text fontSize="sm" color="gray.400">
            ${formatMoney(cashEarnedPerDay)} per day
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Power Generation
          </Heading>
          <Text pb={1}>{formatStandardNumber(wattsGeneratedPerDay)} watts per day</Text>
          <Text fontSize="sm" color="gray.400">
            ${formatMoney(pricePerWatt)} per watt
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Houses Illuminated
          </Heading>
          <Text pb={1}>
            {formatStandardNumber(homesPowered, 2)} / {formatStandardNumber(homesInPowerGrid)}
          </Text>
          <Text pb={1} color={homesPowered === homesInPowerGrid ? undefined : "red.500"}>
            {formatStandardNumber(percentOfHomesPowered)}%
          </Text>
          <Text fontSize="sm" color="gray.400">
            {formatStandardNumber(wattsUsedPerHomePerDay)} watts used per house per day
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Research
          </Heading>
          <Text pb={1}>{formatStandardNumber(ideasAvailable)} ideas</Text>
          <Text fontSize="sm" color="gray.400">
            {formatStandardNumber(ideasGeneratedPerDay)} ideas per day
          </Text>
        </StackItem>
      </VStack>
    </>
  );
};

export default SummaryPane;
