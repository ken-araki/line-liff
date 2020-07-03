import * as common from '../common';

export function auth(jwt, accessToken, success, error) {
  let header = {
    headers: {
      'Content-Type': 'application/json',
      'token': process.env.REACT_APP_API_TOKEN,
      'X_LIFF_JWT': jwt,
      'X_LIFF_ACCESS_TOKEN': accessToken
    }
  };
  common.post('/line/token', {}, header, (data) => {
    common.jwtToken = data.data;
    if (success instanceof Function) {
      success();
    }
  }).catch(err => {
    console.error(err);
    if (error instanceof Function) {
      error();
    }
  });
}
