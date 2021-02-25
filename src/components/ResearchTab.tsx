import { Button, Heading, StackItem, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { researcherTypes, researcherDescriptions, canPurchaseResearcher } from "../lib/Researchers";
import { compare, multiply, serializeNumber, formatSerializeableBigNumber } from "../lib/SerializeableBigNumber";
import { selectCashAvailable, selectMaxCashAvailable, buyResearcher, selectResearchers } from "../store/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type Props = {};

const ResearchTab: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();
  const cashAvailable = useAppSelector(selectCashAvailable);
  const maxCashAvailable = useAppSelector(selectMaxCashAvailable);
  const researchers = useAppSelector(selectResearchers);

  return (
    <VStack align="stretch" spacing={4}>
      {researcherTypes.map((researcherType) => {
        const researcher = researchers[researcherType];
        const researcherDescription = researcherDescriptions[researcherType];

        if (compare(maxCashAvailable, multiply(serializeNumber(0.75), researcherDescription.baseCost)) === -1) {
          return null;
        }

        return (
          <StackItem key={researcherType}>
            <Heading as="h2" size="sm" pb={1}>
              {researcherDescription.name} x {researcher.numberEmployed}
            </Heading>
            <Text pb={2} fontSize="sm" color="gray.400">
              Generates {formatSerializeableBigNumber(researcher.ideasPerDay)} ideas per day --{" "}
              {researcherDescription.colorText}
            </Text>
            <Button
              onClick={() => dispatch(buyResearcher(researcherType))}
              disabled={!canPurchaseResearcher(cashAvailable, researcher)}
            >
              Hire for ${formatSerializeableBigNumber(researcher.nextPurchaseCost)}
            </Button>
          </StackItem>
        );
      })}
    </VStack>
  );
};

export default ResearchTab;
