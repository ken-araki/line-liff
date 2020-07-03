import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
export let jwtToken = '';

const LIFF_API = axios.create({
  responseType: 'json',
  baseURL: API_BASE_URL
});

export function defualtConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'X_ARK_TOKEN': process.env.REACT_APP_API_TOKEN,
      'X_ARK_AUTHENTICATION': jwtToken
    }
  }
}

export function get(path, config, success) {
  return LIFF_API.get(path, config)
    .then(res => {
      console.log(res)
      if (success instanceof Function) {
        success(res.data);
      }
    });
}

export function post(path, params, config, success) {
  return LIFF_API.post(path, params, config)
    .then(res => {
      console.log(res)
      if (success instanceof Function) {
        success(res.data);
      }
    });
}
