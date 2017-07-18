import {
  WX_BANNER
} from '../mutations-types'
import * as api from '../../server/api'

const state = {
  banner: []
}

const actions = {
  getBanner({
    commit
  }, query) {
    api.getHomeBanner({
      game_type_id:query
    }).then((res) => {
      if (res.status == 200) {
        commit(WX_BANNER, res.data.result.banners_image);
      }
    }).catch((data) => {
      return Promise.resolve(data);
    })
  }
}

const getters = {
  getBanner: state => state.banner,
}

const mutations = {
  [WX_BANNER](state, item) {
    state.banner = item;
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
