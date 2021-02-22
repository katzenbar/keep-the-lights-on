import { Box } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./SettingsTab/ColorModeSwitcher";

type Props = {};

const SettingsTab: React.FunctionComponent<Props> = (props) => {
  return (
    <Box>
      Update your settings
      <ColorModeSwitcher />
    </Box>
  );
};

export default SettingsTab;
