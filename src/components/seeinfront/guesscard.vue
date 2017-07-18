<template>
  <div class="guess-item">
    <div class="guess-item-title">
      <span class="guess-item-time">{{getDate}}</span>
      <span class="guess-item-rule" @click="gotoRule()">规则说明
      </span>
    </div>
    <div class="guess-card" @click="goToinfo(guessObj)">
      <div class="guess-card-title">
        <span class="guess-card-name">{{titleName}}</span>
        <span class="guess-card-more">更多玩法 ></span>
      </div>
      <div class="guess-card-vs">
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
      <guess-question :questionData="guessObj.guess[0]" @touchwager="touchwager"></guess-question>
    </div>
  </div>
</template>

<script>
import guessQuestion from '../../components/seeinfront/guessQuestion'
import { formatTime } from '../../handle/utils.js'

export default {
  name: 'guess-card',
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    getDate() {
      return formatTime(this.guessObj.start_time, 1);
    },
    getBOTime() {
      let time = formatTime(this.guessObj.start_time, 3);
      let num = this.guessObj.max_num;
      return time + '(BO' + num + ')';
    }
  },
  created(){
    
  },
  props: {
    guessObj: {
      type: Object,
      default: {}
    },
    titleName: {
      type: String,
      default: ''
    }
  },
  components: {
    [guessQuestion.name]: guessQuestion,
  },
  methods: {
    gotoRule() {
      this.$router.push({ name: 'guessrule' })
    },
    goToinfo(item) {
      this.$router.push({ name: 'guesscon', params: { item:item,title:this.titleName } })
    },
    touchwager(info) {
      this.$emit('touchGuess', info);
    }
  }
}
</script>

<style scoped>
.guess-item {
  width: 710px;
  margin: 0 auto;
}

.guess-item-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  /*px*/
}

.guess-item-time,
.guess-item-rule {
  font-size: 30px;
  /*px*/
  color: #46c9d5;
}

.guess-card {
  width: 710px;
  min-height: 360px;
  /*px*/
  border-radius: 20px;
  background: url('../../assets/consultation/caishuyin_bd.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 40px;
  /*px*/
  padding-bottom: 40px;/*px*/
}

.guess-card-title {
  width: 710px;
  height: 60px;
  /*px*/
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.guess-card-name {
  font-size: 30px;
  /*px*/
  color: #a7b7c0;
}

.guess-card-more {
  font-size: 24px;
  /*px*/
  color: #a7b7c0;
}

.guess-card-vs {
  width: 710px;
  height: 165px;
  /*px*/
  position: relative;
}

.left-team-img {
  display: block;
  width: 106px;
  height: 106px;
  /*px*/
  position: absolute;
  top: 16px;
  /*px*/
  left: 48px;
}

.right-team-img {
  display: block;
  width: 106px;
  height: 106px;
  /*px*/
  position: absolute;
  top: 16px;
  /*px*/
  right: 48px;
}

.guess-item img {
  width: 100%;
  height: 100%;
}

.left-team-name {
  display: block;
  width: 106px;
  font-size: 24px;
  color: #a7b7c0;
  text-align: center;
  position: absolute;
  top: 132px;  /*px*/
  left: 48px;
}

.right-team-name {
  display: block;
  width: 106px;
  font-size: 24px;
  color: #a7b7c0;
  text-align: center;
  position: absolute;
  top: 132px;
  /*px*/
  right: 48px;
}

.center-vs-icon {
  width: 260px;
  height: 50px;
  /*px*/
  background: url('../../assets/consultation/vs@2x.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 26px;
  /*px*/
  left: 50%;
  margin-left: -130px;
}

.center-vs-time {
  width: 260px;
  position: absolute;
  display: block;
  left: 50%;
  text-align: center;
  margin-left: -130px;
  color: #a7b7c0;
  top: 110px;
  /*px*/
}
</style>
