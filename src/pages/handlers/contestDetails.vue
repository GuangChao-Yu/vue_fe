<template>
  <div>
    <game-nav :starindex="starindex"></game-nav>
    <!-- body -->
    <div class="contest-details-body">
      <!-- 比赛信息 header-->
      <div class="contest-card-header clearfix clear-padding">
        <div class="left title-info clearfix">
          <img :src="contestsImage" alt="">
          <strong class="contest-details">
            <span>{{ contestTitle }}</span>
          </strong>
        </div>
        <div class="right time-info clearfix">
          <span class="bonus-title">总奖金:</span>
          <strong class="contest-details">
            <img src="../../assets/home/jinbi@2x.png" alt="">
            <span>{{ rewardsFee }}</span>
          </strong>
        </div>
      </div>
  
      <!-- 比赛信息 body-->
      <div class="contest-details-content">
        <div class="content-time text-center">
          <p class="time-title">距离截止时间</p>
          <div class="lazy-loading">
              <p class="time-info">
                <count-down v-if="endTime" v-bind:endTime="endTime" ></count-down>
              </p>
          </div>
  
        </div>
  
        <div class="content-info flex-box text-center">
          <div class="flex-item">
            <div class="item-title">开始时间</div>
            <div class="item-info">{{fromatTime(tickStartTime,2)}}</div>
          </div>
          <div class="flex-item">
            <div class="item-title">门票</div>
  
            <div class="item-info item-ticket item-ticket-fee" v-if="ticksFee">
              <strong class="contest-details">
                <img class="detail-dj-img" src="../../assets/home/jinbi@2x.png" alt="">
                <span>{{ ticksFee }}</span>
              </strong>
              <span>或</span>
              <strong class="contest-details">
                <img class="detail-dj-img" src="../../assets/home/dianquan@2x.png" alt="">
                <span>{{ ticksFeePoint }}</span>
              </strong>
            </div>
            <div class="item-info item-ticket" v-else>
              <div>免费</div>
            </div>
  
          </div>
          <div class="flex-item">
            <div class="item-title">参与人数</div>
            <div class="item-info">
              <span class="current-number">{{ presNum }}</span>
              <span class="total-number">{{ fullsNum }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- tab 切换选项卡 -->
      <div>
        <div class="flex-box tab text-center">
          <div class="flex-item tab-item" v-for="(item,index) in tabName" @click="toggleTab(item,index)" :class="item == name ? 'tab-active':'' ">{{ item }}</div>
        </div>
  
        <!-- 奖金 -->
        <div class="tab-content" v-show="index === 0">
          <div v-for="item in priceList" class="tab-content-item">
            <div class="left">
              第{{ item.rank }}名
            </div>
            <div class="right">
              <span class="contest-details">
                <img class="detail-dj-img" src="../../assets/home/jinbi@2x.png" alt="">
                <strong>{{ item.price}}</strong>
              </span>
            </div>
          </div>
        </div>
  
        <!-- 对战列表 -->
        <div class="tab-content" v-show="index === 1">
          <div v-for="item in gamesList" class="tab-content-item-noBorder">
            <div class="flex-box vs-list">
              <div class="flex-item">
                <div class="vs-img-wrap">
                  <img :src="item.ATeam" alt="">
                </div>
                <div class="vs-team-name">{{ item.aName }}</div>
              </div>
              <div class="flex-item text-center flex-item-text-center">
                <div class="vs">VS</div>
                <div class="">{{fromatTime(item.startTime)}}</div>
              </div>
              <div class="flex-item text-right clearfix">
                <div class="vs-img-wrap right">
                  <img :src="item.BTeam" alt="">
                </div>
                <div class="clearfix"></div>
                <div class="vs-team-name right">{{ item.bName }}</div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 参赛人数 -->
        <div class="tab-content join-user-list" v-show="index === 2">
          <div v-for="item in userList" class="tab-content-item">
            <div class="left ">
              <div class="user-header-url left">
                <img :src="item.head_url" alt="">
              </div>
              <span class="user-name">
                {{ item.username }}
              </span>
            </div>
            <div class="right">
              <div class="rank-img-url">
                <img :src="item.egment" alt="">
              </div>
            </div>
          </div>
        </div>
  
        <!-- 赛事 -->
        <div class="tab-content" v-show="index === 3">
          <div class="tab-content-item">
            <div class="left">总奖金:</div>
            <div class="right">
              <span class="contest-details">
                <img class="detail-dj-img" src="../../assets/home/jinbi@2x.png" alt="">
                <strong>{{ rewardsFee }}</strong>
              </span>
            </div>
          </div>
          <div class="tab-content-item">
            <div class="left">门票:</div>
            <div class="right">
              <div class="item-info item-ticket item-ticket-fee" v-if="ticksFee">
                <strong class="contest-details">
                  <img class="detail-dj-img" src="../../assets/home/jinbi@2x.png" alt="">
                  <span>{{ ticksFee }}</span>
                </strong>
                <span>或</span>
                <strong class="contest-details">
                  <img class="detail-dj-img" src="../../assets/home/dianquan@2x.png" alt="">
                  <span>{{ ticksFeePoint }}</span>
                </strong>
              </div>
              <div class="item-info item-ticket" v-else>
                <div>免费</div>
              </div>
            </div>
          </div>
          <div class="tab-content-item">
            <div class="left">人数:</div>
            <div class="right">
              <span class="current-number">{{ presNum }}</span>
              <span class="total-number">{{ fullsNum }}</span>
            </div>
          </div>
          <div class="tab-content-item">
            <div class="left">进入最大次数:</div>
            <div class="right">{{ maxEntrys }}</div>
          </div>
          <div class="tab-content-item">
            <div class="left">时间:</div>
            <div class="right">{{ fromatTime(endTime) }}</div>
          </div>
        </div>
  
      </div>
  
    </div>
  
  </div>
</template>

<script>
import * as api from '../../server/api.js'
import countDown from '../../components/common/countdown.vue'
import gameNav from '../../components/seeinfront/gamenav'


export default {
  name: "contestDetails",
  data() {
    return {
      index: 0,
      tabName: ["奖金", "对战列表", "参赛人数",],
      name: "奖金",
      contestTitle: '',
      contestsImage: '',
      rewardsFee: 0,
      endTime: 0,
      presNum: '',
      fullsNum: '',
      priceList: [],
      gamesList: [],
      userList: [],
      ticksFee: 0,
      ticksFeePoint: 0,
      maxEntrys: 0,
      tickStartTime: 0,
      starindex: "1"
    }
  },
  components: {
    [countDown.name]: countDown,
    [gameNav.name]: gameNav
  },
  created() {
    let vm = this;
    //获取赛事详情数据
    let contestId = this.$route.params.contestId;
    api.getContestDetails({ contestId: contestId }).then(function (resp) {
      let result = resp.data.result;
      //对战列表
      let vsObj = {};
      vm.contestsImage = result.allocations_image;
      vm.contestTitle = result.contests_title;
      vm.rewardsFee = result.rewards_fee;
      vm.endTime = result.end_time;
      vm.tickStartTime = result.end_time;
      vm.presNum = result.pres_num;
      vm.fullsNum = result.fulls_num;
      vm.priceList = result.price_list;
      vm.tabName.push(result.allocations_type);
      vm.ticksFee = result.ticks_fee;
      vm.ticksFeePoint = result.ticks_fee_point;

      result.games.forEach(function (item, index) {
        vsObj.startTime = item.start;
        vsObj.maxNum = item.maxnum;
        vsObj.ATeam = item.teamurls[0];
        vsObj.BTeam = item.teamurls[1];

        let aTeam = item.teamurls[0];
        let bTeam = item.teamurls[1]

        vsObj.aName = aTeam.substring(aTeam.lastIndexOf('/') + 1, aTeam.lastIndexOf('.'));
        vsObj.bName = bTeam.substring(bTeam.lastIndexOf('/') + 1, bTeam.lastIndexOf('.'));
        vm.gamesList.push(vsObj);
        vsObj = {};
      });

      vm.maxEntrys = result.max_entrys;
    });

    //参加赛事用户列表
    api.userListForContestDetails({ contestId: contestId }).then(function (resp) {
      let result = resp.data.result;
      vm.userList = result.list
    })

  },
  methods: {
    toggleTab(name, index) {
      this.name = name;
      this.index = index;
    },
    fromatTime(time, type) {
      let date = new Date(time * 1000);
      let Y = date.getFullYear() + '/';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)+'/';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() > 9 ? date.getMinutes() + ':' : date.getMinutes() + '0';
      let s = date.getSeconds();
      if (type == 2) {
        return M + D + h + m;
      } else {
        return Y + M + D + h + m;
      }
    }
  }
}
</script>

<style src='../../css/pages/handlers/contestDetails.css'></style>

