import { Box } from "@mui/material";
import React, { useContext } from "react";
import { themeContext } from "src/hooks/Context/ThemeContext";

function DirectionTest({ children }) {
  const { direction } = useContext(themeContext);
  console.log(direction);
  return <Box sx={{ direction: direction }}>{children}</Box>;
}

export default DirectionTest;
