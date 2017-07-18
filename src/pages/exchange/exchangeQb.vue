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
					<span class="weChat-title-icon" @click="goBackOther">
						<img src="../../assets/lineUp/back@2x.png" />
					</span>
							兑换确认
				</div>
			</div>
		</div>
		<div class="dtail-body">
			<div class="dtail-body-img">
				<img :src=" testQb.picture " />
			</div>
			<div class="dtail-hero">
				<span>{{testQb.name}}</span>
			</div>
			<div class="dtail-sort">
				<span class="dtail-sort-left">类别</span>
				<span class="dtail-sort-right">{{testQb.category}}</span>
			</div>
			<div class="dtail-price">
				<span class="dtail-price-left">价格</span>
				<span class="dtail-price-right">{{testQb.price}}
					<img src="../../assets/home/jinbi@2x.png" />
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
				<input v-if="other" class="dtail-qq-left-span" type="number" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " name="f_order" v-model="exchangeCode" />
				<input v-else readonly class="dtail-qq-left-span" type="number" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " name="f_order" v-model="exchangeCode" disabled />
			</div>
	
			<div v-if="butten" class="dtail-btn1" @click="confirm">
				<img src="../../assets/login/login_btn@2x.png" alt="" />
				<span>兑换</span>
			</div>
			<div v-else class="dtail-btn1" @click="showDefaultDialog">
				<img src="../../assets/login/login_btn@2x.png" alt="" />
				<span>兑换</span>
			</div>
		</div>
	
		<dialog-default v-if="isShowDialogFeault" :isShow="isShowDialogFeault" :title="title" :dtitle="dtitle" :isShowBtn="isShowBtn" v-on:hidedialog="hidedialog">
		</dialog-default>
	</div>
</template>
<script>
import * as api from '../../server/api.js'

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
			isShowDialogFeault: false,
			receiveData: [],
			isShowBtn: true,
			showChild: false,
			otherTitle: true,
			show: false,
			other: true,
			goBackTitle: true,
			otherimg: true,
			otherArea: true,
			butten: true,
			data: [],
			str2: [],
			str3: {},
			str4: [],
			str5: [],
			str6: [],
			exchangeCode: null,
			b: "",
			testQb: {},
			itemAReaId: null
		}
	},
	components: {
		[dialog.name]: dialog,
	},

	created() {
		let vm = this;
    this.testQb=this.$route.query.item
	},
	methods: {
		goBack() {
			this.$router.push('/exchangeQbTow');
			
		},
		goBackOther() {
			this.$router.push('/exchangeQb');
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
		},
		handleShow(item, key) {
			this.show = !this.show;
			this.areaplace = item.name
			this.itemAReaId = item.id
		},
		confirm() {
			if (this.exchangeCode) {
				this.otherTitle = !this.otherTitle;
				this.otherimg = !this.otherimg;
				this.other = !this.other;
				this.otherArea = !this.otherArea;
				this.butten = !this.butten;
        this.goBackTitle=!this.goBackTitle
			} else if (this.exchangeCode == null) {
				this.title = "请输入QQ号";
				this.isShowDialogFeault = true;
				this.isShowBtn = false;
				let vm = this;
				setTimeout(function () {
					vm.isShowDialogFeault = false;
				}, 1000);
			} else {
				this.other = true;
				this.otherTitle = true;
				this.otherTitle = true;
				this.otherArea = true;
				this.butten = true;
				this.otherimg = true;
			}
		},
		hidedialog(data) {
			this.isShowDialogFeault = data;
			this.$router.push({
				path: 'exchangeQbTow',

			});
		},
		showDefaultDialog() {
			let auth = getAuth()
			this.$nextTick(() => {
				api.getQbExchange({
					uid: auth.uid,
					token: auth.token,
					account: this.exchangeCode,
					productId: this.testQb.id
				}).then((resp) => {
					var status = resp.data.status
					var message = resp.data.message
					if (status == 0) {
						this.title = "兑换成功"
						this.dtitle = "请稍后访问兑换记录查询结果"
					} else if (status == 1) {
						this.title = message;
						this.isShowBtn = false;
						let vm = this;
						setTimeout(function () {
							vm.isShowDialogFeault = false;
						}, 1000);
					}
					this.isShowDialogFeault = true;
				})
			})
		}
	}
}

</script>
<style src="../../css/exchange/exchangeQb.css"></style>