<template>
  <div class="contest-card-wrap clearfix">
    <!-- header 比赛信息-->
    <div class="contest-card-header clearfix">
      <div class="left title-info clearfix">
        <img :src="item.allocations_image" alt="">
        <strong>
          <span class="text-nowrap com-com-text">{{ item.contest_title }}</span>
          <img src="../../assets/home/question@2x.png" alt="" class="contest-card-header-icon" style="display:none">
        </strong>
      </div>
      <div class="right time-info clearfix time-fix">
        <img src="../../assets/home/time@2x.png" alt="">
        <count-down v-bind:endTime="item.end_time" ></count-down>
      </div>
    </div>

    <!-- body -->
    <div class="contest-card-body clearfix">
      <div class="body-info-item clearfix">
        <div class="left item-title-info">
          <span>{{ item.league_name }}</span>
        </div>
        <div class="right item-count-info">
          <img class="list-jd-img" src="../../assets/home/renshu@2x.png" alt="">
          <span class="current-number">{{ item.pre_num }}</span>
          <span class="total-number">{{ item.full_num }}</span>
        </div>
      </div>
      <div class="body-info-item clearfix">
        <div class="game-intro left" v-show="item.fulls_type">保证运行</div>
        <div class="game-intro left" v-show="item.mutis_entry">多次加入</div>
      </div>

      <div class="body-info-item clearfix">
        <div class="ticket-info left">
          <div v-if="item.tick_fee">
            <img class="list-jd-img"  src="../../assets/home/tickets@2x.png" alt="">
            <strong>
              <img class="list-jd-img" src="../../assets/home/jinbi@2x.png" alt="">
              <span>{{ item.tick_fee }}</span>
            </strong>
            <span>或</span>
            <strong>
              <img class="list-jd-img" src="../../assets/home/dianquan@2x.png" alt="">
              <span>{{ item.tick_fee_point }}</span>
            </strong>
          </div>
          <div v-else>
            <img class="list-jd-img" src="../../assets/home/tickets@2x.png" alt="">
            <span class="free-contest-text">免费</span>
          </div>
        </div>
        <div class="bonus-info right">
          <span class="bonus-title">总奖金:</span>
          <strong>
            <img class="list-jd-img" src="../../assets/home/jinbi@2x.png" alt="">
            <span>{{ item.reward_fee }}</span>
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {saveAuth,getAuth} from '../../handle/auth.js'
  import * as api from '../../server/api.js'
  import countDown from '../../components/common/countdown.vue'

  export default {
    name:'con-card2',
    props:{
      item:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return{
        cutDownClass:'concard-cut-down',
      }
    },
    components:{
      [countDown.name]:countDown,
    },
    methods:{},
    filters : {
      badgeFilter (value) {
        if (value === "G" || value === "M" ) {
          return true;
        }else {
          return false;
        }
      }
    }
  }
</script>

<style src="../../css/commponent/concard.css">
</style>
