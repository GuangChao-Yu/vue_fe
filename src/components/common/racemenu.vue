<template>
  <div class="menu-bar-wrap">
    <router-link class="menu-bar-item" :to="{name:'handlers'}">
    <div class="menu-bar-icon menu-icon-5" :class="{'menu-icon-5-active':showIndex=='0'}"></div>
    <div class="menu-bar-lable" :class="{'menu-bar-lable-acive':showIndex=='0'}">竞猜列表</div>
    </router-link>
    <router-link class="menu-bar-item" :to="{name:'myguess'}">
    <div class="menu-bar-icon menu-icon-6" :class="{'menu-icon-6-active':showIndex=='1'}"></div>
    <div class="menu-bar-lable" :class="{'menu-bar-lable-acive':showIndex=='1'}">我的竞猜</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name:'race-bar',
  props:{
    showIndex:{
      type:String,
      default(){
        return '0'
      }
    }
  },
  data(){
    return{}
  },

}
</script>

<style>
/* 默认应用menu.css样式 不再重写*/
</style>
