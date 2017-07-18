<template>
  <div class="mask" v-if="isShow">
    <div :class="taskBg" v-if="qianbox">
    <span class="close_task_btn" @click="hideTask"></span>
      <span class="task-intrduce">
      <p>{{taskTime}}</p>
      <p>{{taskInfo}}</p>
      </span>
      <div class="task-box">
        <ul class="task-box-ul">
          <li v-for="(list,key) in listdata" class="task-def-item"
          :class="{
            'tasknow task-item-big tasking-big':list.check_status==1&&(key=='0'||key=='6'),
            'tasknow tasking-sm':list.check_status==1&&(key=='1'||key=='2'||key=='3'||key=='4'||key=='5'),
            'tasking-big task-item-big':list.check_status==0&&(key=='0'||key=='6'),
            'tasking-sm':list.check_status==0&&(key=='1'||key=='2'||key=='3'||key=='4'||key=='5'),
            'taskised-big task-item-big':list.check_status==2&&(key=='0'||key=='6'),
            'taskised-sm':list.check_status==2&&(key=='1'||key=='2'||key=='3'||key=='4'||key=='5')
          }">
            <span class="task-item-bottom">金币X{{list.coins}}</span>
            <span class="task-day">{{list.title}}</span>
            <span class="is-now-day"></span>
            <span class="done-icon"></span>
          </li>
        </ul>
        <div class="task-btn" :class="{'task-btn-disable':noGetTask}" @click="clickGetTask"></div>
      </div>

    </div>
    <div v-if="qianresult" class="task-result-box">
      <p class="qianresult-title">获得奖励</p>
      <span class="gift-box" :class="{'big-gift':giftType=='big'}">
        <p class="gift-message">{{qianrentxt}}</p>
      </span>
      <span class="qianren-btn" @click="qiandaoclick">确认</span>
    </div>
  </div>
</template>

<script>
  import { saveAuth,getAuth,getGameType } from '@/handle/auth'
  import router from '../../router/index.js'
  import * as api from '../../server/api.js'
  import _ from 'lodash'
  import { mapGetters } from 'vuex'

export default {
  name:'task-dialog',
  props:['isShow'],
  data () {
    return {
      taskTime:'',
      taskInfo:'',
      listdata:[],
      noGetTask:true,
      uid:'',
      token:'',
      qianbox:true,
      qianresult:false,
      qianrentxt:'',
      giftType:'small',
      seeinfrontGameType:''
    }
  },
  created(){
    this.seeinfrontGameType=getGameType()||'1'
    let auth=getAuth();
    if(auth){
      this.uid=auth.uid;
      this.token=auth.token;
      api.getTaskApi({
        uid: auth.uid,
        token: auth.token
      }).then((res) => {
        this.taskTime = res.data.result.event_date;
        this.taskInfo = res.data.result.event_desc;
        this.listdata = res.data.result.check_in;
        let isIndex = _.findIndex(this.listdata, function (item, index) {
          return item.check_status==1;
        })
        if(isIndex>=0){
          if(isIndex==6||isIndex==0){
            this.giftType='big'
          }
          this.noGetTask=false;
        }else{
          this.noGetTask=true;
        }
      },this)
    } else {
      //router.push('login');
    }
  },
  methods:{
    hideTask(){
      this.$emit('hidenTask',false);
    },
    clickGetTask(){
      if(this.noGetTask) return;
      api.getClickTaskResult({
        uid:this.uid,
        token:this.token
      }).then((res)=>{
        if(res.data.status==0){
          this.qianbox=false;
          this.qianresult=true;
          this.qianrentxt=res.data.message;
        }else if(res.data.status==1){
          console('今天已经领取过了哦!')
        }else{
          console.log('接口状态拒绝');
        }
      })
    },
    qiandaoclick(){
      this.qianbox=true;
      this.qianresult=false;
      this.$emit('hidenTask',false);
    }
  },
  computed:{
    taskBg(){
      return this.seeinfrontGameType=='2'?'mask-bg-kpl':'mask-bg'
    }
  }
}
</script>
<style src='../../css/commponent/task.css'>
</style>
