<template>
	<div class="details-dd">
		<div class="page-header-wrap">
			<!-- header -->
			<div class="weChat-title">
				<div v-if="goBackTitle" class="go-back">
					<span class="weChat-title-icon" @click="goBack">
						<img src="../../assets/lineUp/back@2x.png" />
					</span>
					兑换详情
				</div>
				<div v-else class="go-back">
					<span class="weChat-title-icon" @click="goBackTow">
						<img src="../../assets/lineUp/back@2x.png" />
					</span>
					兑换确认
				</div>
			</div>
		</div>
		<div class="dtail-body">
			<div class="dtail-body-img">
				<img :src=" item1.picture " />
			</div>
			<div class="dtail-hero">
				<span>{{item1.name}}</span>
			</div>
			<div class="dtail-sort">
				<span class="dtail-sort-left">类别</span>
				<span class="dtail-sort-right">英雄联盟皮肤</span>
			</div>
			<div class="dtail-price">
				<span class="dtail-price-left">价格</span>
				<span class="dtail-price-right">{{item1.price}}
					<img src="../../assets/home/jinbi@2x.png"/>
				</span>

			</div>
			<div class="dtail-num">
				<span class="dtail-num-left">兑换数量</span>
				<span v-if="otherimg" class="dtail-num-right">
					<img src="../../assets/home/orderconfirm_minus.png" />1
					<img src="../../assets/home/orderconfirm_plus.png" />
				</span>
				<span v-else class="dtail-num-right">1</span>
			</div>
			<div class="dtail-qq">
				<span class="dtail-qq-left">输入兑换QQ号</span>
				<input v-if="other" class="dtail-qq-left-span" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " type="number" v-model="exchangeCode" />
				<input v-else readonly class="dtail-qq-left-span" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " type="number" v-model="exchangeCode" disabled />
			</div>
			<div class="dtail-area">
				<span class="dtail-area-left">选择所在大区</span>
				<span v-if="otherArea" class="dtail-area-right" @click='show=!show'>{{areaplace}}
					<img src="../../assets/lineUp/back@2x.png" alt="">
				</span>
				<span v-else class="dtail-area-right">{{areaplace}}</span>
			</div>
			<div v-if="butten" class="dtail-btn" @click="confirm">
				<img src="../../assets/login/login_btn@2x.png" alt="" />
				<span>兑换</span>
			</div>
			<div v-else class="dtail-btn" @click="showDefaultDialog">
				<img src="../../assets/login/login_btn@2x.png" alt="" />
				<span>兑换</span>
			</div>
		</div>
		<!--遮罩层-->
		<div v-if="show" class="shade" @click="freeShow">

			<div class="shade-center">
				<span class="shade-center-area">选择大区</span>
				<div class="shade-center-left">
					<div class="contest-tabs-list flex-box text-center">
						<div class="tabs-item-left" v-for="(item,index) in tabs" @click="toggleTab(item,index)" :class="activeTab == item ? 'active-Bar':'' ">{{ item }}</div>
					</div>

				</div>
				<div class="shade-center-right">
					<ul v-show="index === 0">
						<li v-for="(item,key) in str2">
							<span @click='handleShow(item,key)'>{{item.name}}</span>
						</li>
					</ul>
					<ul v-show="index === 1">
						<li v-for="(item,key) in str4">
							<span @click='handleShow(item,key)'>{{item.name}}</span>
						</li>
					</ul>
					<ul v-show="index === 2">
						<li v-for="(item,key) in str5">
							<span @click='handleShow(item,key)'>{{item.name}}</span>
						</li>
					</ul>
					<ul v-show="index === 3">
						<li v-for="(item,key) in str6">
							<span @click='handleShow(item,key)'>{{item.name}}</span>
						</li>
					</ul>
				</div>

			</div>

		</div>
		<dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
		</dialog-default>
	</div>
</template>
<script>
import {
	createExchange
} from '@/server/api'

import {
	getGameAreaList
} from '@/server/api'
import dialog from '../../components/common/dialog.vue'
import {
	getAuth
} from '@/handle/auth'

