import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export function auth(jwt, accessToken) {
  const client = axios.create({
    responseType: 'json',
    baseURL: API_BASE_URL + '/line',
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
    }
  });
  return client.post('/nonce').then(res => {
    console.log(res);
    let t = res.data.data;
    return getToken(jwt, accessToken, t.nonce, t.token)
  });
}

export function getToken(jwt, accessToken, nonce, onetimeToken) {
  return axios.create({
    responseType: 'json',
    baseURL: API_BASE_URL + '/line',
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'X_LIFF_JWT': jwt,
      'X_LIFF_ACCESS_TOKEN': accessToken,
      'X_LIFF_NONCE': nonce,
      'X_LIFF_ONETIME_TOKEN': onetimeToken
    }
  }).post('/token');
}
