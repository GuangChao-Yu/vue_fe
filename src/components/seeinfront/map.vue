<template>
  <div class="game-map-warp">
    <!-- 上单位置 -->
    <!-- 未选中状态 -->
    <div @click="gotoPickingPage(0)" class="line-up-position clearfix top-position" v-if="!isSelectTop">
      <div class="position-header clearfix">
        <div class="left">
          <img src="../../assets/lineUp/men_unchosen@2x.png" alt="">
        </div>
      </div>
      <div class="position-body ">
        <div class="left text-right">
          <span>
            <img src="../../assets/lineUp/plus@2x.png" alt="">
          </span>
          <span class="text-right">{{topname}}</span>
        </div>
      </div>
      <div class="position-footer"></div>
    </div>
    <!-- 选中状态 -->
    <div @click="gotoPickingPage(0)" class="line-up-position clearfix top-position data-bg" v-else>
      <div class="position-header clearfix clear-margin">
        <div class="left">
          <img :src="getTop.players_header_url" alt="">
        </div>
        <div class="right">
          <div class="player-data clearfix">
            KDA:
            <span>{{ getTop.players_kda }}</span>
          </div>
          <div class="player-data clearfix">
            STP:
            <span>{{ getTop.players_fppg }}</span>
          </div>
          <div class="player-data clearfix">
            参团率:
            <span>{{ getTop.players_kp }}</span>
          </div>
        </div>
      </div>
      <div class="position-body clearfix">
        <div class="left text-right">
          <span>
            <img :src="getTop.teams_img_url" alt="">
          </span>
          <span class="text-right text-name-w">{{ getTop.players_name }}</span>
        </div>
      </div>
      <div class="position-footer">
        <div class="left border-line">{{ getTop.players_position=='-'? '边路':getTop.players_position}}</div>
        <div class="clearfix right">
          薪水:
          <span class="right">{{ getTop.players_salary }}</span>
        </div>
      </div>
    </div>
    <!-- 中单位置 -->
    <!-- 未选中状态 -->
    <div @click="gotoPickingPage(1)" class="line-up-position clearfix mid-position" v-if="!isSelectMid">
      <div class="position-header clearfix">
        <div class="left">
          <img src="../../assets/lineUp/men_unchosen@2x.png" alt="">
        </div>
      </div>
      <div class="position-body ">
        <div class="left text-right">
          <span>
            <img src="../../assets/lineUp/plus@2x.png" alt="">
          </span>
          <span class="text-right">选择中单</span>
        </div>
      </div>
      <div class="position-footer"></div>
    </div>
    <!-- 选中状态 -->
    <div @click="gotoPickingPage(1)" class="line-up-position clearfix mid-position data-bg" v-else>
      <div class="position-header clearfix clear-margin">
        <div class="left">
          <img :src="getMid.players_header_url" alt="">
        </div>
        <div class="right">
          <div class="player-data clearfix">
            KDA:
            <span>{{ getMid.players_kda }}</span>
          </div>
          <div class="player-data clearfix">
            STP:
            <span>{{ getMid.players_fppg }}</span>
          </div>
          <div class="player-data clearfix">
            参团率:
            <span>{{ getMid.players_kp }}</span>
          </div>
        </div>
      </div>
      <div class="position-body clearfix">
        <div class="left text-right">
          <span>
            <img :src="getMid.teams_img_url" alt="">
          </span>
          <span class="text-right text-name-w">{{ getMid.players_name }}</span>
        </div>
      </div>
      <div class="position-footer">
        <div class="left border-line">{{ getMid.players_position=='-'?'中单':getMid.players_position }}</div>
        <div class="clearfix right">
          薪水:
          <span class="right">{{ getMid.players_salary }}</span>
        </div>
      </div>
    </div>
    <!-- 打野位置 -->
    <!-- 未选中状态 -->
    <div @click="gotoPickingPage(2)" class="line-up-position clearfix jun-position" v-if="!isSelectJug">
      <div class="position-header clearfix">
        <div class="left">
          <img src="../../assets/lineUp/men_unchosen@2x.png" alt="">
        </div>
      </div>
      <div class="position-body ">
        <div class="left text-right">
          <span>
            <img src="../../assets/lineUp/plus@2x.png" alt="">
          </span>
          <span class="text-right">选择打野</span>
        </div>
      </div>
      <div class="position-footer"></div>
    </div>
    <!-- 2.选中队员 -->
    <div @click="gotoPickingPage(2)" class="line-up-position clearfix jun-position data-bg" v-else>
      <div class="position-header clearfix clear-margin">
        <div class="left">
          <img :src="getJug.players_header_url" alt="">
        </div>
        <div class="right">
          <div class="player-data clearfix">
            KDA:
            <span>{{ getJug.players_kda }}</span>
          </div>
          <div class="player-data clearfix">
            STP:
            <span>{{ getJug.players_fppg }}</span>
          </div>
          <div class="player-data clearfix">
            参团率:
            <span>{{ getJug.players_kp }}</span>
          </div>
        </div>
      </div>
      <div class="position-body clearfix">
        <div class="left text-right">
          <span>
            <img :src="getJug.teams_img_url" alt="">
          </span>
          <span class="text-right text-name-w">{{ getJug.players_name }}</span>
        </div>
      </div>
      <div class="position-footer">
        <div class="left border-line">{{ getJug.players_position=='-'?'打野':getJug.players_position }}</div>
        <div class="clearfix right">
          薪水:
          <span class="right">{{ getJug.players_salary }}</span>
        </div>
      </div>
    </div>
    <!-- ADC位置 -->
    <!-- 未选中状态 -->
    <div @click="gotoPickingPage(3)" class="line-up-position clearfix adc-position" v-if="!isSelectADC">
      <div class="position-header clearfix">
        <div class="left">
          <img src="../../assets/lineUp/men_unchosen@2x.png" alt="">
        </div>
      </div>
      <div class="position-body ">
        <div class="left text-right">
          <span>
            <img src="../../assets/lineUp/plus@2x.png" alt="">
          </span>
          <span class="text-right">{{adcname}}</span>
        </div>
      </div>
      <div class="position-footer"></div>
    </div>
    <!-- 2.选中队员 -->
    <div @click="gotoPickingPage(3)" class="line-up-position clearfix adc-position data-bg" v-else>
      <div class="position-header clearfix clear-margin">
        <div class="left">
          <img :src="getAdc.players_header_url" alt="">
        </div>
        <div class="right">
          <div class="player-data clearfix">
            KDA:
            <span>{{ getAdc.players_kda }}</span>
          </div>
          <div class="player-data clearfix">
            STP:
            <span>{{ getAdc.players_fppg }}</span>
          </div>
          <div class="player-data clearfix">
            参团率:
            <span>{{ getAdc.players_kp }}</span>
          </div>
        </div>
      </div>
      <div class="position-body clearfix">
        <div class="left text-right">
          <span>
            <img :src="getAdc.teams_img_url" alt="">
          </span>
          <span class="text-right text-name-w">{{ getAdc.players_name }}</span>
        </div>
      </div>
      <div class="position-footer">
        <div class="left border-line">{{ getAdc.players_position=='-'?'边路':getAdc.players_position }}</div>
        <div class="clearfix right">
          薪水:
          <span class="right">{{ getAdc.players_salary }}</span>
        </div>
      </div>
    </div>
    <!-- 辅助位置 -->
    <!-- 未选中状态 -->
    <div @click="gotoPickingPage(4)" class="line-up-position clearfix sup-position" v-if="!isSelectSup">
      <div class="position-header clearfix">
        <div class="left">
          <img src="../../assets/lineUp/men_unchosen@2x.png" alt="">
        </div>
      </div>
      <div class="position-body ">
        <div class="left text-right">
          <span>
            <img src="../../assets/lineUp/plus@2x.png" alt="">
          </span>
          <span class="text-right">{{supname}}</span>
        </div>
      </div>
      <div class="position-footer"></div>
    </div>
    <!-- 2.选中队员 -->
    <div @click="gotoPickingPage(4)" class="line-up-position clearfix sup-position data-bg" v-else>
      <div class="position-header clearfix clear-margin">
        <div class="left">
          <img :src="getSup.players_header_url" alt="">
        </div>
        <div class="right">
          <div class="player-data clearfix">
            KDA:
            <span>{{ getSup.players_kda }}</span>
          </div>
          <div class="player-data clearfix">
            STP:
            <span>{{ getSup.players_fppg }}</span>
          </div>
          <div class="player-data clearfix">
            参团率:
            <span>{{ getSup.players_kp }}</span>
          </div>
        </div>
      </div>
      <div class="position-body clearfix">
        <div class="left text-right">
          <span>
            <img :src="getSup.teams_img_url" alt="">
          </span>
          <span class="text-right text-name-w">{{ getSup.players_name }}</span>
        </div>
      </div>
      <div class="position-footer">
        <div class="left border-line">{{ getSup.players_position=='-'?'游走':getSup.players_position }}</div>
        <div class="clearfix right">
          薪水:
          <span class="right">{{ getSup.players_salary }}</span>
        </div>
      </div>
    </div>
    <!-- 替补位置 -->
    <!-- 未选中状态 -->
    <div @click="gotoPickingPage(5)" class="line-up-position clearfix flex-position" v-if="!isSelectBench">
      <div class="position-header clearfix">
        <div class="left">
          <img src="../../assets/lineUp/men_unchosen@2x.png" alt="">
        </div>
      </div>
      <div class="position-body ">
        <div class="left text-right">
          <span>
            <img src="../../assets/lineUp/plus@2x.png" alt="">
          </span>
          <span class="text-right">选择替补</span>
        </div>
      </div>
      <div class="position-footer"></div>
    </div>
    <!-- 2.选中队员 -->
    <div @click="gotoPickingPage(5)" class="line-up-position clearfix flex-position data-bg" v-else>
      <div class="position-header clearfix clear-margin">
        <div class="left">
          <img :src="getBench.players_header_url" alt="">
        </div>
        <div class="right">
          <div class="player-data clearfix">
            KDA:
            <span>{{ getBench.players_kda }}</span>
          </div>
          <div class="player-data clearfix">
            STP:
            <span>{{ getBench.players_fppg }}</span>
          </div>
          <div class="player-data clearfix">
            参团率:
            <span>{{ getBench.players_kp }}</span>
          </div>
        </div>
      </div>
      <div class="position-body clearfix">
        <div class="left text-right">
          <span>
            <img :src="getBench.teams_img_url" alt="">
          </span>
          <span class="text-right text-name-w">{{ getBench.players_name }}</span>
        </div>
      </div>
      <div class="position-footer clearfix">
        <div class="left border-line">替补</div>
        <div class="clearfix right">
          薪水:
          <span class="right">{{ getBench.players_salary }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStore, getStore, removeStore } from '../../handle/utils.js'
