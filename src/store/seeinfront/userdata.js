import {
  WX_USERDATA
} from '../mutations-types'
import * as api from '../../server/api.js'

const state = {
  userdata: {}
};

const actions = {
  setUserInfo({
    commit
  }, query) {
    api.getUserInfo({
      uid: query.uid,
      token: query.token
    }).then((res) => {
      if(res.data.state==10401){
        commit(WX_USERDATA);
      }else{
        commit(WX_USERDATA, res.data.result);
      }
    }).catch((data) => {
      return Promise.resolve(data);
    })
  }
}

const getters = {
  getUserInfo: state => state.userdata,
}

const mutations = {
  [WX_USERDATA](state, item) {
    state.userdata = item
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
