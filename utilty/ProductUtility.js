import httpService from "./httpService";
import config from "../config.json";

const apiEnd = config.apiUrl + "/products";
export function saveProduct(product) {
  console.log(product);
  // if (product._id) {
  //   const body = { ...product };
  //   delete body._id;
  //   return httpService.put(movieUrl(product._id), body);
  // }
  return httpService.post(apiEnd, product);
}
