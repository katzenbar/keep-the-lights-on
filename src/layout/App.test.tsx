import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../test-utils";
import { App } from "./App";

describe("<App>", () => {
  test("renders the app name", () => {
    render(<App />);
    const linkElement = screen.getByText(/Keep the Lights On/i);
    expect(linkElement).toBeInTheDocument();
  });
});
