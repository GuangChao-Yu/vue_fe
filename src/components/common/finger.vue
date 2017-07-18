<template>
	<div>
		<div class="circular">
			<img class="circular-fang" src="../../assets/finger/ios点击@2x.png" />
			<img class="finger" src="../../assets/finger/ios手指@2x.png"  />
		</div>
	</div>
</template>
<script>
	export default {
		name: "finger",
		data() {
			return {

			}
		}
	}
</script>
<style>
	.circular{
		width: 200px;
		height: 200px;
		position: relative;
		
	}
	.finger {
		position: absolute;
		top: 40px;
		left: 60px;
		/*transition:finger 0.4s;*/
		animation:finger 2s infinite linear;
		transform: rotate(-45deg);
		
	}
	
	@keyframes finger {
		0% {
			transform:translate(0,0) rotate(-45deg);
		}
		25% {
			transform:translate(-20px,-20px) rotate(-45deg);
		}
		50% {
			transform:translate(0,0) rotate(-45deg);
		}
		75% {
			transform:translate(20px,20px) rotate(-45deg);
		}
		100% {
			transform:translate(0,0) rotate(-45deg);
		}
	}
	
	.circular-fang {
		animation: myfirst 2s infinite linear;
	}
	
	@keyframes myfirst {
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