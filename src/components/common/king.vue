<template>
	<div class="instructions-body" v-show="quanju">
		<!--第一张-->
		<div class="instructions-start" v-show="first">
			<img class="instructions-start-one" src="../../assets/king/2.png" />
			<div class="instructions-start-finger" @click="next">
				<finger></finger>
			</div>
		</div>
		<!--第二张-->
		<div class="instructions-start" v-show="tow">
			<img class="instructions-start-one" src="../../assets/king/3.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger1" @click="next1">
				<finger></finger>
			</div>
		</div>
		<!--第三张-->
		<div class="instructions-start" v-show="three">
			<img class="instructions-start-one" src="../../assets/king/4.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger2" @click="next2">
				<fingerone></fingerone>
			</div>
		</div>

		<!--第四张-->
		<div class="instructions-start" v-show="four">
			<img class="instructions-start-one" src="../../assets/king/5.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
		</div>

		<!--第五张-->
		<div class="instructions-start" v-show="fif">
			<img class="instructions-start-one" src="../../assets/king/6.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger4" @click="next4">
				<fingerone></fingerone>

			</div>
		</div>

		<!--第六张-->
		<div class="instructions-start" v-show="six">
			<img class="instructions-start-one" src="../../assets/king/7.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />

			
		</div>

		<!--第七张-->
		<div class="instructions-start" v-show="seve">
			<img class="instructions-start-one" src="../../assets/king/8.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger6" @click="next6">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第八张-->
		<div class="instructions-start" v-show="eng">
			<img class="instructions-start-one" src="../../assets/king/9.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			
		</div>
		<!--第九张-->
		<div class="instructions-start" v-show="nia">
			<img class="instructions-start-one" src="../../assets/king/10.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger8" @click="next8">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第十张-->
		<div class="instructions-start" v-show="ten">
			<img class="instructions-start-one" src="../../assets/king/11.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			
		</div>
		<!--第十一张-->

		<div class="instructions-start" v-show="ele">
			<img class="instructions-start-one" src="../../assets/king/12.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger10" @click="next10">
				<fingerone></fingerone>
			</div>
		</div>
		<!--第十二张-->

		<div class="instructions-start" v-show="tew">
			<img class="instructions-start-one" src="../../assets/king/13.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			
		</div>
		<!--第13张-->

		<div class="instructions-start" v-show="ser">
			<img class="instructions-start-one" src="../../assets/king/14.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger12" @click="next12">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第14张-->

		<div class="instructions-start" v-show="tenfour">
			<img class="instructions-start-one" src="../../assets/king/15.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			
		</div>
		<!--第15张-->

		<div class="instructions-start" v-show="tenfif">
			<img class="instructions-start-one" src="../../assets/king/16.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger14" @click="next14">
				<fingerone></fingerone>

			</div>
		</div>
		<!--第16张-->

		<div class="instructions-start" v-show="tensix">
			<img class="instructions-start-one" src="../../assets/king/17.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger15" @click="next15">
				<fingerone></fingerone>
			</div>
		</div>
		<!--第17张-->

		<div class="instructions-start" v-show="tenseve">
			<img class="instructions-start-one" src="../../assets/king/18.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			
		</div>
		<!--第18张-->

		<div class="instructions-start" v-show="tengen">
			<img class="instructions-start-one" src="../../assets/king/19.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger17" @click="next177">
				<fingertow></fingertow>
			</div>
		</div>
		<!--第19张-->
		<div class="instructions-start" v-show="tennia">
			<img class="instructions-start-one" src="../../assets/king/20.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger18" @click="next18">
				<fingertow></fingertow>
			</div>
		</div>
		<!--第20张-->
		<div class="instructions-start" v-show="tenten">
			<img class="instructions-start-one" src="../../assets/king/21.png" />
			<img class="back-instru" src="../../assets/instructions/closetutorail@2x.png" @click="output1" />
			<div class="instructions-start-finger19" @click="next19">
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
		name:"king",
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
				tennia:false,
				tenten:false,
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
				setTimeout(() => {
					this.four = !this.four,
						this.fif = !this.fif
				}, 800)
			},
			//			next3() {
			//				this.four = !this.four,
			//					this.fif = !this.fif
			//			},
			next4() {
				this.fif = !this.fif
				this.six = !this.six
				setTimeout(() => {
					this.six = !this.six
				this.seve = !this.seve
				}, 800)
			},
