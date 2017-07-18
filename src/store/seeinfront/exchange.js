import {
  WX_LOLEXCHANGE,
  WX_TXEXCHANGE
} from '../mutations-types'
import * as api from '../../server/api.js'

const state = {
  productList: {},
  exchangeList:{}
};

const actions = {
  setProductList({
    commit
  }, query) {
    api.getProductList({
      uid: query.uid,
      token: query.token
    }).then((res) => {
      if (res.status == 200) {
        commit(WX_LOLEXCHANGE, res.data.data)
      }
    }).catch((data) => {
      return Promise.resolve(data);
    })
  },
  setExchange({
    commit
  }, query) {
    api.getExchange({
      uid: query.uid,
      token: query.token
    }).then((res) => {
      if (res.status == 200) {
        commit(WX_TXEXCHANGE, res.data.result.data)
      }
    }).catch((data) => {
      return Promise.resolve(data);
    })
  },
}

const getters = {
  getProductList: state => state.productList,
  getExchange: state => state.exchangeList,
}

const mutations = {
  [WX_LOLEXCHANGE](state, item) {
    state.productList = item
  },
   [WX_TXEXCHANGE](state, item) {
    state.exchangeList = item
  },
}
export default {
  state,
  actions,
  getters,
  mutations
}
