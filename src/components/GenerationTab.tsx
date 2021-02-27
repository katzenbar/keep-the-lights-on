import { Button, Heading, StackItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { canPurchaseGenerator, generatorDescriptions, generatorTypes } from "../lib/Generators";
import { compare, formatStandardNumber, formatMoney, multiply, serializeNumber } from "../lib/SerializeableBigNumber";
import { buyGenerator, selectCashAvailable, selectGenerators, selectMaxCashAvailable } from "../store/gameSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

type Props = {};

const GenerationTab: React.FunctionComponent<Props> = (props) => {
  const dispatch = useAppDispatch();
  const cashAvailable = useAppSelector(selectCashAvailable);
  const maxCashAvailable = useAppSelector(selectMaxCashAvailable);
  const generators = useAppSelector(selectGenerators);

  return (
    <VStack align="stretch" spacing={4}>
      {generatorTypes.map((generatorType) => {
        const generator = generators[generatorType];
        const generatorDescription = generatorDescriptions[generatorType];

        if (compare(maxCashAvailable, multiply(serializeNumber(0.75), generatorDescription.baseCost)) === -1) {
          return null;
        }

        return (
          <StackItem key={generatorType}>
            <Heading as="h2" size="sm" pb={1}>
              {generatorDescription.name} x {generator.numberOwned}
            </Heading>
            <Text pb={2} fontSize="sm" color="gray.400">
              Generates {formatStandardNumber(generator.wattsPerDay)} watts per day -- {generatorDescription.colorText}
            </Text>
            <Button
              onClick={() => dispatch(buyGenerator(generatorType))}
              disabled={!canPurchaseGenerator(cashAvailable, generator)}
            >
              Buy for ${formatMoney(generator.nextPurchaseCost, true)}
            </Button>
          </StackItem>
        );
      })}
    </VStack>
  );
};

export default GenerationTab;
