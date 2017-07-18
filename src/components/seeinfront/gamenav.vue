<template>
  <div>
    <div class="line-up-header clearfix">
      <div class="go-back-to">
        <div @click="clearBack()">
          <img src="../../assets/lineUp/back@2x.png" />
        </div>
      </div>
      <router-link 
      :to="{name:'mapplayer',params:{contestId:$route.params.contestId}}"
      class="header-item" 
      :class="{'header-active-bar':starindex=='0'}"
      >阵容配置</router-link>

      <router-link 
      :to="{name:'contestDetails',params:{contestId:$route.params.contestId}}"
      class="header-item" 
      :class="{'header-active-bar':starindex=='1'}"
      >赛事详情</router-link>
    </div>
  </div>
</template>

<script>
import {setStore,getStore,removeStore} from '../../handle/utils.js'
import router from '../../router/index'

  export default {
    name:'game-nav',
    data(){
      return{

      }
    },
    props:{
      starindex:{
        type:String,
        default(){
          return '0'
        }
      }
    },
    methods:{
      clearBack(){
      this.$store.dispatch('setTop', {});
      this.$store.dispatch('setMid', {});
      this.$store.dispatch('setJug', {});
      this.$store.dispatch('setAdc', {});
      this.$store.dispatch('setSup', {});
      this.$store.dispatch('setBench', {});
      this.$store.dispatch('setTeam', {});
      if(this.$route.params.type==1){
        router.push({name:'myguess'})
      }else{
        router.push({name:'handlers'})
      }
      }
    }
  }
</script>

<style src="../../css/commponent/gamenav.css">
</style>
