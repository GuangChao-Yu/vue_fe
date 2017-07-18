import {
  WX_PLAYER_TOP,
  WX_PLAYER_MID,
  WX_PLAYER_JUG,
  WX_PLAYER_ADC,
  WX_PLAYER_SUP,
  WX_PLAYER_BENCH,
  WX_TEAM
} from '../mutations-types'


const state={
  playerTop:{},
  playerMid:{},
  playerJug:{},
  playerAdc:{},
  playerSup:{},
  playerBench:{},
  playerTeam:{}
}

const actions={
  setTop({commit},query){
    commit(WX_PLAYER_TOP,query)
  },
  setMid({commit},query){
    commit(WX_PLAYER_MID,query)
  },
  setJug({commit},query){
    commit(WX_PLAYER_JUG,query)
  },
  setAdc({commit},query){
    commit(WX_PLAYER_ADC,query)
  },
  setSup({commit},query){
    commit(WX_PLAYER_SUP,query)
  },
  setBench({commit},query){
    commit(WX_PLAYER_BENCH,query)
  },
  setTeam({commit},query){
    commit(WX_TEAM,query)
  }
}

const getters={
  getTop:state=>state.playerTop,
  getMid:state=>state.playerMid,
  getJug:state=>state.playerJug,
  getAdc:state=>state.playerAdc,
  getSup:state=>state.playerSup,
  getBench:state=>state.playerBench,
  getTeam:state=>state.playerTeam
}

const mutations={
  [WX_PLAYER_TOP](state,item){
    state.playerTop=item
  },
  [WX_PLAYER_MID](state,item){
    state.playerMid=item
  },
  [WX_PLAYER_JUG](state,item){
    state.playerJug=item
  },
  [WX_PLAYER_ADC](state,item){
    state.playerAdc=item
  },
  [WX_PLAYER_SUP](state,item){
    state.playerSup=item
  },
  [WX_PLAYER_BENCH](state,item){
    state.playerBench=item
  },
  [WX_TEAM](state,item){
    state.playerTeam=item
  }
}

export default{
  state,
  actions,
  getters,
  mutations
}