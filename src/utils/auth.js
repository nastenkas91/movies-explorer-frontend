import { baseUrl } from "./constants";

const CheckResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = ( name, email, password ) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(CheckResponse);
};

export const login = ( email, password ) => {
  return fetch(`${baseUrl}/signin`, {
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(CheckResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  })
    .then(CheckResponse)
};