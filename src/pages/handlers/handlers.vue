<template>
	<div>
		<top-bar :isindex='isindex'></top-bar>
		<swiper-list></swiper-list>
		<div class="handlers-tabs">
			<div class="handlers-tabs-item" v-for="(item,index) in tabsItem" :key="index" v-text="item" @click="toggle(index)" :class="{'handlers-tabs-acitve':activeIndex==index}">
			</div>
		</div>
		<div class="handlers-con-warp clearfix">
			<!--筛选 假的 没有做功能，后期可能引进eleUI完美兼容下拉框 -->
			<div class="handlers-scree-warp">
				<div class="handlers-scree-item">筛选
					<i class="handlers-scree-icon"></i>
				</div>
				<div class="handlers-scree-item">竞赛
					<i class="handlers-scree-icon"></i>
				</div>
				<div class="handlers-scree-item">排序
					<i class="handlers-scree-icon"></i>
				</div>
			</div>
			<!-- 所有比赛 -->
			<div v-if="currentView==0" class="handlers-scroll-con">
				<div class="handlers-no-data" v-if="!noDataShow">
					<loading></loading>
				</div>
				<div class="handlers-no-data" v-else-if="allContest.length==0">没有比赛</div>
				<template v-for="item in allContest" v-else>
					<router-link :to="{name:'mapplayer',params:{contestId:item.contests_id}}">
						<con-card :item="item"></con-card>
					</router-link>
				</template>
			</div>
			<!-- 免费比赛 -->
			<div v-if="currentView==1" class="handlers-scroll-con">
				<div class="handlers-no-data" v-if="!noDataShow">
					<loading></loading>
				</div>
				<div class="handlers-no-data" v-else-if="contestFree.length==0">没有免费比赛</div>
				<template v-for="item in contestFree" v-else>
					<router-link :to="{name:'mapplayer',params:{contestId:item.contests_id}}">
						<con-card :item="item"></con-card>
					</router-link>
				</template>
			</div>
			<!-- 现金比赛 -->
			<div v-if="currentView==2" class="handlers-scroll-con">
				<div class="handlers-no-data" v-if="!noDataShow">
					<loading></loading>
				</div>
				<div class="handlers-no-data" v-else-if="contestCash.length==0">没有开盘的比赛信息</div>
				<template v-for="item in contestCash" v-else>
					<router-link :to="{name:'mapplayer',params:{contestId:item.contests_id}}">
						<con-card :item="item"></con-card>
					</router-link>
				</template>
			</div>
		</div>
		<div class="wx-bottom"></div>
		<race-bar :showIndex="showIndex"></race-bar>
		<new-guide :num="num" v-if="isShow" :isShow="isShow"></new-guide>
	</div>
</template>

<script>
	import topbar from '../../components/seeinfront/topbar'
	import dialog from '../../components/common/dialog.vue'
	import swiperlist from '../../components/common/swiper.vue'
	import concard from '../../components/seeinfront/concard'
	import * as api from '../../server/api.js'
	import raceNav from '../../components/common/racemenu'
	import loading from '../../components/common/loading'
	import newguide from '../../components/common/newguide'
	import { saveAuth, getAuth, getGameType } from '@/handle/auth'

	export default {
		name: 'handlers',
		data() {
			return {
				isindex: 1,
				tabsItem: ['全部比赛', '免费比赛', '付费比赛'],
				activeIndex: 0,
				currentView: 0,
				// 所有比赛数据
				allContest: [],
				// 现金比赛
				contestCash: [],
				// 免费比赛
				contestFree: [],
				isSho: false,
				noData: '正在努力加载中..请稍后..',
				noDataShow: false,
				showIndex: '0',
				isShow: false,
				num: 0
			}
		},
		mounted() {
			this.isShowTaskHandle();
			seeinfrontGameType: ''
		},
		created() {
			this.seeinfrontGameType = getGameType() || '1'
		},
		beforeMount() {
			let gameId = this.seeinfrontGameType == '1' ? 1 : 2
			this.$nextTick(() => {
				api.getContestList({
					gameTypeId: gameId
				}).then((res) => {
					this.contestCash = res.data.result.contests_array;
					this.contestFree = res.data.result.contests_free_array;
					this.allContest = this.contestCash.concat(this.contestFree);
					this.noDataShow = true;
				})
			})
		},
		components: {
			[topbar.name]: topbar,
			[swiperlist.name]: swiperlist,
			[concard.name]: concard,
			[raceNav.name]: raceNav,
			[loading.name]: loading,
			[newguide.name]: newguide,
		},
		methods: {
			toggle(i) {
				this.activeIndex = i;
				this.currentView = i;
			},
			isShowTaskHandle() {
				setTimeout(() => {
					let getTaskStory = localStorage.getItem('boolen');
					if(getTaskStory == null) {
						localStorage.setItem('boolen', 1);
						this.isShow = true;
					} else {
						this.isShow = false;
					}
				}, 0)
			},
		}
	}
</script>

<style src="../../css/pages/handlers/handlers.css">

</style>