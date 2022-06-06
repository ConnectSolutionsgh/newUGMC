import http from "./httpService";
import jwtDecode from "jwt-decode";
//import { apiUrl } from "../config.json";

const apiEndPoint = "/auth";
const tokenKey = "token";
http.setJwt(getJwt());

export async function login(email, password) {
  logout();
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  logout();
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    //console.log(jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const exportAuth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default exportAuth;
