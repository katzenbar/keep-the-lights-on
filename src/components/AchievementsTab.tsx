import { Heading, SimpleGrid, StackItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { formatMoney, formatStandardNumber } from "../lib/SerializeableBigNumber";
import { selectMaxCollected, selectTotalCollected } from "../store/gameSlice";
import { useAppSelector } from "../store/hooks";

type Props = {};

const AchievementsTab: React.FunctionComponent<Props> = (props) => {
  const maxCollected = useAppSelector(selectMaxCollected);
  const totalCollected = useAppSelector(selectTotalCollected);

  return (
    <VStack align="flex-start" spacing={8}>
      <StackItem>
        <Heading as="h2" size="md" pb={2}>
          Statistics
        </Heading>
        <SimpleGrid columns={2} spacingX={4}>
          <Text fontWeight="bold">Max cash available</Text>
          <Text>${formatMoney(maxCollected.maxCashAvailable)}</Text>
          <Text fontWeight="bold">Total cash earned</Text>
          <Text>${formatMoney(totalCollected.totalCashEarned)}</Text>
          <Text fontWeight="bold">Max ideas available</Text>
          <Text>{formatStandardNumber(maxCollected.maxIdeasAvailable)} ideas</Text>
          <Text fontWeight="bold">Total ideas created</Text>
          <Text>{formatStandardNumber(totalCollected.totalIdeasGenerated)} ideas</Text>
          <Text fontWeight="bold">Total power sold</Text>
          <Text>{formatStandardNumber(totalCollected.totalWattsSold)} watts</Text>
        </SimpleGrid>
      </StackItem>
    </VStack>
  );
};

export default AchievementsTab;
