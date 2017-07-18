<template>
  <div>
    <!-- header nav -->
    <div class="header-nav flex-box">
      <div class="go-back" @click="goBack">
        <img src="../../assets/lineUp/back@2x.png" alt="">
      </div>
      <div class="flex-item">绑定手机</div>
    </div>
    <!-- logo -->
    <div class="logo-banner">
      <img src="../../assets/login/loginemail_logo@2x.png" alt="">
    </div>
    <!-- form -->
    <div class="login-body">
      <div class="div-input">
        <input type="text" v-model="loginName" placeholder="手机／邮箱">
      </div>
      <div class="div-input">
        <input type="password" v-model="loginPsw" placeholder="密码">
      </div>
      <div class="div-btn">
        <button @click="handleBind()">绑定</button>
      </div>
      <div class="div-link flex-box">
        <div class="flex-item-a">
          <template>
            <a @click="handleNewUser()">我是新用户</a>
          </template>
        </div>
      </div>
    </div>
    <dialog-tips :tips="tips" :showTips="showTips"></dialog-tips>
  </div>
</template>

<script>
import { saveAuth, getAuth } from '@/handle/auth'
import * as api from '../../server/api.js'
import dialogTips from '../../components/common/dialogtips'

export default {
  data() {
    return {
      loginName: '',
      loginPsw: '',
      key: '',
      //dialogtips props
      tips: '',
      showTips: false,
    }
  },
  mounted() {
    this.key = this.$route.params.key;
  },
  methods: {
    handleBind() {
      api.wechatRegister({
        key: this.key,
        type: 2,
        login: this.loginName,
        password: this.loginPsw
      }).then((res) => {
        if (res.data.token) {
          let auth = {
            uid: res.data.customer_id,
            token: res.data.token
          }
          saveAuth(auth);
          this.tips = "绑定成功!"
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false;
            this.$router.push({ name: 'index' })
          }, 1500)
        } else {
          this.tips = "绑定失败，请重试!"
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false;
          }, 3000)
        }
      })
    },
    handleNewUser() {
      api.wechatRegister({
        key: this.key,
        type: 1
      }).then((res) => {
        if (res.data.token) {
          let auth = {
            uid: res.data.customer_id,
            token: res.data.token
          }
          saveAuth(auth);
          this.tips = "新用户注册成功!"
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false;
            this.$router.push({ name: 'index' })
          }, 1500)
        } else {
          this.tips = "注册失败,请稍后再试!"
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false;
          }, 3000)
        }
      })
    },
    goBack() {
      this.$router.push({ name: 'index' })
    }
  },
  components: {
    [dialogTips.name]: dialogTips,
  }
}
</script>
<style src='../../css/pages/binding/bindingMobile.css'></style>
