<template>
  <div class="letter-warp">
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png"></img>
      </span>
      站内信
    </div>
    <ul class="letter-ul" v-if="list.length">
      <li class="letter-list" v-for="(item,index) in list" :key="index" @click="readLetter(item.id)">
        <i :class="[item.read.read_at? 'letter-Read':'letter-Unread']"></i>
        <span class="letter-title text-nowrap" :class="[item.read.read_at?'letter-title-rede':'letter-title-unrede']">{{item.title}}</span>
        <span class="letter-time letter-title-unrede" :class="[item.read.read_at?'letter-title-rede':'letter-title-unrede']">{{item.created_at}}<i class="letter-icon" v-if="!item.read.read_at"></i></span>
      </li>
    </ul>
    <div v-else class="no-letter">{{msg}}</div>
  </div>
</template>

<script>
import {getAuth} from '../../handle/auth.js'
import * as api from '../../server/api.js'

const READ='read';

export default {
  data() {
    return {
      list:[],
      msg:'加载中..'
    }
  },
  beforeMount(){
    api.notify({}).then((res)=>{
      this.list=res.data.result.data;
      if(this.list.length<=0){
        this.msg="暂无信息"
        this.list=[];
      }
    })
  },
  methods: {
    goback() {
      this.$router.push({ name: 'index' })
    },
    readLetter(id){
      this.$router.push({name:'letterContent',params:{letterId:id}})
    }
  }
}
</script>

<style>
.letter-warp{
  position:relative;
}
.no-letter{
  width: 750px;
  height: 300px;/*px*/
  color: #607d8b;
  font-size: 32px;/*px*/
  text-align: center;
  line-height: 300px;/*px*/
}
.letter-ul {
  width: 710px;
  height: auto;
  padding-left: 20px;
  padding-right: 20px;
}

.letter-list {
  position: relative;
  width: 610px;
  padding-left: 80px;
  padding-right: 20px;
  height: 140px;
  /*px*/
  border: 1px solid #323e4c;
  /*no*/
  background-color: #253341;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.letter-Unread {
  width: 40px;
  height: 28px;/*px*/
  background: url('../../assets/letter/zhanneixin_weidu@2x.png') no-repeat;
  background-size: 100% 100%;
  position:absolute;
  top: 50%;
  left: 20px;
  margin-top: -16px;
}

.letter-Read {
  width: 40px;
  height: 28px;/*px*/
  background: url('../../assets/letter/zhanneixin_yidu@2x.png') no-repeat;
  background-size: 100% 100%;
  position:absolute;
  top: 50%;
  left: 20px;
  margin-top: -20px;
}

.letter-title{
  display:inline-block;
  width: 380px;
  font-size: 32px;/*px*/
}

.letter-time{
  position: relative;
  font-size: 32px;/*px*/
}

.letter-title-unrede{
  color: #49d4e1;
}

.letter-title-rede{
  color: #607d8b;
}

.letter-icon{
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff0000;
  top: -10px;/*px*/
  right: 0;
  z-index: 10;
}
</style>
