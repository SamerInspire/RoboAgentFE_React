/* eslint-disable */
import { render, screen } from '@testing-library/react';
import Providers from 'components/Providers';
import { BrowserRouter } from 'react-router-dom';
import ServicesList from '../page/ServicesList';
import ServicesListItem from '../page/utils/ServicesListItem';
import { Services } from '../schema/ServicesSchema';
import ChangeOccupationImg from 'assets/images/services/change-record-type-svgrepo-com.svg';
import ContractManagerImg from 'assets/images/services/contract-sign-line-svgrepo-com.svg';
import EmployeeListImg from 'assets/images/services/list-svgrepo-com.svg';
import WorkPermitImg from 'assets/images/services/location-permit-svgrepo-com.svg';
import VisasImg from 'assets/images/services/passport-svgrepo-com.svg';
import PrivilegesImg from 'assets/images/services/permissions-svgrepo-com.svg';
import EmployeesTransferImg from 'assets/images/services/transfer-svgrepo-com.svg';
import UserManagmentImg from 'assets/images/services/user-id-svgrepo-com.svg';
import generalImg from 'assets/images/services/apps-svgrepo-com.svg';

const IconsMap = [
  { key: 'generalImg', value: generalImg },
  { key: 'ChangeOccupationImg', value: ChangeOccupationImg },
  { key: 'ContractManagerImg', value: ContractManagerImg },
  { key: 'EmployeeListImg', value: EmployeeListImg },
  { key: 'WorkPermitImg', value: WorkPermitImg },
  { key: 'VisasImg', value: VisasImg },
  { key: 'PrivilegesImg', value: PrivilegesImg },
  { key: 'EmployeesTransferImg', value: EmployeesTransferImg },
  { key: 'UserManagmentImg', value: UserManagmentImg },
];

describe('ServicesList Component', () => {
  test('renders services for authorized user', () => {
    const currentUserData = {
      role: {role:'MEMBER',id:2},
      roboAuthorities: [{ authId:1,name: 'VISAS' }],
      status: '1',
    };
    render(
      <BrowserRouter>
        <Providers>
          <ServicesList currentUserData={currentUserData} />
        </Providers>
      </BrowserRouter>,
    );
    const services = Services.filter((service) =>
      service.allowedAuthorities.some((auth) => currentUserData.roboAuthorities.map((a) => a.name).includes(auth)),
    );

    // Check if all allowed services are rendered
    services.forEach((service) => {
      expect(screen.getByText(service.descriptionEn)).toBeInTheDocument();
    });
  });

  test('does  render services for unauthorized user loads skeleton', () => {
    const currentUserData = {
      email: 'S.ibrahim-c@takamol.com.sa',
      firstName: 'Samer',
      lastName: 'Ibrahim',
      middleName: 'Subhi',
      roboAuthorities: [],
      role: {role:'MEMBER',id:2},
      service: {service:'VISAS',id:1},
      status: '1 - User registered in QC',
      team: {team:'L2',id:2},
      userId: 173,
      userName: 'SamerUser',
    };

    const { container } = render(
      <BrowserRouter>
        <Providers>
          <ServicesList currentUserData={currentUserData} />
        </Providers>
      </BrowserRouter>,
    );

    expect(container.querySelector('.MuiSkeleton-root')).toBeTruthy();
  });
});

describe('ServicesListItem Component', () => {
  const service = Services[0]; // Example service
  const queryCenterSignup = false; // User has not signed up

  test('renders service details correctly', () => {
    render(
      <BrowserRouter>
        <Providers>
          <ServicesListItem service={service} queryCenterSignup={queryCenterSignup} />
        </Providers>
        ,/
      </BrowserRouter>,
    );
    let bcUrl = IconsMap.find((icon) => icon.key == service.bcUrl)?.value;
    bcUrl = bcUrl ? bcUrl : generalImg;
    // Check if the service name and image are displayed
    expect(screen.getByText(service.descriptionEn)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', bcUrl);
  });

  test('click handler is attached correctly', () => {
    render(
      <BrowserRouter>
        <Providers>
          <ServicesListItem service={service} queryCenterSignup={queryCenterSignup} />
        </Providers>{' '}
      </BrowserRouter>,
    );

    const serviceElement = screen.getByText(service.descriptionEn).closest('a');
    expect(serviceElement).toHaveAttribute('href', `/dash/services/getAnswer/${service.service}`);
  });
});
