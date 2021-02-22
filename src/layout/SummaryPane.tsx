import { Heading, StackItem, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const SummaryPane: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Heading as="h1" size="md" pb={2}>
        Keep the Lights On
      </Heading>
      <VStack pt={4} align="stretch" spacing={4}>
        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Power Generation
          </Heading>
          <Text>10 kWh</Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Houses Illuminated
          </Heading>
          <Text pb={1}>1 / 1</Text>
          <Text fontSize="sm" color="gray.400">
            100%
          </Text>
        </StackItem>

        <StackItem>
          <Heading as="h2" size="sm" pb={1}>
            Funds
          </Heading>
          <Text pb={1}>$1000</Text>
          <Text fontSize="sm" color="gray.400">
            $10 / s
          </Text>
        </StackItem>
      </VStack>
    </>
  );
};

export default SummaryPane;
