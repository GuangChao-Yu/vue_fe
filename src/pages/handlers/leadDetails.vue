<template>
  <div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png" >
      </span>
      导入阵容详情
    </div>
  
    <div class="aleadDetils">
      <div class="leadDetails-title">
        <div class="leadDetails-title-left">
          <span class="leadDetails-title-left-a">创建时间</span>
          <span class="leadDetails-title-left-b">@{{creatTime(data.created_time)}}</span>
        </div>
        <div class="leadDetails-title-right">
          <div class="leadDetails-title-right-average">
            <span class="leadDetails-title-right-average-a">平均薪水</span>
            <span class="leadDetails-title-right-average-b">{{svgSalary}}</span>
          </div>
          <div class="leadDetails-title-right-residue">
            <span class="leadDetails-title-right-average-a">剩余薪水</span>
            <span class="leadDetails-title-right-average-b">{{restSalary}}</span>
          </div>
        </div>
      </div>
      <game-map-no-link class="aleadDetils-map"></game-map-no-link>
  
      <div class="aleadDetils-footer">
        <div class="aleadDetils-footer-img">
          <img :src="data.team.teams_img_url">
        </div>
        <div class="aleadDetils-footer-right">
          <div class="aleadDetils-footer-right-left">
            <span>{{data.team.teams_name}}</span>
            <span>{{data.team.match_number}}场比赛</span>
          </div>
          <div class="aleadDetils-footer-right-center">
            <span>STP</span>
            <span>{{data.team.teams_fppg}}</span>
          </div>
          <div class="aleadDetils-footer-right-right">
            <span>薪水</span>
            <span>￥{{data.team.teams_salary}}</span>
          </div>
        </div>
      </div>
  
      <div class="aleadDetils-btn" @click="exportTeam">
        导入阵容
      </div>
    </div>
  
  </div>
</template>
<script>
import gameMap from '../../components/seeinfront/mapnolink'
import { mapGetters } from 'vuex'
import * as api from '../../server/api.js'
import { getAuth } from '@/handle/auth'

export default {
  data() {
    return {
      data: {},

    }
  },
  created() {
    let vm = this;
    vm.contestId = this.$route.params.contestId;
    vm.data = this.$route.params.selectData;

  },
  computed: {
    ...mapGetters(['getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench', 'getTeam']),
    restSalary() {
      let salary = 50000;
      let top = this.getTop.players_salary ? this.getTop.players_salary : 0;
      let mid = this.getMid.players_salary ? this.getMid.players_salary : 0;
      let jug = this.getJug.players_salary ? this.getJug.players_salary : 0;
      let adc = this.getAdc.players_salary ? this.getAdc.players_salary : 0;
      let sup = this.getSup.players_salary ? this.getSup.players_salary : 0;
      let bench = this.getBench.players_salary ? this.getBench.players_salary : 0;
      let team = this.getTeam.teams_salary ? this.getTeam.teams_salary : 0;
      this.money = top + mid + jug + adc + sup + bench + team;
      return salary - (top + mid + jug + adc + sup + bench + team);
    },
    svgSalary() {
      let salary = 50000;
      let top = this.getTop.players_salary ? this.getTop.players_salary : 0;
      let mid = this.getMid.players_salary ? this.getMid.players_salary : 0;
      let jug = this.getJug.players_salary ? this.getJug.players_salary : 0;
      let adc = this.getAdc.players_salary ? this.getAdc.players_salary : 0;
      let sup = this.getSup.players_salary ? this.getSup.players_salary : 0;
      let bench = this.getBench.players_salary ? this.getBench.players_salary : 0;
      let team = this.getTeam.teams_salary ? this.getTeam.teams_salary : 0;
      this.money = top + mid + jug + adc + sup + bench + team;
      return (this.money / 7).toFixed(0);
    }
  },
  methods: {
    goback() {
      this.$router.push({
        name: 'lead',
        params: { contestId: this.$route.params.contestId }
      })
    },
    creatTime(time) {
      let date = new Date(time * 1000);
      let Y = date.getFullYear() + '/';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      let D = date.getDate() + ' ';
      let h = date.getHours() + '时';
      return Y + M + D + h;
    },
    exportTeam() {
      this.$router.push({ name: 'mapplayer', params: { contestId: this.$route.params.contestId } })
    }
  },
  components: {
    [gameMap.name]: gameMap,
  }
}
</script>
<style src="../../css/pages/handlers/leadDetails.css">

</style>
