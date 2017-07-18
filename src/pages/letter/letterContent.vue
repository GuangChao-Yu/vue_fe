<template>
  <div class="letter-content">
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png"></img>
      </span>
      站内信
    </div>
    <div class="letter-content-title">{{title}}</div>
    <div class="letter-content-con">{{content}}</div>
  </div>
</template>

<script>
import {getAuth} from '../../handle/auth.js'
import * as api from '../../server/api.js'

export default {
  data(){
    return{
      title:'',
      content:''
    }
  },
  beforeMount(){
    api.getNotifyCon({
      id:this.$route.params.letterId
    }).then((res)=>{
      this.title=res.data.result.data.title
      this.content=res.data.result.data.message
    })
    api.updateNotify({
      id:this.$route.params.letterId
    }).then((res)=>{
      if(res.data.status!=0){
        alert('更新消息状态出错')
      }
    })
  },
  methods:{
    goback(){
      this.$router.push({name:'letter'})
    }
  }
}
</script>

<style>
  .letter-content-title{
    width: 750px;
    padding-left: 40px;
    padding-right: 40px;
    height: 100px;/*px*/
    line-height: 100px;/*px*/
    background: rgba(40,55,63,.3);
    font-size: 32px;/*px*/
    color: #49d4e1;
    margin-bottom: 20px;
  }

  .letter-content-con{
    width: 750px;
    padding:20px 40px;
    min-height: 300px;/*px*/
    background: rgba(40,55,63,.3);
    font-size: 32px;
    color: #a9c8d7;
  }
</style>
