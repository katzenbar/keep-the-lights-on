import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import store from "./store/store";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ReduxProvider store={store}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </ReduxProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
