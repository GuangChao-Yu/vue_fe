<template>
  <div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png">
      </span>
      猜输赢
      <span class="guess-right">
        <i class="topbar-balance-num guess-balance-num">{{getUserInfo.balance||0}}</i>
        <i class="topbar-gold-icon guess-gold-icon"></i>
        <span class="guess-record-link" @click="goRecord">
        </span>
      </span>
    </div>
    <match-scroll :data="data" @srcollIndex="srcollIndex" @sendleagueId="sendleagueId"></match-scroll>
    <div class="consultation-item" v-for="(item,index) in data" :key="index" v-show="activeIndex==index">
      <div class="consultation-banner">
        <img v-if="item.league_banners.length" :src="item.league_banners[0].banner_url">
      </div>
    </div>
    <div v-if="guessData.length">
      <loading v-show="isShowLoading"></loading>
      <guess-card v-for="(item,index) in guessData" :key="index" :guessObj="item" :titleName="titleName" @touchGuess="touchGuess"></guess-card>
    </div>
    <div class="nodata" v-else>
      <loading v-show="isShowLoading"></loading>
      {{nodata}}
    </div>
    <bett-dialog @closeBattdialig="closeBattdialig" v-if="isShowDailo" :dialogData="dialogData" @bettingResult="bettingResult"></bett-dialog>
    <dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
    </dialog-default>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getGameType } from '@/handle/auth'
import matchScroll from '../../components/seeinfront/matchscroll'
import * as api from '../../server/api.js'
import guessCard from '../../components/seeinfront/guesscard'
import bettDialog from '../../components/seeinfront/bettdialog'
import dialog from '../../components/common/dialog'
import loading from '../../components/common/loading'


export default {
  data() {
    return {
      data: [],
      activeIndex: 0,
      matchId: 0,
      guessData: [],
      titleName: '',
      bettingId: 0,
      gameId: 0,
      isShowDailo: false,
      dialogData: {},
      //dialog props
      title: '',
      dtitle: '',
      isShowDialogFeault: false,
      isShowBtn: true,
      nodata: '',
      isShowLoading: false,
      seeinfrontGameType:''
    }
  },
  created(){
     this.seeinfrontGameType=getGameType()||'1'
  },
  beforeMount() {
    this.isShowLoading = true;
    let gameId=this.seeinfrontGameType=='1'?1:2
    api.getMatchList({ game_type_id: gameId }).then((res) => {
      this.data = res.data.result.data.data;
    })
  },
  watch: {
    matchId: function (val, old) {
      this.isShowLoading = true
      this.guessData = []
      this.nodata = ''
      if (val != 0) {
        api.getGuessListForId({ league_id: this.matchId }).then((res) => {
          if (res.data.status === 0) {
            this.guessData = res.data.result.data.data;
            this.isShowLoading = false
            this.nodata = "暂无信息";
          } else {
            this.isShowLoading = false
            this.nodata = res.data.error;
          }
        })
        setTimeout(() => { this.titleName = this.data[this.activeIndex].league_name }, 50)
      }
    }
  },
  methods: {
    goback() {
      this.$router.push({ name: 'index' })
    },
    goRecord() {
      this.$router.push({ name: 'guessRecord' })
    },
    srcollIndex(info) {
      this.activeIndex = info.index;
      this.matchId = info.id
    },
    sendleagueId(index) {
      this.matchId = index;
    },
    touchGuess(info) {
      this.dialogData = info;
      this.isShowDailo = true
    },
    closeBattdialig(data) {
      this.isShowDailo = data
    },
    hidedialog(data) {
      this.isShowDialogFeault = data;
    },
    bettingResult(info) {
      //info.type==-1 失败 info.type==0下注成功
      this.title = info.msg;
      this.isShowDialogFeault = true;
      setTimeout(() => {
        this.isShowDailo = false;
      }, 50)
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  components: {
    [matchScroll.name]: matchScroll,
    [guessCard.name]: guessCard,
    [bettDialog.name]: bettDialog,
    [dialog.name]: dialog,
    [loading.name]: loading
  }
}
</script>

<style scoped>
.guess-right {
  width: 300px;
  height: 88px;
  /*px*/
  position: absolute;
  top: 0;
  right: 0;
}

.guess-record-link {
  display: inline-block;
  width: 50px;
  height: 50px;
  /*px*/
  background: url('../../assets/consultation/lishijilu@2x.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 16px;
  top: 50%;
  margin-top: -25px;
  /*px*/
}

.guess-gold-icon {
  float: right;
  margin-right: 10px;
  margin-top: 26px;
  /*px*/
}

.guess-balance-num {
  float: right;
  margin-right: 80px;
}

.nodata {
  font-size: 36px;
  color: #607d8b;
  text-align: center;
}
</style>
