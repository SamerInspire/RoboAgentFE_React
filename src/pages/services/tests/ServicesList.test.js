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
      expect(screen.getByText(service.enName)).toBeInTheDocument();
    });
  });

  test("does  render services for unauthorized user", () => {
    const currentUserData = {
      role: "MEMBER",
      roboAuthorities: [],
    };

    render(
      <BrowserRouter>
        <Providers>
          <ServicesList currentUserData={currentUserData} />
        </Providers>
      </BrowserRouter>
    );
    Services.forEach((service) => {
      if (service.allowedAuthorities[0] !== "all") {
        expect(screen.queryByText(service.enName)).toBeInTheDocument();
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
    expect(screen.getByText(service.enName)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      service.backgroundImg
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

    const serviceElement = screen.getByText(service.enName).closest("a");
    expect(serviceElement).toHaveAttribute(
      "href",
      `/dash/services/getAnswer/${service.enName}`
    );
  });
});
