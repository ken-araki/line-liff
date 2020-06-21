import * as common from '../common';

const client = common.api('/api/v1/tobuy');

export function fetchTobuy(success) {
  return client.get()
    .then(response => {
      console.log('response: ', response);
      if (success instanceof Function) {
        success(response.data);
      }
    })
    .catch(err => {
      console.log('err:', err);
    });
}

export function addTobuy(goods, success) {
  console.log(goods)
  return client.post(`/add?goods=${goods}`)
    .then(response => {
      console.log('response: ', response);
      if (success instanceof Function) {
        success(response.data);
      }
    })
    .catch(err => {
      console.log('err:', err);
    });
}

export function buy(params, success) {
  return client.post('/buy', params)
    .then(response => {
      console.log('response: ', response);
      if (success instanceof Function) {
        success(response.data);
      }
    })
    .catch(err => {
      console.log('err:', err);
    });
}
