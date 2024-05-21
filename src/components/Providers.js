import { AlertProvider } from "src/hooks/Context/AlertContext";
import LoginProvider from "src/hooks/Context/LoginInfoContext";
import ThemeContextProvider from "src/hooks/Context/ThemeContext";
function Providers({ children }) {
  return (
    <LoginProvider>
      <ThemeContextProvider>
        <AlertProvider>{children}</AlertProvider>
      </ThemeContextProvider>
    </LoginProvider>
  );
}

export default Providers;
