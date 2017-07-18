<template>
	<div class="instructions-body" v-show="quanju">
		<!--第一张-->
		<div class="instructions-start" v-show="first">
			<img class="instructions-start-one" src="../../assets/instructions/开始教程.png" />
			<div class="instructions-start-finger" @click="next">
				<finger></finger>
			</div>
		</div>
		<!--第二张-->
		<div class="instructions-start" v-show="tow">
			<img class="instructions-start-one" src="../../assets/instructions/2.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger1" @click="next1">
				<finger></finger>
			</div>
		</div>
		<!--第三张-->
		<div class="instructions-start" v-show="three">
			<img class="instructions-start-one" src="../../assets/instructions/3.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger2" @click="next2">
				<fingerone></fingerone>
			</div>
		</div>

		<!--第四张-->
		<div class="instructions-start" v-show="four">
			<img class="instructions-start-one" src="../../assets/instructions/4.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger3" @click="next3">
				<finger></finger>
			</div>
		</div>

		<!--第五张-->
		<div class="instructions-start" v-show="fif">
			<img class="instructions-start-one" src="../../assets/instructions/5.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger44" @click="next4">
				<fingerone></fingerone>

			</div>
		</div>

		<!--第六张-->
		<div class="instructions-start" v-show="six">
			<img class="instructions-start-one" src="../../assets/instructions/6.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />

			<div class="instructions-start-finger5" @click="next5">
				<finger></finger>
			</div>
		</div>

		<!--第七张-->
		<div class="instructions-start" v-show="seve">
			<img class="instructions-start-one" src="../../assets/instructions/7.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger66" @click="next6">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第八张-->
		<div class="instructions-start" v-show="eng">
			<img class="instructions-start-one" src="../../assets/instructions/8.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger7" @click="next7">
				<finger></finger>
			</div>
		</div>
		<!--第九张-->
		<div class="instructions-start" v-show="nia">
			<img class="instructions-start-one" src="../../assets/instructions/9.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger88" @click="next8">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第十张-->
		<div class="instructions-start" v-show="ten">
			<img class="instructions-start-one" src="../../assets/instructions/10.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger9" @click="next9">
				<finger></finger>
			</div>
		</div>
		<!--第十一张-->

		<div class="instructions-start" v-show="ele">
			<img class="instructions-start-one" src="../../assets/instructions/11.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger100" @click="next10">
				<fingerone></fingerone>
			</div>
		</div>
		<!--第十二张-->

		<div class="instructions-start" v-show="tew">
			<img class="instructions-start-one" src="../../assets/instructions/12.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger11" @click="next11">
				<finger></finger>
			</div>
		</div>
		<!--第13张-->

		<div class="instructions-start" v-show="ser">
			<img class="instructions-start-one" src="../../assets/instructions/13.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger122" @click="next12">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第14张-->

		<div class="instructions-start" v-show="tenfour">
			<img class="instructions-start-one" src="../../assets/instructions/14.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger13" @click="next13">
				<finger></finger>
			</div>
		</div>
		<!--第15张-->

		<div class="instructions-start" v-show="tenfif">
			<img class="instructions-start-one" src="../../assets/instructions/15.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger144" @click="next14">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第16张-->

		<div class="instructions-start" v-show="tensix">
			<img class="instructions-start-one" src="../../assets/instructions/16.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger155" @click="next15">
				<fingertow></fingertow>
			</div>
		</div>
		<!--第17张-->

		<div class="instructions-start" v-show="tenseve">
			<img class="instructions-start-one" src="../../assets/instructions/17.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger166" @click="next16">
				<fingertow></fingertow>

			</div>
		</div>
		<!--第18张-->

		<div class="instructions-start" v-show="tengen">
			<img class="instructions-start-one"  src="../../assets/instructions/结束教程.jpg" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output" />
			<div class="instructions-start-finger177" @click="next17">
				<finger></finger>
			</div>
		</div>

	</div>
</template>

