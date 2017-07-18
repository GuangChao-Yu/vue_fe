<template>
  <div class="menu-bar-wrap">
    <router-link class="menu-bar-item" :to="{name:'index'}">
      <div class="menu-bar-icon menu-icon-1" :class="{'menu-icon-1-active':showIndex=='0'}"></div>
      <div class="menu-bar-lable" :class="{'menu-bar-lable-acive':showIndex=='0'}">首页</div>
    </router-link>
    <router-link class="menu-bar-item" :to="{name:'exchange'}">
      <div class="menu-bar-icon menu-icon-2"></div>
      <div class="menu-bar-lable" :class="{'menu-bar-lable-acive':showIndex=='1'}">兑换</div>
    </router-link>
    <div class="menu-bar-item" @click="showTask">
      <div class="menu-bar-icon menu-icon-3"></div>
      <div class="menu-bar-lable">每日任务</div>
    </div>
    <router-link class="menu-bar-item" :to="{name:'doing'}">
      <div class="menu-bar-icon menu-icon-4"></div>
      <div class="menu-bar-lable" :class="{'menu-bar-lable-acive':showIndex=='3'}">活动</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name:'menu-bar',
    props:{
      showIndex:{
        type:String,
        default(){
          return '0'
        }
      },
      isShow:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    data(){
      return{}
    },
    methods:{
      showTask(){
        let state=this.isShow?false:true;
        this.$emit('taskNavClick',state);
      }
    }

  }
</script>

<style src='../../css/commponent/menu.css'>

</style>
