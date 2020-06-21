import * as common from '../common';

const api = common.api('/line');
const JWT_HEADER_NAME = 'X_LIFF_JWT';
const ACCESS_TOKEN_HEADER_NAME = 'X_LIFF_ACCESS_TOKEN';

export function getToken(jwt, accessToken) {
  api.setHeader(JWT_HEADER_NAME, jwt);
  api.setHeader(ACCESS_TOKEN_HEADER_NAME, accessToken);
  return api.client.post('/token');
}