export default {
	name: 'exchangeDetail',

	data() {
		return {
			title: '',
			dtitle: '',
			isShowBtn: true,
			isShowDialogFeault: false,
			receiveData: [],
			showChild: false,
			tabs: ['电信', '网通', '全网络大区', '其他'],
			activeTab: '电信',
			index: 0,
			show: false,
			other: true,
			otherimg: true,
			otherArea: true,
			butten: true,
			otherTitle: true,
			goBackTitle: true,
			data: [],
			str2: [],
			str3: {},
			str4: [],
			str5: [],
			str6: [],
			exchangeCode: null,
			areaplace: null,
			b: "",
			item1: {},
			itemAReaId: null
		}
	},
	components: {
		[dialog.name]: dialog,
	},
	created() {
		let vm = this;
		this.item1 = this.$route.query.item;
		let auth = getAuth();
		if (auth) {
			this.uid = auth.uid,
				this.token = auth.token,
				this.$nextTick(() => {
					getGameAreaList({
						token: this.token
					}).then((resp) => {

						vm.data = resp.data.data

						var str = _.findIndex(vm.data, function (item, index) {
							var str1 = item.order

							if (str1 == 1) {

								vm.str2.push(item)

							} else if (str1 == 2) {

								vm.str4.push(item)

							} else if (str1 == 3) {

								vm.str5.push(item)

							} else if (str1 == 4) {

								vm.str6.push(item)

							}

						})
					})
				})
		}


	},
	methods: {
		goBack() {
			this.$router.push('/exchange');

		},
		goBackTow() {
			this.$router.push('/getExchangeDetail');
			this.other = true;
			this.otherArea = true;
			this.butten = true;
			this.otherimg = true;
			this.otherTitle = true;
			this.goBackTitle = true;

		},
		toggleTab(item, index) {
			this.activeTab = item;
			this.index = index;
			this.show = !this.show;

		},
		handleShow(item, key) {
			// this.show = !this.show;
			this.areaplace = item.name
			this.itemAReaId = item.id
		},
		freeShow() {
			this.show = !this.show;
		},
		confirm() {
			if (this.exchangeCode && this.areaplace) {
				this.otherTitle = !this.otherTitle;
				this.otherimg = !this.otherimg;
				this.other = !this.other;
				this.otherArea = !this.otherArea;
				this.butten = !this.butten;
				this.goBackTitle = !this.goBackTitle
			} else if (this.exchangeCode == null) {
				this.title = "请输入QQ号";
				this.isShowDialogFeault = true;
				this.isShowBtn = false;
				let vm = this;
				setTimeout(function () {
					vm.isShowDialogFeault = false;
				}, 1000);
			} else if (this.areaplace == null) {
				this.isShowDialogFeault = true;
				this.title = "请选择大区";
				this.isShowBtn = false;
				let vm = this;
				setTimeout(function () {
					vm.isShowDialogFeault = false;
				}, 1000);
			} else {
				this.other = true;
				this.otherArea = true;
				this.butten = true;
				this.otherimg = true;
				this.otherTitle = true;
				this.goBackTitle = true;
			}
		},

		hidedialog(data) {
			if (this.isShowBtn == true) {
				this.isShowDialogFeault = false;
				// this.$router.push('/exchange');
			} else if (this.isShowBtn == false) {
				this.isShowDialogFeault = false;
				// this.$router.push('/exchangeDetail');
			}

		},
		showDefaultDialog() {
			let auth = getAuth()
			this.$nextTick(() => {
				createExchange({
					uid: auth.uid,
					token: auth.token,
					num: 1,
					gameAreaId: this.itemAReaId,
					account: this.exchangeCode,
					productId: this.item1.id,
				}).then((resp) => {
					var status = resp.data.status
					var message = resp.data.message

					if (status == 0) {
						this.title = "兑换成功"
						this.dtitle = "请稍后访问兑换记录查询结果";
					} else if (status == 1) {
						this.title = message;
						this.isShowBtn = false;
						let vm = this;
						setTimeout(function () {
							vm.isShowDialogFeault = false;
						}, 1000);
					} else if (status == 3) {
						this.title = "网络异常"

					}
					this.isShowDialogFeault = true;

				})
			})

		}

	}

}
</script>
<style src="../../css/exchange/exchangeDetail.css"></style>
