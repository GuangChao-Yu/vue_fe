<template>
  <div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goBack">
        <img src="../../assets/lineUp/back@2x.png">
      </span>
      {{getTitle}}
    </div>
    <div class="guess-con-vs-warp">
      <span class="left-team-img">
          <img :src="guessObj.left.team_img_url">
        </span>
        <span class="left-team-name">{{guessObj.left.team_name}}</span>
        <span class="right-team-img">
          <img :src="guessObj.right.team_img_url">
        </span>
        <span class="right-team-name">{{guessObj.right.team_name}}</span>
        <span class="center-vs-icon"></span>
        <span class="center-vs-time">{{getBOTime}}</span>
    </div>
    <div class="guess-con-list" v-for="(item,index) in guessObj.guess" :key="index">
      <guess-question :questionData="item" v-on:touchwager="touchwager" :isConPage="isConPage"></guess-question>
    </div>
    <bett-dialog @closeBattdialig="closeBattdialig" v-if="isShowDailo" :dialogData="dialogData" @bettingResult="bettingResult"></bett-dialog>
    <dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
    </dialog-default>

  </div>
</template>

<script>
import { formatTime } from '../../handle/utils.js'
import guessQuestion from '../../components/seeinfront/guessQuestion'
import bettDialog from '../../components/seeinfront/bettdialog'
import dialog from '../../components/common/dialog'


export default {
  data() {
    return {
      guessObj:this.$route.params.item,
      isConPage:true,
      isShowDailo: false,
      //dialog props
      title: '',
      dtitle: '',
      isShowDialogFeault: false,
      isShowBtn: true,
    }
  },
  beforeMount(){

  },
  computed:{
    getTitle(){
      return this.$route.params.title+' '+formatTime(this.$route.params.item.start_time,4)
    },
    getBOTime() {
      let time = formatTime(this.guessObj.start_time, 3);
      let num = this.guessObj.max_num;
      return time + '(BO' + num + ')';
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'guess' });
    },
    touchwager(info){
      this.dialogData = info;
      this.isShowDailo = true
    },
    closeBattdialig(data) {
      this.isShowDailo = data
    },
    hidedialog(data) {
      this.isShowDialogFeault = data;
    },
    bettingResult(info) {
      //info.type==-1 失败 info.type==0下注成功
      this.title = info.msg;
      this.isShowDialogFeault = true;
      this.timmer = setTimeout(() => {
        this.isShowDailo = false;
      }, 20)
    }
  },
  components:{
    [guessQuestion.name]:guessQuestion,
    [bettDialog.name]:bettDialog,
    [dialog.name]:dialog
  }
}
</script>

<style scoped>
.guess-con-vs-warp{
  width: 750px;
  height: 260px;/*px*/
  background: rgba(40,55,63,0.36);
  margin-bottom: 20px;/*px*/
  position:relative;
}
.guess-con-vs-warp img{
  width: 100%;
  height: 100%;
}

.left-team-img{
  display: block;
  width: 106px;
  height: 106px;
  /*px*/
  position: absolute;
  top: 66px;
  /*px*/
  left: 70px;
}

.right-team-img{
  display: block;
  width: 106px;
  height: 106px;
  /*px*/
  position: absolute;
  top: 66px;
  /*px*/
  right: 70px;
}

.left-team-name{
  display: block;
  width: 106px;
  font-size: 24px;
  color: #a7b7c0;
  text-align: center;
  position: absolute;
  top: 180px;  /*px*/
  left: 70px;
}

.right-team-name{
  display: block;
  width: 106px;
  font-size: 24px;
  color: #a7b7c0;
  text-align: center;
  position: absolute;
  top: 180px;  /*px*/
  right: 70px;
}
.center-vs-icon{
  width: 260px;
  height: 50px;
  /*px*/
  background: url('../../assets/consultation/vs@2x.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 72px;
  /*px*/
  left: 50%;
  margin-left: -130px;
}

.center-vs-time{
  width: 260px;
  position: absolute;
  display: block;
  left: 50%;
  text-align: center;
  margin-left: -130px;
  color: #a7b7c0;
  top: 146px;
  /*px*/
}

.guess-con-list{
  width: 750px;
  min-height: 220px;/*px*/
  background: rgba(40,55,63,0.36);
  padding-top: 36px;/*px*/
  margin-bottom: 40px;/*px*/
  padding-bottom: 20px;/*px*/
}
</style>
