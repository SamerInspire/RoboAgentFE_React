import { ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "styles/theme";

export const themeContext = createContext();
const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [themeStyles, setThemeStyles] = useState(lightTheme);
  const [direction, setDirection] = useState("ltr");
  useEffect(() => {
    setThemeStyles(
      currentTheme === "light" ? lightTheme(direction) : darkTheme(direction)
    );
  }, [currentTheme, direction]);
  return (
    <ThemeProvider theme={themeStyles}>
      <themeContext.Provider
        value={{
          direction,
          currentTheme,
          setCurrentTheme,
          themeStyles,
          setDirection,
        }}
      >
        {children}
      </themeContext.Provider>
    </ThemeProvider>
  );
};
export default ThemeContextProvider;
