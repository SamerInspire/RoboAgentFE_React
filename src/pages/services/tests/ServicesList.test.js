/* eslint-disable */
import { render, screen } from "@testing-library/react";
import Providers from "components/Providers";
import { BrowserRouter } from "react-router-dom";
import ServicesList from "../page/ServicesList";
import ServicesListItem from "../page/utils/ServicesListItem";
import { Services } from "../schema/ServicesSchema";

describe("ServicesList Component", () => {
  test("renders services for authorized user", () => {
    const currentUserData = {
      role: "MEMBER",
      roboAuthorities: [{ name: "VISAS" }],
      status: '1'
    };

    render(
      <BrowserRouter>
        <Providers>
          <ServicesList currentUserData={currentUserData} />
        </Providers>
      </BrowserRouter>
    );
    const services = Services.filter((service) =>
      service.allowedAuthorities.some((auth) =>
        currentUserData.roboAuthorities.map((a) => a.name).includes(auth)
      )
    );

    // Check if all allowed services are rendered
    services.forEach((service) => {
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  test("does  render services for unauthorized user", () => {
    const currentUserData = {
      email:"S.ibrahim-c@takamol.com.sa",
      firstName:"Samer",
      lastName:"Ibrahim",
      middleName:"Subhi",
      roboAuthorities:[],
      role:"MEMBER",
      service:"VISAS",
      status:"1 - User registered in QC",
      team:"L2",
      userId:173,
      userName:"SamerUser"

    };

    render(
      <BrowserRouter>
        <Providers>
          <ServicesList currentUserDataParam={currentUserDataParam} />
        </Providers>
      </BrowserRouter>
    );
    Services.forEach((service) => {
      if (service.allowedAuthorities[0] !== "all" && currentUserData) {
        expect(screen.queryByText(service.description))?.toBeInTheDocument();
      }
    });
  });
});

describe("ServicesListItem Component", () => {
  const service = Services[0]; // Example service
  const queryCenterSignup = false; // User has not signed up

  test("renders service details correctly", () => {
    render(
      <BrowserRouter>
        <Providers>
          <ServicesListItem
            service={service}
            queryCenterSignup={queryCenterSignup}
          />
        </Providers>
        ,/
      </BrowserRouter>
    );

    // Check if the service name and image are displayed
    expect(screen.getByText(service.description)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      service.bcUrl
    );
  });

  test("click handler is attached correctly", () => {
    render(
      <BrowserRouter>
        <Providers>
          <ServicesListItem
            service={service}
            queryCenterSignup={queryCenterSignup}
          />
        </Providers>{" "}
      </BrowserRouter>
    );

    const serviceElement = screen.getByText(service.description).closest("a");
    expect(serviceElement).toHaveAttribute(
      "href",
      `/dash/services/getAnswer/${service.service}`
    );
  });
});
