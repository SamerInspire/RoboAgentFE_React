import { render, screen } from "@testing-library/react";

import { LoginContext } from "src/hooks/Context/LoginInfoContext";
import User from "../User";
import DraggableServiceItem from "../dialogs/DraggableServiceItem";
import ServiceContainer from "../dialogs/ServiceContainer";
import ServiceDialog from "../dialogs/ServiceDialog";
import DNDServicesModal from "../dialogs/DNDServicesModal";
import UserTable from "../UserTable";
import { BrowserRouter } from "react-router-dom";

describe("User Component", () => {
  it("renders the UserTable component for admin or team lead", () => {
    render(
      <BrowserRouter>
        <LoginContext.Provider value={{ loginData: { role: "ADMIN" } }}>
          <User />
        </LoginContext.Provider>
      </BrowserRouter>
    );
    expect(screen.queryAllByText(/Users List/i)[0]).toBeInTheDocument();
  });
});

describe("DraggableServiceItem Component", () => {
  const authority = { authId: 1, name: "ADMIN" };

  it("displays the correct service icon and name", () => {
    render(
      <BrowserRouter>
        <DraggableServiceItem authority={authority} />
      </BrowserRouter>
    );
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });
});

describe("ServiceContainer Component", () => {
  const authorities = [
    { id: 1, name: "ADMIN", authId: 1 },
    { id: 2, name: "SUPER_VISOR", authId: 2 },
  ];

  it("displays the correct title and service items", () => {
    render(
      <BrowserRouter>
        <ServiceContainer
          id="test_id"
          title="test_title"
          authorities={authorities}
        />
      </BrowserRouter>
    );
    expect(screen.getByText("TEST TITLE")).toBeInTheDocument();
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
    expect(screen.getByText("SUPER_VISOR")).toBeInTheDocument();
  });
});

describe("ServiceDialog Component", () => {
  const props = {
    isEditServiceDialogOpen: true,
    handleCloseServiceDialog: jest.fn(),
    userId: 1,
    tableData: [],
    setAlertInfo: jest.fn(),
    setTableData: jest.fn(),
  };

  it("displays the correct title, form controls, and buttons", () => {
    render(
      <BrowserRouter>
        <ServiceDialog {...props} />
      </BrowserRouter>
    );
    expect(screen.getByText("Choose User Main Service")).toBeInTheDocument();
    expect(screen.getByLabelText("Service")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});

describe("DNDServicesModal Component", () => {
  const authorities = [
    { id: 1, name: "ADMIN", authId: 1 },
    { id: 2, name: "SUPER_VISOR", authId: 2 },
  ];
  const props = {
    authorities,
    handleCloseServicesModal: jest.fn(),
    userData: { id: 1 },
  };

  it("displays the correct title and draggable service containers", () => {
    render(
      <BrowserRouter>
        <DNDServicesModal {...props} />
      </BrowserRouter>
    );
    expect(screen.getByText("Edit User Services")).toBeInTheDocument();
    expect(screen.getByText(/ALL SERVICES/i)).toBeInTheDocument();
    expect(screen.getByText(/active services/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/Cancel/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });
});

describe("UserTable Component", () => {
  it("displays the correct columns and data rows", () => {
    render(
      <BrowserRouter>
        <UserTable />
      </BrowserRouter>
    );
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Middle Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Service")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
  });
});
