<template>
<div class="topbar-warp">
  <div class="topbar-item" v-if="isindex==0">
    <router-link class="topbar-logo" :to="{name:'usercenter'}" v-if="isLogin">
      <img :src="getUserInfo.head_img_url"></img>
    </router-link>
    <span class="topbar-logo" v-else @click='handleLoginClick()'></span>
    <span class="topbar-username" v-if="isLogin">{{getUserInfo.user_name}}</span>
  </div>
  <div v-else class="topbar-item">
    <router-link :to="{name:'index'}" class="topbar-go-back">
      <img src="../../assets/lineUp/back@2x.png">
    </router-link>
  </div>
  <div class="topbar-item topbar-item-right">
    <span class="topbar-balance-item">
        <i class="topbar-gold-icon"></i>
        <i class="topbar-balance-num">{{getUserInfo.balance||0}}</i>
      </span>
    <span class="topbar-balance-item">
        <i class="topbar-coupons-icon"></i>
        <i class="topbar-balance-num">{{getUserInfo.pending||0}}</i>
      </span>
    <span v-if="isindex==1" class="topbar-money-icon" @click="showDefaultDialog()"></span>
    <router-link v-if="isindex==0" :to="{name:'letter'}" class="topbar-letter-icon">
      <i class="new-letter" v-show="isNewLetter"></i>
    </router-link>
    <span class="topbar-letter-icon" v-if="isindex==0" @click="changeGame"></span>
  </div>
  <dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
  </dialog-default>
</div>
</template>

<script>
import dialog from '../../components/common/dialog.vue'
import {
  saveAuth,
  getAuth,
  saveGameType,
  getGameType,
  delGameType
} from '../../handle/auth.js'
import * as api from '../../server/api.js'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'top-bar',
  props: {
    isindex: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  components: {
    [dialog.name]: dialog,
  },
  data() {
    return {
      isLogin: false,
      title: '手机版暂未开放，请前往官网充值',
      dtitle: '',
      isShowDialogFeault: false,
      isShowBtn: false,
      userobj: {},
      isNewLetter: false
    }
  },
  beforeMount() {
    if (this.getUserInfo) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  mounted() {
    setTimeout(() => {
      let auth = getAuth();
      api.notifyUnreadNum({
        uid: auth.uid
      }).then((res) => {
        if (res.data.result.count > 0) {
          this.isNewLetter = true
        }
      })
    }, 1000)
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  methods: {
    changeGame() {
      let game=getGameType()
      if(game=='1'){
        this.$emit('changeGame','2')
      }else{
         this.$emit('changeGame','1')
      }
    },
    handleLoginClick() {
      console.log('微信版没有登录，登录信息获取失败,请报告程序员GG');
    },
    formatNum_(num) {
      let text = parseInt(num);
      if (text > 10000) {
        text = (text / 10000).toFixed(1) + '万';
      }
      return text;
    },
    hidedialog(data) {
      this.isShowDialogFeault = data;
    },
    showDefaultDialog() {
      this.isShowDialogFeault = true;
    }
  },
}
</script>

<style src="../../css/commponent/topbar.css">

</style>
