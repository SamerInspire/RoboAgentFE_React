import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "styles/theme";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export const themeContext = createContext();
const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [themeStyles, setThemeStyles] = useState(lightTheme);
  const [direction, setDirection] = useState("ltr");
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const ltrCache = createCache({
    key: "mui",
  });
  useEffect(() => {
    setThemeStyles(
      currentTheme === "light" ? lightTheme(direction) : darkTheme(direction)
    );
  }, [currentTheme, direction]);
  return (
    <CacheProvider value={direction == "rtl" ? cacheRtl : ltrCache}>
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
    </CacheProvider>
  );
};
export default ThemeContextProvider;
