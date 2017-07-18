import Vue from 'vue'
import Vuex from 'vuex'
import userData from './seeinfront/userdata'
import bannerData from './seeinfront/swiperdata'
import exchangeList from './seeinfront/exchange'
import playerPick from './seeinfront/playerpick'


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userData,
    bannerData,
    exchangeList,
    playerPick
  },
})
