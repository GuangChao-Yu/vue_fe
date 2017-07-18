<template>
  <div>
    <div class="weChat-title fixed-pick">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png" />
        <!-- <img src="../../assets/glory/btn_removemember@2x.png" />   -->
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
      <div class="pick-con clearfix scroll-animate">
        <loading v-if="showLoading"></loading>
        <ul class="pick-left-con">
          <li class="pick-left-con-item" v-for="(item,index) in leftBarList" :key="index" @click="toggle(index)">
            <div class="pick-left-meun-king">
              <img :src='getImage(index)' v-if="showClearIcon(index)" @click.stop="imgClick(index)">
              <span class="pick-left-meun-king-add" v-else></span>
            </div>
            <i class="clear-icon" v-if="showClearIcon(index)" @click.stop="clearnIcon(index)"></i>
            <span class="position-txt">{{item.position}}</span>
          </li>
        </ul>
        <div class="pick-right-con clearfix scroll-animate" ref="scrollPick">
          <div v-if="currentView==0" v-for="(item,index) in playerlist" :key="index" ref="index">
            <pick-card-king :item="item" v-on:selectClick="selectClick"></pick-card-king>
          </div>
          <div v-if="currentView==6" v-for="(item,index) in teamlist" :key="index">
            <pick-card :item="item" v-on:selectClick="selectClick" :selectOpiton="optionTeam"></pick-card>
          </div>
          <div class="wx-bottom"></div>
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
          <i class="pick-avg-wages">{{restCost}}</i>
        </p>
      </div>
      <div class="pick-refer-btn" @click="goToMap()">已选{{choseNum}}/7 ></div>
    </div>
  </div>
</template>

<script>
import pickCard from '../../components/seeinfront/pickcard'
import pickCardKing from '../../components/seeinfront/pickcardKing'
import loading from '../../components/common/loading'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import * as api from '../../server/api.js'
import { prefixStyle } from '../../handle/dom'

const transfrom = prefixStyle('transform')

