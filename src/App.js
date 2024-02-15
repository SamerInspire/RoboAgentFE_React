import { useRoutes } from 'react-router-dom';
import "./App.css";
import { useDarkMode, useLoginInfo } from './Core/Context/LoginInfoContext';
import pageRoutes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from './Core/Context/AlertContext';
import { LoginInfoProvider } from './Core/Context/LoginInfoContext';
import { i18nextInit } from "./Core/Context/Translations/i18nextInit";
import { theme, darkTheme } from "./theme";
import Routes from './routes';
const App = () => {
  const darkMode = useDarkMode()

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <LoginInfoProvider>
        <AlertProvider>
          <I18nextProvider i18n={i18nextInit}>
            <Routes />
          </I18nextProvider>
        </AlertProvider>
      </LoginInfoProvider>
    </ThemeProvider>
  );
};

export default App;
