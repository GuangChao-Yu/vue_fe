<template>
	<div>
		<game-nav :starindex="starindex"></game-nav>
			<div class="map-cutdown-warp">
				<div>
					距离截止时间:
					<img class="map-cutdow-icon" src="../../assets/home/time@2x.png">
					<count-down :cutDownClass="cutDownClass" :endTime="endTime" v-if="endTime"></count-down>
				</div>
				<div class="caozuo-warp" @click="instructionsbtn">操作说明<img class="caozuoicon" src="../../assets/home/icon_question@3x.png"></div>
			</div>
		<div class="map-salary">
			<div class="map-salary-item">
				<p>平均薪水</p>
				<strong>{{svgSalary}}</strong>
			</div>
			<div class="map-salary-item">
				<p>剩余薪水</p>
				<strong>{{restSalary}}</strong>
			</div>
			<div class="map-salary-item" v-if="!isMyContestUpdate">
				<div class="map-lead-btn">
					<span @click="leadBattle()">导入队伍</span>
				</div>
			</div>
		</div>
		<game-map :isEmpty="isEmpty"></game-map>
		<team-select :isEmpty="isEmpty"></team-select>
		<div class="game-map-oprating">
			<div class="operating-item" @click="emptyPlayers()">清空阵容</div>
			<div class="operating-item" @click="recommendLineUp()" v-if="!isMyContestUpdate">推荐阵容</div>
			<div class="operating-item" @click="joinContestBtn()">提交</div>
		</div>
		<dialog-tips :tips="tips" :showTips="showTips"></dialog-tips>
		<dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
		</dialog-default>
		<dialog-confirm :isShowConfirm="isShowConfirm" :ticket="ticket" :ticketPoint="ticketPoint" v-on:sendType="sendType" v-on:hideConfrim="hideConfrim"></dialog-confirm>
		<new-guide :num="num" v-if="isShow" :isShow="isShow"></new-guide>
	</div>
</template>

