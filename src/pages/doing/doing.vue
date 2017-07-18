<template>
  <div>
    <div class="page-header-wrap">
      <!-- header -->
    <div class="weChat-title">
    <span class="weChat-title-icon" @click="goBack">
    <img src="../../assets/lineUp/back@2x.png" />
    </span>
    活动
    </div>
    </div>
    <!-- 活动列表 -->
    <div class="event-doing-list">
      <ul>
        <li>
          <a href="#">
            <img src="../../assets/doing/2@2x.png" alt="">
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/doing/3@2x.png" alt="">
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/doing/head@2x.png" alt="">
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/doing/1@2x.png" alt="">
          </a>
        </li>
      </ul>
    </div>
     <div class="wx-bottom"></div>
    <menu-bar :isShow="isShow" :showIndex="nowIndex" v-on:taskNavClick="taskNavClick"></menu-bar>
    <lazy-render :time="300">
        <task-dialog v-if="isShow" :isShow="isShow" v-on:hidenTask="hidenTask"></task-dialog>
    </lazy-render>

  </div>
</template>

<script>  
  import taskDialog from '../../components/seeinfront/task'
  import { getAuth } from '../../handle/auth.js'
  import { getEventList } from '../../server/api.js'
  import router from '../../router/index.js'
  import menuBar from '../../components/common/menu.vue'
  

  export default {
    name:'doing',
    data() {
      return {
        isShow:false,
        events:[],
        isShowDialogFeault:false,
        isShowBtn:false,
        nowIndex:'3'
      }
    },
    components:{
      [taskDialog.name]:taskDialog,
      [menuBar.name]:menuBar
    },
    created(){
      let auth = getAuth();
      let vm = this;
      if(auth){
        //用户已经登录
        getEventList({uid:auth.uid,token:auth.token}).then(function(resp){
          let data = resp.data;
          if(data.status === 0){
            vm.events = data.events;
          }
        })
      }else{
        console.log('没登录');
      }
    },
    mounted(){
      let getTaskStory=localStorage.getItem('task_story');
      var date = new Date();
      date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      if(getTaskStory==null||getTaskStory!=date){
        localStorage.setItem('task_story', date);
        this.isShow=true;
      }else{
        this.isShow=false;
      }
    },
    methods:{
      goBack(){
        router.push({name:'index'})
      },
      hidedialog(data){
        this.isShowDialogFeault=data;
      },
      showDefaultDialog(){
        this.isShowDialogFeault=true;
      },
      taskNavClick(data){
        this.isShow=data;
      },
      hidenTask(data){
        this.isShow=data;
      },
    }
  }
</script>

<style scoped>
  .page-head {
    color: #607d8b;
  }
  .event-doing-list {
    margin-left:0px;
    margin-right:0px;
  }
  .event-doing-list ul li {
    display: block;
    width:100%;
    height:300px;/*px*/
    margin-bottom: 2px;/*px*/
  }
  .event-doing-list ul li img{
    display: block;
    width:100%;
    height:100%;/*px*/
  }
  .go-back{
    position:absolute;
    left:0px;
  }
</style>
