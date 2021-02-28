import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ChakraProvider, Box, theme, Flex, Divider } from "@chakra-ui/react";
import SummaryPane from "./SummaryPane";
import ContentPane from "./ContentPane";
import store from "../store/store";
import GameAutosaver from "../components/GameAutosaver";

const App: React.FunctionComponent = () => (
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>
      <GameAutosaver />

      <Box>
        <Flex minH="100vh" height="100vh" maxH="100vh" direction="row" alignItems="stretch">
          <Box w={250} p={3} flexShrink={0} overflowY="auto">
            <SummaryPane />
          </Box>
          <Box>
            <Divider orientation="vertical" />
          </Box>
          <Box flexGrow={1}>
            <ContentPane />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  </ReduxProvider>
);

export default App;
