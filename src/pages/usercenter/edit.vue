<template>
  <div>
    <div v-title>无限电竞</div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png" />
      </span>
      编辑个人中心
      <span class="weChat-save-btn" @click="saveUserInfo">保存</span>
    </div>
    <router-link :to="{ name : 'changehead' }" class="user-head edit-item">
      <span class="edit-txt user-head-txt">头像</span>
      <span class="edit-img">
        <img :src="getUserInfo.head_img_url" />
      </span>
      <span class="edit-icon">></span>
    </router-link>
  
    <div class="edit-item-defult">
      <span class="edit-txt">用户昵称</span>
      <span class="edit-txt">{{getUserInfo.user_name}}</span>
    </div>
    <div class="edit-item-defult">
      <span class="edit-txt">邮箱地址</span>
      <span class="edit-txt">{{fromatString(getUserInfo.login_name)}}</span>
    </div>
    <div class="edit-item-defult">
      <span class="edit-txt">手机号</span>
      <span class="edit-txt">{{fromatString(getUserInfo.login_phone)}}</span>
    </div>
  
    <div class="edit-item-defult can-be-update">
      <span class="edit-txt">真实姓名</span>
      <input type="text" class="edit-input-style" :value="username" maxlength="5" v-model="username" />
      <span class="edit-icon">></span>
    </div>
    <div class="edit-item-defult edit-date">
      <span class="edit-txt">生日</span>
      <span class="edit-icon">></span>
      <input type="date" :value="birthday" v-model="birthday" class="edit-date-pick" />
    </div>
    <dialog-tips :tips="tips" :showTips="showTips"></dialog-tips>
  </div>
</template>

<script>
import {
  saveAuth,
  getAuth,
  delAuth
} from '@/handle/auth'
import { timeStamp, formatDate } from '../../handle/utils.js'
import router from '../../router/index.js'
import * as api from '../../server/api.js'
import _ from 'lodash'
import dialogTips from '../../components/common/dialogtips'
import { mapGetters } from 'vuex'

export default {
  name: 'edit',
  data() {
    return {
      uid: 0,
      token: '',
      birthday: '',
      username: '',
      apiBirthady: 0,
      //dialogtips props
      tips: '',
      showTips: false,
    }
  },
  created: function () {
    let auth = getAuth();
    if (auth) {
      this.uid = auth.uid;
      this.token = auth.token;
      this.username = this.getUserInfo.full_name;
      this.birthday = this.getUserInfo.birthday.substring(0, 10);
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  components: {
    [dialogTips.name]: dialogTips,
  },
  methods: {
    goback() {
      //window.history.go(-1);
      router.push({ name: 'usercenter' })
    },
    saveUserInfo() {
      if (!this.birthday) {
        console.log('您还没填写生日');
        return
      }
      this.apiBirthady = this.formatUnix(this.birthday);
      api.editUserInfo({
        uid: this.uid,
        token: this.token,
        full_name: this.username,
        birthday: this.apiBirthady
      }).then((res) => {
        if (res.data.status == 0) {
          //更新vuex中数据
          let query = {
            uid: this.uid,
            token: this.token
          }
          this.$store.dispatch('setUserInfo', query);
          this.tips = "保存成功!"
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false;
            router.push({ name: 'usercenter' })
          }, 1500)
        } else {
          this.tips = "保存失败，请稍后再试!"
          this.showTips = true;
          setTimeout(() => {
            this.showTips = false
          }, 1500)
        }
      })
    },
    formatTime(time) {
      if (time == undefined || time == null) {
        let datetime = new Date();
      } else {
        let datetime = new Date(time);
      }
      let datetime = new Date(time);
      let year = datetime.getFullYear();
      let month = (datetime.getMonth() + 1 < 10) ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
      let hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours();
      let min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes();
      let sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
      return year + '-' + month + '-' + day;
    },
    fromatString(str) {
      if (str == '') {
        return '暂无';
      } else
        return str;
    },
    formatUnix(str) {
      str.replace(/-/g, "/");
      let date = new Date(str);
      let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
      return humanDate.getTime() / 1000 - 8 * 60 * 60;
    },
  }
}

</script>

<style src="../../css/pages/usercenter/edit.css"></style>