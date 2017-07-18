<template>
    <div>
        <div class="guessrecord-body" @click="guessRecordClose">
            <div class="guessrecord-body-left">
                <div class="guessrecord-body-left-top">
                    <span>
                        {{item.guess.games.left.name }} VS {{item.guess.games.right.name }}
                    </span>
                </div>
                <div class="guessrecord-body-left-mid">
                    <span>
                        {{item.guess.title}}
                    </span>
                </div>
                <div class="guessrecord-body-left-bot">
                    <span>
                        {{item.answer.title}}({{item.answer.real_odds}})投注{{item.base_gold}}金币
                    </span>
                </div>
            </div>
            <div class="guessrecord-body-right" v-if="item.status==1">
                <div class="guessrecord-body-right-top">
                    <span>
                        {{item.date.substring(5,10).replace(/-/,"/")}}
                    </span>
                </div>
                <div class="guessrecord-body-right-bot" v-if="item.total_gold>0">
                    <div>
                        <div>
                            中奖 +
                            <img class="guessRecord-right-img" src="../../assets/home/jinbi@2x.png">{{item.total_gold}}
                        </div>
                    </div>
                </div>
                <div class="guessrecord-body-right-bot-defit" v-else>
                    <div>
                        <div>
                            未中奖
                        </div>
                    </div>
                </div>
            </div>
            <div class="guessrecord-body-right" v-else>
                <div class="guessrecord-body-right-top">
                    <span>
                        {{item.date.substring(5,10).replace(/-/,"/")}}
                    </span>
                </div>
                <div class="guessrecord-body-right-bot-weika">
                    <div>
                        <div>
                            暂未开奖
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="guessRecord-dialog" v-show="dialog" @click="guessRecordClose">
            <div class="guessRecord-dialog-mid" @click="guessRecordClose1">
                <div class="guessRecord-dialog-mid-top-img" @click="guessRecordClose">
                    <img src="../../assets/consultation/close@2x.png">
                </div>
                <div class="guessRecord-dialog-mid-top">
                    <div class="guessRecord-dialog-mid-top-top">
                        <span class="guessRecord-dialog-mid-top-top-span1">
                            竞猜记录详情
                        </span>
                        <span class="guessRecord-dialog-mid-top-top-span2">
                            {{item.guess.games.left.name }} VS {{item.guess.games.right.name }}
                        </span>
                        <span class="guessRecord-dialog-mid-top-top-span3">
                            {{item.guess.title}}
                        </span>
                    </div>
                </div>
                <div class="guessRecord-dialog-mid-bottom">
                    <div class="guessRecord-dialog-mid-bottom-time">
                        <div class="guessRecord-left">
                            投注时间
                        </div>
                        <span class="guessRecord-right">
                            {{item.date.substring(5,10).replace(/-/,"/")}}
                        </span>
                    </div>
                    <div class="guessRecord-dialog-mid-bottom-icon">
                        <div class="guessRecord-left">
                            投注金额
                        </div>
                        <div class="guessRecord-right-jinbi">
                            <img class="guessRecord-right-img" src="../../assets/home/jinbi@2x.png">
                            <span>{{item.base_gold}}</span>
                        </div>
                    </div>
                    <div class="guessRecord-dialog-mid-bottom-dan">
                        <div class="guessRecord-left">
                            单号
                        </div>
                        <div class="guessRecord-right">
                            <span>{{item.order_num}}</span>
                        </div>
                    </div>
                    <div class="guessRecord-dialog-mid-bottom-rong">
                        <div class="guessRecord-left">
                            竞猜内容
                        </div>
                        <span class="guessRecord-right">
                            {{item.answer.title}}
                        </span>
                    </div>
                    <div class="guessRecord-dialog-mid-bottom-lv">
                        <div class="guessRecord-left">
                            竞猜金额*赔率
                        </div>
                        <span class="guessRecord-right">
                            {{item.base_gold}}*{{item.answer.real_odds}}
                        </span>
                    </div>
                </div>
                <div class="guessRecord-dialog-footer">
                    <div class="guessRecord-left">
                        开奖结果
                    </div>
                    <div class="guessRecord-right" v-if="item.status==1">
                        <div class="guessRecord-right" v-if="item.total_gold>0">
                            中奖+
                            <img class="guessRecord-right-img" src="../../assets/home/jinbi@2x.png"> {{item.total_gold}}
                        </div>
                        <div class="guessRecord-right" v-else>
                            {{item.guess.winner_answer}}
                        </div>
                    </div>
                    <div class="guessRecord-right" v-else>
                        暂未开奖
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'guess-record',
    data() {
        return {
            dialog: false
        }
    },
    created () {

    },
    props: {
        item: {
            type: Object,
            default() {
                return {}
            }
        },
        index: {
            type: Number,
            default() {
                return 0
            }
        }
    },
    methods: {
        guessRecordClose() {
          event.cancelBubble=true

          this.dialog = !this.dialog

        },
        guessRecordClose1(){
          event.cancelBubble=true;
          this.dialog=true
        }


    }



}
</script>

