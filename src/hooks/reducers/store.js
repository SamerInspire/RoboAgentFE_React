import axios from 'axios';
import i18n from 'dictonaries/i18n';
import { reshapeUserData } from 'utils/table/tableReshape';

export function generalSuccessReducer(result, utils) {
  console.log('utils.requestAction ===> ', utils.requestAction);
  const { body } = result.data.roboAgentRs;
  const { header } = result.data.roboAgentRs;
  const { setAlert } = utils;
  const currentLang = i18n.language;
  const currentMessageLang = currentLang === 'ar' ? header.responseStatus.arabicMsg : header.responseStatus.englishMsg;
  switch (utils.requestAction) {
    case 'GET_ALL_USERS': {
      const { setTableData } = utils;
      const newUsersDataReshaped = reshapeUserData(body.users);
      console.log('new users data reshaped =============>', newUsersDataReshaped);
      setTableData(newUsersDataReshaped);
      break;
    }
    case 'SET_IS_LOGGED_IN': {
      const { loginDispatch } = utils;
      loginDispatch({
        type: 'ON_LOGIN',
        payload: { user: body.user, token: result.headers['authorization'] },
      });
      axios.defaults.headers.common['authorization'] = result.headers['authorization'];
      break;
    }
    case 'SET_SERVICE_LIST': {
      const { setServiceList } = utils;
      console.log(body);
      localStorage.removeItem('ServiceList')
      localStorage.setItem('ServiceList', JSON.stringify(body.roboServices))
      setServiceList(body.roboServices);
      break;
    }
    case 'SET_USER_SERVICE_LIST': {
      const { setUserServiceList } = utils;
      setUserServiceList(result);
      break;
    }
    case 'GET_ALL_AUTHORITIES': {
      const { setAuthorities } = utils;
      setAuthorities(body.roboAuthorities);
      break;
    }
    case 'REGISTER_NEW_USER': {
      const { setAlert, reset, clearFinalForm } = utils;
      setAlert({
        alertType: 'success',
        alertMsg: currentMessageLang,
      });
      reset();
      clearFinalForm();
      break;
    }
    case 'UPDATE_USER_ROLE': {
      const { setTableData, userId, tableData, newRole, handleCloseRolePopper } = utils;
      console.log(tableData);
      setTableData(updateTableData(tableData, 6, newRole, userId));
      handleCloseRolePopper();
      setAlert({
        alertType: 'success',
        alertMsg: currentMessageLang,
      });
      break;
    }
    case 'UPDATE_USER_AUTHORITIES': {
      const { handleClose, setAlert, containerSections, userId, tableData, setTableData } = utils;
      handleClose();
      setTableData(updateTableData(tableData, 9, [...containerSections['active_services']], userId));
      setAlert({
        alertType: 'success',
        alertMsg: currentMessageLang,
      });
      break;
    }
    case 'UPDATE_USER_TEAM': {
      break;
    }
    case 'SET_SUBMIT_USER_SERVICE': {
      const { handleCloseServiceDialog, setTableData, userId, tableData, userNewService, setAlert } = utils;
      setTableData(updateTableData(tableData, 8, userNewService, userId));
      setAlert({ alertType: 'success', alertMsg: currentMessageLang });
      handleCloseServiceDialog();
      break;
    }
    case 'SET_ANSWER': {
      const { setAnswer } = utils;
      setAlert({ alertType: 'success', alertMsg: currentMessageLang });
      setAnswer(body.getAnswerResp);
      break;
    }
    case 'SET_CURRENT_USER': {
      const { setCurrentUserData } = utils;
      setCurrentUserData(body.user);
      break;
    }
    case 'UPDATE_USER_INFO': {
      const { setAlert} = utils;
      setAlert({ alertType: 'success', alertMsg: currentMessageLang });
    }
  }
  return result;
}
function updateTableData(tableData, index, newValue, userId) {
  const newTableData = [];
  tableData.map((e) => {
    if (e[0] == userId) {
      e[index] = newValue;
      newTableData.push(e);
    } else {
      newTableData.push(e);
    }
  });
  return newTableData;
}
