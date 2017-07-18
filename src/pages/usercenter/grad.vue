<template>
  <div class="col-sm-10 cursor-default">
    <div class="page-header-wrap">
      <!-- header -->
      <div class="weChat-title">
        <span class="weChat-title-icon" @click="goback">
          <img src="../../assets/lineUp/back@2x.png" />
        </span>
        规则评分
      </div>
    </div>
    <div class="user-profile-content-block alpha-generic-content">
      <h5>规则 &amp; 评分</h5>
      <h6>竞赛规则</h6>
      <p> 在每场竞赛中，Fantasy Esports会根据所参考的英雄联盟比赛列出所有的参赛队伍和参赛队员。并根据这些队伍及队员以往的表现给予一定的评分（即薪资）。在游戏开始之前，玩家会得到50000元的薪资预算，玩家将使用这笔预算在参赛队伍和队员名单中自行选择任意6名参赛队员+1支参赛队伍组成自己的Fantasy 竞赛队伍与其他玩家一同较量。 如果Fantasy Esports竞赛创建之后，游戏战队出现临时更换选手阵容的情况，Fantasy Esports计分参照替补队员的表现。具体规则详见“选手换人计分原则”。</p>
  
      <h6>Fantasy Esports竞赛队伍角色组成</h6>
      <p>一支Fantasy Esports竞赛队伍由6名队员和1支lol战队组成，包括：Top，Jungle，Mid，Adc，Support，Flex以及1支lol战队。</p>
  
      <h6>英雄联盟 | 评分</h6>
      <p>积分规则:</p>
      <table class="alpha-table short alpha-border-table" cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th class="text-right">击杀</th>
            <th class="text-right">助攻</th>
            <th class="text-right">死亡</th>
            <th class="text-right">补刀</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-right">+3分/次</td>
            <td class="text-right">+2分/次</td>
            <td class="text-right">-1分/次</td>
            <td class="text-right">+0.01分/个</td>
          </tr>
        </tbody>
      </table>
  
      <p>队伍积分规则:</p>
      <table class="alpha-table short alpha-border-table" cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th class="text-right">摧毁敌方防御塔</th>
            <th class="text-right">击杀巨龙</th>
            <th class="text-right">击杀男爵</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-right">+1分/座</td>
            <td class="text-right">+2分/次</td>
            <td class="text-right">+3分/次</td>
          </tr>
        </tbody>
      </table>
  
      <h6>其他规则</h6>
      <!--<h6>POSITION ELIGIBILITY</h6>
              <p> All Position determinations for daily contests are at the sole discretion of AlphaDraft. </p>
      
              <h6>TRADES, FREE AGENTS, AND BENCH PLAYERS</h6>
              <p> Since you only select players for a single series of games or events, there will be no trading of players,
                  no free agent pick-ups, and no bench players involved in the contests. </p>-->
  
      <h6>选手换人计分原则</h6>
      <p> 如有原定选手因故未参加比赛的，则他的积分由代替他比赛的选手的数据计算。</p>
      <p> 例如：</p>
      <p> 原定阵容为选手A打上单位置、选手B打中单位置。实际比赛时，由于各种原因，最终上场阵容为擅长中单的选手B打了上单位置，擅长辅助位的选手C打了中单位置，比赛结果为B在上单位置成绩为1杀2死3助攻，C在中单位置成绩为4杀5死6助攻，则最终在Fantasy Esports竞赛中记录的数据为上单位置选手A获得4杀5死6助攻，中单选手B获得1杀2死3助攻
      </p>
  
      <h6>基础得分规则</h6>
      <p> 由于各种原因（比赛取消、原定BO3的3局比赛，由于2-0比分少赛一局等等）比赛没有成功进行，没有数据时，该场比赛的队伍双方将获得一定的基础分数。</p>
      <p> 基础得分如下:
        <br> - &nbsp;个人 – 每场比赛得10分
        <br>
        <!--- &nbsp;Dota2 – 10 pts per game <br />-->
        - &nbsp;队伍 – 每场比赛得5分
        <br>
        <!--- &nbsp;Smite – 10 pts per game <br />-->
      </p>
  
      <h6>比赛延期或太短</h6>
      <p> 如果比赛延期或者太短（时间小于15分钟），该比赛的队员及队伍将得到基础得分</p>
  
      <h6>BO3/5/7（三局两胜/五局三胜/七局五胜）规则</h6>
      <p> BO3/5/7（三局两胜/五局三胜/七局五胜）赛制中，一方率先获得2/3/5局胜利而致使整轮比赛提前结束的，余下的比赛场次，双方的队员及队伍都将获得基础得分</p>
  
      <h6>参加竞赛的截止时间</h6>
      <p> 每场竞赛都将在游戏比赛开始时截止，截止之后，玩家将不能再参加该场竞赛，亦不能修改参赛阵容或取消参加竞赛</p>
  
      <h6>奖金</h6>
      <p> Fantasy Esports会在比赛结束之后，根据官方确认的比赛数据对玩家的参赛阵容进行计分，根据结果发放奖金</p>
  
    </div>
  </div>
</template>
<script>
import router from '../../router/index.js'
export default {
  name: 'grad',
  data() {
    return {

    }
  },
  methods: {
    goback() {
      router.push({ name: 'usercenter' })
    }
  }
}
</script>
<style scoped src='../../css/pages/usercenter/grad.css'>

</style>
