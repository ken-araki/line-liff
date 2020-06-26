import * as common from '../common';

export function auth(jwt, accessToken) {
  let header = {
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'X_LIFF_JWT': jwt,
      'X_LIFF_ACCESS_TOKEN': accessToken
    }
  };
  return common.post('/line/token', {}, header);
}
