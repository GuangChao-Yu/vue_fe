<template>
  <div class="col-sm-10">
    <div class="page-header-wrap">
      <!-- header -->
      <div class="weChat-title">
        <span class="weChat-title-icon" @click="goback">
          <img src="../../assets/lineUp/back@2x.png" />
        </span>
        常见问题
      </div>
    </div>
    <div class="user-profile-content-block cursor-default">
      <h5>常问问题</h5>
      <dl class="alpha-faq">
  
        <dt>Fantasy Esports是什么？</dt>
        <dd>
          <p> 在Fantasy Esports上可以根据自己的喜好组建自己的LOL战队与其他玩家同台竞技，您会获得50000元用于招募自己的6位队员外加1只战队，通过他们在实际赛事中的表现获得积分，队员积分和队伍积分的总和高的玩家获胜。</p>
        </dd>
  
        <dt>lol积分规则:</dt>
        <dd>
          <p>队员积分规则:</p>
          <table class="alpha-table short alpha-border-table" cellspacing="0" cellpadding="0" border="0">
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
        </dd>
  
        <dt>队伍积分规则:</dt>
        <dd>
  
          <table class="alpha-table short alpha-border-table" cellspacing="0" cellpadding="0" border="0">
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
        </dd>
  
        <dt>Fantasy Esports是免费的吗？</dt>
        <dd>
          <p> Fantasy Esports会一直提供免费竞赛供玩家体验。充值通道开放后，还会提供收费竞赛，当您熟悉Fantasy Esports的规则后可以参加更多的收费竞赛，赢取更多金币。 </p>
        </dd>
  
        <dt>充值&兑换</dt>
        <dd>
          <p>充值和兑换通道尚未开放，敬请期待</p>
        </dd>
  
        <dt>在哪里能看到我参加的竞赛？</dt>
        <dd>
          <p> 在菜单栏中的“我的竞赛”，在这个页面您可以看到: </p>
          <ul class="alpha-bullet-list">
            <li> ● 即将开始的竞赛：可以查看您已参加的竞赛中尚未开始的竞赛信息，并且在竞赛开始之前，您都可以编辑修改您参赛的队伍，或者撤销参赛。
            </li>
            <li> ● 正在进行的竞赛：已开始的竞赛将在这一列中显示。需要注意的是，在竞赛开始之后，您将不能再编辑修改您的队伍或者撤销参赛。
            </li>
            <li> ● 已结束的竞赛：在这一条目中您可以浏览以往参加过的竞赛的结果。所有已经结束的竞赛都会在这里显示，您可以看到您最后所处的名次及您的胜负情况和奖金。
            </li>
          </ul>
        </dd>
  
        <dt>创建了队伍阵容后，我还能修该改吗？</dt>
        <dd>
          <p>可以，在竞赛开始之前，您都可以编辑修改您的队伍，而在此之后，你选择参赛的阵容将会被锁定。</p>
          <p>需要修改队伍阵容时，可以进入“我的队伍”页面中在想要修改的队伍后点击“编辑队伍”按钮即可进行修改。</p>
          <p>您也可以在“我的竞赛”页面中对队伍进行修改。</p>
        </dd>
  
        <dt>赛事结束，结果是我获胜了，但在“我的账户”中没有显示奖金？</dt>
        <dd>
          <p>Fantasy Esports的赛事数据都来自于lol赛事组织方，只有在组织方确认并发布比赛结果、数据后才会发放奖金。</p>
        </dd>
  
        <dt>英雄联盟板块天梯排位说明：</dt>
        <dd>
          <p>Fantasy Esports中设有天梯排位体系，英雄联盟板块共分“黄铜、白银、黄金、铂金、钻石、大师、王者”七个段位。</p>
          <p>其中“黄铜、白银、黄金、铂金、钻石”为一个体系。每个段位又分5个等级，即“黄铜5”为最低，“钻石1”为最高。比“钻石1“更高一层的段位称为“大师”。“大师”不再分级。所有玩家中的前200名为“王者”。</p>
        </dd>
  
        <dt>积分说明：</dt>
        <dd>
          <p>玩家每次参加的竞赛结束后，发放奖金的同时会根据玩家的“队伍得分”和“参赛费用”以及“竞赛类型”给出一定的积分。“队伍得分”和“参赛费用”越高，所获得的积分就越高。</p>
          <p>积分累加到一定的分值就能达到对应的段位等级</p>
          <table class="alpha-table short alpha-border-table" cellspacing="0" cellpadding="0" border="0">
            <thead>
              <tr class="biao">
                <th class="text-center">段位图片</th>
                <th class="text-center">段位等级</th>
                <th class="text-center">需要积分</th>
                <th class="text-center">与前一等级相差</th>
              </tr>
            </thead>
            <tbody>
              <!--黄铜 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangtong5.png" alt="黄铜5">
                </td>
                <td class="text-center">黄铜5</td>
                <td class="text-center">0</td>
                <td class="text-center">0</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangtong4.png" alt="黄铜5">
                </td>
                <td class="text-center">黄铜4</td>
                <td class="text-center">2000</td>
                <td class="text-center">2000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangtong3.png" alt="黄铜5">
                </td>
                <td class="text-center">黄铜3</td>
                <td class="text-center">4000</td>
                <td class="text-center">2000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangtong2.png" alt="黄铜5">
                </td>
                <td class="text-center">黄铜2</td>
                <td class="text-center">6000</td>
                <td class="text-center">2000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangtong1.png" alt="黄铜5">
                </td>
                <td class="text-center">黄铜1</td>
                <td class="text-center">8000</td>
                <td class="text-center">2000</td>
              </tr>
  
              <!-- 白银 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/baiyin5.png" alt="白银5">
                </td>
                <td class="text-center">白银5</td>
                <td class="text-center">11000</td>
                <td class="text-center">3000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/baiyin4.png" alt="白银4">
                </td>
                <td class="text-center">白银4</td>
                <td class="text-center">14000</td>
                <td class="text-center">3000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/baiyin3.png" alt="白银3">
                </td>
                <td class="text-center">白银3</td>
                <td class="text-center">17000</td>
                <td class="text-center">3000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/baiyin2.png" alt="白银2">
                </td>
                <td class="text-center">白银2</td>
                <td class="text-center">20000</td>
                <td class="text-center">3000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/baiyin1.png" alt="白银1">
                </td>
                <td class="text-center">白银1</td>
                <td class="text-center">23000</td>
                <td class="text-center">3000</td>
              </tr>
  
              <!-- 黄金 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangjin5.png" alt="黄金5">
                </td>
                <td class="text-center">黄金5</td>
                <td class="text-center">27000</td>
                <td class="text-center">4000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangjin4.png" alt="黄金5">
                </td>
                <td class="text-center">黄金4</td>
                <td class="text-center">31000</td>
                <td class="text-center">4000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangjin3.png" alt="黄金5">
                </td>
                <td class="text-center">黄金3</td>
                <td class="text-center">35000</td>
                <td class="text-center">4000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangjin2.png" alt="黄金5">
                </td>
                <td class="text-center">黄金2</td>
                <td class="text-center">39000</td>
                <td class="text-center">4000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/huangjin1.png" alt="黄金5">
                </td>
                <td class="text-center">黄金1</td>
                <td class="text-center">43000</td>
                <td class="text-center">4000</td>
              </tr>
  
              <!-- 铂金 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/bojin5.png" alt="铂金5">
                </td>
                <td class="text-center">铂金5</td>
                <td class="text-center">48000</td>
                <td class="text-center">5000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/bojin4.png" alt="铂金5">
                </td>
                <td class="text-center">铂金4</td>
                <td class="text-center">53000</td>
                <td class="text-center">5000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/bojin3.png" alt="铂金5">
                </td>
                <td class="text-center">铂金3</td>
                <td class="text-center">58000</td>
                <td class="text-center">5000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/bojin2.png" alt="铂金5">
                </td>
                <td class="text-center">铂金2</td>
                <td class="text-center">63000</td>
                <td class="text-center">5000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/bojin1.png" alt="铂金5">
                </td>
                <td class="text-center">铂金1</td>
                <td class="text-center">68000</td>
                <td class="text-center">5000</td>
              </tr>
  
              <!-- 钻石 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/zuanshi5.png" alt="钻石5">
                </td>
                <td class="text-center">钻石5</td>
                <td class="text-center">74000</td>
                <td class="text-center">6000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/zuanshi4.png" alt="钻石5">
                </td>
                <td class="text-center">钻石4</td>
                <td class="text-center">80000</td>
                <td class="text-center">6000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/zuanshi3.png" alt="钻石5">
                </td>
                <td class="text-center">钻石3</td>
                <td class="text-center">86000</td>
                <td class="text-center">6000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/zuanshi2.png" alt="钻石5">
                </td>
                <td class="text-center">钻石2</td>
                <td class="text-center">92000</td>
                <td class="text-center">6000</td>
              </tr>
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/zuanshi1.png" alt="钻石5">
                </td>
                <td class="text-center">钻石1</td>
                <td class="text-center">98000</td>
                <td class="text-center">6000</td>
              </tr>
  
              <!-- 大师 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/dashi.png" alt="大师">
                </td>
                <td class="text-center">大师</td>
                <td class="text-center">110000</td>
                <td class="text-center">12000</td>
              </tr>
  
              <!-- 王者 -->
              <tr>
                <td class="text-center">
                  <img src="../../assets/segment/wangzhe.png" alt="王者">
                </td>
                <td class="text-center">王者</td>
                <td class="text-center">网站Top200名</td>
                <td class="text-center"></td>
              </tr>
            </tbody>
          </table>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import router from '../../router/index'
