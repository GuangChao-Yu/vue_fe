<template>
  <div class="pick-right-item" :class="{'pick-right-active':item.players_name==selectOpiton||item.teams_name==selectOpiton}">
    <span class="pick-poistion-icon" v-show="seeinfrontGameType=='1'">{{item.players_position||'战队'}}</span>
    <span class="pick-player-img" @click="goToDetails(item)">
      <img :src="item.players_header_url||item.teams_img_url" />
    </span>
    <span class="pick-player-name">{{item.players_name||item.teams_name}}</span>
    <span class="pick-player-team-game">
      <i class="pick-player-team-icon">{{item.teams_name}}</i>
      <i class="pick-player-taam-game-num">{{item.match_number}}场比赛</i>
    </span>
    <span class="pick-player-kda">KDA
      <i>{{item.players_kda || item.teams_kda}}</i>
    </span>
    <span class="pick-player-stp">STP
      <i>{{item.players_fppg || item.players_fppg}}</i>
    </span>
    <i class="pick-unselect-icon" @click="selectOption(item)" :class="{'pick-select-icon':item.players_name==selectOpiton||item.teams_name==selectOpiton}"></i>
    <span class="pick-player-all-salary">薪水:
      <i>{{item.players_salary || item.teams_salary}}</i>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getGameType } from '@/handle/auth'

export default {
  name: 'pick-card',
  data() {
    return {
      seeinfrontGameType:''
    }
  },
  props: {
    item: {
      type: Object,
      default() { return {} }
    },
    selectOpiton: {
      type: String,
      default() {
        return '0'
      }
    }
  },
  created(){
     this.seeinfrontGameType=getGameType()||'1'
  },
  methods: {
    selectOption(item) {
      this.$emit('selectClick', item);
    },
    goToDetails(item) {
      let type = item.players_id ? 'player' : 'team';
      let id = item.players_id || item.teams_id;
      this.$router.push({ name: 'details', params: { detailsId: id, type: type, contestId: this.$route.params.contestId } })
    },
  },
  computed: {
    ...mapGetters(['getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench', 'getTeam']),
  }
}
</script>

<style src="../../css/commponent/pickcard.css">

</style>