<style>
.guessrecord-body {
    display: flex;
    margin-top: 20px;/*px*/
    padding-left: 20px;
    margin-bottom: 18px;/*px*/
    padding-right: 28px;
    width: 710px;
    height: 140px;/*px*/
    background: #253341;
}

.guessrecord-body-left {
    margin-top: 20px;/*px*/
    flex: 1;
}

.guessrecord-body-left-top {
    font-size: 32px;/*px*/
    color: #607d8b;
}

.guessrecord-body-left-mid {
    font-size: 24px;/*px*/
    color: #46c9d5;
}

.guessrecord-body-left-bot {
    font-size: 24px;/*px*/
    color: #607d8b;
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

.guessrecord-body-right {
    text-align: right;
    flex: 1;
}

.guessrecord-body-right-top {
    margin-top: 20px;/*px*/
    color: #607d8b;
}

.guessrecord-body-right-bot {
    margin-top: 20px;/*px*/
    font-size: 32px;/*px*/
    color: #ffea00;
}

.guessrecord-body-right-bot img {
  width:40px;
  height:40px;
    margin-right: 8px;
    margin-left: 8px;
    vertical-align: middle;
}

.guessrecord-body-right-bot-defit {
    color: #607d8b;
    margin-top: 20px;/*px*/
    font-size: 32px;/*px*/
}
.guessrecord-body-right-bot-weika {
    color: #607d8b;
    margin-top: 20px;/*px*/
    font-size: 32px;/*px*/
    color: #46c9d5;

}
.guessRecord-right-jinbi{
  float: right;
  color: #ffea00;
}

.guessRecord-dialog-mid {
  position: fixed;
  overflow:hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  height: 560px;
  /*px*/
  background: #253341;
  z-index: 1001;
  padding-left: 36px;
  padding-right: 36px;
  padding-top: 40px;
  /*px*/
}

.guessRecord-dialog-mid-top-img img {
  width:45px;
  height:45px;
  float: right;
  margin-top: -35px;
  /*px*/
}


.guessRecord-dialog-mid-top {
  height: 160px;
  /*px*/
}

.guessRecord-dialog-mid-top-top span {
  display: block;
  text-align: center;
}

.guessRecord-dialog-mid-top-top {
  margin-top: 20px;
  border-bottom: 1px solid rgb(0, 0, 0);
  /*on*/
}

.guessRecord-dialog-mid-top-top-span1 {
  font-size: 36px;
  /*px*/
  color: #49d4e1;
  /*margin-bottom: 5px;*/
}

.guessRecord-dialog-mid-top-top-span2 {
  font-size: 30px;
  /*px*/
  color: #ffffff;
}

.guessRecord-dialog-mid-top-top-span3 {
  font-size: 30px;
  /*px*/
  color: #ffffff;
  margin-bottom: 10px;
  /*px*/
}

.guessRecord-dialog-mid-bottom {
  font-size: 30px;
  /*px*/
  color: #a7b7c0;
}

.guessRecord-left {
  display: inline-block;
}

.guessRecord-right {
  float: right;
}


.guessRecord-dialog-mid-bottom-time,
.guessRecord-dialog-mid-bottom-icon,
.guessRecord-dialog-mid-bottom-dan,
.guessRecord-dialog-mid-bottom-rong,
.guessRecord-dialog-mid-bottom-lv {
  margin-top: 10px;
  /*px*/
}
.guessRecord-right-img{
  width:40px;
  height:40px;
}
</style>
