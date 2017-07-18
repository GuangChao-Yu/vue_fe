<template>
  <transition name="confirm" v-if="isShowConfirm">
    <div class="mask">
      <div class="confirm-dialog">
        <span class="confirm-close" @click="hideConfrim()"></span>
        <p class="confirm-dialog-title">提交信息</p>
        <div class="confirm-con clearfix">
          <div class="confirm-logo"><img src="../../assets/modal/lpl@2x.png" /></div>
          <div class="jinbi-list"><span class="cost-name">金币</span>
            <img class="config-icon" src="../../assets/home/jinbi@2x.png" />
            <i class="config-num">{{ticket}}</i>
          </div>
          <div class="dianquan-list"><span class="cost-name">点券</span>
          <img class="config-icon" src="../../assets/home/dianquan@2x.png" />
           <i class="config-num">{{ticketPoint}}</i>
          </div>
        </div>
        <div class="btn-warp">
          <div class="jinbi-btn" @click="sendType(1)">
          金币确认</div>
          <div class="dianquan-btn" @click="sendType(2)">
          点券确认</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'dialog-confirm',
  data() {
    return {}
  },
  props:{
    ticket:{
      type:Number,
      default(){
        return 0
      }
    },
    ticketPoint:{
      type:Number,
      default(){
        return 0
      }
    },
    isShowConfirm:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  methods:{
    sendType(tye){
      this.$emit('sendType',tye);
    },
    hideConfrim(){
      this.$emit('hideConfrim',false);
    }
  }
}
</script>

<style src="../../css/commponent/dialogconfirm.css">

</style>
