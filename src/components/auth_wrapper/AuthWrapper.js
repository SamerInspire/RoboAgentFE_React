import { useContext } from "react";
import { LoginContext } from "hooks/context/LoginInfoContext";
function isAllowedRole(allowedRoles = [], userRole = "") {
  const isAllowed = allowedRoles.some(
    (e) => e.toLowerCase() == userRole.toLowerCase()
  );
  return isAllowed;
}
function AuthWrapper({ roles, children }) {
  const {
    loginData: { role },
  } = useContext(LoginContext);

  const isAllowed = isAllowedRole(roles, role);
  if (isAllowed) {
    return children;
  } else return null;
}

export default AuthWrapper;
