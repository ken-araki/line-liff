import * as common from '../common';

export function fetchTobuy(success) {
  let config = common.defualtConfig()
  return common.get('/api/v1/tobuy', config, success);
}

export function addTobuy(goods, success) {
  let config = common.defualtConfig()
  return common.post('/api/v1/tobuy/add', { "goods": goods }, config, success);
}

export function buy(params, success) {
  let config = common.defualtConfig()
  return common.post('/api/v1/tobuy/buy', params, config, success);
}
