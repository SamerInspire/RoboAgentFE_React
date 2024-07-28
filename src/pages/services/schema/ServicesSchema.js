
import generalImg from 'assets/images/services/apps-svgrepo-com.svg';
import ChangeOccupationImg from 'assets/images/services/change-record-type-svgrepo-com.svg';
import ContractManagerImg from 'assets/images/services/contract-sign-line-svgrepo-com.svg';
import EmployeeListImg from 'assets/images/services/list-svgrepo-com.svg';
import WorkPermitImg from 'assets/images/services/location-permit-svgrepo-com.svg';
import VisasImg from 'assets/images/services/passport-svgrepo-com.svg';
import PrivilegesImg from 'assets/images/services/permissions-svgrepo-com.svg';
import EmployeesTransferImg from 'assets/images/services/transfer-svgrepo-com.svg';
import UserManagmentImg from 'assets/images/services/user-id-svgrepo-com.svg';

export let IconsMap = [{ key: 'generalImg', value: generalImg },
{ key: 'ChangeOccupationImg', value: ChangeOccupationImg },
{ key: 'ContractManagerImg', value: ContractManagerImg },
{ key: 'EmployeeListImg', value: EmployeeListImg },
{ key: 'WorkPermitImg', value: WorkPermitImg },
{ key: 'VisasImg', value: VisasImg },
{ key: 'PrivilegesImg', value: PrivilegesImg },
{ key: 'EmployeesTransferImg', value: EmployeesTransferImg },
{ key: 'UserManagmentImg', value: UserManagmentImg }]

