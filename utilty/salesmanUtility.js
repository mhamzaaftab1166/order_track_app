import httpService from "./httpService";
import config from "../config.json";

const apiEnd = config.apiUrl + "/salesmans";

function salesmanUrl(id) {
  return `${apiEnd}/${id}`;
}

export function saveSalesman(salesman) {
  if (salesman._id) {
    console.log(salesman);
    const body = { ...salesman };
    delete body._id;
    return httpService.put(salesmanUrl(salesman._id), body);
  }
  return httpService.post(apiEnd, salesman);
}

export function verification(code) {
  return httpService.post(`${apiEnd}/code`, { code });
}

export function resend() {
  return httpService.get(`${apiEnd}/resend`);
}

export function getSalesmans() {
  return httpService.get(config.apiUrl + "/salesmans");
}

export function deleteSalesman(id) {
  return httpService.delete(salesmanUrl(id));
}

export function getSaleman(salesmanId) {
  return httpService.get(apiEndpoint + `/${salesmanId}`);
}
