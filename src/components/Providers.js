import { AlertProvider } from "hooks/context/AlertContext";
import LoginProvider from "hooks/context/LoginInfoContext";
import ThemeContextProvider from "hooks/context/ThemeContext";
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
