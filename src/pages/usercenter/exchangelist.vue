<template>
  <div class="exchange-warp">
  <div v-title>无限电竞</div>
  <div class="weChat-title">
    <span class="weChat-title-icon" @click="goback">
      <img src="../../assets/lineUp/back@2x.png" />
    </span>
    兑换记录
  </div>
  <div v-if="isnoData" class="no-data-txt">您没有兑换记录</div>
    <ul class="exchange-ul" v-if="!isnoData">
      <li class="exchange-list" v-for="(item,key) in datalist" @click="getDialog(item.id)">
        <span class="exchange-time">{{formatTime(item.created_at)}}</span>
        <span class="exchange-name">{{item.product.name}}</span>
        <span class="exchange-num">X{{item.num}}</span>
        <span class="exchange-state" :class="{
          'state-ing':item.status=='0',
          'state-success':item.status=='1',
          'state-fail':item.status=='2'
        }">{{getState(item.status)}}</span>
        <span class="exchange-type">{{item.product.category}}</span>
        <span class="exchange-type-name">{{item.product.game}}</span>
        <span class="exchange-gold-num">{{item.product.price}}</span>
        <span class="exchange-icon"></span>
      </li>
    </ul>
    <div class="loading" v-show="isShowLoading">{{loadingTxt}}</div>
    <div class="exchange-dialog" v-if="isShowDialog">
      <div class="exchange-dialog-box">
        <div class="exchange-dialog-box-title">兑换订单详情
        <div class="exchange-dialog-close-btn" @click="closeDialog()"></div>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">订单号</span>
          <span class="exchange-dialog-bill-num">{{showdialogObj.bill}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">兑换时间</span>
          <span class="exchange-dialog-bill-num">{{showdialogObj.created_at}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">状态</span>
          <span class="exchange-dialog-bill-num">{{getState(showdialogObj.status)}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">游戏</span>
          <span class="exchange-dialog-bill-num">{{showdialogObj.product.game}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">类型</span>
          <span class="exchange-dialog-bill-num">{{showdialogObj.product.category}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">物品</span>
          <span class="exchange-dialog-bill-num">{{showdialogObj.product.name}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">单价</span>
          <span class="exchange-dialog-bill-num"><i class="exchange-dialog-icon"></i>{{showdialogObj.product.price}}</span>
        </div>
        <div class="exchange-dialog-list">
          <span class="exchange-dialog-bill">数量</span>
          <span class="exchange-dialog-bill-num">{{showdialogObj.num}}</span>
        </div>
        <div class="exchange-dialog-list exchange-dialog-list-big">
          <span class="exchange-dialog-bill">价格</span>
          <span class="exchange-dialog-bill-num"><i class="exchange-dialog-icon"></i>{{showdialogObj.product.price}}</span>
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
  name: 'exchangelist',
  data() {
    return {
      uid: 0,
      token: '',
      datalist: [],
      page: 1,
      isnoData: false,
      totalPage: 0,
      showdialogObj: {},
      isShowDialog: false,
      isShowLoading: false,
      loadingTxt:'加载中...'
    }
  },
  created: function () {
    let auth =getAuth();
    if (auth) {
      this.uid = auth.uid;
      this.token = auth.token;
      this.isShowLoading = true;
      this.$nextTick(() => {
        api.getExchangeList({
          uid: this.uid,
          token: this.token,
          page: this.page
        }).then((res) => {
          if (res.data.data.length == 0) {
            this.isnoData = true;
            this.isShowLoading = false;
          } else {
            this.totalPage = res.data.pagination.total_pages;
            this.datalist = this.datalist.concat(res.data.data);
            this.isShowLoading = false;
          }
        })
      })

    } else {
      console.log('没有登录信息');
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
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
      this.$nextTick(() => {
        api.getExchangeList({
          uid: this.uid,
          token: this.token,
          page: this.page
        }).then((res) => {
          if (res.data.data.length <= 0){
            this.loadingTxt='别拉了，没有了..'
            this.isShowLoading=true;
            let vm=this;
            setTimeout(function(){
              vm.isShowLoading=false;
            },1000);
          }else{
          this.datalist = this.datalist.concat(res.data.data);
          this.isShowLoading = false;
          }
        })
      })
    },
    handleScroll() {
      let scrolltop = document.body.scrollTop;
      let bodyHeight = document.body.clientHeight;
      let bodyClientHeight = document.documentElement.clientHeight;
      if (scrolltop >= bodyHeight - bodyClientHeight) {
        this.page = this.page + 1;
        if (this.page > this.total_pages) 
        return
        this.loadMore(this.page)
      } else {
        //没有滚动到底部
      }
    },
    formatTime(str) {
      return str.substring(5, 6) + str.substring(6, 7) + '/' + str.substring(8, 9) + str.substring(9, 10);
    },
    formatNum_(num) {
      let text = parseInt(num);
      if (text > 10000) {
        text = (text / 10000).toFixed(1) + '万';
      }
      return text;
    },
    getState(state) {
      if (state == '1') {
        return '已完成'
      } else if (state == '0') {
        return '处理中'
      } else if (state == '2') {
        return '兑换失败'
      }
    },
    getDialog(sid) {
      this.showdialogObj = _.find(this.datalist, function (o) {
        return o.id == sid
      });
      this.isShowDialog = true;
    },
    closeDialog() {
      this.showdialogObj = {},
        this.isShowDialog = false
    },
    goback() {
      //window.history.go(-1);
       router.push({name:'usercenter'})
    }
  }
}

</script>
<style src='../../css/pages/usercenter/exchange.css'></style>