import { getAuth } from '../../handle/auth.js'
import * as API from '../../server/api.js'
import { mapGetters } from 'vuex'
import {getGameType } from '@/handle/auth'


export default {
  name: 'game-map',
  props: {
    isEmpty: {
      type: Boolean,
      default() { return false }
    }
  },
  data() {
    return {
      top_selected: false,    //是否选上单
      middle_selected: false, //是否选中单
      jun_selected: false,    //是否选打野
      adc_selected: false,    //是否选adc
      sup_selected: false,    //是否选辅助
      bench_selected: false,    //是否选替补
      my_contest_id: 0,       //是否有my_contest_id,
      seeinfrontGameType:''
    }
  },
  beforeMount() {
    this.seeinfrontGameType=getGameType()||'1'
    this.updateData()
  },
  watch:{
    getTop(newval){
      this.updateData()
    },
    getMid(newval){
      this.updateData()
    },
    getJug(newval){
      this.updateData()
    },
    getAdc(newval){
      this.updateData()
    },
    getSup(newval){
      this.updateData()
    },
    getBench(newval){
      this.updateData()
    },
  },
  computed: {
    ...mapGetters(['getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench']),
    isSelectTop() {
      if (this.isEmpty) {
        return false;
      } else if (this.top_selected) {
        return true;
      }
    },
    isSelectMid() {
      if (this.isEmpty) {
        return false;
      } else if (this.middle_selected) {
        return true;
      }
    },
    isSelectJug() {
      if (this.isEmpty) {
        return false;
      } else if (this.jun_selected) {
        return true;
      }
    },
    isSelectADC() {
      if (this.isEmpty) {
        return false;
      } else if (this.adc_selected) {
        return true;
      }
    },
    isSelectSup() {
      if (this.isEmpty) {
        return false;
      } else if (this.sup_selected) {
        return true;
      }
    },
    isSelectBench() {
      if (this.isEmpty) {
        return false;
      } else if (this.bench_selected) {
        return true;
      }
    },
    topname(){
      return this.seeinfrontGameType=='2'?'选择边路':'选择上单'
    },
    adcname(){
      return this.seeinfrontGameType=='2'?'选择边路':'选择ADC'
    },
    supname(){
      return this.seeinfrontGameType=='2'?'选择游走':'选择辅助'
    }
  },
  methods: {
    gotoPickingPage(index) {
      //gameId 1 lol 2王者荣耀
      let gameId=this.seeinfrontGameType=='1'?1:2
      //type==1 表示从我的竞猜过来修改的
      if (this.$route.params.type == "1") {
        if(gameId=='1'){
        this.$router.push({ name: 'picking', params: { type: this.$route.params.type, contestId: this.$route.params.contestId, position: index, my_contest_id: this.$route.params.my_contest_id } })
        }
        else{
        this.$router.push({ name: 'pickking', params: { type: this.$route.params.type, contestId: this.$route.params.contestId, position: index, my_contest_id: this.$route.params.my_contest_id } })
        }
      } else {
        if(gameId=='1'){
        this.$router.push({ name: 'picking', params: { contestId: this.$route.params.contestId, position: index } })
        }else{
        this.$router.push({ name: 'pickking', params: { contestId: this.$route.params.contestId, position: index } })
        }
      }
    },
    updateData() {
      if (this.getTop.players_name || this.getTop.teams_name) {
        this.top_selected = true;
      }
      if (this.getMid.players_name || this.getMid.teams_name) {
        this.middle_selected = true;
      }
      if (this.getJug.players_name || this.getJug.teams_name) {
        this.jun_selected = true;
      }
      if (this.getAdc.players_name || this.getAdc.teams_name) {
        this.adc_selected = true;
      }
      if (this.getSup.players_name || this.getSup.teams_name) {
        this.sup_selected = true;
      }
      if (this.getBench.players_name || this.getBench.teams_name) {
        this.bench_selected = true;
      }
    }
  }
}
</script>

<style src="../../css/commponent/map.css">

</style>
