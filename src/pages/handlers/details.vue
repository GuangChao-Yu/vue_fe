<template>
  <div>
    <div class="weChat-title fixed-pick">
      <span class="weChat-title-icon" @click="goback">
        <</span>队员详情
    </div>
  
    <div class="details-body">
  
      <!-- tab切换 -->
      <div class="tab-swiper-class" @click="showTab()">
        <img src="../../assets/playTeamDetails/memberdetail_pic.png" alt="" v-if="show === 0">
        <img src="../../assets/playTeamDetails/menber_list.png" alt="" v-else>
      </div>
  
      <div class="details-shot-header flex-box">
        <div class="flex-item header-shot-wrap">
          <div class="header-shot-url">
            <img :src="playerHeaderUrl" alt="">
          </div>
        </div>
        <div class="flex-item">
          <div class="details-name"> {{ playerName }} </div>
          <div class="details-data-list flex-box">
            <div class="flex-item">
              <div class="data-list-top">{{ playerKda }}</div>
              <div class="data-list-bottom">KDA</div>
            </div>
            <div class="flex-item" v-if="type == 'player'">
              <div class="data-list-top">{{ playerKp }}</div>
              <div class="data-list-bottom">参团率</div>
            </div>
            <div class="flex-item">
              <div class="data-list-top">{{ playerFppg }}</div>
              <div class="data-list-bottom">STP</div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <!-- table 数据展示 -->
            <div v-show="isShow" class="details-isShow">暂无数据展示</div>
            <div class="details-table" v-if="show == 0">
              <table>
                <thead>
                  <tr v-if="type == 'player'">
                    <th></th>
                    <th class="table-title">击杀</th>
                    <th class="table-title">死亡</th>
                    <th class="table-title">助攻</th>
                    <th class="table-title">补兵</th>
                    <th class="table-title">KDA</th>
                    <th class="table-title">参团率</th>
                  </tr>
                  <tr v-else>
                    <th></th>
                    <th class="table-title">屠龙</th>
                    <th class="table-title">男爵</th>
                    <th class="table-title">推塔</th>
                    <th class="table-title">被推塔</th>
                    <th class="table-title">击杀</th>
                    <th class="table-title">死亡</th>
                  </tr>
                </thead>
                <tbody>
  
                  <template v-for="item in dataList">
                    <tr v-if="type == 'player'">
                      <td class="table-title">{{ item.data_type }}</td>
                      <td>{{ item.kills }}</td>
                      <td>{{ item.deaths }}</td>
                      <td>{{ item.assists }}</td>
                      <td>{{ item.creeps }}</td>
                      <td>{{ item.kda }}</td>
                      <td>{{ item.kp * 100 + "%" }}</td>
                    </tr>
                    <tr v-else>
                      <td class="table-title">{{ item.data_type }}</td>
                      <td>{{ item.dragons }}</td>
                      <td>{{ item.barons }}</td>
                      <td>{{ item.turrets }}</td>
                      <td>{{ item.being_turrets }}</td>
                      <td>{{ item.kills }}</td>
                      <td>{{ item.deaths }}</td>
                    </tr>
  
                  </template>
                </tbody>
              </table>
            </div>
          </div>
          <div class="swiper-slide">
            <!-- 雷达图 -->
            <div v-if="show == 1">
              <vueChart :options="option"></vueChart>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  
  </div>
</template>

<script>
import router from '@/router/index'
import * as api from '../../server/api.js'
import vueChart from 'vue-echarts/components/ECharts.vue'
import echart from 'echarts'
import { getGameType } from '@/handle/auth'


import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';


