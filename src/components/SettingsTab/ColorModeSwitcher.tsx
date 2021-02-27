import * as React from "react";
import { useColorMode, useColorModeValue, IconButtonProps, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("Switch to Dark Mode", "Switch to Light Mode");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button leftIcon={<SwitchIcon />} onClick={toggleColorMode}>
      {text}
    </Button>
  );
};
