import axios from 'axios';

export function auth(jwt, accessToken) {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const client = axios.create({
    responseType: 'json',
    baseURL: API_BASE_URL + '/line',
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'nonce': 'hoge',
      'X_LIFF_JWT': jwt,
      'X_LIFF_ACCESS_TOKEN': accessToken
    }
  });
  return client.post('/token');
}
