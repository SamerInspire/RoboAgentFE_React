
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
    "descriptionEn": "Employee list",
    "descriptionAr": "قائمة الموظفين",
    "bcUrl": "/static/media/list-svgrepo-com.3ec85f45ca4ffcc4adda9d820db169ea.svg",
    "serviceOptions": [
      {
        "otptionId": 1680,
        "name": "updateLaborer",
        "descriptionAr": "التحقق وتحديث بيانات الموظف",
        "descriptionEn": "Check and update Laborer information"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 2,
        "name": "EMP_ROLE",
        "descriptionEn": "Employee list",
        "descriptionAr": "قائمة موظفين"
      }
    ]
  },
  {
    "id": 2,
    "service": "CONTRACT_MANAG",
    "descriptionEn": "Contract management",
    "descriptionAr": "ادارة عقود العمل",
    "bcUrl": "/static/media/contract-sign-line-svgrepo-com.7b359498c1753c86cb0c89b65713d1f2.svg",
    "serviceOptions": [
      {
        "otptionId": 1687,
        "name": "TerminateContract",
        "descriptionAr": "طلب إنهاء العلاقة التعاقدية",
        "descriptionEn": "Terminate Contract"
      },
      {
        "otptionId": 1688,
        "name": "ContractAuthenticationIndicator",
        "descriptionAr": "التحقق من نسبة توثيق العقود",
        "descriptionEn": "Contract Authentication Indicator"
      },
      {
        "otptionId": 1686,
        "name": "ContractDetails",
        "descriptionAr": "التحقق من تفاصيل العقد للموظف",
        "descriptionEn": "Contract Details"
      },
      {
        "otptionId": 1685,
        "name": "AbsentFromWork",
        "descriptionAr": "طلبات إنقطاع عن العمل",
        "descriptionEn": "Absent From Work"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 3,
        "name": "CM_ROLE",
        "descriptionEn": "Contract management",
        "descriptionAr": "Contract management"
      }
    ]
  },
  {
    "id": 3,
    "service": "VISAS",
    "descriptionEn": "Visas",
    "descriptionAr": "التأشيرات",
    "bcUrl": "/static/media/passport-svgrepo-com.ba75f9b5bf0922ffb538b2a1814b5463.svg",
    "serviceOptions": [
      {
        "otptionId": 1676,
        "name": "CancelVisas",
        "descriptionAr": "التأشيرات بإنتظار الإلغاء",
        "descriptionEn": "Pending for cancelation Visas"
      },
      {
        "otptionId": 1677,
        "name": "visaCheckAllCases",
        "descriptionAr": "التحقق من التأشيرات",
        "descriptionEn": "Check Visas and Bordernumber"
      },
      {
        "otptionId": 1678,
        "name": "issuingIssues",
        "descriptionAr": "التحقق من مشاكل في الإصدار",
        "descriptionEn": "Check Issuing Issues"
      },
      {
        "otptionId": 1679,
        "name": "allowanceEnds",
        "descriptionAr": "حول المنشأة لتوسع ر",
        "descriptionEn": "Transformed to Expansion (Allownce EndDate)"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 7,
        "name": "VISAS",
        "descriptionEn": "Visas"
      }
    ]
  },
  {
    "id": 4,
    "service": "EMP_TRANSFER",
    "descriptionEn": "Employee transfer",
    "descriptionAr": "نقل الخدمات",
    "bcUrl": "/static/media/transfer-svgrepo-com.f319f569cd7e66fa4605c1252527ae7c.svg",
    "serviceOptions": [
      {
        "otptionId": 1692,
        "name": "CheckEstNatPercentage",
        "descriptionAr": "التحقق من نسب الجنسيات لنقل",
        "descriptionEn": "Establishment nationalities percentage"
      },
      {
        "otptionId": 1691,
        "name": "CheckETRequest",
        "descriptionAr": "التحقق من تفاصيل طلب النقل",
        "descriptionEn": "Check Employee Transfeer Request"
      },
      {
        "otptionId": 1693,
        "name": "TBetweenBranches",
        "descriptionAr": "النقل بين الفروع",
        "descriptionEn": "Transfeer between branches"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 8,
        "name": "ET_ROLE",
        "descriptionEn": "Employee transfeer"
      }
    ]
  },
  {
    "id": 5,
    "service": "CHANGE_OCUP",
    "descriptionEn": "Change occupation",
    "descriptionAr": "إدارة تغير المهن",
    "bcUrl": "/static/media/change-record-type-svgrepo-com.bb6c30bc0a9fce638a465b6ab711510b.svg",
    "serviceOptions": [
      {
        "otptionId": 1695,
        "name": "CONatPercentage",
        "descriptionAr": "نسب التوطين للمهن",
        "descriptionEn": "Change Occupation Nat Percentage"
      },
      {
        "otptionId": 1696,
        "name": "COValidate",
        "descriptionAr": "التحقق من إمكانية التغير لمهنة",
        "descriptionEn": "Change occupation validate"
      },
      {
        "otptionId": 1694,
        "name": "CheckCORequest",
        "descriptionAr": "التحقق من طلب تغير المهنة",
        "descriptionEn": "Check Change Occupation Request"
      },
      {
        "otptionId": 1697,
        "name": "OccupationCorrection",
        "descriptionAr": "التحقق من طلب تصحيح المهنة",
        "descriptionEn": "Occupation Correction"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 9,
        "name": "CO_ROLE",
        "descriptionEn": "Change occupation"
      }
    ]
  },
  {
    "id": 6,
    "service": "WORK_PERMIT",
    "descriptionEn": "Work permit managment",
    "descriptionAr": "إدارة رخص العمل",
    "bcUrl": "/static/media/location-permit-svgrepo-com.1825f3cdf4249854f3f4a96ba222c9b2.svg",
    "serviceOptions": [
      {
        "otptionId": 1683,
        "name": "paymentNumbers",
        "descriptionAr": "أرقام السداد",
        "descriptionEn": "payment Numbers"
      },
      {
        "otptionId": 1681,
        "name": "financialExemption",
        "descriptionAr": "الإعفاء المالي",
        "descriptionEn": "Check Financial Exemption"
      },
      {
        "otptionId": 1684,
        "name": "wpDetails",
        "descriptionAr": "تفاصيل الرخصة",
        "descriptionEn": "Work Permit Details"
      },
      {
        "otptionId": 1682,
        "name": "indebtednessDetails",
        "descriptionAr": "المديونية",
        "descriptionEn": "Indebtedness Details"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 4,
        "name": "WP_ROLE",
        "descriptionEn": "Work Permit"
      }
    ]
  },
  {
    "id": 8,
    "service": "PRIVILIAGE_MANAG",
    "descriptionEn": "Privilege management",
    "descriptionAr": "إدارة الصلاحيات",
    "bcUrl": "/static/media/permissions-svgrepo-com.8d503267ef23026ea7c5d6c8ed7dfc5b.svg",
    "serviceOptions": [
      {
        "otptionId": 1690,
        "name": "checkPrivileges",
        "descriptionAr": "التحقق من الصلاحيات",
        "descriptionEn": "Check Privileges"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 10,
        "name": "PM_ROLE",
        "descriptionEn": "Privilege management"
      }
    ]
  },
  {
    "id": 9,
    "service": "USER_MANAG",
    "descriptionEn": "User managment",
    "descriptionAr": "إدارة المستخدمين",
    "bcUrl": "/static/media/user-id-svgrepo-com.8f9d4a9fb0d022f3277d0b5ebe605b7f.svg",
    "serviceOptions": [
      {
        "otptionId": 1689,
        "name": "CheckPaymentRef",
        "descriptionAr": "التحقق من دفع الأشتراك",
        "descriptionEn": "Check Payment Referance"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 11,
        "name": "UM_ROLE",
        "descriptionEn": "User management"
      }
    ]
  },
  {
    "id": 10,
    "service": "GENERAL",
    "descriptionEn": "General",
    "descriptionAr": "الخدمات العامة",
    "bcUrl": "/static/media/apps-svgrepo-com.f7e8caac9eb86e9f3cd1331240ff3b67.svg",
    "serviceOptions": [
      {
        "otptionId": 1674,
        "name": "notCountedSaudis",
        "descriptionAr": "السعوديين المحتسبين بأقل من 1",
        "descriptionEn": "Less than one Saudis"
      },
      {
        "otptionId": 1675,
        "name": "calcBalance",
        "descriptionAr": "رد الرصيد",
        "descriptionEn": "Get balance answer"
      },
      {
        "otptionId": 1672,
        "name": "validate",
        "descriptionAr": "التحقق من المنشأة",
        "descriptionEn": "check the Establishment"
      },
      {
        "otptionId": 1673,
        "name": "nitaq",
        "descriptionAr": "رد النطاق",
        "descriptionEn": "Nitaq Check"
      }
    ],
    "allowedAuthorities": []
  },
  {
    "id": 11,
    "service": "EFM",
    "descriptionEn": "Establishment file managment",
    "descriptionAr": "إدارة ملف المنشأة",
    "bcUrl": null,
    "serviceOptions": [
      {
        "otptionId": 1701,
        "name": "CheckAndUpdateEst",
        "descriptionAr": "التحقق وتحديث المنشأة",
        "descriptionEn": "Check and update Establishment"
      },
      {
        "otptionId": 1706,
        "name": "CloseEstablishment",
        "descriptionAr": "التحقق من إغلاق المنشأة",
        "descriptionEn": "Validate Close Establishment"
      },
      {
        "otptionId": 1702,
        "name": "notAppearEsts",
        "descriptionAr": "المنشأة لا تظهر",
        "descriptionEn": "not Appear Establishments"
      },
      {
        "otptionId": 1700,
        "name": "ChangeActivity",
        "descriptionAr": "التحقق من تغير نشاط المنشأة",
        "descriptionEn": "Check establishment change activity"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 12,
        "name": "EFM_ROLE",
        "descriptionEn": "Establishment File Management"
      }
    ]
  },
  {
    "id": 12,
    "service": "VIOLATIONS",
    "descriptionEn": "Violation Objections",
    "descriptionAr": "الإعتراض على المخالفات",
    "bcUrl": null,
    "serviceOptions": [
      {
        "otptionId": 1703,
        "name": "PaidViolations",
        "descriptionAr": "المخالفات المدفوعة",
        "descriptionEn": "Paid violations"
      },
      {
        "otptionId": 1704,
        "name": "CancelledViolations",
        "descriptionAr": "المخالفات الملغية",
        "descriptionEn": "Cancelled violations"
      },
      {
        "otptionId": 1705,
        "name": "UnpaidViolations",
        "descriptionAr": "المخالفات الغير مدفوعة",
        "descriptionEn": "Unpaid violations"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 15,
        "name": "V_ROLE",
        "descriptionEn": "Violations"
      }
    ]
  },
  {
    "id": 13,
    "service": "CERTIFICATE_MANAGEMENT",
    "descriptionEn": "Certifications Management ",
    "descriptionAr": "إدارة الشهادات",
    "bcUrl": "/static/media/contract-sign-line-svgrepo-com.7b359498c1753c86cb0c89b65713d1f2.svg",
    "serviceOptions": [
      {
        "otptionId": 1698,
        "name": "CheckSaudiCertificate",
        "descriptionAr": "التحقق من اصدار شهادة السعودة",
        "descriptionEn": "Check Saudi Certificate"
      },
      {
        "otptionId": 1699,
        "name": "CheckNameofSaudiCertificate",
        "descriptionAr": "التحقق من شهادة السعودة",
        "descriptionEn": "Check Name of Saudi Certificate"
      }
    ],
    "allowedAuthorities": [
      {
        "authId": 13,
        "name": "CM_ROLE",
        "descriptionEn": "Certifications Management "
      }
    ]
  }
]