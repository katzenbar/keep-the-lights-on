import { Heading } from "@chakra-ui/react";
import React from "react";

type Props = {};

const SummaryPane: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Heading as="h1" size="md" pb={3}>
        Keep the Lights On
      </Heading>
      <p>Summary</p>
    </>
  );
};

export default SummaryPane;
