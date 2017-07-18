<template>
  <div class="mask" v-if="isShow" @click="hidedialog">
    <div class="mask-default-content">
      <div class="mask-default-box1">
  
        <div class=" total-score-picture">
          <div class="total-score-close" @click="hidedialog">
            <img src=../../assets/exchange/close@2x.png alt="" > 
          </div>
          <div class="score-user-info">
            <span class="header-shot-url">
              <img :src="myItem.head_img_url" alt="">
              <strong>{{ myItem.username }}</strong>
            </span>
          </div>
        </div>
  
        <!-- 战队得分 -->
        <div class="result-item-wrap team-score flex-box result-item-wrap-top">
          <div class="flex-item team-img text-center">
            <div>
              <img :src="team.teamImg" alt="">
            </div>
          </div>
          <div class="flex-item team-name text-center">
            <div>{{ team.teamName }}
              <p>战队</p>
            </div>
          </div>
          <div class="flex-item team-point text-center">
            <div>{{ team.teamTotal }}
              <p>得分</p>
            </div>
          </div>
        </div>
  
        <!-- 队员得分 -->
        <div class="result-item-wrap play-score clearfix result-item-wrap-box">
  
          <!-- 上单 -->
          <div class="result-player-item result-player-item-box">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player1.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player1.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">上单</div>
            </div>
            <!-- 队员信息 -->
            <div class="result-player-info">
              <div class="clearfix">
                <div class="result-player-team left">
                  <img :src="player1.playerTeam" alt="">
                </div>
                <div class="result-player-name right">{{ player1.playersName }}</div>
              </div>
            </div>
          </div>
  
          <!-- 中单 -->
          <div class="result-player-item margin-left-right result-player-item-box">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player3.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player3.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">中单</div>
            </div>
            <!-- 队员信息 -->
            <div class="result-player-info">
              <div class="clearfix">
                <div class="result-player-team left">
                  <img :src="player3.playerTeam" alt="">
                </div>
                <div class="result-player-name right">{{ player3.playersName }}</div>
              </div>
            </div>
          </div>
  
          <!-- 打野 -->
          <div class="result-player-item result-player-item-box">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player2.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player2.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">打野</div>
            </div>
            <!-- 队员信息 -->
            <div class="result-player-info">
              <div class="clearfix">
                <div class="result-player-team left">
                  <img :src="player2.playerTeam" alt="">
                </div>
                <div class="result-player-name right">{{ player2.playersName }}</div>
              </div>
            </div>
          </div>
  
          <!-- 替补 -->
          <div class="result-player-item result-player-item-box">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player6.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player6.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">替补</div>
            </div>
            <!-- 队员信息 -->
            <div class="result-player-info">
              <div class="clearfix">
                <div class="result-player-team left">
                  <img :src="player6.playerTeam" alt="">
                </div>
                <div class="result-player-name right">{{ player6.playersName }}</div>
              </div>
            </div>
          </div>
  
          <!-- 辅助 -->
          <div class="result-player-item margin-left-right result-player-item-box">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player5.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player5.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">辅助</div>
            </div>
            <!-- 队员信息 -->
            <div class="result-player-info">
              <div class="clearfix">
                <div class="result-player-team left">
                  <img :src="player5.playerTeam" alt="">
                </div>
                <div class="result-player-name right">{{ player5.playersName }}</div>
              </div>
            </div>
          </div>
  
          <!-- CDA -->
          <div class="result-player-item result-player-item-box">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player4.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player4.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">CDA</div>
            </div>
            <!-- 队员信息 -->
            <div class="result-player-info">
              <div class="clearfix">
                <div class="result-player-team left">
                  <img :src="player4.playerTeam" alt="">
                </div>
                <div class="result-player-name right">{{ player4.playersName }}</div>
              </div>
            </div>
          </div>
  
        </div>
  
        <!-- 总分数 -->
  
        <div class="score-total score-total-many">
          <div class="text-right">
            总分
            <span class="text-right-count">{{ myItem.point }}</span>
          </div>
        </div>
  
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'result-dialog',
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    },
    myItem: {
      type: Object,
      default() {
        return {}
      }
    },
    team: {
      type: Object,
      default() {
        return {}
      }
    },
    player1: {
      type: Object,
      default() {
        return {}
      }
    },
    player2: {
      type: Object,
      default() {
        return {}
      }
    },
    player3: {
      type: Object,
      default() {
        return {}
      }
    },
    player4: {
      type: Object,
      default() {
        return {}
      }
    },
    player5: {
      type: Object,
      default() {
        return {}
      }
    },
    player6: {
      type: Object,
      default() {
        return {}
      }
    },
    totalScore: {
      type: Object,
      default() {
        return {}
      }
    },



  },
  data() {
    return {

    }
  },
  methods: {
    hidedialog() {
      this.$emit('hidedialog', false);
    }
  }
}
</script>
<style>
.mask {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 750px;
  transform: translate(-50%, -50%);
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.mask-default-box1 {
  width: 638px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  z-index: 20;
  border-radius: 10px;
}

.result-player-item-box {
  width: 194px;
  height: 160px;
  
}
.mask-default-content{
 width:670px;
 height:830px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  z-index: 20;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, .8)
}
.total-score-close{
  display: inline-block;
  float: right;
}
.result-item-wrap-top{
  margin-top: 20px;
}


</style>
