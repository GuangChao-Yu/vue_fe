<template>
  <div>

    <!-- 视频标题 -->
    <div class="contest-result-title clearfix">
      <!--<route-link class="left" @click="backPage"><</route-link>-->
      <div class="text-center" v-if="show">{{video.live_title}}</div>
      <div v-else>
        <div class="text-center"></div>
      </div>

    </div>

    <!-- 视频回放 -->
    <div class="video-player">
      <div v-on:click="goBack()" class="go-back">
        < </div>
          <div v-if="show">

            <a class="video-player-a" href="http://lpl.qq.com/es/m/index.htm">
              <img class="video-player" :src="video.live_img">
            </a>
            <!--<img v-if="exchangeshow" class="video-player" @click="changeiframe" :src="video.live_img">
                              <iframe v-else frameborder="0" class="video-player" :src="video.live_url"></iframe>-->
          </div>
          <div v-else>
            <iframe v-if="exchangeshow" allowfullscreen frameborder="0" class="video-player" :src="video1.video_url"></iframe>
            <img v-else class="video-player" @click='changeiframe' :src="video.no_video_url">
          </div>
      </div>
      <!-- tab切换 -->
      <div class="video-tabs-list flex-box text-center">
        <div class="flex-item tabs-item" v-for="(item,index) in tabs" @click="toggleTab(item,index)" :class="activeTab == item ? 'header-active-bar':'' ">{{ item }}</div>
      </div>

      <!-- 我的分数 -->
      <div class="contest-result-content my-score" v-show="index === 0 ">

        <!-- 战队得分 -->
        <div class="result-item-wrap team-score flex-box">
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
        <div class="result-item-wrap play-score clearfix">

          <!-- 上单 -->
          <div class="result-player-item">
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
          <div class="result-player-item margin-left-right">
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
          <div class="result-player-item">
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
          <div class="result-player-item">
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
          <div class="result-player-item margin-left-right">
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
          <div class="result-player-item">
            <!-- header url -->
            <div class="result-player-header">
              <img :src="player4.playersHeaderUrl" alt="">
            </div>
            <!-- 得分 -->
            <div class="result-player-score text-right">
              <div class="player-result-totalScore">{{ player4.playersTotalScore }}
                <p>得分</p>
              </div>
              <div class="player-result-position">ADC</div>
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
        <div class="result-item-wrap total-score">

          <div class="score-user-info">
            <span class="header-shot-url">
              <img :src="totalScore.headerUrl" alt="">
              <strong>{{ totalScore.userName }}</strong>
            </span>
          </div>

          <div class="score-total">
            <div class="text-right">
              总分
              <span>{{ totalScore.score }}</span>
            </div>
          </div>

        </div>

      </div>

      <!-- 排行榜 -->
      <div class="contest-result-content rank-list contest-result-content-my" v-show="index === 1 ">

        <!-- 排行榜 title -->
        <div class="rank-list-title">
          <div class="list-title-top clearfix">
            <div class="left">
              <h4>总排名</h4>
            </div>
            <div class="right">
              <!--<button>我的名次</button>
                                      <button>最后获胜位置</button>-->
            </div>
          </div>
          <div class="list-title-bottom">
            <table class="rank-list-table-header">
              <thead>
                <tr>
                  <th class="text-left th-col-10">名次</th>
                  <th class="text-left th-col-50">用户</th>
                  <th class="th-col-20">奖金</th>
                  <th class="th-col-20">得分</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        <!-- 列表 -->
        <div class="rank-list-content">
          <table class="rank-list-table-body">
            <tbody>

              <template v-for="(item,index) in rankList">
                <tr @click="rankListClick(item,index)">
                  <td class="text-left th-col-10">
                    <div> {{ item.rank }} </div>
                  </td>
                  <td class="text-left th-col-50">
                    <div class="clearfix rank-user-info">
                      <div class="rank-user-header left">
                        <img :src="item.head_img_url" alt="">
                      </div>
                      <span class="rank-user-name left user-n">{{ item.username }}</span>
                      <div class="rank-user-position left">
                        <img :src="item.egment" alt="">
                      </div>
                    </div>
                  </td>
                  <td class="th-col-20">
                    <div class="rank-reward">
                      <span>{{ item.rewordfee }}</span>
                      <img src="../../assets/home/jinbi@2x.png" alt="">
                    </div>
                  </td>
                  <td class="th-col-20">
                    <div> {{ item.point }} </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!--我的排行-->
        <div class="rank-list-content-my" v-show="isShow1">
          <table class="rank-list-table-body">
            <tbody>

              <template>
                <tr>
                  <td class="text-left th-col-10">
                    <div> {{ mydata.my_rank }} </div>
                  </td>
                  <td class="text-left th-col-50">
                    <div class="clearfix rank-user-info">
                      <div class="rank-user-header left">
                        <img :src="totalScore.headerUrl" alt="">
                      </div>
                      <span class="rank-user-name left user-n">{{ totalScore.userName }}</span>
                      <div class="rank-user-position left">
                        <img :src="mydata.my_egment" alt="">
                      </div>
                    </div>
                  </td>
                  <td class="th-col-20">
                    <div class="rank-reward">
                      <span>{{ mydata.my_rewordfee }}</span>
                      <img src="../../assets/home/jinbi@2x.png" alt="">
                    </div>
                  </td>
                  <td class="th-col-20">
                    <div> {{ totalScore.score }} </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

      </div>

      <!-- 赛事回顾 -->
      <div class="contest-result-content contest-video" v-show="index === 2 ">
        <ul class="clearfix">
          <li @click="playVideo(item,index)" v-for="(item,index) in videoList" class="video-list-item left">
            <div class="video-list-img">
              <img :src="item.video_face_url" alt="">
            </div>
            <div class="video-list-text">
              <p>{{item.team1}} VS {{ item.team2 }} R {{item.round}}</p>
            </div>
          </li>
        </ul>
      </div>
      <result-dialog v-if="isShowDialogFeault" :isShow="isShowDialogFeault" v-on:hidedialog="hidedialog" :team="team" :player1="player1" :player2="player2" :player3="player3" :player4="player4" :player5="player5" :player6="player6" :myItem="myItem"></result-dialog>
      <new-guide :num="num" v-if="isShow" :isShow="isShow"></new-guide>

  </div>
