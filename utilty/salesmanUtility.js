import httpService from "./httpService";
import config from "../config.json";

const apiEnd = config.apiUrl + "/salesmans";
export function saveSalesman(salesman) {
  console.log(salesman);
  // if (product._id) {
  //   const body = { ...product };
  //   delete body._id;
  //   return httpService.put(movieUrl(product._id), body);
  // }
  return httpService.post(apiEnd, salesman);
}
