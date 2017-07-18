<template>
	<div>
		<div v-title>无限电竞</div>
		<top-bar @changeGame="changeGame"></top-bar>
		<div class="index-banner">
			<img v-if="seeinfrontGameType=='2'" src="../assets/glory/bannerwz@2x.png" alt="">
			<img v-else src="../assets/index/home_banner@2x.png" alt="">
		</div>
		<marquee></marquee>
		<div class="index-contaner-box clearfix">
			<router-link :class="bigImg" :to="{name:'handlers'}" exact></router-link>
			<router-link :class="itemBox1" :to="{name:'guess'}" exact></router-link>
			<div :class="itemBox2" @click="showDefaultDialog()"></div>
			<router-link :class="itemBox3" :to="{name:'consultation'}" exact></router-link>
		</div>
		<div class="wx-bottom"></div>
		<menu-bar :isShow="isShow" :showIndex="nowIndex" v-on:taskNavClick="taskNavClick"></menu-bar>
		<lazy-render>
			<task-dialog v-if="isShow" :isShow="isShow" v-on:hidenTask="hidenTask"></task-dialog>
		</lazy-render>
		<dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
		</dialog-default>
	</div>
</template>

<script>
	import {
		saveAuth,
		getAuth,
		saveGameType,
		getGameType,
		delGameType
	} from '@/handle/auth'
	import taskDialog from '../components/seeinfront/task.vue'
	import marquee from '../components/common/marquee.vue'
	import menuBar from '../components/common/menu.vue'
	import topbar from '../components/seeinfront/topbar.vue'
	import * as api from '../server/api.js'
	import dialog from '../components/common/dialog.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'home',
		data() {
			return {
				isShow: false,
				title: '敬请期待',
				dtitle: '',
				isShowDialogFeault: false,
				isShowBtn: false,
				nowIndex: '0',
				auth: {},
				seeinfrontGameType: '',
				testLogin: [{
					username: '13801606756',
						pwd: '198987yugc'
					},
					{
						username: '18855599885',
						pwd: '123456'
					},
					{
						username: '2367684126@qq.com',
						pwd: '123456'
					},
					{
						username: '13917959138',
						pwd: '111111'
					},
					{
						username: 'zhujj1101@126.com',
						pwd: '1234567'
					},
					{
						username: 'xiaolvlv1101@126.com',
						pwd: '1101zjj1201'
					}
				]
			}
		},
		created() {
			//handleLoginWechat 正式微信登录，handleLoginTest 测试过程中给测试的登录
			//     this.handleLoginWechat();

			this.handleLoginTest();

			this.seeinfrontGameType = getGameType() || 1
		},
		mounted() {
			this.isShowTaskHandle();
		},
		computed: {
			...mapGetters(['getUserInfo']),
			bigImg() {
				return this.seeinfrontGameType == '2' ? 'index-left-box-kpl' : 'index-left-box'
			},
			itemBox1() {
				return this.seeinfrontGameType == "2" ? 'index-right-box-1-kpl' : 'index-right-box-1'
			},
			itemBox2() {
				return this.seeinfrontGameType == "2" ? 'index-right-box-2-kpl' : 'index-right-box-2'
			},
			itemBox3() {
				return this.seeinfrontGameType == "2" ? 'index-right-box-3-kpl' : 'index-right-box-3'
			}
		},
		components: {
			[taskDialog.name]: taskDialog,
			[marquee.name]: marquee,
			[topbar.name]: topbar,
			[dialog.name]: dialog,
			[menuBar.name]: menuBar
		},
		watch: {
			seeinfrontGameType(newval, oldval) {
				if(newval == oldval) return
				saveGameType(newval)
			}
		},
		methods: {
			changeGame(data) {
				this.seeinfrontGameType = data
			},
			hidedialog(data) {
				this.isShowDialogFeault = data;
			},
			showDefaultDialog() {
				this.isShowDialogFeault = true;
			},
			taskNavClick(data) {
				this.isShow = data;
			},
			hidenTask(data) {
				this.isShow = data;
			},
			isShowTaskHandle() {
				setTimeout(() => {
					let getTaskStory = localStorage.getItem('task_story');
					var date = new Date();
					date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
					if(getTaskStory == null || getTaskStory != date) {
						localStorage.setItem('task_story', date);
						this.isShow = true;
					} else {
						this.isShow = false;
					}
				}, 3000)
			},
			handleLoginWechat() {
				let auth = getAuth();
				if(auth && auth.token && auth.uid) {
					this.$store.dispatch('setUserInfo', auth);
				} else if(this.$route.query.key) {
					api.wechatLogin({
						key: this.$route.query.key
					}).then((res) => {
						if(res.data.code == 10001) {
							this.$router.push({
								name: 'bindingMobile',
								params: {
									key: this.$route.query.key
								}
							})
						} else {
							let userLoginMsg = {
								uid: res.data.customer_id,
								token: res.data.token
							}
							saveAuth(userLoginMsg);
							if(userLoginMsg) {
								this.$store.dispatch('setUserInfo', userLoginMsg);
							}
							//window.location = location.href + '?time=' + ((new Date()).getTime());
						}
					})
				} else {
					localStorage.removeItem('auth');
					let query = this.getStr(location.href);
					let url = '';
					if(process.env.NODE_ENV == 'development') {
						url = "http://t54.ftxesports.com/client/social?login_type=weixin&target_url=" + query + "&time=" + ((new Date()).getTime())
					} else {
						//url = "https://apibate.dj10000.com/client/social?login_type=weixin&target_url=" + query + "&time=" + ((new Date()).getTime())
						url = "http://t54.ftxesports.com/client/social?login_type=weixin&target_url=" + query + "&time=" + ((new Date()).getTime())

					}
					window.location = url;
				}
			},
			getStr(url) {
				let a = parseInt(url.indexOf('?'));
				if(a === -1) {
					return url;
				} else {
					return url.substring(0, a);
				}
			},
			handleLoginTest() {
				localStorage.removeItem('auth');
				let query = this.$route.query.login;
				if(query == undefined) {
					query = 0;
				}
				let username = this.testLogin[query].username;
				let pwd = this.testLogin[query].pwd;
				api.userLogin({
					login_name: username,
					login_psw: pwd
				}).then((res) => {
					saveAuth(res.data.result);
					let auth = getAuth();
					if(auth) {
						this.$store.dispatch('setUserInfo', auth);
					}
				})
			}
		}
	}
</script>
<style src="../css/index.css">

</style>