<script>
	import gameNav from '../../components/seeinfront/gamenav'
	import * as api from '../../server/api'
	import { setStore, getStore, removeStore } from '../../handle/utils.js'
	import { getAuth, getGameType } from '../../handle/auth.js'
	import conutDown from '../../components/common/countdown'
	import gameMap from '../../components/seeinfront/map'
	import teamSelect from '../../components/seeinfront/teamselect'
	import { mapGetters } from 'vuex'
	import dialogTips from '../../components/common/dialogtips'
	import dialog from '../../components/common/dialog'
	import dialogConfirm from '../../components/common/dialogconfirm'
	import newguide from '../../components/common/newguide'
	
	export default {
		name: 'map-palyer',
		data() {
			return {
				cutDownClass: 'map-cutdown-style',
				clickIndex: 0, //推荐阵容的index
				recommednData: [],
				starindex: '0',
				endTime: 0, //倒计时时间戳
				ticket: 0, // 比赛入盘金币费用
				ticketPoint: 0, // 比赛入盘点券费用
				contestID: this.$route.params.contestId, //所选比赛对应ID,
				isMyContestUpdate: false, //是否是我的精彩中点击过来修改的,
				position_list: {},
				isEmpty: false,
				money: 0,
				canComfrim: false,
				allposition: 7, //一共7个位置,
				//dialogtips props
				tips: '',
				showTips: false,
				//dialog props
				title: '',
				dtitle: '',
				isShowDialogFeault: false,
				isShowBtn: true,
				//confirmdialog props
				isShowConfirm: false,
				isShow: false,
				num: 1,
				seeinfrontGameType: '',
			

			}
		},
		created() {
			this.seeinfrontGameType = getGameType() || '1'
			if(this.$route.params.type == "1") {
				this.isMyContestUpdate = true;
			}
		},
		beforeCreate() {
			//倒计时
			api.getContestDetails({
				contestId: this.$route.params.contestId
			}).then((res) => {
				this.endTime = res.data.result.end_time;
				this.ticket = res.data.result.ticks_fee;
				this.ticketPoint = res.data.result.ticks_fee_point;
				this.contestID = res.data.result.contests_id;
			})
		},
		mounted() {
			this.isShowTaskHandle();
		},
		methods: {
			emptyPlayers() {
				this.$store.dispatch('setTop', {});
				this.$store.dispatch('setMid', {});
				this.$store.dispatch('setJug', {});
				this.$store.dispatch('setAdc', {});
				this.$store.dispatch('setSup', {});
				this.$store.dispatch('setBench', {});
				this.$store.dispatch('setTeam', {});
				this.isEmpty = true;
				this.tips = "清空成功";
				this.showTips = true;
				setTimeout(() => {
					this.showTips = false;
				}, 1000)
			},
			instructionsbtn() {
				if(this.seeinfrontGameType == 1) {
					this.$router.push({
						name: 'instructions',
						params: {
							contestId: this.$route.params.contestId
						}
					})
				}
				if(this.seeinfrontGameType == 2){
					this.$router.push({
						name: 'king',
						params: {
							contestId: this.$route.params.contestId
						}
					})
				}

			},
			isShowTaskHandle() {
				setTimeout(() => {
					let getTaskStory = localStorage.getItem('boolen1');
					if(getTaskStory == null) {
						localStorage.setItem('boolen1', 1);
						this.isShow = true;
					} else {
						this.isShow = false;
					}
				}, 0)
			},
			recommendLineUp() {
				this.clickIndex >= 8 ? this.clickIndex = 0 : this.clickIndex
				if(this.recommednData.length > 0) {
					let recommlist = this.recommednData[this.clickIndex]
					this.setRecommed(recommlist);
					this.clickIndex = this.clickIndex + 1
				} else {
					api.getRecommend({
						contest_id: this.$route.params.contestId
					}).then((res) => {
						if(res.data.status == 0) {
							if(res.data.result.recommend && res.data.result.recommend.length >= this.clickIndex) {
								this.recommednData = res.data.result.recommend;
								let recommlist = this.recommednData[this.clickIndex]
								this.setRecommed(recommlist)
								this.clickIndex = this.clickIndex + 1;
							} else {
								this.tips = "暂无推荐阵容";
								this.showTips = true;
								setTimeout(() => {
									this.showTips = false;
								}, 1000)
								return;
							}
						}
					})
				}

			},
			setRecommed(item) {
				this.$store.dispatch('setTop', item.top);
				this.$store.dispatch('setJug', item.jungle);
				this.$store.dispatch('setMid', item.middle);
				this.$store.dispatch('setAdc', item.adc);
				this.$store.dispatch('setSup', item.support);
				this.$store.dispatch('setBench', item.bench);
				this.$store.dispatch('setTeam', item.team);
			},
			joinContestBtn() {
				let condition1 = this.checkMostThree();
				let condition2 = this.checkMoney();
				let condition3 = this.checkPosition();
				if(condition1 && condition2 && condition3) {
					if(this.$route.params.type == "1") {
						this.updateTeamData();
					} else {
						this.isShowConfirm = true;
						this.canComfrim = true;
					}
				}
			},
			checkMostThree() {
				let topTeam = this.getTop.teams_name;
				let jugTeam = this.getJug.teams_name;
				let midTeam = this.getMid.teams_name;
				let adcTeam = this.getAdc.teams_name;
				let supTeam = this.getSup.teams_name;
				let benchTeam = this.getBench.teams_name;
				let teamName = (topTeam + ',' + jugTeam + ',' + midTeam + ',' + adcTeam + ',' + supTeam + ',' + benchTeam).split(',');
				let repeatData = {}
				let isrepeat = 0;
				teamName.forEach((item) => {
					if(repeatData[item]) {
						repeatData[item]++;
					} else {
						repeatData[item] = 1;
					}
					if(repeatData[item] > isrepeat) {
						isrepeat = repeatData[item];
					}
				})
				if(isrepeat > 3) {
					this.showErr(3);
					return false;
				} else {
					return true;
				}
			},
			checkMoney() {
				if(50000 - this.money < 0) {
					this.showErr(2);
					return false;
				} else {
					return true;
				}
			},
			checkPosition() {
				if(!this.getTop.players_name) {
					this.showErr(1);
					return false;
				}
				if(!this.getJug.players_name) {
					this.showErr(1);
					return false;
				}
				if(!this.getMid.players_name) {
					this.showErr(1);
					return false;
				}
				if(!this.getAdc.players_name) {
					this.showErr(1);
					return false;
				}
				if(!this.getSup.players_name) {
					this.showErr(1);
					return false;
				}
				if(!this.getBench.players_name) {
					this.showErr(1);
					return false;
				}
				if(!this.getTeam.teams_name) {
					this.showErr(1);
					return false;
				}
				return true;
			},
			showErr(type, msg) {
				if(type == 1) {
					this.title = '卡槽未填满';
					this.isShowConfirm = false;
					this.isShowDialogFeault = true;
				}
				if(type == 2) {
					this.title = '薪水超支,请重新修改'
					this.isShowConfirm = false;
					this.isShowDialogFeault = true;
				}
				if(type == 3) {
					this.title = '你的队伍最多只能有三名来自同一战队的成员';
					this.isShowConfirm = false;
					this.isShowDialogFeault = true;
				}
				if(type == 4) {
					this.title = '金币余额不足，提交失败';
					this.isShowConfirm = false;
					this.isShowDialogFeault = true;
				}
				if(type == 5) {
					this.title = '点券余额不足，提交失败';
					this.isShowConfirm = false;
					this.isShowDialogFeault = true;
				}
				if(type == 6) {
					this.title = msg;
					this.isShowConfirm = false;
					this.isShowDialogFeault = true;
				}
			},
			hidedialog(data) {
				this.isShowDialogFeault = data;
			},
			sendType(type) {
				if(this.canComfrim) {
					if(this.$route.params.type == "1") {
						this.updateTeamData();
					} else {
						this.joinTeamData(type);
					}
				}
			},
			hideConfrim(data) {
				this.isShowConfirm = data;
			},
			checkBalanceAdnPending(type) {
				if(type == 1) {
					if(this.getUserInfo.balance >= this.ticket) {
						return true
					} else {
						this.showErr(4);
						return false
					}
				}
				if(type == 2) {
					if(this.getUserInfo.pending >= this.ticketPoint) {
						return true
					} else {
						this.showErr(4);
						return false
					}
				}
			},
			updateTeamData() {
				let auth = getAuth();
				api.updateJoinTeam({
					token: auth.token,
					my_contest_id: this.$route.params.my_contest_id,
					teams_id: this.getTeam.teams_id,
					play_id1: this.getTop.players_id,
					play_id2: this.getJug.players_id,
					play_id3: this.getMid.players_id,
					play_id4: this.getAdc.players_id,
					play_id5: this.getSup.players_id,
					play_id6: this.getBench.players_id,
					extrasalarys: 50000 - this.money
				}).then((res) => {
					if(res.data.status === 0) {
						this.showTips = true;
						this.tips = "成功修改竞赛!";
						setTimeout(() => {
							this.showTips = false;
							// this.emptyPlayers();
							// this.$router.push({ name: 'myguess' });
						}, 1000)
					} else {
						this.isShowConfirm = false;
						this.showErr(6, res.data.message);
					}
				})
			},
			joinTeamData(type) {
				if(this.checkBalanceAdnPending(type)) {
					let auth = getAuth();
					api.joinContest({
						uid: auth.uid,
						token: auth.token,
						tickType: type == 1 ? 2 : 1, //这里反了 服务段是1点券 2金币 这里写的是1金币2点券 所以偷懒处理
						contestId: this.$route.params.contestId,
						teamsId: this.getTeam.teams_id,
						playId1: this.getTop.players_id,
						playId2: this.getJug.players_id,
						playId3: this.getMid.players_id,
						playId4: this.getAdc.players_id,
						playId5: this.getSup.players_id,
						playId6: this.getBench.players_id,
						extraSalary: 50000 - this.money,
						game_type_id: parseInt(this.seeinfrontGameType)
					}).then((res) => {
						if(res.data.status === 0) {
							this.showTips = true;
							this.tips = "成功加入竞赛!";
							setTimeout(() => {
								this.showTips = false;
								this.$router.push({
									name: 'othergame',
									params: {
										vsid: res.data.result.vts_id
									}
								});
							}, 1000)
						} else {
							this.isShowConfirm = false;
							this.showErr(6, res.data.message || '登录已过期，请重新登录');
						}
					})
				}
			},
			leadBattle() {
				this.$router.push({
					name: 'lead',
					params: {
						contestId: this.$route.params.contestId
					}
				})
			}
		},
		computed: {
			...mapGetters(['getUserInfo', 'getTop', 'getMid', 'getJug', 'getAdc', 'getSup', 'getBench', 'getTeam']),
			restSalary() {
				let salary = 50000;
				let top = this.getTop.players_salary ? this.getTop.players_salary : 0;
				let mid = this.getMid.players_salary ? this.getMid.players_salary : 0;
				let jug = this.getJug.players_salary ? this.getJug.players_salary : 0;
				let adc = this.getAdc.players_salary ? this.getAdc.players_salary : 0;
				let sup = this.getSup.players_salary ? this.getSup.players_salary : 0;
				let bench = this.getBench.players_salary ? this.getBench.players_salary : 0;
				let team = this.getTeam.teams_salary ? this.getTeam.teams_salary : 0;
				this.money = top + mid + jug + adc + sup + bench + team;
				return salary - (top + mid + jug + adc + sup + bench + team);
			},
			svgSalary() {
				this.allposition = 7;
				if(!this.getTop.players_salary) {
					this.allposition = this.allposition - 1;
				}
				if(!this.getMid.players_salary) {
					this.allposition = this.allposition - 1;
				}
				if(!this.getJug.players_salary) {
					this.allposition = this.allposition - 1;
				}
				if(!this.getAdc.players_salary) {
					this.allposition = this.allposition - 1;
				}
				if(!this.getSup.players_salary) {
					this.allposition = this.allposition - 1;
				}
				if(!this.getBench.players_salary) {
					this.allposition = this.allposition - 1;
				}
				if(!this.getTeam.teams_salary) {
					this.allposition = this.allposition - 1;
				}
				if(this.allposition == 0) {
					return 0
				} else {
					return(this.money / this.allposition).toFixed(0);
				}
			}
		},
		components: {
			[gameNav.name]: gameNav,
			[conutDown.name]: conutDown,
			[gameMap.name]: gameMap,
			[teamSelect.name]: teamSelect,
			[dialogTips.name]: dialogTips,
			[dialog.name]: dialog,
			[dialogConfirm.name]: dialogConfirm,
			[newguide.name]: newguide,
		}

	}
</script>

<style src="../../css/pages/handlers/mapplayer.css">

</style>