export default {
  name: 'details',
  components: {
    vueChart
  },
  data() {
    return {
      seeinfrontGameType: '',
      isShow: false,
      show: 0,
      type: null,
      playerHeaderUrl: '',
      playerName: '',
      playerKda: '',
      playerKp: '',
      playerFppg: '',
      dataList: [],
      option: {
        legend: {//图例组件，展示不同系列的标记的名字和颜色
          bottom: 0,//标题的位置
          textStyle: {
            fontSize: 11,
            color: '#cc607d8b'
          },
          inactiveColor: '#ccc',   //legend 未选中时的状态颜色
          itemGap: 10,     // 标题项与项之间的距离

        },
        radar: {
          // shape: 'circle',
          indicator: [],//雷达图坐标系与极坐标系不同的是它的每一个轴（indicator 指示器）都是一个单独的维度
          //六边形 分隔区域背景色
          splitArea: {
            show: false
          },
          //六边形 分割线颜色
          splitLine: {
            lineStyle: {
              color: '#13aa9c'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#13aa9c'
            }
          },
          //六边文字 指示器项
          name: {
            textStyle: {
              color: '#607d8b',
              fontSize: 20
            }
          },
        },
        //系列列表
        series: [{
          name: '数据统计',
          type: 'radar',
          data: []
        }]
      }
    }
  },
  created() {
    let vm = this;
    this.seeinfrontGameType = getGameType() || '1'
    let paramsId = this.$route.params.detailsId;
    let type = this.$route.params.type;

    vm.type = type;

    if (type == 'player') {
      // 队员详情
      api.getPlayerDetails({ playerId: paramsId }).then(function (resp) {
        let data = resp.data.result;
        let indicator = [
          { name: 'KDA', max: 12 },
          { name: '击杀', max: 10 },
          { name: '助攻', max: 15 },
          { name: '参团率', max: 100 },
          { name: '补兵', max: 400 },
          { name: '死亡', max: 8 }
        ];
        vm.option.radar.indicator = indicator;

        let legendObj;
        let legendList = [];
        //填充颜色数组
        let fillColor = ['rgba(19,170,156,0.65)', 'rgba(42,59,142,0.65)', 'rgba(102,24,254,0.65)', 'rgba(125,35,167,0.65)'];
        //展示数据
        let showData;
        let showDataArr = [];   //显示数据

        vm.playerHeaderUrl = data.overview.player_header_url;
        vm.playerName = data.overview.player_name;
        vm.playerKda = data.overview.player_kda;
        vm.playerKp = data.overview.player_kp;
        vm.playerFppg = data.overview.player_fppg;
        vm.dataList = data.statistics;
        if (vm.dataList.length == 0) {
          vm.isShow = !vm.isShow
        }

        data.statistics.forEach(function (item, index) {

          //底部标题
          legendObj = {
            name: '',
            icon: "circle",
            textStyle: {
              color: "#607d8b"
            }
          };
          legendObj.name = item.data_type;
          legendList.push(legendObj);

          //展示数据
          showData = {
            value: [],
            name: '',
            areaStyle: {
              normal: {   // 填充区域的颜色
                color: ''
              }
            },
            lineStyle: {
              normal: {    //填充区域线条颜色
                color: ''
              }
            },
            itemStyle: {
              normal: {    // 折线拐点颜色
                color: ''
              }
            }
          };
          //展示数据
          showData.name = item.data_type;
          showData.areaStyle.normal.color = fillColor[index];
          showData.lineStyle.normal.color = fillColor[index];
          showData.itemStyle.normal.color = fillColor[index];

          //kda max:12 //击杀 max:10 //助攻 max:15 //参团率 max:100% //补刀 max:400 //死亡 max:8
          if (item.kda > 12) {
            item.kda = 12;
          }
          if (item.kills > 10) {
            item.kills = 10;
          }
          if (item.assists > 15) {
            item.assists = 15
          }
          if (item.kp > 1) {
            item.kp = 1;
          }
          if (item.creeps > 400) {
            item.creeps = 400;
          }
          if (item.deaths > 8) {
            item.deaths = 8;
          }

          showData.value.push(item.kda, item.kills, item.assists, (item.kp * 100), item.creeps, item.deaths);
          showDataArr.push(showData);

        });

        vm.option.legend.data = legendList;
        vm.option.series[0].data = showDataArr;

      });
    } else if (type == 'team') {
      // 队伍详情
      api.getTeamDetails({ teamId: paramsId }).then(function (resp) {


        let data = resp.data.result;
        let indicator = [
          { name: '屠龙', max: 4 },
          { name: '男爵', max: 2 },
          { name: '推塔', max: 9 },
          { name: '被推塔', max: 9 },
          { name: '击杀', max: 20 },
          { name: '死亡', max: 20 }
        ];
        vm.option.radar.indicator = indicator;

        let legendObj;
        let legendList = [];
        //填充颜色数组
        let fillColor = ['rgba(19,170,156,0.65)', 'rgba(42,59,142,0.65)', 'rgba(102,24,254,0.65)', 'rgba(125,35,167,0.65)'];
        //展示数据
        let showData;
        let showDataArr = [];   //显示数据

        vm.playerHeaderUrl = data.overview.team_img_url;
        vm.playerName = data.overview.team_name;
        vm.playerKda = data.overview.team_kda;
        vm.playerKp = data.overview.team_kp;
        vm.playerFppg = data.overview.team_fppg;
        vm.dataList = data.statistics;

        data.statistics.forEach(function (item, index) {

          //底部标题
          legendObj = {
            name: '',
            icon: "circle",
            textStyle: {
              color: "#607d8b"
            }
          };
          legendObj.name = item.data_type;

          legendList.push(legendObj);

          //展示数据
          showData = {
            value: [],
            name: '',
            areaStyle: {
              normal: {   // 填充区域的颜色
                color: ''
              }
            },
            lineStyle: {
              normal: {    //填充区域线条颜色
                color: ''
              }
            },
            itemStyle: {
              normal: {    // 折线拐点颜色
                color: ''
              }
            }
          };
          //展示数据
          showData.name = item.data_type;
          showData.areaStyle.normal.color = fillColor[index];
          showData.lineStyle.normal.color = fillColor[index];
          showData.itemStyle.normal.color = fillColor[index];

          //屠龙 max:4 //男爵 max:2 //推塔 max:9 //被推塔 max:9 //击杀 max:20 //死亡 max:20
          if (item.dragons > 4) {
            item.dragons = 4;
          }
          if (item.barons > 2) {
            item.barons = 2;
          }
          if (item.turrets > 9) {
            item.turrets = 9
          }
          if (item.being_turrets > 9) {
            item.being_turrets = 9;
          }
          if (item.kills > 20) {
            item.kills = 20;
          }
          if (item.deaths > 20) {
            item.deaths = 20;
          }

          showData.value.push(item.dragons, item.barons, item.turrets, item.being_turrets, item.kills, item.deaths);
          showDataArr.push(showData);

        });

        vm.option.legend.data = legendList;
        vm.option.series[0].data = showDataArr;

      })
    }

  },
  mounted() {
    let vm = this;
    let swiper = new Swiper('.swiper-container', {
      loop: false,
      speed: 600,
      onTransitionEnd: function (swiper) {
        vm.show = swiper.activeIndex;
      }
    });
    vm.swiper = swiper;
  },
  methods: {
    goback() {
      if (this.seeinfrontGameType == '1') {
        this.$router.push({
          name: 'picking',
          params: {
            contestId: this.$route.params.contestId
          }
        })
      }else{
        this.$router.push({
          name: 'pickking',
          params: {
            contestId: this.$route.params.contestId
          }
        })
      }

    },
    showTab() {

      if (this.show == 0) {
        this.show = 1;
        this.swiper.slideNext();
      } else {
        this.show = 0;
        this.swiper.slidePrev();
      }

    }
  }




}
</script>

<style src='../../css/pages/details/details.css'></style
