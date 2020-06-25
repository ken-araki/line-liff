import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export function auth(jwt, accessToken) {
  return axios.create({
    responseType: 'json',
    baseURL: API_BASE_URL + '/line',
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'X_LIFF_JWT': jwt,
      'X_LIFF_ACCESS_TOKEN': accessToken
    }
  }).post('/token');
}
