<template>
  <span :class="cutDownClass" v-if="!cutDownOver">
    {{allhour}}:{{minute}}:{{second}}
  </span>
  <span class="concard-cut-down-over" v-else>
  {{overtxt}}
  </span>
</template>

<script>
export default {
  name: 'count-down',
  data() {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      allhour:0,
      cutDownOver:false,
      overtxt:'进行中..'
    }
  },
  props: {
    cutDownClass: {
      type: String,
      default() {
        return 'concard-cut-down'
      }
    },
    endTime: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  mounted(){
    this.update_();
  },
  computed:{
    updateEndTime:function(){
      return this.endTime
    }
  },
  beforeDestroy(){
    clearTimeout(this.timmer);
  },
  methods: {
    //倒计时方法
    update_() {
      let nowTime = new Date();
      let endTime = new Date(this.endTime * 1000);
      let ts_ = endTime.getTime() - nowTime.getTime();

      let ss = 1000;
      let mi = ss * 60;
      let hh = mi * 60;
      let dd = hh * 24;

      let day = parseInt(ts_ / dd);
      let hour = parseInt((ts_ - day * dd) / hh);
      let minute = parseInt((ts_ - day * dd - hour * hh) / mi);
      let second = parseInt((ts_ - day * dd - hour * hh - minute * mi) / ss);

      this.day = this.changeTime(day);
      this.hour = this.changeTime(hour);
      this.minute = this.changeTime(minute);
      this.second = this.changeTime(second);
      if(day==0){
        this.allhour=day+hour;
      }
      if(day>0){
        this.allhour=day*24+hour
      }
      if(ts_>1000){
        this.timmer=setTimeout(()=>{
          ts_-=1000;
          this.update_();
        },1000)
      }else{;
        this.cutDownOver=true;
      }
    },
    changeTime(num){
      if(num<=0){
        return 0;
      }else if(num<10){
        return '0'+num;
      }else{
        return num
      }
    },
  }
}
</script>
<style>
.concard-cut-down-over{
  color: #ff760d;
}
</style>