export default {
  data() {
    return {
      //侧边栏的输出数组
      leftBarList: [
        {
          //上单
          'position': '边路',
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
          'position': '边路',
          'player': '0'
        },
        {
          'position': '游走',
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
      changeoption: 8, //要修改的位置
      activeIndex: 0,
      currentView: 0,
      showLoading: true,
      playerlist: [],
      teamlist: [],
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
          position: '边路',
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
          position: '边路',
          salary: 0
        },
        {
          position: '游走',
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
      orderIndex: null,
    }
  },
  beforeMount() {
    this.showLoading = true
    api.getPlayerAndTeamList({
      contests_id: this.$route.params.contestId
    }).then((res) => {
      this.playerlist = res.data.result.players
      this.teamlist = res.data.result.teams
      this.showLoading = false;
    })
    this.updatepick();
  },
  methods: {
    updatepick() {
      if (this.getTop.players_name || this.getTop.teams_name) {
        this.optionTop = this.getTop.players_name;
        this.positionArr[0].salary = this.getTop.players_salary;
        this.leftBarList[0].player = '1';
      }
      if (this.getMid.players_name || this.getMid.teams_name) {
        this.optionMid = this.getMid.players_name;
        this.positionArr[1].salary = this.getMid.players_salary;
        this.leftBarList[1].player = '1';
      }
      if (this.getJug.players_name || this.getJug.teams_name) {
        this.optionJug = this.getJug.players_name;
        this.positionArr[2].salary = this.getJug.players_salary;
        this.leftBarList[2].player = '1';
      }
      if (this.getAdc.players_name || this.getAdc.teams_name) {
        this.optionAdc = this.getAdc.players_name;
        this.positionArr[3].salary = this.getAdc.players_salary;
        this.leftBarList[3].player = '1';
      }
      if (this.getSup.players_name || this.getSup.teams_name) {
        this.optionSup = this.getSup.players_name;
        this.positionArr[4].salary = this.getSup.players_salary;
        this.leftBarList[4].player = '1';
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
    goback() {
      if (this.$route.params.type == '1') {
        this.$router.push({ name: 'myguess' })
      } else {
        this.$router.push({
          name: 'mapplayer',
          params: {
            contestId: this.$route.params.contestId
          }
        })
      }
    },
    toggle(index) {
      if (index != 6) {
        this.activeIndex = 0
        this.currentView = 0
      } else {
        this.activeIndex = index;
        this.currentView = index
      }
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
      this.orderIndex = null;
      this.$store.dispatch('setTop', {});
      this.$store.dispatch('setMid', {});
      this.$store.dispatch('setJug', {});
      this.$store.dispatch('setAdc', {});
      this.$store.dispatch('setSup', {});
      this.$store.dispatch('setBench', {});
      this.$store.dispatch('setTeam', {});
    },
    selectClick(item) {
      if (this.currentView === 6) {
        this.setTeamStrom(item)
        return
      }
      if (this.checkoutPickName(item)) return
      let stroeIndex = this.checkoutStroe(item);
      this.setPosition(stroeIndex, item)
      let allMoneny = this.allCost
      this.Salary = 50000 - allMoneny
    },
    setPosition(index, item) {
      switch (index) {
        case 0:
          this.optionTop = item.players_name;
          this.positionArr[0].salary = item.players_salary;
          this.leftBarList[0].player = '1';
          this.$store.dispatch('setTop', item)
          break
        case 1:
          this.optionMid = item.players_name;
          this.positionArr[1].salary = item.players_salary;
          this.leftBarList[1].player = '1';
          this.$store.dispatch('setMid', item);
          break
        case 2:
          this.optionJug = item.players_name;
          this.positionArr[2].salary = item.players_salary;
          this.leftBarList[2].player = '1';
          this.$store.dispatch('setJug', item);
          break
        case 3:
          this.optionAdc = item.players_name;
          this.positionArr[3].salary = item.players_salary;
          this.leftBarList[3].player = '1';
          this.$store.dispatch('setAdc', item);
          break
        case 4:
          this.optionSup = item.players_name;
          this.positionArr[4].salary = item.players_salary;
          this.leftBarList[4].player = '1';
          this.$store.dispatch('setSup', item);
          break
        case 5:
          this.optionBench = item.players_name;
          this.positionArr[5].salary = item.players_salary;
          this.leftBarList[5].player = '1';
          this.$store.dispatch('setBench', item);
          break
      }
    },
    checkoutPickName(item) {
      if (this.getTop && this.getTop.players_name == item.players_name) {
        this.optionTop = '0';
        this.leftBarList[0].player = '0';
        this.positionArr[0].salary = 0;
        this.$store.dispatch('setTop', {});
        return true
      }
      if (this.getMid && this.getMid.players_name == item.players_name) {
        this.optionMid = '0';
        this.positionArr[1].salary = 0;
        this.leftBarList[1].player = '0';
        this.$store.dispatch('setMid', {});
        return true
      }
      if (this.getJug && this.getJug.players_name == item.players_name) {
        this.optionJug = '0';
        this.positionArr[2].salary = 0;
        this.leftBarList[2].player = '0';
        this.$store.dispatch('setJug', {});
        return true
      }
      if (this.getAdc && this.getAdc.players_name == item.players_name) {
        this.optionAdc = '0';
        this.positionArr[3].salary = 0;
        this.leftBarList[3].player = '0';
        this.$store.dispatch('setAdc', {});
        return true
      }
      if (this.getSup && this.getSup.players_name == item.players_name) {
        this.optionSup = '0';
        this.positionArr[4].salary = 0;
        this.leftBarList[4].player = '0';
        this.$store.dispatch('setSup', {});
        return true
      }
      if (this.getBench && this.getBench.players_name == item.players_name) {
        this.optionBench = '0';
        this.positionArr[5].salary = 0;
        this.leftBarList[5].player = '0';
        this.$store.dispatch('setBench', {});
        return true
      }
      return false
    },
    checkoutStroe(item) {
      if (!(this.getTop && this.getTop.players_name)) {
        return 0
      }
      if (!(this.getMid && this.getMid.players_name)) {
        return 1
      }
      if (!(this.getJug && this.getJug.players_name)) {
        return 2
      }
      if (!(this.getAdc && this.getAdc.players_name)) {
        return 3
      }
      if (!(this.getSup && this.getSup.players_name)) {
        return 4
      }
      if (!(this.getBench && this.getBench.players_name)) {
        return 5
      }
      return 5
    },
    showClearIcon(index) {
      if (index == 0) {
        return this.getTop && this.getTop.players_name ? true : false
      } else if (index == 1) {
        return this.getMid && this.getMid.players_name ? true : false
      }
      else if (index == 2) {
        return this.getJug && this.getJug.players_name ? true : false
      }
      else if (index == 3) {
        return this.getAdc && this.getAdc.players_name ? true : false
      }
      else if (index == 4) {
        return this.getSup && this.getSup.players_name ? true : false
      }
      else if (index == 5) {
        return this.getBench && this.getBench.players_name ? true : false
      }
      else if (index == 6) {
        return this.getTeam && this.getTeam.teams_name ? true : false
      }
    },
    clearnIcon(index) {
      if (index == 0) {
        this.optionTop = '0';
        this.leftBarList[0].player = '0';
        this.positionArr[0].salary = 0;
        this.$store.dispatch('setTop', {});
      } else if (index == 1) {
        this.optionMid = '0'
        this.leftBarList[1].player = '0';
        this.positionArr[1].salary = 0;
        this.$store.dispatch('setMid', {});
      } else if (index == 2) {
        this.optionJug = '0'
        this.leftBarList[2].player = '0';
        this.positionArr[2].salary = 0;
        this.$store.dispatch('setJug', {});
      } else if (index == 3) {
        this.optionAdc = '0'
        this.leftBarList[3].player = '0';
        this.positionArr[3].salary = 0;
        this.$store.dispatch('setAdc', {});
      } else if (index == 4) {
        this.optionSup = '0'
        this.leftBarList[4].player = '0';
        this.positionArr[4].salary = 0;
        this.$store.dispatch('setSup', {});
      } else if (index == 5) {
        this.optionBench = '0'
        this.leftBarList[5].player = '0';
        this.positionArr[5].salary = 0;
        this.$store.dispatch('setBench', {});
      } else if (index == 6) {
        this.optionTeam = '0'
        this.leftBarList[6].player = '0';
        this.positionArr[6].salary = 0;
        this.$store.dispatch('setTeam', {});
      }
    },
    getNowIndex() {
      if (this.changeoption === 8) {
        return null
      } else {
        return this.changeoption
      }
    },
    getImage(index) {
      if (index == 0) {
        return this.getTop.players_header_url;
      }
      if (index == 1) {
        return this.getMid.players_header_url;
      }
      if (index == 2) {
        return this.getJug.players_header_url;
      }
      if (index == 3) {
        return this.getAdc.players_header_url;
      }
      if (index == 4) {
        return this.getSup.players_header_url;
      }
      if (index == 5) {
        return this.getBench.players_header_url;
      }
      if (index == 6) {
        return this.getTeam.teams_img_url;
      }
    },
    setTeamStrom(item) {
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
    },
    goToMap() {
      if (this.$route.params.type == "1") {
        this.$router.push({ name: 'mapplayer', params: { type: this.$route.params.type, contestId: this.$route.params.contestId, my_contest_id: this.$route.params.my_contest_id } })
      } else {
        this.$router.push({ name: 'mapplayer', params: { contestId: this.$route.params.contestId } })
      }
    },
    imgClick(index) {
      if (index == 0) {
        this.scrollToEl(this.getTop.players_name)
      }
      if (index == 1) {
        this.scrollToEl(this.getMid.players_name)
      }
      if (index == 2) {
        this.scrollToEl(this.getJug.players_name)
      }
      if (index == 3) {
        this.scrollToEl(this.getAdc.players_name)
      }
      if (index == 4) {
        this.scrollToEl(this.getSup.players_name)
      }
      if (index == 5) {
        this.scrollToEl(this.getBench.players_name)
      }
    },
    scrollToEl(name) {
      let scrollPosition = 0
      this.playerlist.forEach((item, index) => {
        if (item.players_name == name) {
          scrollPosition = index
        }
      })
      // this.$refs.index[scrollPosition].scrollIntoView()
      let jump = document.querySelectorAll('.pick-right-item')
      let total = jump[scrollPosition].offsetTop
      document.body.scrollTop = total
      // Chrome
      //this.$refs.scrollPick.style[transfrom]=`translateY(-（${total}px)`
    }
  },
  destroyed() {
    clearInterval(this.scrollInterval)
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
    restCost() {
      return 50000 - this.allCost
    }
  },
  components: {
    [pickCard.name]: pickCard,
    [loading.name]: loading,
    [pickCardKing.name]: pickCardKing
  }
}
</script>

<style scoped>
.pick-left-con-item {
  position: relative;
  width: 140px;
  height: 140px;
  /*px*/
  overflow: hidden;
}

.pick-left-meun-king {
  width: 100px;
  /*px*/
  height: 100px;
  /*px*/
  margin: 0 auto;
  border-radius: 50%;
  /*px*/
  background: url('../../assets/glory/bg_member@2x.png');
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}

.pick-left-meun-king-add {
  display: block;
  width: 100px;
  height: 100px;
  /*px*/
  background: url('../../assets/glory/btn_addmember@2x.png');
  background-size: 100% 100%
}

.pick-left-meun-king img {
  width: 100%;
  height: 100%
}

.clear-icon {
  width: 39px;
  /*px*/
  height: 39px;
  /*px*/
  background: url('../../assets/glory/btn_removemember@2x.png');
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 12px;
  z-index: 10;
}

.position-txt {
  border: 1px solid #03868b;
  /*no*/
  background: #253341;
  font-size: 20px;
  color: #a9c8d7;
  padding: 0 8px;
  position: absolute;
  bottom: 30px;
  /*px*/
  right: 5px;
  z-index: 10;
}

.scroll-animate {
  transition: all 0.3s;
}
</style>
