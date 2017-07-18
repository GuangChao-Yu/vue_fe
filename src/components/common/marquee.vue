<template>
  <div class="common-info">
    <div class="left-slide-animate">
      <span class="scroll-list" v-for="item in datalist">
        <img src="../../assets/index/home_laba@2x.png" alt="">
        <strong>{{item}}</strong>
      </span>
    </div>
  </div>
</template>
<script>
import {
  saveAuth,
  getAuth,
  delAuth
} from '@/handle/auth'
import router from '@/router'
import * as api from '../../server/api.js'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'marquee',
  data() {
    return {
      uid: 0,
      token: '',
      page: 1,
      page_size: 5,
      datalist: [],
    }
  },
  created: function () {
    this.timmer = setTimeout(() => {
      this.loading();
    }, 2 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalide);
    clearTimeout(this.timmer);
  },
  methods: {
    updatelist() {
      this.page = this.page + 1;
      api.getAffiche({
        page: this.page,
        token: this.token,
        page_size: this.page_size
      }).then((res) => {
        this.datalist = this.datalist.concat(res.data.result.announcements);
      })
    },
    loading() {
      let vm = this;
      let auth = getAuth();
      if (auth) {
        this.uid = auth.uid;
        this.token = auth.token;
        api.getAffiche({
          page: this.page,
          token: this.token,
          page_size: this.page_size
        }).then((res) => {
          this.datalist = res.data.result.announcements;
        })
      }
      this.intervalide = setInterval(function () {
        vm.updatelist();
      }, 10 * 1000)
    }
  }
}
</script>

<style src="../../css/commponent/marquee.css"></style>