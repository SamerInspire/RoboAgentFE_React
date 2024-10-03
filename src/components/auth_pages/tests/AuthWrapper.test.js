import { render, screen } from "@testing-library/react";
import AuthWrapper from "components/auth_wrapper/AuthWrapper";
import { LoginContext } from "hooks/context/LoginInfoContext";
function isAllowedRole(allowedRoles = "", userRole = "") {
  const isAllowed = allowedRoles.some(
    (e) => e.toLowerCase() == userRole.role.toLowerCase()
  );
  return isAllowed;
}
describe("AuthWrapper Component", () => {
  test("renders children when user role is allowed", () => {
    const contextValue = {
      loginData: { role: {role: "ADMIN", id:4}},
    };

    render(
      <LoginContext.Provider value={contextValue}>
        <AuthWrapper roles={["ADMIN"]}>
          <div>Allowed Content</div>
        </AuthWrapper>
      </LoginContext.Provider>
    );

    expect(screen.getByText("Allowed Content")).toBeInTheDocument();
  });

  test("does not render children when user role is not allowed", () => {
    const contextValue = {
      loginData: { role: "user" },
    };

    render(
      <LoginContext.Provider value={contextValue}>
        <AuthWrapper roles={["ADMIN"]}>
          <div>Allowed Content</div>
        </AuthWrapper>
      </LoginContext.Provider>
    );

    expect(screen.queryByText("Allowed Content")).toBeNull();
  });

  test("isAllowedRole function returns true for allowed role", () => {
    const allowedRoles = ["admin", "user"];
    const userRole = {role: "ADMIN", id:4};

    const result = isAllowedRole(allowedRoles, userRole);
    expect(result).toBe(true);
  });

  test("isAllowedRole function returns false for disallowed role", () => {
    const allowedRoles = ["admin", "user"];
    const userRole = {role: "MEMBER", id:2};

    const result = isAllowedRole(allowedRoles, userRole);
    expect(result).toBe(false);
  });
});
