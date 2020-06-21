import * as common from '../common';

const client = common.api('/api/v1/tobuy').client;

export function fetchTobuy() {
  return client.get();
}

export function addTobuy(goods) {
  console.log(goods)
  return client.post(`/add?goods=${goods}`);
}

export function buy(params) {
  return client.post('/buy', params);
}
