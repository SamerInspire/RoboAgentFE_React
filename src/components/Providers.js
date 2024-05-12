import { AlertProvider } from "src/hooks/Context/AlertContext";
import LoginProvider from "src/hooks/Context/LoginInfoContext";
import ThemeContextProvider from "src/hooks/Context/ThemeContext";
import DirectionTest from "./DirectionTest";
function Providers({ children }) {
  return (
    <LoginProvider>
      <ThemeContextProvider>
        {/* <CssBaseline /> */}
        {/* <I18nextProvider i18n={i18next}> */}
        <AlertProvider>
          <DirectionTest>{children}</DirectionTest>
        </AlertProvider>
        {/* </I18nextProvider> */}
      </ThemeContextProvider>
    </LoginProvider>
  );
}

export default Providers;
