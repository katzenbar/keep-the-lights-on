import { Button, Heading, StackItem, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const GenerationTab: React.FunctionComponent<Props> = (props) => {
  return (
    <VStack align="stretch" spacing={4}>
      <StackItem>
        <Heading as="h2" size="sm" pb={1}>
          Candles x 5
        </Heading>
        <Text pb={2} fontSize="sm" color="gray.400">
          Lights up a single room.
        </Text>
        <Button>Buy 1 for $5</Button>
      </StackItem>

      <StackItem>
        <Heading as="h2" size="sm" pb={1}>
          Hamster Wheels x 10
        </Heading>
        <Text pb={2} fontSize="sm" color="gray.400">
          Watch those little legs go!
        </Text>
        <Button>Buy 1 for $10</Button>
      </StackItem>
    </VStack>
  );
};

export default GenerationTab;
