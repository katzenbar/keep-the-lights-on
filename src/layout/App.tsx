import React from "react";
import { ChakraProvider, Box, theme, Flex, Divider } from "@chakra-ui/react";
import SummaryPane from "./SummaryPane";
import ContentPane from "./ContentPane";

export const App: React.FunctionComponent = () => (
  <ChakraProvider theme={theme}>
    <Box>
      <Flex minH="100vh" direction="row" alignItems="stretch">
        <Box overflow="auto" w={250} p={2}>
          <SummaryPane />
        </Box>
        <Box>
          <Divider orientation="vertical" />
        </Box>
        <Box flexGrow={1} overflow="auto">
          <ContentPane />
        </Box>
      </Flex>
    </Box>
  </ChakraProvider>
);
