<template>
  <div class="contest-card-wrap clearfix">
  
    <!-- header 比赛信息-->
    <div class="contest-card-header clearfix">
      <div class="left title-info clearfix">
        <img :src="item.contest_info.allocations_image" alt="">
        <strong>
          <span class="com-com-text text-nowrap">{{item.contest_info.contest_title}}</span>
          <img src="../../assets/home/question@2x.png" alt="" class="contest_info_icon" style="display:none">
        </strong>
      </div>
      <div class="right time-info clearfix time-fix">
        <img src="../../assets/home/time@2x.png" alt="" v-if="cutType!=2" />
        <img src="../../assets/myContest/mygame_time.png" v-else />
        <count-down v-bind:endTime="item.contest_info.end_time" v-if="cutType!=2"></count-down>
        <span v-else>{{getTime(item.contest_info.end_time)}}</span>
      </div>
    </div>
  
    <!-- body -->
    <div class="contest-card-body clearfix">
      <div class="body-info-item clearfix">
        <div class="left item-title-info" v-if="cutType!=2">
          <span>{{item.contest_info.league_name}}</span>
        </div>
        <div class="left item-title-info" v-else>
          <span>{{item.contest_info.league_name}}</span>
          <div class="over-item">
            <img src="../../assets/myContest/mygame_win.png" v-if="item.result_status==1" class="mygame-icon" />
            <img src="../../assets/myContest/mygame_lose.png" class="mygame-icon" v-else />

            <span class="over-item-txt" v-text="item.result_status==1?'胜利':''"></span>
            <span v-if="item.result_status==1" class="over-item-txt2">{{item.result_info.rank}}/{{item.contest_info.pre_num}}</span>
            <span v-else class="over-item-txt2-fu">失败{{item.result_info.rank}}/{{item.contest_info.pre_num}}</span>

            <span class="over-item-point">分数:{{item.result_info.point}}</span>
          </div>
        </div>
        <div class="right item-count-info" v-if="cutType!=2">
          <img class="list-jd-img" src="../../assets/home/renshu@2x.png" alt="">
          <span class="current-number">{{item.contest_info.pre_num}}</span>
          <span class="total-number">{{item.contest_info.full_num}}</span>
        </div>
      </div>
      <div class="body-info-item clearfix">
        <div class="game-intro left" v-show="item.contest_info.fulls_type">保证运行</div>
        <div class="game-intro left" v-show="item.contest_info.mutis_entry">多次加入</div>
      </div>
  
      <div class="body-info-item clearfix">
        <div class="ticket-info left">
          <div v-if="item.contest_info.tick_fee">
            <img class="list-jd-img" src="../../assets/home/tickets@2x.png" alt="">
            <div class="ticket-info-left" v-if="item.tick_type==2">
              <strong>
                <img class="list-jd-img" src="../../assets/home/jinbi@2x.png" alt="">
                <span>{{ item.contest_info.tick_fee }}</span>
              </strong>
            </div>
            <div class="ticket-info-left" v-else>
              <strong>
                <img class="list-jd-img" src="../../assets/home/dianquan@2x.png" alt="">
                <span>{{ item.contest_info.tick_fee_point }}</span>
              </strong>
            </div>
  
          </div>
          <div v-else>
            <img class="list-jd-img" src="../../assets/home/tickets@2x.png" alt="">
            <span class="free-contest-text">免费</span>
          </div>
        </div>

        <div  v-if="myId==1" class="bonus-info right">
          <span class="bonus-title">获得奖金:</span>                    
          <strong>
            <img class="list-jd-img" src="../../assets/home/jinbi@2x.png" alt="">
            <span>{{ item.result_info.rewordfee }}</span>
          </strong>
        </div>
        <div v-else class="bonus-info right">
          <span  class="bonus-title">总奖金:</span>       
          <strong>
            <img class="list-jd-img" src="../../assets/home/jinbi@2x.png" alt="">
            <span>{{ item.contest_info.reward_fee }}</span>
            
          </strong>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import countDown from '../../components/common/countdown.vue'
export default {
  name: 'my-concard',
  props: {
    item: {
      type: Object,
      default() {
        return []
      }
    },
    cutType: {
      type: String,
      default() {
        return '0'
      }
    },
    myId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {}
  },
  components: {
    [countDown.name]: countDown,
  },
  methods: {
    getTime(time) {
      time=time+'000'
      let date = new Date(parseInt(time));
      let Mou = date.getMonth()+1;
      let Day = date.getDate();
      return Mou + '/' + Day;
    }
  },
  filters: {
    badgeFilter(value) {
      if (value === "G" || value === "M") {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style src="../../css/commponent/myconcard.css">

</style>
