<template>
  <div class="mask">
    <img class="loading-img" src="../../assets/index/loading.gif" >
    <!--<div class="loading-desc">{{title}}</div>-->
  </div>
</template>

<script>
export default {
  name:'loading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  },
  computed:{
    Changetitle(){
      setTimeout(()=>{
        this.title='服务器开小差了，请重试'
      },5*1000)
    }
  }
}
</script>

<style>
.loading-img {
  display: inline-block;
  width: 48px;
  height: 48px;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading-desc{
  width: 750px;
  position: absolute;
  top: 42%;
  text-align: center;
  width: 750px;
  font-size: 24px;
  color: #fff;
}
</style>

