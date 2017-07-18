<template>
  <div>
    <div class="guess-question" v-if="!isConPage">{{questionData.title}}</div>
    <div class="guess-question-flex" v-else>
      <span class="guess-flex-title">{{questionData.title}}</span>
      <span class="guess-flex-time">{{getEndTime}}</span>
    </div>
    <div class="guess-answer-warp">
      <div class="guess-answer-items" v-for="(item,index) in answerList1" :key="index" @click.stop="touzhu(item.id,questionData.game_id,item.real_odds)">
        <p class="guess-answer-1">{{item.title}}</p>
        <p class="guess-answer-2">赔率{{item.real_odds}}</p>
      </div>
    </div>
    <div class="guess-answer-warp" v-show="answerList2.length>0">
      <div class="guess-answer-items" v-for="(item,index) in answerList2" v-show="answerList2.length>0" :key="index" @click.stop="touzhu(item.id,questionData.game_id,item.real_odds)">
        <p class="guess-answer-1">{{item.title}}</p>
        <p class="guess-answer-2">赔率{{item.real_odds}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guess-question',
  data(){
    return {
      answerList1:[],
      answerList2:[],
    }
  },
  props: {
    questionData: {
      type: Object,
      default: {}
    },
    isConPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getEndTime() {
      let mounth = this.questionData.end_time.substring(5, 7)
      let day = this.questionData.end_time.substring(8, 10)
      return mounth + '月' + day + '日' + '' + this.questionData.end_time.substring(11, 16) + '截止'
    }
  },
  mounted() {
    if(this.questionData.answer.length>=3){
      this.questionData.answer.forEach((item,index)=>{
        if(index<3){
          this.answerList1.push(item)
        }else{
          this.answerList2.push(item)
        }
      })
    }else{
       this.questionData.answer.forEach((item,index)=>{
         this.answerList1.push(item)
       })
    }
  },
  methods: {
    touzhu(index, gameid, real_odds) {
      let idinfo = {
        id: index,
        gameid: gameid,
        real_odds: real_odds
      }
      this.$emit('touchwager', idinfo)
    }
  }
}
</script>

<style>
.guess-question {
  text-align: center;
  font-size: 24px;
  /*px*/
  color: #a7b7c0;
  margin-bottom: 10px;
  /*px*/
}

.guess-answer-warp {
  display: flex;
  flex-pack:justify;
  flex-wrap:wrap;
  flex-direction:row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

.guess-answer-items {
  flex:1;
  background: #253341;
  border: 1px solid #323e4c;
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 20px;/*px*/
}

.guess-answer-1 {
  height: 40px;
  /*px*/
  color: #fff;
  text-align: center;
  line-height: 50px;
  /*px*/
}

.guess-answer-2 {
  height: 40px;
  /*px*/
  text-align: center;
  color: #a7b7c0;
}

.guess-question-flex {
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  font-size: 30px;
  /*px*/
  color: #a7b7c0;
  margin-bottom: 10px;
  /*px*/
  align-items: center;
  justify-content: space-between;
}

.guess-flex-time{
  font-size: 22px;/*px*/
}
</style>
