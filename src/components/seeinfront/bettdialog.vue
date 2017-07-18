<template>
  <div class="mask">
    <div class="bettdialog-warp">
      <span class="battdialog-close" @click="closeBattdialig"></span>
      <div class="battdialog-title">投注额度</div>
      <ul class="battdialog-ul">
        <li class="battdialog-list" v-for="(item,index) in relmoneyList" :key="index" @click="toggin(index,item)" :class="{'battdialog-active':index==startIndex}">
          <i class="battdialog-icon"></i>
          {{item}}
        </li>
      </ul>
      <div class="bett-info-div">
        <span class="bett-info-left">我的余额</span>
        <span class="better-info-right">
          <i class="bett-info-icon"></i>
          {{getUserInfo.balance||0}}
        </span>
      </div>
      <div class="bett-info-div">
        <span class="bett-info-left">投注金额</span>
        <span class="better-info-right">
          <i class="bett-info-icon"></i>
          {{selectNum}}
        </span>
      </div>
      <div class="bett-info-div">
        <span class="bett-info-left">预计收入</span>
        <span class="better-info-right">
          <i class="bett-info-icon"></i>
          {{getRevenue}}
        </span>
      </div>
      <div class="touzhu-btn" @click="handleTouzhu">投注</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '../../server/api.js'
import { saveAuth, getAuth, getGameType } from '@/handle/auth'

export default {
  name: 'bett-dialog',
  props: {
    dialogData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      moneyList: ['100', '200', '400', '600'],
      startIndex: 0,
      selectNum: 100,
      relmoneyList: [],
      userBlance: 0,
      seeinfrontGameType:''
    }
  },
  mounted() {
    this.moneyListConut()
    this.selectNum = this.relmoneyList[0]
    this.seeinfrontGameType=getGameType()||'1'
  },
  methods: {
    toggin(index, item) {
      this.startIndex = index;
      this.selectNum = parseInt(item);
    },
    closeBattdialig() {
      this.$emit('closeBattdialig', false);
    },
    handleTouzhu() {
      let resultinfo = {
        type: -1,
        msg: ''
      }
      if (this.getUserInfo.balance < this.selectNum) {
        resultinfo.msg = '余额不足'
        this.$emit('bettingResult', resultinfo)
        return
      }
      let gameId=this.seeinfrontGameType=='1'?1:2
      api.bettingApi({
        game_type_id: gameId, //1为lol 2为王者荣耀
        select_id: this.dialogData.id,
        base_gold: this.selectNum
      }).then((res) => {
        let auth = getAuth()
        this.$store.dispatch('setUserInfo', auth);
        if (res.data.status == 0) {
          resultinfo.type = 0;
          resultinfo.msg = '下注成功!';
          this.$emit('bettingResult', resultinfo)
        } else {
          resultinfo.msg = res.data.error;
          this.$emit('bettingResult', resultinfo)
        }
      })
    },
    moneyListConut() {
      let userMoney = this.formatMoney(this.getUserInfo.balance)
      this.moneyList.forEach((item, index) => {
        if (index == 0) {
          userMoney * 0.1 >= item ? this.relmoneyList.push(userMoney * 0.1) : this.relmoneyList.push(item)
        } else if (index == 1) {
          userMoney * 0.2 >= item ? this.relmoneyList.push(userMoney * 0.2) : this.relmoneyList.push(item)
        } else if (index == 2) {
          userMoney * 0.5 >= item ? this.relmoneyList.push(userMoney * 0.5) : this.relmoneyList.push(item)
        } else if (index == 3) {
          userMoney * 1 >= item ? this.relmoneyList.push(userMoney * 1) : this.relmoneyList.push(item)
        }
      })
    },
    formatMoney(num) {
      let stringNum = num + ''
      let number = stringNum.substr(0, 1)
      let lengthNum = stringNum.length - 1
      for (let i = 0; i < lengthNum; i++) {
        number = number + '0'
      }
      return parseInt(number)
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    getRevenue() {
      return (this.dialogData.real_odds * this.selectNum).toFixed(0)
    }
  },
}
</script>

<style>
.bettdialog-warp {
  width: 670px;
  height: 720px;
  /*px*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #263238;
}

.battdialog-close {
  display: block;
  width: 45px;
  height: 45px;
  /*px*/
  background: url('../../assets/consultation/close@2x.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 20px;
  /*px*/
  right: 40px;
}

.battdialog-title {
  margin-top: 26px;
  /*px*/
  font-size: 36px;
  /*px*/
  color: #a9c8d7;
  text-align: center;
  margin-bottom: 40px;
  /*px*/
}

.battdialog-ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 40px;
  /*px*/
}

.battdialog-list {
  position: relative;
  width: 155px;
  height: 100px;
  /*px*/
  background: #253341;
  border: 2px solid #323e4c;
  /*px*/
  border-radius: 10px;
  padding-left: 130px;
  line-height: 100px;
  /*px*/
  font-size: 30px;
  /*px*/
  color: #a9c9d7;
  margin-bottom: 20px;
  /*px*/
}

.battdialog-active {
  border-color: #13aa9c !important;
  color: #ffea00;
}

.battdialog-icon {
  width: 36px;
  height: 36px;
  /*px*/
  background: url('../../assets/home/jinbi@2x.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 32px;
  /*px*/
  left: 88px;
}

.bett-info-div {
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 20px;
  /*px*/
}

.bett-info-left {
  font-size: 32px;
  color: #a9c8d7;
}

.better-info-right {
  position: relative;
  padding-left: 50px;
  font-size: 32px;
  color: #fff;
}

.bett-info-icon {
  width: 36px;
  height: 36px;
  /*px*/
  background: url('../../assets/home/jinbi@2x.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 5px;
  /*px*/
  left: 0px;
}

.touzhu-btn {
  width: 590px;
  height: 100px;
  /*px*/
  text-align: center;
  line-height: 100px;
  /*px*/
  font-size: 32px;
  color: #fff;
  background: #13aa9c;
  border-radius: 40px;
  /*px*/
  margin: 0 auto;
}
</style>
