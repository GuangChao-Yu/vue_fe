<template>
	<div class="user-profile-content-block no-border">
		<div class="page-header-wrap">
			<!-- header -->
			<!-- header -->
			<div class="weChat-title">
				<span class="weChat-title-icon" @click="goback">
					<img src="../../assets/lineUp/back@2x.png" class="rank-img rank-goback-icon" />
				</span>
						天梯排位
			</div>
		</div>
	
		<!-- 我的排位 -->
		<table class="alpha-table " cellspacing="0" cellpadding="0" border="0">
			<thead>
				<tr>
					<p class="fe-rank-title">我的排位：</p>
				</tr>
				<tr class="alpha-table-tr">
					<th class="text-center fe-rank-col-1">名次</th>
					<th class="fe-rank-col-2 fe-ranking-indent">头像</th>
					<th class="fe-rank-col-3">昵称</th>
					<!--<th></th>-->
					<th class="text-center fe-rank-col-4">积分</th>
					<th class="fe-rank-col-5 fe-ranking-indent">段位</th>
				</tr>
			</thead>
			<col style="width: 20%" />
			<col style="width: 15%" />
			<col style="width: 20%" />
			<col style="width: 25%" />
			<tbody class="fe-rank-table">
				<tr>
					<td class="text-center fe-rank-col-1 fe-rank-img jh-self-rank">
						<span class="fe-ranking-number">{{personal_rank.rank}}</span>
					</td>
					<td class="text-center fe-rank-col-2">
						<div class="fe-rank-avatar">
							<img :src=" personal_rank.headimg " alt="" class="rank-img">
	
						</div>
					</td>
					<td class="fe-rank-col-3">
						<span>{{ personal_rank.username }}</span>
					</td>
					<!--<td></td>-->
					<td class="text-center fe-rank-col-4">
						<span>{{ personal_rank.score }}</span>
					</td>
					<td class="text-center fe-rank-col-5">
						<div class="fe-rank-badge">
							<em class="tooltip-hover">
								<img :src=" personal_rank.egment " alt="" class="rank-img">
								<span>{{ personal_rank .egment_name}}</span>
							</em>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	
		<!-- 总排位 -->
		<table class="alpha-table " cellspacing="0" cellpadding="0" border="0">
			<thead>
				<tr>
					<p class="fe-rank-title">总排位：</p>
				</tr>
				<tr class="alpha-table-tr">
					<th class="text-center fe-rank-col-1">名次</th>
					<th class="fe-rank-col-2 fe-ranking-indent">头像</th>
					<th class="fe-rank-col-3">昵称</th>
					<!--<th></th>-->
					<th class="text-center fe-rank-col-4">积分</th>
					<th class="fe-rank-col-5 fe-ranking-indent">段位</th>
				</tr>
			</thead>
			<col style="width: 20%" />
			<col style="width: 15%" />
			<col style="width: 20%" />
			<col style="width: 25%" />
	
			<tbody class="fe-rank-table">
				<template v-for="(item,index) in top_rank">
					<tr>
						<td class="text-center fe-rank-col-1 fe-rank-img jh-all-rank">
							<!--<span class="fe-ranking-number">{{ item.rank }}</span>-->
							<span v-if='index <= 2' style="display: none;" class="fe-ranking-number">{{ item.rank }}</span>
							<span v-else='index > 2' style="display: block;" class="fe-ranking-number">{{ item.rank }}</span>
							<img class="fe-ranking-number-img rank-img"  v-show="index===0" src="../../assets/rank/1st.png" />
							<img class="fe-ranking-number-img rank-img" v-show="index===1" src="../../assets/rank/2nd.png" />
							<img class="fe-ranking-number-img rank-img" v-show="index===2" src="../../assets/rank/3rd.png" />
	
						</td>
						<td class="text-center fe-rank-col-2">
							<div class="fe-rank-avatar">
								<img :src=" item.headimg " alt="" class="rank-img">
	
							</div>
						</td>
						<td class="fe-rank-col-3">
							<span>{{ item.username }}</span>
						</td>
						<!--<td class="free"></td>-->
						<td class="text-center fe-rank-col-4">
							<span>{{ item.score }}</span>
						</td>
						<td class="text-center fe-rank-col-5">
							<div class="fe-rank-badge">
								<em class="tooltip-hover">
									<img :src=" item.egment " alt="" class="rank-img">
									<span>{{ item.egment_name }}</span>
								</em>
							</div>
						</td>
					</tr>
				</template>
	
			</tbody>
		</table>
	
	</div>
</template>

<script>
import * as api from '../../server/api.js'
import _ from 'lodash'
import { getAuth } from '@/handle/auth'
import router from '../../router/index.js'


export default {
	name: 'rank',
	data() {
		return {
			personal_rank: {},
			egment_name: "",
			top_rank: [],
		}
	},

	created: function () {
		let auth = getAuth();
		if (auth) {
			this.uid = auth.uid;
			this.token = auth.token;
			this.$nextTick(() => {
				api.getRank({
					token: this.token,
					uid: this.uid,
					page: 0,
					page_size: 1
				}).then((resp) => {
					var data = resp.data.result;
					this.personal_rank = data.personal_rank
					this.top_rank = data.top_rank

					var str = _.findIndex(data.top_rank, function (item, index) {
						var str1 = item.egment_name;
						if (str1.indexOf(1) > 0) {

							var str2 = str1.replace(/1/, "Ⅰ")

							item.egment_name = str2

						} else if (str1.indexOf(2) > 0) {
							var str2 = str1.replace(/2/, "Ⅱ")

							item.egment_name = str2
						} else if (str1.indexOf(3) > 0) {
							var str2 = str1.replace(/3/, "Ⅲ")

							item.egment_name = str2
						} else if (str1.indexOf(4) > 0) {
							var str2 = str1.replace(/4/, "Ⅳ")

							item.egment_name = str2
						} else if (str1.indexOf(5) > 0) {
							var str2 = str1.replace(/5/, "Ⅴ")

							item.egment_name = str2
						}
					})
				});
			})
		} else {
			console.log('没有登录');
		}

	},
	methods: {
	goback() {
      //window.history.go(-1);
      this.$router.push({name:'usercenter'})
    }
	}

}

</script>

<style scoped src='../../css/pages/rank/rank.css'></style>