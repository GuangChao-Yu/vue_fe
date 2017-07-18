<template>
    <div class="dialog-tips" v-if="showTips">{{tips}}</div>
</template>

<script>
export default {
  name:'dialog-tips',
  data(){
    return{

    }
  },
  props:{
    tips:{
      type:String,
      default(){
        return '无'
      }
    },
    showTips:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
}
</script>

<style>
.dialog-tips{
  position: absolute;
  width: 600px;
  padding:30px;
  left: 50%;
  top: 45%;
  margin-left: -300px;
  color: #fff;
  background:rgba(0,0,0,0.6);
  z-index: 10000;
  font-size: 28px;
  text-align: center;
}
</style>