//			next5() {
//				this.six = !this.six
//				this.seve = !this.seve
//			},
			next6() {
				this.seve = !this.seve
				this.eng = !this.eng
				setTimeout(() => {
					this.eng = !this.eng
				this.nia = !this.nia
				}, 800)
			},
//			next7() {
//				this.eng = !this.eng
//
//				this.nia = !this.nia
//			},
			next8() {
				this.nia = !this.nia
				this.ten = !this.ten
				setTimeout(() => {
					this.ten = !this.ten
				this.ele = !this.ele
				}, 800)
			},
//			next9() {
//				this.ten = !this.ten
//				this.ele = !this.ele
//			},
			next10() {
				this.ele = !this.ele
				this.tew = !this.tew
				setTimeout(() => {
					this.tew = !this.tew
				this.ser = !this.ser
				}, 800)
			},
//			next11() {
//				this.tew = !this.tew
//				this.ser = !this.ser
//			},
			next12() {
				this.ser = !this.ser
				this.tenfour = !this.tenfour
				setTimeout(() => {
					this.tenfour = !this.tenfour
				this.tenfif = !this.tenfif
				}, 800)
			},
			next13() {
				this.tenfour = !this.tenfour
				this.tenfif = !this.tenfif
			},
			next14() {
				this.tenfif = !this.tenfif
				this.tensix = !this.tensix
//				setTimeout(() => {
//					this.tensix = !this.tensix
//				this.tenseve = !this.tenseve
//				}, 800)
			},
			next15() {
				this.tensix = !this.tensix
				this.tenseve = !this.tenseve
				setTimeout(() => {
					this.tenseve = !this.tenseve
				this.tengen = !this.tengen
				}, 800)
			},
			next16() {
				this.tenseve = !this.tenseve
				this.tengen = !this.tengen
				
			},
			next177() {
				this.tengen = !this.tengen

				this.tennia = !this.tennia
				
			},
			next18(){
				this.tennia = !this.tennia
				this.tenten = !this.tenten
			},
			next19(){
				this.tenten = !this.tenten,
				this.quanju = !this.quanju
				router.push({
					name: 'mapplayer',
					params: {
						contestId: this.$route.params.contestId
					}
				});
			},
			output1() {
				this.quanju = !this.quanju,
					this.$router.push({
						name: 'mapplayer',
						params: {
							contestId: this.$route.params.contestId
						}

					});

			},

		},
		components: {
			[finger.name]: finger,
			[fingerone.name]: fingerone,
			[fingertow.name]: fingertow

		}
	}
</script>

<style>
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
	
	.instructions-start-finger4 {
		position: absolute;
		top: 630px;
		right: -120px;
	}
	
	.instructions-start-finger5 {
		position: absolute;
		top: 420px;
		left: 40px;
	}
	
	.instructions-start-finger6 {
		position: absolute;
		top: 1020px;
		right: -120px;
	}
	
	.instructions-start-finger7 {
		position: absolute;
		top: 520px;
		left: 40px;
	}
	
	.instructions-start-finger8 {
		position: absolute;
		top: 320px;
		right: -120px;
	}
	
	.instructions-start-finger9 {
		position: absolute;
		top: 600px;
		left: 40px;
	}
	
	.instructions-start-finger10 {
		position: absolute;
		top: 700px;
		right: -120px;
	}
	
	.instructions-start-finger11 {
		position: absolute;
		top: 700px;
		left: 40px;
	}
	
	.instructions-start-finger12 {
		position: absolute;
		top: 1080px;
		right: -120px;
	}
	
	.instructions-start-finger13 {
		position: absolute;
		top: 800px;
		left: 40px;
	}
	
	.instructions-start-finger14 {
		position: absolute;
		top: 1150px;
		left: 40px;
	}
	
	.instructions-start-finger15 {
		position: absolute;
		top: 250px;
		right: -110px;
	}
	
	.instructions-start-finger16 {
		position: absolute;
		top: 1230px;
		right: -40px;
	}
	
	.instructions-start-finger17 {
		position: absolute;
		right: -50px;
		bottom: -110px;
	}
	.instructions-start-finger18 {
		position: absolute;
		right: -40px;
		bottom: -65px;
	}
	.instructions-start-finger19{
		position: absolute;
		right: 20px;
		bottom: 420px;
	}
</style>