export default {
  name: 'problem',
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
<style scoped>
h5 {
  font-size: 34px;
  /*px*/
  color: white;
  margin-top: 0px;
  /*px*/
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 24px;
  /*px*/
  font-weight: 300;
}

p {
  font-size: 26px;
  /*px*/
  color: #B0BEC5;
  font-weight: 400;
  margin-bottom: 12px;
  /*px*/
}

dt {
  font-size: 32px;
  /*px*/
  color: #607D8B;
  margin-bottom: 24px;
  /*px*/
}

dd {
  font-size: 32px;
  /*px*/
}

th {
  color: #607D8B;
}

tr {
  line-height: 68px;
  /*px*/
}

.user-profile-content-block {
  padding-top: 16px;
  /*px*/
  padding-right: 16px;
  padding-bottom: 16px;
  /*px*/
  padding-left: 16px;
  font-family: "HanHei SC", "PingFang SC", "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
}

.alpha-table {
  font-size: 30px;
  /*px*/
}

.alpha-border-table {
  border: 2px solid rgba(84, 110, 122, .2);
  /*no*/
}

table {
  display: table;
  width: 100%;
}

tbody {
  border-top: 2px solid rgba(84, 110, 122, .2);
  /*no*/
  line-height: 68px;
  /*px*/
}

.alpha-faq dd table,
.alpha-generic-content table {
  box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
}

.alpha-table tbody tr td {
  color: #B0BEC5;
  background: rgba(42, 55, 62, .5);
}

li {
  list-style-type: disc;
  padding-left: 82px;
  color: #B0BEC5;
  text-align: -webkit-match-parent;
  font-size: 28px;
  /*px*/
  margin-bottom: 12px;
  /*px*/
}

.alpha-bullent-list {
  color: #B0BEC5;
}

.alpha-faq dd {
  margin-bottom: 34px;
  /*px*/
}
</style>
