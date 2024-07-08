import axios from 'axios';
import { failureHitHandle, successHitHandle } from '../HitHandiling';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_ENDPOINT_URL;
console.log(process.env.REACT_APP_BACKEND_API_ENDPOINT_URL);
if (JSON.parse(localStorage.getItem('userInfo'))) {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  axios.defaults.headers.common['authorization'] = token;
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}
export default async function AxiosHit(config, utils) {
  console.log('utils axios ===> ', utils);
  console.log('config axios ===> ', config);
  const result = await axios(config)
    .then((successResponse) => successHitHandle(successResponse, utils))
    .catch((errorResponse) => failureHitHandle(errorResponse, utils));
  return result;
}