</template>

<script>
import * as api from '../../server/api.js'
import resultDialog from '../../components/common/contestResultDialog.vue'
import { getAuth } from '@/handle/auth'
import router from '../../router/index.js'
import _ from 'lodash'
import newguide from '../../components/common/newguide'
export default {
  name: 'contestResult',
  components: {
    [resultDialog.name]: resultDialog,
    [newguide.name]:newguide,

  },
  data() {
    return {
      isShowDialogFeault: false,
      hide: false,
      isShow1: true,
      isShow:false,
      page: 1,
      totalPage: 0,
      show: true,
      num:3,
      exchangeshow: true,
      video1: {
        team1: '',
        team2: '',
        video_url: '',
        video_face_url: ''
      },

      video: {
        live_url: "",
        live_title: "",
        live_img: '',
        no_video_url: ''
      },
      team: {
        teamTotal: 0,
        teamImg: "",
        teamName: ""
      },
      player1: {     // 上单
        playersHeaderUrl: "",
        playersId: 0,
        playersName: "",
        playersTotalScore: 0,
        playerTeam: ""
      },
      player2: {     // 打野
        playersHeaderUrl: "",
        playersId: 0,
        playersName: "",
        playersTotalScore: 0,
        playerTeam: ""
      },
      player3: {     // 中单
        playersHeaderUrl: "",
        playersId: 0,
        playersName: "",
        playersTotalScore: 0,
        playerTeam: ""
      },
      player4: {     // ADC
        playersHeaderUrl: "",
        playersId: 0,
        playersName: "",
        playersTotalScore: 0,
        playerTeam: ""
      },
      player5: {     // 辅助
        playersHeaderUrl: "",
        playersId: 0,
        playersName: "",
        playersTotalScore: 0,
        playerTeam: ""
      },
      player6: {     // 替补
        playersHeaderUrl: "",
        playersId: 0,
        playersName: "",
        playersTotalScore: 0,
        playerTeam: ""
      },
      totalScore: {
        userName: '',
        headerUrl: "",
        score: 0
      },

      mydata: {},

      //排行榜
      rankList: [],

      //赛事回顾
      videoList: [],

      tabs: ['我的分数', '排行榜'],
      activeTab: '我的分数',
      index: 0,
      myId: 0,
      myItem: {}
    }
  },
  created() {
    let vm = this;
    let myContestId = this.$route.params.myContestId;
    let myId = this.$route.params.myId;
    if (myId == 1) {
      vm.tabs.push("赛事回顾")
      this.show = !this.show
    }
    let auth = {
      uid: 0,
      token: "",
    };

    if (this.$route.query.uid && this.$route.query.token) {
      //用户凭证url参数传递
      auth.token = this.$route.query.token;
      auth.uid = this.$route.query.uid;
    } else if (getAuth()) {
      //用户登录
      let user = getAuth();
      auth.token = user.token;
      auth.uid = user.uid;
    }
    //用户信息
    api.getUserInfo({
      token: auth.token,
      uid: auth.uid
    }).then(function (resp) {
      let data = resp.data.result;
      vm.totalScore.userName = data.user_name;
      vm.totalScore.headerUrl = data.head_img_url;

    });

    //我的竞赛结果详情
    api.contestResult({
      token: auth.token,
      uid: auth.uid,
      billId: myContestId
    }).then(function (resp) {
      let data = resp.data.result;
      vm.mydata = resp.data.result;
      vm.video = resp.data.result;




      //判断比赛是进行中还是已结束 contest_type ： 1-未开始  2-进行中  3-已结束
      if (data.contest.contest_type === 3) {
        vm.videos = resp.data.result.match_video_list;
        vm.video1 = _.first(vm.videos)

        if (vm.videos.length == 0) {
          vm.exchangeshow = !vm.exchangeshow


        }
      }

      //所选队伍
      let myTeam = data.my_contest_info;

      //战队
      vm.team.teamTotal = myTeam.team.team_total_points;
      vm.team.teamImg = myTeam.team.teams_img_url;
      vm.team.teamName = myTeam.team.teams_name

      //上单
      vm.player1.playersHeaderUrl = myTeam.playid1.players_header_url;
      vm.player1.playersId = myTeam.playid1.players_id;
      vm.player1.playersName = myTeam.playid1.players_name;
      vm.player1.playersTotalScore = myTeam.playid1.players_total_score;
      vm.player1.playerTeam = myTeam.playid1.teams_img_url;

      //打野
      vm.player2.playersHeaderUrl = myTeam.playid2.players_header_url;
      vm.player2.playersId = myTeam.playid2.players_id;
      vm.player2.playersName = myTeam.playid2.players_name;
      vm.player2.playersTotalScore = myTeam.playid2.players_total_score;
      vm.player2.playerTeam = myTeam.playid2.teams_img_url;

      //中单
      vm.player3.playersHeaderUrl = myTeam.playid3.players_header_url;
      vm.player3.playersId = myTeam.playid3.players_id;
      vm.player3.playersName = myTeam.playid3.players_name;
      vm.player3.playersTotalScore = myTeam.playid3.players_total_score;
      vm.player3.playerTeam = myTeam.playid3.teams_img_url;

      //ADC
      vm.player4.playersHeaderUrl = myTeam.playid4.players_header_url;
      vm.player4.playersId = myTeam.playid4.players_id;
      vm.player4.playersName = myTeam.playid4.players_name;
      vm.player4.playersTotalScore = myTeam.playid4.players_total_score;
      vm.player4.playerTeam = myTeam.playid4.teams_img_url;

      //辅助
      vm.player5.playersHeaderUrl = myTeam.playid5.players_header_url;
      vm.player5.playersId = myTeam.playid5.players_id;
      vm.player5.playersName = myTeam.playid5.players_name;
      vm.player5.playersTotalScore = myTeam.playid5.players_total_score;
      vm.player5.playerTeam = myTeam.playid5.teams_img_url;

      //替补
      vm.player6.playersHeaderUrl = myTeam.playid6.players_header_url;
      vm.player6.playersId = myTeam.playid6.players_id;
      vm.player6.playersName = myTeam.playid6.players_name;
      vm.player6.playersTotalScore = myTeam.playid6.players_total_score;
      vm.player6.playerTeam = myTeam.playid6.teams_img_url;

      //totalScore
      vm.totalScore.score = myTeam.total_score;
    });

    //排行榜
    api.contestResultRankList({
      token: auth.token,
      uid: auth.uid,
      myContestId: myContestId,
    }).then(function (resp) {
      let data = resp.data.result;
      vm.totalPage = data.match_score_rank_list_end;
      vm.rankList = vm.rankList.concat(data.match_score_rank_list);

    });
  },
  mounted() {
    this.isShowTaskHandle();
    this.$nextTick(() => {
      setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll);
      }, 500)
    })
  },
  methods: {
    loadMore() {
      this.$nextTick(() => {
        api.contestResultRankList({
          token: this.token,
          uid: this.uid,
          myContestId: this.$route.params.myContestId,
          page: this.page,
        }).then((resp) => {
            this.list = resp.data.result.match_score_rank_list
            this.rankList = this.rankList.concat(this.list);
        })
      })
    },
    handleScroll() {
      let scrolltop = document.body.scrollTop;//内容最顶端和可视区域最顶端
      let scrollHeight = document.body.scrollHeight;//滚动高度
      let bodyHeight = document.body.clientHeight;//页面可见区域高
      let offsetHeight = document.body.offsetHeight;
      let bodyClientHeight = document.documentElement.clientHeight;
      if (scrolltop >= 100) {
        this.isShow1 = false
      } else {
        this.isShow1 = true
      };
      if (scrolltop >= offsetHeight - bodyHeight) {
        this.page = this.page + 1;
        if (this.page > this.totalPage)
        return
        this.loadMore(this.page)
      } else {
        //没有滚动到底部
      }
    },
    isShowTaskHandle() {
      setTimeout(() => {
        let getTaskStory = localStorage.getItem('boolen3');
        if(getTaskStory == null) {
          localStorage.setItem('boolen3', 1);
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      }, 0)
    },
    goBack() {
      this.$router.push({
        name: 'myguess'
      });
    },
    changeiframe() {
      // this.exchangeshow = !this.exchangeshow

    },
    hidedialog(data) {
      this.isShowDialogFeault = data
    },
    rankListClick(item, index) {
      this.isShowDialogFeault = !this.isShowDialogFeault;
      this.myItem = item;

    },
    toggleTab(item, index) {
      this.activeTab = item;
      this.index = index;
    },
    backPage() {
      this.$router.push({ name: 'myContest' })
    },
    playVideo(item, index) {
      //replace掉auto=0，实现自动播放
      // this.video.videoSrc = item.video_url.replace("&auto=0","");
      this.video.videoSrc = item.video_url.replace("https://", "http://");
      this.video1 = item

    }
  }
}
</script>

<style src='../../css/pages/handlers/contestResult.css'></style>
