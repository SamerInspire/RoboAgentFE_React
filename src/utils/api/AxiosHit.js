import axios from "axios";
import { failureHitHandle, successHitHandle } from "../HitHandiling";

axios.defaults.baseURL = "http://localhost:3000/api";
if (JSON.parse(localStorage.getItem("userInfo"))) {
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  axios.defaults.headers.common["authorization"] = token;
}
export default async function AxiosHit(config, utils) {
  let result = await axios(config)
    .then((successResponse) => successHitHandle(successResponse, utils))
    .catch((errorResponse) => failureHitHandle(errorResponse, utils));
  return result;
}
