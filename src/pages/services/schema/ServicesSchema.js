import generalImg from 'assets/images/services/apps-svgrepo-com.svg';
import ChangeOccupationImg from 'assets/images/services/change-record-type-svgrepo-com.svg';
import ContractManagerImg from 'assets/images/services/contract-sign-line-svgrepo-com.svg';
import EmployeeListImg from 'assets/images/services/list-svgrepo-com.svg';
import WorkPermitImg from 'assets/images/services/location-permit-svgrepo-com.svg';
import VisasImg from 'assets/images/services/passport-svgrepo-com.svg';
import PrivilegesImg from 'assets/images/services/permissions-svgrepo-com.svg';
import EmployeesTransferImg from 'assets/images/services/transfer-svgrepo-com.svg';
import UserManagmentImg from 'assets/images/services/user-id-svgrepo-com.svg';
export let Services = [
  {
    id: 1,
    service: 'EMP_LIST',
    description: 'Employee list',
    descriptionAr: 'قائمة الموظفين',
    bcUrl: EmployeeListImg,
    serviceOptions: [
      {
        otptionId: 1680,
        name: 'updateLaborer',
        arDescription: 'التحقق وتحديث بيانات الموظف',
        enDescription: 'Check and update Laborer information',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 2,
    service: 'CONTRACT_MANAG',
    description: 'Contract management',
    descriptionAr: 'ادارة عقود العمل',
    bcUrl: ContractManagerImg,
    serviceOptions: [
      {
        otptionId: 1686,
        name: 'ContractDetails',
        arDescription: 'التحقق من تفاصيل العقد للموظف',
        enDescription: 'Contract Details',
      },
      {
        otptionId: 1688,
        name: 'ContractAuthenticationIndicator',
        arDescription: 'التحقق من نسبة توثيق العقود',
        enDescription: 'Contract Authentication Indicator',
      },
      {
        otptionId: 1685,
        name: 'AbsentFromWork',
        arDescription: 'طلبات إنقطاع عن العمل',
        enDescription: 'Absent From Work',
      },
      {
        otptionId: 1687,
        name: 'TerminateContract',
        arDescription: 'طلب إنهاء العلاقة التعاقدية',
        enDescription: 'Terminate Contract',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 3,
    service: 'VISAS',
    description: 'Visas',
    descriptionAr: 'التأشيرات',
    bcUrl: VisasImg,
    serviceOptions: [
      {
        otptionId: 1679,
        name: 'allowanceEnds',
        arDescription: 'حول المنشأة لتوسع ر',
        enDescription: 'Transformed to Expansion (Allownce EndDate)',
      },
      {
        otptionId: 1677,
        name: 'visaCheckAllCases',
        arDescription: 'التحقق من التأشيرات',
        enDescription: 'Check Visas and Bordernumber',
      },
      {
        otptionId: 1678,
        name: 'issuingIssues',
        arDescription: 'التحقق من مشاكل في الإصدار',
        enDescription: 'Check Issuing Issues',
      },
      {
        otptionId: 1676,
        name: 'CancelVisas',
        arDescription: 'التأشيرات بإنتظار الإلغاء',
        enDescription: 'Pending for cancelation Visas',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 4,
    service: 'EMP_TRANSFER',
    description: 'Employee transfer',
    descriptionAr: 'نقل الخدمات',
    bcUrl: EmployeesTransferImg,
    serviceOptions: [
      {
        otptionId: 1691,
        name: 'CheckETRequest',
        arDescription: 'التحقق من تفاصيل طلب النقل',
        enDescription: 'Check Employee Transfeer Request',
      },
      {
        otptionId: 1693,
        name: 'TBetweenBranches',
        arDescription: 'النقل بين الفروع',
        enDescription: 'Transfeer between branches',
      },
      {
        otptionId: 1692,
        name: 'CheckEstNatPercentage',
        arDescription: 'التحقق من نسب الجنسيات لنقل',
        enDescription: 'Establishment nationalities percentage',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 5,
    service: 'CHANGE_OCUP',
    description: 'Change occupation',
    descriptionAr: 'إدارة تغير المهن',
    bcUrl: ChangeOccupationImg,
    serviceOptions: [
      {
        otptionId: 1694,
        name: 'CheckCORequest',
        arDescription: 'التحقق من طلب تغير المهنة',
        enDescription: 'Check Change Occupation Request',
      },
      {
        otptionId: 1696,
        name: 'COValidate',
        arDescription: 'التحقق من إمكانية التغير لمهنة',
        enDescription: 'Change occupation validate',
      },
      {
        otptionId: 1697,
        name: 'OccupationCorrection',
        arDescription: 'التحقق من طلب تصحيح المهنة',
        enDescription: 'Occupation Correction',
      },
      {
        otptionId: 1695,
        name: 'CONatPercentage',
        arDescription: 'نسب التوطين للمهن',
        enDescription: 'Change Occupation Nat Percentage',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 6,
    service: 'WORK_PERMIT',
    description: 'Work permit managment',
    descriptionAr: 'إدارة رخص العمل',
    bcUrl: WorkPermitImg,
    serviceOptions: [
      {
        otptionId: 1682,
        name: 'indebtednessDetails',
        arDescription: 'المديونية',
        enDescription: 'Indebtedness Details',
      },
      {
        otptionId: 1684,
        name: 'wpDetails',
        arDescription: 'تفاصيل الرخصة',
        enDescription: 'Work Permit Details',
      },
      {
        otptionId: 1681,
        name: 'financialExemption',
        arDescription: 'الإعفاء المالي',
        enDescription: 'Check Financial Exemption',
      },
      {
        otptionId: 1683,
        name: 'paymentNumbers',
        arDescription: 'أرقام السداد',
        enDescription: 'payment Numbers',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 7,
    service: 'E_ADVISOR',
    description: 'E-Adviser',
    descriptionAr: 'المستشار الإلكتروني',
    bcUrl: generalImg,
    serviceOptions: [],
    allowedAuthorities: [],
  },
  {
    id: 8,
    service: 'PRIVILIAGE_MANAG',
    description: 'Privilege management',
    descriptionAr: 'إدارة الصلاحيات',
    bcUrl: PrivilegesImg,
    serviceOptions: [
      {
        otptionId: 1690,
        name: 'checkPrivileges',
        arDescription: 'التحقق من الصلاحيات',
        enDescription: 'Check Privileges',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 9,
    service: 'USER_MANAG',
    description: 'User managment',
    descriptionAr: 'إدارة المستخدمين',
    bcUrl: UserManagmentImg,
    serviceOptions: [
      {
        otptionId: 1689,
        name: 'CheckPaymentRef',
        arDescription: 'التحقق من دفع الأشتراك',
        enDescription: 'Check Payment Referance',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 10,
    service: 'GENERAL',
    description: 'General',
    descriptionAr: 'الخدمات العامة',
    bcUrl: generalImg,
    serviceOptions: [
      {
        otptionId: 1672,
        name: 'validate',
        arDescription: 'التحقق من المنشأة',
        enDescription: 'check the Establishment',
      },
      {
        otptionId: 1673,
        name: 'nitaq',
        arDescription: 'رد النطاق',
        enDescription: 'Nitaq Check',
      },
      {
        otptionId: 1674,
        name: 'notCountedSaudis',
        arDescription: 'السعوديين المحتسبين بأقل من 1',
        enDescription: 'Less than one Saudis',
      },
      {
        otptionId: 1675,
        name: 'calcBalance',
        arDescription: 'رد الرصيد',
        enDescription: 'Get balance answer',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 11,
    service: 'EFM',
    description: 'Establishment  managment',
    descriptionAr: 'إدارة ملف المنشأة',
    bcUrl: generalImg,
    serviceOptions: [
      {
        otptionId: 1700,
        name: 'ChangeActivity',
        arDescription: 'التحقق من تغير نشاط المنشأة',
        enDescription: 'Check establishment change activity',
      },
      {
        otptionId: 1701,
        name: 'CheckAndUpdateEst',
        arDescription: 'التحقق وتحديث المنشأة',
        enDescription: 'Check and update Establishment',
      },
      {
        otptionId: 1706,
        name: 'CloseEstablishment',
        arDescription: 'التحقق من إغلاق المنشأة',
        enDescription: 'Validate Close Establishment',
      },
      {
        otptionId: 1702,
        name: 'notAppearEsts',
        arDescription: 'المنشأة لا تظهر',
        enDescription: 'not Appear Establishments',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 12,
    service: 'VIOLATIONS',
    description: 'Violation Objections',
    descriptionAr: 'الإعتراض على المخالفات',
    bcUrl: generalImg,
    serviceOptions: [
      {
        otptionId: 1703,
        name: 'PaidViolations',
        arDescription: 'المخالفات المدفوعة',
        enDescription: 'Paid violations',
      },
      {
        otptionId: 1705,
        name: 'UnpaidViolations',
        arDescription: 'المخالفات الغير مدفوعة',
        enDescription: 'Unpaid violations',
      },
      {
        otptionId: 1704,
        name: 'CancelledViolations',
        arDescription: 'المخالفات الملغية',
        enDescription: 'Cancelled violations',
      },
    ],
    allowedAuthorities: [],
  },
  {
    id: 13,
    service: 'CERTIFICATE_MANAGEMENT',
    description: 'Certifications Management ',
    descriptionAr: 'إدارة الشهادات',
    bcUrl: ContractManagerImg,
    serviceOptions: [
      {
        otptionId: 1698,
        name: 'CheckSaudiCertificate',
        arDescription: 'التحقق من اصدار شهادة السعودة',
        enDescription: 'Check Saudi Certificate',
      },
      {
        otptionId: 1699,
        name: 'CheckNameofSaudiCertificate',
        arDescription: 'التحقق من شهادة السعودة',
        enDescription: 'Check Name of Saudi Certificate',
      },
    ],
    allowedAuthorities: [],
  },
];
//E_ADVISOR
