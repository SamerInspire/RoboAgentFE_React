// actions.test.js
import i18next from 'i18next';
import {
  handleChangePassCodeActions,
  handleGeneralErrorCodeActions,
  handleGetAnswerFailure,
  handleOTPCodeActions,
} from '../response_handlers';

describe('Code Actions', () => {
  const mockUtils = {
    handleNext: jest.fn(),
    setAlert: jest.fn(),
    setOtpToken: jest.fn(),
    setIsLoading: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handleChangePassCodeActions should handle success case', () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: 'نجاح',
              englishMsg: 'Success',
              status: 'success',
            },
            code: '00000',
          },
        },
      },
    };
    const code = '00000';
    i18next.language = 'en';

    handleChangePassCodeActions(result, code, mockUtils);

    expect(mockUtils.handleNext).toHaveBeenCalled();
    expect(mockUtils.setAlert).toHaveBeenCalledWith({
      alertType: true,
      alertMsg: 'Success ',
    });
  });

  it('handleChangePassCodeActions should handle failure case', () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: 'فشل',
              englishMsg: 'Failure',
              status: 'error',
            },
            code: '11111',
          },
        },
      },
    };
    const code = '11111';
    i18next.language = 'en';

    handleChangePassCodeActions(result, code, mockUtils);

    expect(mockUtils.handleNext).not.toHaveBeenCalled();
    expect(mockUtils.setAlert).toHaveBeenCalledWith({
      alertType: false,
      alertMsg: 'Failure ',
    });
  });

  it('handleOTPCodeActions should handle success case', () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: 'نجاح',
              englishMsg: 'Success',
              status: 'success',
              code: '00000',
            },
          },
        },
      },
    };
    const code = '00000';
    i18next.language = 'en';

    handleOTPCodeActions(result, code, mockUtils);

    expect(mockUtils.handleNext).toHaveBeenCalled();
    expect(mockUtils.setAlert).toHaveBeenCalledWith({
      alertType: 'success',
      alertMsg: 'Success ',
      open: true,
    });
  });

  it('handleGeneralErrorCodeActions should set alert info', () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: 'خطأ',
              englishMsg: 'Error',
              status: 'error',
            },
            code: '11111',
          },
        },
      },
    };
    const code = '11111';
    i18next.language = 'en';

    handleGeneralErrorCodeActions(result, code, mockUtils);

    expect(mockUtils.setAlert).toHaveBeenCalledWith({
      alertType: 'error',
      alertMsg: 'Error ',
    });
  });

  it('handleGetAnswerFailure should do nothing', () => {
    const result = {
      data: {
        roboAgentRs: {
          header: {
            responseStatus: {
              arabicMsg: 'خطأ',
              englishMsg: 'Error',
              status: 'error',
            },
            code: '11111',
          },
        },
      },
    };
    handleGetAnswerFailure(result, 4, { setAlert: () => {} });
    // Add assertions if any functionality is added to handleGetAnswerFailure
  });
});