export let Services = [
  {
    "id": 1,
    "service": "EMP_LIST",
    "description": "Employee list",
    "descriptionAr": "قائمة الموظفين",
    "bcUrl": "/static/media/list-svgrepo-com.3ec85f45ca4ffcc4adda9d820db169ea.svg",
    "serviceOptions": [
      {
        "otptionId": 1680,
        "name": "updateLaborer",
        "arDescription": "التحقق وتحديث بيانات الموظف",
        "enDescription": "Check and update Laborer information"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 2,
        "name": "EMP_ROLE",
        "description": "Employee list"
      }
    ]
  },
  {
    "id": 2,
    "service": "CONTRACT_MANAG",
    "description": "Contract management",
    "descriptionAr": "ادارة عقود العمل",
    "bcUrl": "/static/media/contract-sign-line-svgrepo-com.7b359498c1753c86cb0c89b65713d1f2.svg",
    "serviceOptions": [
      {
        "otptionId": 1687,
        "name": "TerminateContract",
        "arDescription": "طلب إنهاء العلاقة التعاقدية",
        "enDescription": "Terminate Contract"
      },
      {
        "otptionId": 1688,
        "name": "ContractAuthenticationIndicator",
        "arDescription": "التحقق من نسبة توثيق العقود",
        "enDescription": "Contract Authentication Indicator"
      },
      {
        "otptionId": 1686,
        "name": "ContractDetails",
        "arDescription": "التحقق من تفاصيل العقد للموظف",
        "enDescription": "Contract Details"
      },
      {
        "otptionId": 1685,
        "name": "AbsentFromWork",
        "arDescription": "طلبات إنقطاع عن العمل",
        "enDescription": "Absent From Work"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 3,
        "name": "CM_ROLE",
        "description": "Contract management"
      }
    ]
  },
  {
    "id": 3,
    "service": "VISAS",
    "description": "Visas",
    "descriptionAr": "التأشيرات",
    "bcUrl": "/static/media/passport-svgrepo-com.ba75f9b5bf0922ffb538b2a1814b5463.svg",
    "serviceOptions": [
      {
        "otptionId": 1676,
        "name": "CancelVisas",
        "arDescription": "التأشيرات بإنتظار الإلغاء",
        "enDescription": "Pending for cancelation Visas"
      },
      {
        "otptionId": 1677,
        "name": "visaCheckAllCases",
        "arDescription": "التحقق من التأشيرات",
        "enDescription": "Check Visas and Bordernumber"
      },
      {
        "otptionId": 1678,
        "name": "issuingIssues",
        "arDescription": "التحقق من مشاكل في الإصدار",
        "enDescription": "Check Issuing Issues"
      },
      {
        "otptionId": 1679,
        "name": "allowanceEnds",
        "arDescription": "حول المنشأة لتوسع ر",
        "enDescription": "Transformed to Expansion (Allownce EndDate)"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 7,
        "name": "VISAS",
        "description": "Visas"
      }
    ]
  },
  {
    "id": 4,
    "service": "EMP_TRANSFER",
    "description": "Employee transfer",
    "descriptionAr": "نقل الخدمات",
    "bcUrl": "/static/media/transfer-svgrepo-com.f319f569cd7e66fa4605c1252527ae7c.svg",
    "serviceOptions": [
      {
        "otptionId": 1692,
        "name": "CheckEstNatPercentage",
        "arDescription": "التحقق من نسب الجنسيات لنقل",
        "enDescription": "Establishment nationalities percentage"
      },
      {
        "otptionId": 1691,
        "name": "CheckETRequest",
        "arDescription": "التحقق من تفاصيل طلب النقل",
        "enDescription": "Check Employee Transfeer Request"
      },
      {
        "otptionId": 1693,
        "name": "TBetweenBranches",
        "arDescription": "النقل بين الفروع",
        "enDescription": "Transfeer between branches"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 8,
        "name": "ET_ROLE",
        "description": "Employee transfeer"
      }
    ]
  },
  {
    "id": 5,
    "service": "CHANGE_OCUP",
    "description": "Change occupation",
    "descriptionAr": "إدارة تغير المهن",
    "bcUrl": "/static/media/change-record-type-svgrepo-com.bb6c30bc0a9fce638a465b6ab711510b.svg",
    "serviceOptions": [
      {
        "otptionId": 1695,
        "name": "CONatPercentage",
        "arDescription": "نسب التوطين للمهن",
        "enDescription": "Change Occupation Nat Percentage"
      },
      {
        "otptionId": 1696,
        "name": "COValidate",
        "arDescription": "التحقق من إمكانية التغير لمهنة",
        "enDescription": "Change occupation validate"
      },
      {
        "otptionId": 1694,
        "name": "CheckCORequest",
        "arDescription": "التحقق من طلب تغير المهنة",
        "enDescription": "Check Change Occupation Request"
      },
      {
        "otptionId": 1697,
        "name": "OccupationCorrection",
        "arDescription": "التحقق من طلب تصحيح المهنة",
        "enDescription": "Occupation Correction"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 9,
        "name": "CO_ROLE",
        "description": "Change occupation"
      }
    ]
  },
  {
    "id": 6,
    "service": "WORK_PERMIT",
    "description": "Work permit managment",
    "descriptionAr": "إدارة رخص العمل",
    "bcUrl": "/static/media/location-permit-svgrepo-com.1825f3cdf4249854f3f4a96ba222c9b2.svg",
    "serviceOptions": [
      {
        "otptionId": 1683,
        "name": "paymentNumbers",
        "arDescription": "أرقام السداد",
        "enDescription": "payment Numbers"
      },
      {
        "otptionId": 1681,
        "name": "financialExemption",
        "arDescription": "الإعفاء المالي",
        "enDescription": "Check Financial Exemption"
      },
      {
        "otptionId": 1684,
        "name": "wpDetails",
        "arDescription": "تفاصيل الرخصة",
        "enDescription": "Work Permit Details"
      },
      {
        "otptionId": 1682,
        "name": "indebtednessDetails",
        "arDescription": "المديونية",
        "enDescription": "Indebtedness Details"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 4,
        "name": "WP_ROLE",
        "description": "Work Permit"
      }
    ]
  },
  {
    "id": 8,
    "service": "PRIVILIAGE_MANAG",
    "description": "Privilege management",
    "descriptionAr": "إدارة الصلاحيات",
    "bcUrl": "/static/media/permissions-svgrepo-com.8d503267ef23026ea7c5d6c8ed7dfc5b.svg",
    "serviceOptions": [
      {
        "otptionId": 1690,
        "name": "checkPrivileges",
        "arDescription": "التحقق من الصلاحيات",
        "enDescription": "Check Privileges"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 10,
        "name": "PM_ROLE",
        "description": "Privilege management"
      }
    ]
  },
  {
    "id": 9,
    "service": "USER_MANAG",
    "description": "User managment",
    "descriptionAr": "إدارة المستخدمين",
    "bcUrl": "/static/media/user-id-svgrepo-com.8f9d4a9fb0d022f3277d0b5ebe605b7f.svg",
    "serviceOptions": [
      {
        "otptionId": 1689,
        "name": "CheckPaymentRef",
        "arDescription": "التحقق من دفع الأشتراك",
        "enDescription": "Check Payment Referance"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 11,
        "name": "UM_ROLE",
        "description": "User management"
      }
    ]
  },
  {
    "id": 10,
    "service": "GENERAL",
    "description": "General",
    "descriptionAr": "الخدمات العامة",
    "bcUrl": "/static/media/apps-svgrepo-com.f7e8caac9eb86e9f3cd1331240ff3b67.svg",
    "serviceOptions": [
      {
        "otptionId": 1674,
        "name": "notCountedSaudis",
        "arDescription": "السعوديين المحتسبين بأقل من 1",
        "enDescription": "Less than one Saudis"
      },
      {
        "otptionId": 1675,
        "name": "calcBalance",
        "arDescription": "رد الرصيد",
        "enDescription": "Get balance answer"
      },
      {
        "otptionId": 1672,
        "name": "validate",
        "arDescription": "التحقق من المنشأة",
        "enDescription": "check the Establishment"
      },
      {
        "otptionId": 1673,
        "name": "nitaq",
        "arDescription": "رد النطاق",
        "enDescription": "Nitaq Check"
      }
    ],
    "allowedAuthorities": []
  },
  {
    "id": 11,
    "service": "EFM",
    "description": "Establishment file managment",
    "descriptionAr": "إدارة ملف المنشأة",
    "bcUrl": null,
    "serviceOptions": [
      {
        "otptionId": 1701,
        "name": "CheckAndUpdateEst",
        "arDescription": "التحقق وتحديث المنشأة",
        "enDescription": "Check and update Establishment"
      },
      {
        "otptionId": 1706,
        "name": "CloseEstablishment",
        "arDescription": "التحقق من إغلاق المنشأة",
        "enDescription": "Validate Close Establishment"
      },
      {
        "otptionId": 1702,
        "name": "notAppearEsts",
        "arDescription": "المنشأة لا تظهر",
        "enDescription": "not Appear Establishments"
      },
      {
        "otptionId": 1700,
        "name": "ChangeActivity",
        "arDescription": "التحقق من تغير نشاط المنشأة",
        "enDescription": "Check establishment change activity"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 12,
        "name": "EFM_ROLE",
        "description": "Establishment File Management"
      }
    ]
  },
  {
    "id": 12,
    "service": "VIOLATIONS",
    "description": "Violation Objections",
    "descriptionAr": "الإعتراض على المخالفات",
    "bcUrl": null,
    "serviceOptions": [
      {
        "otptionId": 1703,
        "name": "PaidViolations",
        "arDescription": "المخالفات المدفوعة",
        "enDescription": "Paid violations"
      },
      {
        "otptionId": 1704,
        "name": "CancelledViolations",
        "arDescription": "المخالفات الملغية",
        "enDescription": "Cancelled violations"
      },
      {
        "otptionId": 1705,
        "name": "UnpaidViolations",
        "arDescription": "المخالفات الغير مدفوعة",
        "enDescription": "Unpaid violations"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 15,
        "name": "V_ROLE",
        "description": "Violations"
      }
    ]
  },
  {
    "id": 13,
    "service": "CERTIFICATE_MANAGEMENT",
    "description": "Certifications Management ",
    "descriptionAr": "إدارة الشهادات",
    "bcUrl": "/static/media/contract-sign-line-svgrepo-com.7b359498c1753c86cb0c89b65713d1f2.svg",
    "serviceOptions": [
      {
        "otptionId": 1698,
        "name": "CheckSaudiCertificate",
        "arDescription": "التحقق من اصدار شهادة السعودة",
        "enDescription": "Check Saudi Certificate"
      },
      {
        "otptionId": 1699,
        "name": "CheckNameofSaudiCertificate",
        "arDescription": "التحقق من شهادة السعودة",
        "enDescription": "Check Name of Saudi Certificate"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 13,
        "name": "CM_ROLE",
        "description": "Certifications Management "
      }
    ]
  }
]