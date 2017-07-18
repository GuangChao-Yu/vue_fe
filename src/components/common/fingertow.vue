<template>
	<div>
		<div class="circular2">
			<img class="circular-fang2" src="../../assets/finger/ios点击@2x.png" />
			<img class="finger2" src="../../assets/finger/ios手指@2x.png"  />
		</div>
	</div>
</template>
<script>
	export default {
		name: "fingertow",
		data() {
			return {

			}
		}
	}
</script>
<style>
	.circular2{
		width: 200px;
		height: 200px;
		position: relative;
		
	}
	.finger2 {
		position: absolute;
		top: -50px;
		left: 5px;
		/*transition:finger 0.4s;*/
		animation:finger2 2s infinite linear;
	
		
	}
	
	@keyframes finger2 {
		0% {
			transform:translate(0,0) rotate(-180deg);
		}
		50% {
			transform:translate(0,-50px) rotate(-180deg);
		}
		100% {
			transform:translate(0,0) rotate(-180deg);
		}
		
	}
	
	.circular-fang2 {
		animation: myfirst2 2s infinite linear;
	}
	
	@keyframes myfirst2 {
		0% {
			transform: scale(0.8);
		}
		50% {
			transform: scale(1);
		}
		100% {
			transform: scale(0.8);
		}
	}
</style>