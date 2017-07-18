<template>
  <div class="exchange-details">
    <!-- tab切换 -->
    <div class="tabs-list flex-box text-center">
      <div class="flex-item tabs-item" v-for="(item,index) in tabs" @click="toggleTab(item,index)" :class="activeTab == item ? 'active-bar':'' ">{{ item }}</div>
    </div>
  
    <!--英雄联盟列表详情-->
    <div class="page-list">
      <ul class="page-list-body" v-show="index===0">
        <li class="page-list-body-li" v-for='(item,index) in getProductList' @click="goDetails(item,index)">
          <div class="page-list-body-img">
            <img :src="item.picture" />
          </div>
          <div class="hero-nam">
            <span>{{item.name}}</span>
          </div>
          <div class="hero-price">
            <span>{{item.price}}</span>
            <img src="../../assets/home/jinbi@2x.png" alt="" />
          </div>
  
        </li>
      </ul>
    </div>
  
    <!--腾讯列表详情-->
    <div class="tengXun-list">
      <ul class="tengXun-list-body" v-show="index===1">
        <li class="page-list-body-li" v-for='(item,index) in getExchange' @click="goQbDetails(item,index)">
          <div class="page-list-body-img">
            <img :src="item.picture" />
          </div>
          <div class="hero-nam">
            <span>{{item.name}}</span>
          </div>
          <div class="hero-price">
            <span>{{item.price}}</span>
            <img src="../../assets/home/jinbi@2x.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
    <menu-bar :isShow="isShow" :showIndex="nowIndex" v-on:taskNavClick="taskNavClick"></menu-bar>
  
    <task-dialog v-if="isShow" :isShow="isShow" v-on:hidenTask="hidenTask"></task-dialog>
  
  </div>
</template>
<script>
import {
  saveAuth,
  getAuth,
  delAuth
} from '@/handle/auth'
import * as api from '../../server/api.js'
import menuBar from '@/components/common/menu.vue'
import taskDialog from '@/components/seeinfront/task'
import router from '../../router/index.js'
import { mapGetters } from 'vuex'


export default {
  name: "exchange",
  data() {
    return {
      tabs: ['英雄联盟', '腾讯'],
      activeTab: '腾讯',
      index: 1,
      isShow: false,
      item: {},
      selectindex: 0,
      testQb: {},
      nowIndex:'1',
    }

  },
  components: {
    [taskDialog.name]: taskDialog,
    [menuBar.name]: menuBar

  },
  created() {
    let auth = getAuth();

    if (auth) {
      this.uid = auth.uid;
      this.token=auth.token;
      this.$store.dispatch('setProductList',auth);
      this.$store.dispatch('setExchange',auth);
    }
  },
   computed: {
      ...mapGetters(['getProductList','getExchange'])
    },
  methods: {
    goDetails(item, index) {
      this.item = item
      
      router.push({
        name: 'getExchangeDetail',
        query:{
          item,
          index
        }
      });

    },
    goQbDetails(item, index) {
      this.testQb = item;

      router.push({
        name: 'exchangeQb',
        query:{
          item,
          index
        }
      });

    },
    toggleTab(item, index) {
      this.activeTab = item;
      this.index = index;
    },
    taskNavClick(data) {
      this.isShow = data;
    },
    hidenTask(data) {
      this.isShow = data;
    },
  }

}
</script>
<style src="../../css/exchange/exchange.css"></style>