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
    console.log(res)
    return getToken(jwt, accessToken, res.data.data.nonceId)
  });
}

export function getToken(jwt, accessToken, nonceId) {
  return axios.create({
    responseType: 'json',
    baseURL: API_BASE_URL + '/line',
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'X_LIFF_JWT': jwt,
      'X_LIFF_ACCESS_TOKEN': accessToken,
      'X_LIFF_NONCE_ID': nonceId
    }
  }).post('/token');
}
