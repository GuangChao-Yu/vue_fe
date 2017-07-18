<template>
  <div class="consultation-warp">
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png">
      </span>
      赛事预告
    </div>
    <match-scroll :data="data" @srcollIndex="srcollIndex"></match-scroll>
    <div class="consultation-item" v-for="(item,index) in data" :key="index" v-show="activeIndex==index">
      <div class="consultation-banner">
        <img v-if="item.league_banners.length" :src="item.league_banners[0].banner_url" >
      </div>
      <div class="consultation-no-data" v-show="!item.game_list.length>0">暂无赛事预告</div>
      <consu-item v-for="(items,indexs) in item.game_list" :data="items" :key="indexs"></consu-item>
    </div>
    <div class="wx-bottom"></div>
  </div>
</template>

<script>
import matchScroll from '../../components/seeinfront/matchscroll'
import consuItem from '../../components/seeinfront/consuitem'
import * as api from '../../server/api.js'
import {getGameType } from '@/handle/auth'


export default {
  data(){
    return{
      data:[],
      activeIndex:0,
      seeinfrontGameType:''
    }
  },
  created(){
     this.seeinfrontGameType=getGameType()||'1'
  },
  beforeMount(){
    let gameId=this.seeinfrontGameType=='1'?1:2
    api.getMatchList({game_type_id:gameId}).then((res)=>{
      this.data=res.data.result.data.data;
    })
  },
  methods:{
    goback(){
      this.$router.push({name:'index'})
    },
    srcollIndex(info){
      this.activeIndex=info.index;
    }
  },
  components:{
    [matchScroll.name]:matchScroll,
    [consuItem.name]:consuItem,
  }
}
</script>

<style>
.consultation-banner{
  width: 750px;
  height: 180px;
  margin-bottom: 60px;/*px*/
  overflow:hidden;
}

.consultation-banner img{
  width: 100%;
  height: 100%;
}
.consultation-no-data{
  font-size: 36px;
  color: #607d8b;
  text-align:center;
  margin-top: 200px;
}
</style>
