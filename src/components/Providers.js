import { AlertProvider } from "hooks/Context/AlertContext";
import LoginProvider from "hooks/Context/LoginInfoContext";
import ThemeContextProvider from "hooks/Context/ThemeContext";
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
