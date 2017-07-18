<template>
  <div class="revenue-warp">
    <div v-title>无限电竞</div>
    <div class="weChat-title">
    <span class="weChat-title-icon" @click="goback">
    <img src="../../assets/lineUp/back@2x.png" />
    </span>
    收支记录
  </div>
    <div v-if="isnoData" class="no-data-txt">您没有收支记录</div>
    <div class="revenue-title" v-if="!isnoData">
      <div class="revenue-item">时间日期</div>
      <div class="revenue-item">收支类型</div>
      <div class="revenue-item">金额</div>
    </div>
    <ul v-if="!isnoData">
      <li class="revenue-list-item" v-for="(item,key) in datalist" @click="getDialog(item.related_id)">
        <span class="list-item-time">{{handleReplace(item.created_time)}}</span>
        <span class="list-item-type">{{getState(item.transaction_type)}}</span>
        <span class="list-item-money">
          <i class="symbol-icon" v-if="getTypeIcon(item.transaction_type)">-</i>
          <i class="symbol-icon" v-else>+</i>
          <i class="currency-type-icon" :class="{
            'currency-type-icon-2':item.transaction_fee_type==1
          }"></i>
          <i class="currency-num">{{item.transaction_fee}}</i>
        </span>
      </li>
    </ul>
    <div class="loading" v-show="isShowLoading">加载中...</div>
    <div class="mask" v-if="isShowDialog">
      <div class="revenue-dialog">
        <span class="close-dialog-icon" @click="handleClose()"></span>
        <div class="revenue-dialog-title">收支记录详情</div>
        <div class="dialog-item">
          <span class="dialog-item-list">票据单号:</span>
          <span class="dialog-item-list">{{dialogData.transaction_id}}</span>
        </div>
        <div class="dialog-item dialog-item-big-1">
          <span class="dialog-item-list">票据信息:</span>
          <span class="dialog-item-list">{{dialogData.transaction_info}}</span>
        </div>
        <div class="dialog-item">
          <span class="dialog-item-list">日期时间:</span>
          <span class="dialog-item-list">{{handleReplace(dialogData.created_time)}}</span>
        </div>
        <div class="dialog-item">
          <span class="dialog-item-list">交易类型:</span>
          <span class="dialog-item-list">{{getState(dialogData.transaction_type)}}</span>
        </div>
        <div class="dialog-item dialog-item-big-2">
          <span class="dialog-item-list">金额:</span>
          <span class="dialog-item-list"><i class="dialog-item-icon" :class="{
            'dialog-item-icon-2':dialogData.transaction_fee_type==1
          }"></i>{{dialogData.transaction_fee}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  saveAuth,
  getAuth
} from '@/handle/auth'
import router from '../../router/index.js'
import * as api from '../../server/api.js'
import _ from 'lodash'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      isnoData: false,
      uid: 0,
      token: '',
      page: 1,
      totalPage: 0,
      datalist: [],
      isShowDialog:false,
      dialogData:{},
      isShowLoading:false,
    }
  },
  created: function () {
    let auth = getAuth();
    if (auth) {
      this.uid = auth.uid;
      this.token = auth.token;
      this.isShowLoading=true;
      this.$nextTick(()=>{
      api.getDealList({
        uid: this.uid,
        token: this.token,
        page: this.page,
      }).then((res) => {
        if (res.data.result.length == 0) {
          this.isShowLoading=false;
          this.isnoData = true;
        }
        this.datalist = this.datalist.concat(res.data.result.transaction_list);
        this.isShowLoading=false;
      })
      })
      
    } else {
      console.log('没有登录信息');
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll);
      }, 500)
    })
  },
  methods: {
    loadMore(index) {
      this.isShowLoading=true;
      api.getDealList({
        uid:this.uid,
        token:this.token,
        page:this.page
      }).then((res)=>{
        this.datalist = this.datalist.concat(res.data.result.transaction_list);
         this.isShowLoading = false;
      })
    },
    handleScroll() {
      let scrolltop = document.body.scrollTop;
      let bodyHeight = document.body.clientHeight;
      let bodyClientHeight = document.documentElement.clientHeight;
      if (scrolltop >= bodyHeight - bodyClientHeight) {
        this.page = this.page + 1;
        this.loadMore(this.page)
      } else {
        //没有滚动到底部
      }
    },
    getState(state) {
      if (state == 1) {
        return '现金充值'
      } else if (state == 2) {
        return '获得奖金'
      } else if (state == 3) {
        return '出盘退款'
      } else if (state == 4) {
        return '入盘支出'
      } else if (state == 5) {
        return '提现支出'
      } else if (state == 6) {
        return '充值赠送虚拟币'
      } else if (state == 7) {
        return '邀请好友赠送虚拟币'
      } else if (state == 8) {
        return '虚拟账户进入现金账户'
      } else if(state==9){
        return '宝箱获得'
      } else if(state==10){
        return '签到奖励'
      } else if(state==11){
        return '提现退款'
      }else{
        console.log(state);
        return '未知类型'
      }
    },
    getTypeIcon(type){
      if(type==4||type==5){
        return true
      }else{
        return false
      }
    },
    getDialog(sid){
      this.dialogData=_.find(this.datalist,function(o){
        return o.related_id==sid
      });
      this.isShowDialog=true;
    },
    handleClose(){
      this.dialogData={},
      this.isShowDialog=false;
    },
    handleReplace(time){
      let timeChange=time.replace(/\-/g,'.');
      return timeChange
    },
    goback(){
      //window.history.go(-1);
       router.push({name:'usercenter'})
    }
  }
}

</script>

<style src="../../css/pages/usercenter/revenue.css"></style>