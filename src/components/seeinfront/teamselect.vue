<template>
  <div class="team-list">
    <div class="team-handle-wrap">
      <div class="team-list-wrap">
        <template v-for="(item,index) in teams">
          <div class="team-item left" @click="choseTeam(item,index)" :class="{'team-active':(selectTeams.length==1&&index==0)}">
            <div class="team-header ">{{ item.teams_name }}</div>
            <div class="team-body ">
              <img class="" :src=" item.teams_img_url " alt="">
            </div>
            <div class="team-footer footer-xs">
              <div class="team-salary team-footer-item clearfix">
                薪水:
                <span class="right">{{ item.teams_salary }}</span>
              </div>
              <div class="team-stp team-footer-item clearfix">
                STP:
                <span class="right">{{ item.teams_fppg }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../../server/api.js'
import { setStore, getStore, removeStore } from '../../handle/utils.js'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'team-select',
  props:{
    isEmpty:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  data() {
    return {
      teams: [],
      selectTeams: [],

    }
  },
  watch:{
    'isEmpty':function(val,old){
      if(val==true){
        this.selectTeams=[];
      }
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      api.getPlayerAndTeamList({
        contests_id: this.$route.params.contestId
      }).then((res) => {
        this.teams = res.data.result.teams;
        if (this.getTeam.teams_name) {
        let index = _.findIndex(this.teams, (item) => {
          return item.teams_name == this.getTeam.teams_name
        })
        this.choseTeam(this.getTeam,index);
      }
      })
    })
  },
  computed: {
    ...mapGetters(['getTeam']),
  },
  methods: {
    getObj(obj) {
      for (var i in obj) {
        return true
      }
      return false;
    },
    choseTeam(item, isindex) {
      this.selectTeams = [];
      this.selectTeams.push(item);
      this.teams.forEach((item, index) => {
        if (index == isindex) {
          this.teams.splice(index, 1);
        }
      })
      this.teams.unshift(item);
      this.$store.dispatch('setTeam', item);
    },
  }
}
</script>

<style src="../../css/commponent/teamselect.css">

</style>
