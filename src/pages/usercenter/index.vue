<template>
  <div>
    <div v-title>无限电竞</div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
      <img src="../../assets/lineUp/back@2x.png" ></img>
      </span>
          个人中心
    </div>
    <router-link :to="{ name : 'edit' }" class="usercenter-header">
      <div class="usercenter-header-left">
        <span class="usercenter-user-img">
          <img :src="getUserInfo.head_img_url" ></img>
        </span>
      </div>
      <div class="usercenter-header-right">
        <div class="usercenter-header-list">
          <span class="usercent-name">{{getUserInfo.user_name}}</span>
          <i class="usercenter-grad-icon">
            <img :src="getUserInfo.egment" ></img>
          </i>
        </div>
        <div class="usercenter-header-list">
          <span class="usercenter-jinbi">
            <i></i>{{getUserInfo.balance}}</span>
          <span class="usercenter-dianquan">
            <i></i>{{getUserInfo.pending}}</span>
        </div>
      </div>
    </router-link>
    <router-link :to="{ name : 'rank' }" class="usercenter-link-item">
      <span class="usercenter-link-txt">天梯排行</span>
      <span class="usercetner-ink-icon">></span>
    </router-link>
    <router-link :to="{ name : 'exchangelist' }" class="usercenter-link-item">
      <span class="usercenter-link-txt">兑换记录</span>
      <span class="usercetner-ink-icon">></span>
    </router-link>
    <router-link :to="{ name : 'revenue' }" class="usercenter-link-item usercenter-link-item-frist">
      <span class="usercenter-link-txt">收支记录</span>
      <span class="usercetner-ink-icon">></span>
    </router-link>
    <router-link :to="{name:'faq'}" class="usercenter-link-item">
      <span class="usercenter-link-txt">常见问题</span>
      <span class="usercetner-ink-icon">></span>
    </router-link>
    <router-link :to="{name:'rule'}" class="usercenter-link-item">
      <span class="usercenter-link-txt">规则&评分</span>
      <span class="usercetner-ink-icon">></span>
    </router-link>
    <div class="usercenter-tuichu-btn" @click="userClear()">退出登录</div>
  </div>
</template>

<script>
import {
  saveAuth,
  getAuth,
  delAuth
} from '@/handle/auth'
import router from '../../router/index.js'
import * as api from '../../server/api.js'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'usercenter',
  data() {
    return {
      uid: 0,
      token: '',
      userDatalist: {}
    }
  },
  created: function () {
    let auth = getAuth();
    if (auth) {
      this.uid = auth.uid;
      this.token = auth.token;
    }
  },
  computed: {
      ...mapGetters(['getUserInfo'])
    },
  methods: {
    unLogin() {
      delAuth();
      router.push('index');
    },
    goback() {
      //window.history.go(-1);
      router.push('index');
    },
    userClear(){
      localStorage.removeItem('auth');
      router.push('index');
    }
  }
}

</script>
<style src="../../css/pages/usercenter/index.css">

</style>
