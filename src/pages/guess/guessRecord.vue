<template>
  <div>
    <div class="weChat-title">
      <div class="go-back">
        <span class="weChat-title-icon" @click="goBack">
          <img src="../../assets/lineUp/back@2x.png">
        </span>
        竞猜记录
      </div>
    </div>
    <div class="guessRecord-tabs">
      <div class="guessRecord-tabs-item" v-for="(item,index) in tabsItem" :key="index" v-text="item" @click="toggle(index)" :class="{'handlers-tabs-acitve':activeIndex==index}">
      </div>
    </div>
    <div class="guessRecord-con-warp">
      <!-- 全部 -->
      <div v-if="currentView==0">
        <div class="handlers-no-data" v-show="julu">没有竞猜记录</div>
        <div class="guessRecord-body" v-for="(item,index) in allContest" :key="index">
          <guess-record :item="item" :index="index"></guess-record>
        </div>
         <!--<lazy-render :time="5000">-->
        <div class="handlers-no-data-footer" v-show="shuju" >{{shuju1}}</div>
        <!--</lazy-render>-->
      </div>
      <!-- 待开奖 -->
      <div v-if="currentView==1">

        <div class="handlers-no-data" v-show="julu">没有待开竞猜记录 </div>
        <div class="guessRecord-body" v-for="(item,index) in contestFree" :key="index">
          <guess-record :item="item" :index="index"></guess-record>
        </div>
         <!--<lazy-render :time="5000">-->
        <div class="handlers-no-data-footer" v-show="shuju" >{{shuju1}}</div>
        <!--</lazy-render>-->
      </div>
      <!-- 中奖 -->
      <div v-if="currentView==2">

        <div class="handlers-no-data" v-show="julu">没有中奖竞猜记录</div>
        <div class="guessRecord-body" v-for="(item,index) in contestCash" :key="index" >
          <guess-record :item="item" :index="index"></guess-record>
        </div>
         <!--<lazy-render :time="5000">-->
        <div class="handlers-no-data-footer" v-show="shuju" >{{shuju1}}</div>
        <!--</lazy-render>-->
      </div>

    </div>

  </div>
</template>

<script>
import guessrecord from '../../components/common/gueerecord'
import loading from '../../components/common/loading'
import * as api from '../../server/api.js'
import {getGameType } from '@/handle/auth'


export default {
  name: "guessRecord",
  data() {
    return {
      tabsItem: ['全部', '待开奖', '中奖'],
      activeIndex: 0,
      currentView: 0,
      dialog: false,
      page: 1,
      totalPage: 0,
      allContest: [],
      contestFree: [],
      contestCash: [],
      contestCash2:[],
      contestFree2:[],
      noDataShow: false,
      index: 0,
      shuju:false,
      shuju1:"",
      julu:false,
      seeinfrontGameType:''
    }
  },
  created() {
    let vm = this;
    this.seeinfrontGameType=getGameType()||'1'
    let gameId=this.seeinfrontGameType=='1'?1:2
    api.guessRecord({
      game_type_id: gameId,
      page: this.page,
      type:3
    }).then((res) => {
      //所有的竞猜
      this.allContest = res.data.result.data.data;
      vm.totalPage = res.data.result.data.meta.pagination.total_pages;
      // vm.allContest = this.allContest.concat(res.data.result.data.data);
      // console.log(vm.allContest)
        vm.shuju=true
        if(this.page==res.data.result.data.meta.pagination.total_pages){
        vm.shuju="没有更多数据"
        }
    })

    api.guessRecord({
      game_type_id: gameId,
      page: this.page,
      type:1
    }).then((res) => {
      //所有的竞猜
      this.contestCash = res.data.result.data.data;
        vm.shuju=true
    })

    api.guessRecord({
      game_type_id: gameId,
      page: this.page,
      type:2
    }).then((res) => {
      //所有的竞猜
      this.contestFree = res.data.result.data.data;
        vm.shuju=true
    })
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll);
      }, 500)
    })


  },
  methods: {
    goBack() {
      this.$router.push({ name: "guess" })
    },
    toggle(i) {
      this.activeIndex = i;
      this.currentView = i;
    },
    showdialog() {
      this.dialog = !this.dialog
    },

    loadMore() {
      this.seeinfrontGameType=getGameType()||'1'
      let gameId=this.seeinfrontGameType=='1'?1:2
      this.$nextTick(() => {
        let vm = this;
        api.guessRecord({
          game_type_id: gameId,
          page: this.page,
          type:3
        }).then((res) => {
          this.allContest = this.allContest.concat(res.data.result.data.data);
          this.totalPage = res.data.result.data.meta.pagination.total_pages;
          console.log(this.page+"111111")
          console.log(vm.totalPage+"22222" )
          if(this.page==res.data.result.data.meta.pagination.total_pages){
          vm.shuju1="没有更多数据"
          }
        })

        api.guessRecord({
          game_type_id: gameId,
          page: this.page,
          type:1

        }).then((res) => {
          this.contestCash = this.contestCash.concat(res.data.result.data.data);
          this.totalPage = res.data.result.data.meta.pagination.total_pages;

        })
        api.guessRecord({
          game_type_id: gameId,
          page: this.page,
          type:2
        }).then((res) => {
          this.contestFree = this.contestFree.concat(res.data.result.data.data);
          this.totalPage = res.data.result.data.meta.pagination.total_pages;

        })
      })
    },
    handleScroll() {
      let scrolltop = document.body.scrollTop;
      let bodyHeight = document.body.clientHeight;
      let bodyClientHeight = document.documentElement.clientHeight;
      if (scrolltop >= bodyHeight - bodyClientHeight) {
        this.page = this.page + 1;
        if (this.page > this.totalPage)
          return
        this.loadMore(this.page)
      } else {
        //没有滚动到底部
      }
    },

  },

  components: {
    [guessrecord.name]: guessrecord,
    [loading.name]: loading,
  },
}
</script>

<style>
.guessRecord-tabs {
  width: 750px;
  height: 90px;
  /*px*/
  background: #344650;
  display: flex;
  position: fixed;
  position: relative;
  overflow: hidden;
  top: 0!important;
  /*px*/
  z-index: 100;
}

.guessRecord-tabs-item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  height: 86px;
  /*px*/
  align-items: center;
  border-bottom: 4px solid #344650;
  /*on*/
  /*no*/
  font-size: 32px;
  /*px*/
  color: #607d8b;
}

.guessRecord-body {
  width: 710px;
  height: 140px;
  /*px*/
  margin: 0 auto;
  margin-top: 20px;
  /*px*/
  background: #253341;
}

.guessRecord-con-warp {
  width: 750px;
}

.guessRecord-dialog {
  position: fixed;
  width: 750px;
  height: 100%;
  /*px*/
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.guessRecord-dialog-footer {
  font-size: 30px;
  /*px*/
  color: #a7b7c0;
  line-height: 80px;
  /*px*/
  border-top: 1px solid rgba(250, 250, 250, .5);
  /*on*/
  margin-top: 3px;
  /*px*/
}
.handlers-no-data-footer{
  width:750px;
  height:50px;
  font-size: 30px;
  color: white;
  text-align: center;

}
</style>

