import axios from 'axios';

export function api(basePath) {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  let client = axios.create({
    responseType: 'json',
    baseURL: API_BASE_URL + basePath,
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'nonce': 'hoge'
    }
  });

  return {
    client: client,
    setHeader: function (key, value) {
      client.setHeader(key, value);
    }
  };
}
