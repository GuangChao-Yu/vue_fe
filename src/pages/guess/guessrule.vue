<template>
  <div>
    <div class="weChat-title">
      <span class="weChat-title-icon" @click="goback">
        <img src="../../assets/lineUp/back@2x.png">
      </span>
      竞猜规则说明
    </div>
    <h5>竞猜规则说明</h5>
    <p>【竞猜内容】：可竞猜内容为英雄联盟相关比赛事件和赛果，每场赛事有多道竞猜题可供竞猜，请点击“更多玩法”；</p>
    <p>【竞猜流程】：当用户确认参与竞猜，系统将自动扣除相应的金币数额。如竞猜正确，系统将在开奖结果揭晓后，自动派送对应奖励（金币），即时结算。奖励计算方式为“投入金币*赔率系数”。</p>
    <p>【活动奖品】：本次竞猜中累计的金币，可用于“金币兑换”里换取相应奖励，包括英雄联盟皮肤、腾讯Q币等丰厚礼品，参与度越高，奖励越丰富哟！</p>
    <p>注：用户知悉，互联网业务活动存在诸多不确定性，因此理解并同意，如因不可抗力，以及活动中存在大面积作弊行为、通讯线路故障、网络异常或计算机大规模瘫痪等原因，致使活动难以继续，举办方可取消、修改或暂停本活动。用户不得以任何第三方作弊软件以及其他违规行为参与本活动，一经发现，不予发奖，对已发奖的，有权要求用户返还。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goback() {
      this.$router.push({ name: 'guess' })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;/*px*/
  /*px*/
  padding-top: 10px;/*px*/
  /*px*/
  color: #B0BEC5;
  font-size: 24px;/*px*/
}

h5 {
  padding-left: 10px;

  font-size: 38px;/*px*/
  /*px*/
  color: #607D8B;
  margin-top: 0px;
  /*px*/
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 24px;/*px*/
  /*px*/
  font-weight: 300;
}
</style>