<script>
	import finger from '../../components/common/finger'
	import fingerone from '../../components/common/fingerone'
	import fingertow from '../../components/common/fingertow'
	import router from '../../router/index.js'
	export default {
		data() {
			return {
				quanju: true,
				first: true,
				tow: false,
				three: false,
				four: false,
				fif: false,
				six: false,
				seve: false,
				eng: false,
				nia: false,
				ten: false,
				ele: false,
				tew: false,
				ser: false,
				tenfour: false,
				tenfif: false,
				tensix: false,
				tenseve: false,
				tengen: false,
				contestId: this.$route.params.contestId

			}
		},

		methods: {
			next() {
				this.first = !this.first,
					this.tow = !this.tow

			},
			next1() {
				this.tow = !this.tow,
					this.three = !this.three
			},
			next2() {
				this.three = !this.three,
					this.four = !this.four
			},
			next3() {
				this.four = !this.four,
					this.fif = !this.fif
			},
			next4() {
				this.fif = !this.fif
				this.six = !this.six
			},
			next5() {
				this.six = !this.six
				this.seve = !this.seve
			},
			next6() {
				this.seve = !this.seve
				this.eng = !this.eng
			},
			next7() {
				this.eng = !this.eng

				this.nia = !this.nia
			},
			next8() {
				this.nia = !this.nia
				this.ten = !this.ten
			},
			next9() {
				this.ten = !this.ten
				this.ele = !this.ele
			},
			next10() {
				this.ele = !this.ele
				this.tew = !this.tew
			},
			next11() {
				this.tew = !this.tew
				this.ser = !this.ser
			},
			next12() {
				this.ser = !this.ser
				this.tenfour = !this.tenfour
			},
			next13() {
				this.tenfour = !this.tenfour
				this.tenfif = !this.tenfif
			},
			next14() {
				this.tenfif = !this.tenfif
				this.tensix = !this.tensix
			},
			next15() {
				this.tensix = !this.tensix
				this.tenseve = !this.tenseve
			},
			next16() {
				this.tenseve = !this.tenseve
				this.tengen = !this.tengen
			},
			next17() {
				this.tengen = !this.tengen
				this.quanju = !this.quanju
				router.push({
					name: 'mapplayer',
					params: {
						contestId: this.$route.params.contestId
					}
				});
			},
			output() {
				this.quanju = !this.quanju,
					this.$router.push({
						name: 'mapplayer',
						params: {
							contestId:this.$route.params.contestId
						}

					});

			}
		},
		components: {
			[finger.name]: finger,
			[fingerone.name]: fingerone,
			[fingertow.name]: fingertow

		}
	}
</script>

<style>
	.instructions-start-one{
		width:100%;
	}
	.instructions-start {
		width: 750px;
		position: relative;
	}
	
	.instructions-start-finger {
		position: absolute;
		right: 20px;
		bottom: 420px;
	}
	
	.back-instru {
		position: absolute;
		top: 45px;
		right: 45px;
	}
	
	.instructions-start-finger1 {
		position: absolute;
		top: 350px;
		left: 130px;
	}
	
	.instructions-start-finger2 {
		position: absolute;
		top: 260px;
		right: -120px;
	}
	
	.instructions-start-finger3 {
		position: absolute;
		top: 330px;
		left: 40px;
	}
	
	.instructions-start-finger44 {
		position: absolute;
		top: 450px;
		right: -120px;
	}
	
	.instructions-start-finger5 {
		position: absolute;
		top: 420px;
		left: 40px;
	}
	
	.instructions-start-finger66 {
		position: absolute;
		top: 450px;
		right: -120px;
	}
	
	.instructions-start-finger7 {
		position: absolute;
		top: 520px;
		left: 40px;
	}
	
	.instructions-start-finger88 {
		position: absolute;
		top: 830px;
		right: -120px;
	}
	
	.instructions-start-finger9 {
		position: absolute;
		top: 600px;
		left: 40px;
	}
	
	.instructions-start-finger100 {
		position: absolute;
		top: 255px;
		right: -120px;
	}
	
	.instructions-start-finger11 {
		position: absolute;
		top: 700px;
		left: 40px;
	}
	
	.instructions-start-finger122 {
		position: absolute;
		top: 820px;
		right: -120px;
	}
	
	.instructions-start-finger13 {
		position: absolute;
		top: 800px;
		left: 40px;
	}
	
	.instructions-start-finger144 {
		position: absolute;
		top: 630px;
		right: -120px;
	}
	
	.instructions-start-finger155 {
		position: absolute;
		top: 1250px;
		right: -70px;
	}
	
	.instructions-start-finger166 {
		position: absolute;
		top: 1230px;
		right: -40px;
	}
	
	.instructions-start-finger177 {
		position: absolute;
		right: 20px;
		bottom: 400px;
	}
</style>