import { fireEvent, render, screen } from "@testing-library/react";
import Providers from "src/components/Providers";
import { useUpdateAlert } from "src/hooks/Context/AlertContext";
import RolesPopper from "../poppers/RolesPopper";

jest.mock("src/hooks/Context/AlertContext", () => ({
  useUpdateAlert: jest.fn(),
}));

describe("RolesPopper Component", () => {
  const setTableData = jest.fn();
  const handleCloseRolePopper = jest.fn();

  const userDataMember = [
    1,
    "John",
    "Doe",
    "john.doe@example.com",
    "Active",
    "MEMBER",
  ];
  const userDataTeamLead = [
    2,
    "Jane",
    "Smith",
    "jane.smith@example.com",
    "Active",
    "TEAM_LEAD",
  ];

  it('displays "Promote to Team Lead" button when user role is MEMBER', () => {
    render(
      <Providers>
        <RolesPopper
          userData={userDataMember}
          setTableData={setTableData}
          tableData={[]}
          handleCloseRolePopper={handleCloseRolePopper}
        />
      </Providers>
    );

    expect(screen.getByText("Promote to team Lead")).toBeInTheDocument();
    expect(screen.queryByText("Demote to Member")).not.toBeInTheDocument();
  });

  it('displays "Demote to Member" button when user role is not MEMBER', () => {
    render(
      <Providers>
        <RolesPopper
          userData={userDataTeamLead}
          setTableData={setTableData}
          tableData={[]}
          handleCloseRolePopper={handleCloseRolePopper}
        />
      </Providers>
    );

    expect(screen.getByText("Emote to Member")).toBeInTheDocument();
    expect(screen.queryByText("Promote to team Lead")).not.toBeInTheDocument();
  });

  it("handles button click correctly", () => {
    const mockHandleSubmitUserNewRole = jest.fn();
    jest.mock("src/utils/users/users", () => ({
      hanldeSubmitUserNewRole: mockHandleSubmitUserNewRole,
    }));

    render(
      <Providers>
        <RolesPopper
          userData={userDataMember}
          setTableData={setTableData}
          tableData={[]}
          handleCloseRolePopper={handleCloseRolePopper}
        />
      </Providers>
    );

    const button = screen.getByText("Promote to team Lead");
    fireEvent.click(button);

    expect(handleCloseRolePopper).toHaveBeenCalled();
    expect(mockHandleSubmitUserNewRole).toHaveBeenCalledWith({
      userId: userDataMember[0],
      newRole: "TEAM_LEAD",
      setTableData,
      requestAction: "UPDATE_USER_ROLE",
      tableData: [],
      userData: userDataMember,
      handleCloseRolePopper,
      setAlertInfo: useUpdateAlert,
    });
  });
});
