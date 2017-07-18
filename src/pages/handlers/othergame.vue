<template>
  <div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="gotoMyGuess">
      </span>其他竞赛
      <span class="weChat-save-btn" @click="gotoMyGuess()">跳过</span>
    </div>
    <div class="other-game-title-warp">
      <p class="other-game-title">以此阵容参加其他竞赛</p>
      <div class="other-game-player">
        <lazy-render :time="20">
          <team-member :todos="temaImgData"></team-member>
        </lazy-render>
      </div>
    </div>
    <div class="handlers-scree-warp other-game-scree">
      <div class="handlers-scree-item">筛选
        <i class="handlers-scree-icon"></i>
      </div>
      <div class="handlers-scree-item">排序
        <i class="handlers-scree-icon"></i>
      </div>
    </div>
    <div class="other-game-scroll-warp">
      <div class="handlers-no-data" v-if="!noDataShow">{{noData}}</div>
      <div class="handlers-no-data" v-else-if="allContest.length==0">没有比赛</div>
      <template v-for="item in allContest" v-else>
        <span class="other-game-item" @click="othergameClick(item)">
          <con-card2 :item="item"></con-card2>
        </span>
      </template>
    </div>
    <dialog-tips :tips="tips" :showTips="showTips"></dialog-tips>
    <dialog-confirm :isShowConfirm="isShowConfirm" :ticket="ticket" :ticketPoint="ticketPoint" v-on:sendType="sendType" v-on:hideConfrim="hideConfrim"></dialog-confirm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import concard2 from '../../components/seeinfront/concard2'
import * as api from '../../server/api.js'
import { getAuth } from '../../handle/auth.js'
import dialogTips from '../../components/common/dialogtips'
import teamMember from '../../components/common/teamMember'
import dialogConfirm from '../../components/common/dialogconfirm'
import _ from 'lodash'

export default {
  name: 'othergame',
  data() {
    return {
      // 所有比赛数据
      allContest: [],
      noData: '正在努力加载中..请稍后..',
      noDataShow: false,
      ticket: 0, // 比赛入盘金币费用
      ticketPoint: 0, // 比赛入盘点券费用,
      //dialogtips props
      tips: '',
      showTips: false,
      temaImgData: {},
      vtsId: 0,
      //confirmdialog props
      isShowConfirm: false,
      contests_id:0,
    }
  },
  beforeMount() {
    this.vtsId = this.$route.params.vsid;
    let auth = getAuth();
    this.$nextTick(() => {
      api.fastContestList({
        virtual_id: this.vtsId,
        token: auth.token
      }).then((res) => {
        this.allContest = res.data.result.contests_list
        this.noDataShow = true
      })
    })
  },
  mounted() {
    this.temaImgData.team = this.getTeam;
    this.temaImgData.players = [];
    this.temaImgData.players.push(this.getTop);
    this.temaImgData.players.push(this.getJug);
    this.temaImgData.players.push(this.getMid);
    this.temaImgData.players.push(this.getAdc);
    this.temaImgData.players.push(this.getSup);
    this.temaImgData.players.push(this.getBench);
  },
  methods: {
    gotoMyGuess() {
      //清空阵容，调到我的竞猜列表
      this.$store.dispatch('setTop', {});
      this.$store.dispatch('setMid', {});
      this.$store.dispatch('setJug', {});
      this.$store.dispatch('setAdc', {});
      this.$store.dispatch('setSup', {});
      this.$store.dispatch('setBench', {});
      this.$store.dispatch('setTeam', {});
      this.$router.push({ name: 'myguess' });
    },
    othergameClick(item) {
      this.ticket = item.ticks_fee;
      this.ticketPoint = item.ticks_fee_point;
      this.contests_id=item.contest_id;
      this.isShowConfirm=true;
    },
    hideConfrim(data) {
      this.isShowConfirm = data;
    },
    sendType(type) {
      let auth = getAuth();
      api.fastJoinContest({
        token:auth.token,
        uid: auth.uid,
        tick_type: type == 1 ? 2 : 1, //这里反了 服务段是1点券 2金币 这里写的是1金币2点券 所以偷懒处理
        contests_id: this.contests_id,
        vts_id: this.vtsId
      }).then((res) => {
        if (res.data.status == 0) {
          this.isShowConfirm=false
          this.tips = "成功入盘!",
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false
          }, 1500)
          //加入快速入盘后，去除已经点击过得盘口显示
          this.allContest=_.filter(this.allContest,(o)=>{
            return o.contest_id!=this.contests_id
          })
        } else {
          this.tips = res.data.message
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false
          }, 2000)
        }
      })
    },
    getextraSalary() {
      let salary = 50000;
      let money = this.getTop.players_salary +
        this.getJug.players_salary +
        this.getMid.players_salary +
        this.getAdc.players_salary +
        this.getSup.players_salary +
        this.getBench.players_salary +
        this.getTeam.teams_salary;
      return salary - money;
    }
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench', 'getTeam']),
  },
  components: {
    [concard2.name]: concard2,
    [dialogTips.name]: dialogTips,
    [teamMember.name]: teamMember,
    [dialogConfirm.name]: dialogConfirm
  }
}
</script>

<style src="../../css/pages/handlers/othergame.css">

</style>
