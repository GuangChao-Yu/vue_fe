<template>
  <div>
    <div class="weChat-title fixed-pick">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png" />
      </span>队员选择
    </div>
    <div class="pick-content-warp">
      <!-- 筛选 排序 没有功能 假的-->
      <div class="handlers-scree-warp">
        <div class="handlers-scree-item">筛选
          <i class="handlers-scree-icon"></i>
        </div>
        <div class="handlers-scree-item">排序
          <i class="handlers-scree-icon"></i>
        </div>
      </div>
  
      <div class="pick-con clearfix">
        <!-- 左侧栏tabs 修改了以前数据类型 变成普通的tabs应用 更加直接-->
        <ul class="pick-left-con">
          <li class="pick-left-meun" v-for="(item,index) in leftBarList" :class="{'pick-left-meun-active':index==activeIndex}" @click="toggle(index)">
            <span class="row1">{{item.position}}</span>
            <span class="row2">{{item.player=='0'?0:1}}/1</span>
          </li>
        </ul>
        <div class="pick-right-con clearfix">
          <loading v-if="showLoading"></loading>
          <div v-else>
            <template v-if="currentView==0" v-for="(item,index) in topList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionTop"></pick-card>
            </template>
            <template v-if="currentView==1" v-for="(item,index) in midList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionMid"></pick-card>
            </template>
            <template v-if="currentView==2" v-for="(item,index) in jungleList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionJug"></pick-card>
            </template>
            <template v-if="currentView==3" v-for="(item,index) in adcList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionAdc"></pick-card>
            </template>
            <template v-if="currentView==4" v-for="(item,index) in supList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionSup"></pick-card>
            </template>
            <template v-if="currentView==5" v-for="(item,index) in benchList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionBench"></pick-card>
            </template>
            <template v-if="currentView==6" v-for="(item,index) in teamList">
              <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionTeam"></pick-card>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="pick-bottom-nav">
      <div class="pick-empty-btn" @click="emptyClick()">
        <i class="pick-empty-icon"></i>
        清空阵容
      </div>
      <div class="pick-info">
        <p>平均薪水:
          <i class="pick-avg-wages">{{avgCost}}</i>/人</p>
        <p>剩余薪资:
          <i class="pick-avg-wages">{{Salary}}</i>
        </p>
      </div>
      <div class="pick-refer-btn" @click="goToMap()">已选{{choseNum}}/7 ></div>
    </div>
  </div>
</template>

<script>
import router from '../../router/index.js'
import * as api from '../../server/api.js'
import pickCard from '../../components/seeinfront/pickcard'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import loading from '../../components/common/loading'

