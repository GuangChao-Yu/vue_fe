<template>
  <div>
    <div class="myguess-tabs">
      <div class="myguess-tabs-item" v-for="(item,index) in tabs" :key="index" @click="toggle(index)" :class="{'handlers-tabs-acitve':activeIndex==index}">{{item}}</div>
    </div>
    <!-- 未开始的比赛 -->
    <div class="myguess-list-padding" v-show="currentView==0">
      <div v-if="notStartContest.length==0" class="no-game-list">
        <loading v-if="showLoading"></loading>
        {{nodatatxt}}
        </div>
      <template v-else v-for="item in notStartContest">
        <div @click="goToLineUp(item.my_contest_id,item.contest_info.contest_id)">
          <my-concard :item="item"></my-concard>
        </div>
      </template>
    </div>
    <!-- 进行中的比赛 -->
    <div class="myguess-list-padding" v-show="currentView==1">
    <div v-if="processingContest.length==0" class="no-game-list">
      {{nodatatxt}}
    </div>
    <template v-else v-for="item in processingContest">
      <router-link :to="{ name : 'contestResult' ,params:{ myContestId:item.my_contest_id,myId:0}}">
        <my-concard :item="item" :myId="0"></my-concard>
      </router-link>
    </template>
    </div>
    <!-- 已结束的比赛 -->
    <div class="myguess-list-padding" v-show="currentView==2">
    <div v-if="endContest.length==0" class="no-game-list">{{nodatatxt}}</div>
    <template v-else v-for="item in endContest">
      <router-link :to="{ name : 'contestResult' ,params:{ myContestId:item.my_contest_id,myId:1}}">
        <my-concard :item="item" :cutType="cutType" :myId="1"></my-concard>
      </router-link>
    </template>
    </div>
     <div class="wx-bottom"></div>
    <race-bar :showIndex="showIndex"></race-bar>
  </div>
</template>

<script>
import raceNav from '../../components/common/racemenu'
import * as api from '../../server/api'
import { saveAuth,getAuth,getGameType } from '@/handle/auth'
import mycard from '../../components/seeinfront/myconcard'
import loading from '../../components/common/loading'

  export default {
    name:'myguess',
    data(){
      return{
        seeinfrontGameType:'',
        showIndex:'1',
        cutType:'2',
        tabs:['未开始','进行中','已结束'],
        activeIndex: 0,
        nodatatxt:'',
        showLoading:true,
        page:1,
        currentView: 0,
        notStartContest:[],     //未开始比赛
        processingContest:[],   //进行中比赛
        endContest:[],           //已结束比赛
        position_list:{
          'top':'',           //上单
          'jungle':'',        //打野
          'mid':'',           //中单
          'ad':'',            //ADC，射手
          'support':'',       //辅助
          'alternate':'',     //替补
          'team':''           //战队
        }
      }
    },
    components:{
      [raceNav.name]:raceNav,
      [mycard.name]:mycard,
      [loading.name]:loading
    },
    created(){
      this.seeinfrontGameType=getGameType()||'1'
    },
    beforeMount(){
      let auth=getAuth();
      let gameId=this.seeinfrontGameType=='1'?1:2
      api.getMyContestList({
        uid:auth.uid,
        token:auth.token,
        game_type_id:gameId
      }).then((res)=>{
        setTimeout(()=>{
          this.nodatatxt='没有相关数据';
        },5*1000);
        this.notStartContest=res.data.result.live_list;
        
        this.processingContest=res.data.result.end_list;
        this.showLoading=false;
        // res.data.result.finish_list.forEach((item,index)=>{
        //   item.type==1;
        // })
      })
      api.myEndGuess({
        uid:auth.uid,
        token:auth.token,
        page:this.page,
        page_size:30,
        type:1,
        game_type_id:gameId
      }).then((res)=>{
        //一次拉30条，还没做分页处理
        this.endContest=res.data.result.list;
      })
    },
    methods:{
      toggle(i) {
      this.activeIndex = i;
      this.currentView = i;
    },
    goToLineUp(my_contest_id,contest_id){
      let auth=getAuth();
      api.updateMyContestTeam({
        token:auth.token,
        myContestId:my_contest_id
      }).then((res)=>{
        this.$store.dispatch('setTop',res.data.result.virtual_team.players[0]);
        this.$store.dispatch('setJug',res.data.result.virtual_team.players[1]);
        this.$store.dispatch('setMid',res.data.result.virtual_team.players[2]);
        this.$store.dispatch('setAdc',res.data.result.virtual_team.players[3]);
        this.$store.dispatch('setSup',res.data.result.virtual_team.players[4]);
        this.$store.dispatch('setBench',res.data.result.virtual_team.players[5]);
        this.$store.dispatch('setTeam',res.data.result.virtual_team.team);
        //type==1表示是从我的竞猜未开始盘口过来的修改数据的
        this.$router.push({name:'mapplayer',params:{contestId:contest_id,type:'1',my_contest_id:my_contest_id}});
      })
    }
    }
  }
</script>

<style>
  .myguess-tabs {
    background-color: #344650;
    color: #607d8b;
    height: 88px;/*px*/
    line-height: 88px;/*px*/
    font-size: 32px;/*px*/
    position: fixed;
    width: 750px;
    z-index: 100;
    display: flex;
    align-items: center;
    top: 0;
  }
  .myguess-tabs-item{
    flex: 1;
    text-align: center;
    border-bottom:2px solid #344650;/*no*/
    border-right:1px solid #22323d;/*no*/
    border-left:1px solid #3c5464;/*no*/
    border-top:1px solid #3c5464;/*no*/
  }

  .myguess-list-padding {
    width: 750px;
    min-height: 300px;
    color: #fff;
    margin-top: 90px;/*px*/
    font-size: 32px;
    padding: 20px;/*px*/
  }

  .no-game-list{
    font-size: 40px;
    color: #fff;
    text-align: center;
    line-height: 300px;/*px*/
  }
</style>