export default {
  name: 'picking-player',
  data() {
    return {
      //侧边栏的输出数组
      leftBarList: [
        {
          //上单
          'position': '上单',
          'player': '0'
        },
        {
          //中单
          'position': '中单',
          'player': '0'
        },
        {
          //打野
          'position': '打野',
          'player': '0'
        },
        {
          //射手
          'position': 'ADC',
          'player': '0'
        },
        {
          'position': '辅助',
          'player': '0'
        },
        {
          'position': '替补',
          'player': '0'
        },
        {
          'position': '战队',
          'player': '0'
        }
      ],
      showLoading: true,
      activeIndex: 0,
      currentView: 0,
      topList: [],   //循环各个位置的数组
      midList: [],
      adcList: [],
      supList: [],
      jungleList: [],
      benchList: [],
      teamList: [],
      optionTop: '0',    //选择的位置的名字，再次下发给子组件，达到同步
      optionMid: '0',
      optionJug: '0',
      optionAdc: '0',
      optionSup: '0',
      optionBench: '0',
      optionTeam: '0',
      Salary: 50000,
      choseNum: 0,      //已选择人数
      positionArr: [
        {
          position: '上单',
          salary: 0
        },
        {
          position: '中单',
          salary: 0
        },
        {
          position: '打野',
          salary: 0
        },
        {
          position: 'ADC',
          salary: 0
        },
        {
          position: '辅助',
          salary: 0
        },
        {
          position: '替补',
          salary: 0
        },
        {
          position: '战队',
          salary: 0
        },
      ],
    }
  },
  beforeMount() {
    if (this.$route.params.position) {
      this.toggle(this.$route.params.position);
    }
    api.getPlayerAndTeamList({
      contests_id: this.$route.params.contestId
    }).then((res) => {
      this.benchList = res.data.result.players;
      this.topList = _.filter(res.data.result.players, function (i) {
        return i.players_position == '上单';
      })
      this.midList = _.filter(res.data.result.players, function (i) {
        return i.players_position == '中单';
      })
      this.adcList = _.filter(res.data.result.players, function (i) {
        return i.players_position == 'ADC';
      })
      this.supList = _.filter(res.data.result.players, function (i) {
        return i.players_position == '辅助';
      })
      this.jungleList = _.filter(res.data.result.players, function (i) {
        return i.players_position == '打野';
      })
      this.teamList = res.data.result.teams;
      this.showLoading = false;
    })
    this.updatepick();
  },
  methods: {
    goback() {
      if (this.$route.params.type == '1') {
        router.push({ name: 'myguess' })
      } else {
        router.push({
          name: 'mapplayer',
          params: {
            contestId: this.$route.params.contestId
          }
        })
      }
    },
    goToMap() {
      if (this.$route.params.type == "1") {
        this.$router.push({ name: 'mapplayer', params: { type: this.$route.params.type, contestId: this.$route.params.contestId, my_contest_id: this.$route.params.my_contest_id } })
      } else {
        this.$router.push({ name: 'mapplayer', params: { contestId: this.$route.params.contestId } })
      }
    },
    toggle(index) {
      this.activeIndex = index;
      this.currentView = index;
    },
    updatepick() {
      //更新上单 
      if (this.getTop.players_name || this.getTop.teams_name) {
        this.optionTop = this.getTop.players_name;
        this.positionArr[0].salary = this.getTop.players_salary;
        this.leftBarList[0].player = '1';
        this.updateBenchList(this.getTop);
      }
      if (this.getMid.players_name || this.getMid.teams_name) {
        this.optionMid = this.getMid.players_name;
        this.positionArr[1].salary = this.getMid.players_salary;
        this.leftBarList[1].player = '1';
        this.updateBenchList(this.getMid);
      }
      if (this.getJug.players_name || this.getJug.teams_name) {
        this.optionJug = this.getJug.players_name;
        this.positionArr[2].salary = this.getJug.players_salary;
        this.leftBarList[2].player = '1';
        this.updateBenchList(this.getJug);
      }
      if (this.getAdc.players_name || this.getAdc.teams_name) {
        this.optionAdc = this.getAdc.players_name;
        this.positionArr[3].salary = this.getAdc.players_salary;
        this.leftBarList[3].player = '1';
        this.updateBenchList(this.getAdc);
      }
      if (this.getSup.players_name || this.getSup.teams_name) {
        this.optionSup = this.getSup.players_name;
        this.positionArr[4].salary = this.getSup.players_salary;
        this.leftBarList[4].player = '1';
        this.updateBenchList(this.getSup);
      }
      if (this.getBench.players_name || this.getBench.teams_name) {
        this.optionBench = this.getBench.players_name;
        this.positionArr[5].salary = this.getBench.players_salary;
        this.leftBarList[5].player = '1';
      }
      if (this.getTeam.players_name || this.getTeam.teams_name) {
        this.optionTeam = this.getTeam.teams_name;
        this.positionArr[6].salary = this.getTeam.teams_salary;
        this.leftBarList[6].player = '1';
      }
      let allMoneny = this.allCost;
      this.Salary = 50000 - allMoneny;
    },
    selectClick(item) {
      if (item.players_position == '上单' && this.currentView != 5) {
        if (this.getTop && this.getTop.players_name == item.players_name) {
          this.optionTop = '0';
          this.leftBarList[0].player = '0';
          this.positionArr[0].salary = 0;
          this.$store.dispatch('setTop', {});
        } else {
          this.optionTop = item.players_name;
          this.positionArr[0].salary = item.players_salary;
          this.leftBarList[0].player = '1';
          this.$store.dispatch('setTop', item);
        }
      }
      else if (item.players_position == '中单' && this.currentView != 5) {
        if (this.getMid && this.getMid.players_name == item.players_name) {
          this.optionMid = '0';
          this.positionArr[1].salary = 0;
          this.leftBarList[1].player = '0';
          this.$store.dispatch('setMid', {});
        } else {
          this.optionMid = item.players_name;
          this.positionArr[1].salary = item.players_salary;
          this.leftBarList[1].player = '1';
          this.$store.dispatch('setMid', item);
        }
      }
      else if (item.players_position == 'ADC' && this.currentView != 5) {
        if (this.getAdc && this.getAdc.players_name == item.players_name) {
          this.optionAdc = '0';
          this.positionArr[3].salary = 0;
          this.leftBarList[3].player = '0';
          this.$store.dispatch('setAdc', {});
        } else {
          this.optionAdc = item.players_name;
          this.positionArr[3].salary = item.players_salary;
          this.leftBarList[3].player = '1';
          this.$store.dispatch('setAdc', item);
        }
      }
      else if (item.players_position == '打野' && this.currentView != 5) {
        if (this.getJug && this.getJug.players_name == item.players_name) {
          this.optionJug = '0';
          this.positionArr[2].salary = 0;
          this.leftBarList[2].player = '0';
          this.$store.dispatch('setJug', {});
        } else {
          this.optionJug = item.players_name;
          this.positionArr[2].salary = item.players_salary;
          this.leftBarList[2].player = '1';
          this.$store.dispatch('setJug', item);
        }

      }
      else if (item.players_position == '辅助' && this.currentView != 5) {
        if (this.getSup && this.getSup.players_name == item.players_name) {
          this.optionSup = '0';
          this.positionArr[4].salary = 0;
          this.leftBarList[4].player = '0';
          this.$store.dispatch('setSup', {});
        } else {
          this.optionSup = item.players_name;
          this.positionArr[4].salary = item.players_salary;
          this.leftBarList[4].player = '1';
          this.$store.dispatch('setSup', item);
        }
      }
      else if (this.currentView == 5) {
        if (this.getBench && this.getBench.players_name == item.players_name) {
          this.optionBench = '0';
          this.positionArr[5].salary = 0;
          this.leftBarList[5].player = '0';
          this.$store.dispatch('setBench', {});
        } else {
          this.optionBench = item.players_name;
          this.positionArr[5].salary = item.players_salary;
          this.leftBarList[5].player = '1';
          this.$store.dispatch('setBench', item);
        }
      }
      else if (item.teams_id >= 0 && this.currentView != 5) {
        if (this.getTeam && this.getTeam.teams_name == item.teams_name) {
          this.optionTeam = '0';
          this.positionArr[6].salary = 0;
          this.leftBarList[6].player = '0';
          this.$store.dispatch('setTeam', {});
        } else {
          this.optionTeam = item.teams_name;
          this.positionArr[6].salary = item.teams_salary;
          this.leftBarList[6].player = '1';
          this.$store.dispatch('setTeam', item);
        }
      }
      let allMoneny = this.allCost;
      this.Salary = 50000 - allMoneny;
    },
    emptyClick() {
      this.choseNum = 0;
      this.optionTop = '0';
      this.optionMid = '0';
      this.optionJug = '0';
      this.optionAdc = '0';
      this.optionSup = '0';
      this.optionBench = '0';
      this.optionTeam = '0';
      this.Salary = 50000;
      this.leftBarList.forEach((item) => {
        item.player = '0';
      })
      this.$store.dispatch('setTop', {});
      this.$store.dispatch('setMid', {});
      this.$store.dispatch('setJug', {});
      this.$store.dispatch('setAdc', {});
      this.$store.dispatch('setSup', {});
      this.$store.dispatch('setBench', {});
      this.$store.dispatch('setTeam', {});
    },
    updateBenchList(tt) {
      this.benchList.forEach((item, index) => {
        if (item.players_name == tt.players_name) {
          this.benchList.splie(index, 1);
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench', 'getTeam']),
    allCost() {
      let cost = 0;
      this.positionArr.forEach((item) => {
        cost += item.salary
      })
      return cost;
    },
    avgCost() {
      let a = 0;
      this.leftBarList.forEach((i) => {
        if (i.player == '1') {
          a = a + 1;
        }
      })
      this.choseNum = a;
      if (this.Salary / this.choseNum == Infinity) {
        return 0;
      } else {
        return ((50000 - this.Salary) / this.choseNum).toFixed(0);
      }
    },
  },
  watch: {
    optionTop: function (val, old) {
      api.getPlayerAndTeamList({
        contestId: this.$route.params.contestId
      }).then((res) => {
        let list = res.data.result.players;
        this.benchList.forEach((item, index) => {
          if (item.players_name == val) {
            this.benchList.splice(index, 1);
          }
        })
        list.forEach((item, index) => {
          if (old != '0') {
            if (item.players_name == old) {
              ;
              this.benchList.push(item);
              this.benchList = _.uniq(this.benchList, 'players_name');
            }
          }
        })
      })
    },
    optionJug: function (val, old) {
      api.getPlayerAndTeamList({
        contestId: this.$route.params.contestId
      }).then((res) => {
        let list = res.data.result.players;
        this.benchList.forEach((item, index) => {
          if (item.players_name == val) {
            this.benchList.splice(index, 1);
          }
        })
        list.forEach((item, index) => {
          if (old != '0') {
            if (item.players_name == old) {
              ;
              this.benchList.push(item);
              this.benchList = _.uniq(this.benchList, 'players_name');
            }
          }
        })
      })
    },
    optionMid: function (val, old) {
      api.getPlayerAndTeamList({
        contestId: this.$route.params.contestId
      }).then((res) => {
        let list = res.data.result.players;
        this.benchList.forEach((item, index) => {
          if (item.players_name == val) {
            this.benchList.splice(index, 1);
          }
        })
        list.forEach((item, index) => {
          if (old != '0') {
            if (item.players_name == old) {
              ;
              this.benchList.push(item);
              this.benchList = _.uniq(this.benchList, 'players_name');
            }
          }
        })
      })
    },
    optionAdc: function (val, old) {
      api.getPlayerAndTeamList({
        contestId: this.$route.params.contestId
      }).then((res) => {
        let list = res.data.result.players;
        this.benchList.forEach((item, index) => {
          if (item.players_name == val) {
            this.benchList.splice(index, 1);

          }
        })
        list.forEach((item, index) => {
          if (old != '0') {
            if (item.players_name == old) {
              ;
              this.benchList.push(item);
              this.benchList = _.uniq(this.benchList, 'players_name');
            }
          }
        })
      })
    },
    optionSup: function (val, old) {
      api.getPlayerAndTeamList({
        contestId: this.$route.params.contestId
      }).then((res) => {
        let list = res.data.result.players;
        this.benchList.forEach((item, index) => {
          if (item.players_name == val) {
            this.benchList.splice(index, 1);
          }
        })
        list.forEach((item, index) => {
          if (old != '0') {
            if (item.players_name == old) {
              ;
              this.benchList.push(item);
              this.benchList = _.uniq(this.benchList, 'players_name');
            }
          }
        })
      })
    },
  },
  components: {
    [pickCard.name]: pickCard,
    [loading.name]: loading,
  }
}
</script>

<style src="../../css/pages/handlers/pickplayer.css">

</style>
