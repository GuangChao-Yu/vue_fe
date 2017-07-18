<template>
	<div>
		<div class="circular1">
			<img class="circular-fang1" src="../../assets/finger/ios点击@2x.png" />
			<img class="finger1" src="../../assets/finger/ios手指@2x.png"  />
		</div>
	</div>
</template>
<script>
	export default {
		name: "fingerone",
		data() {
			return {

			}
		}
	}
</script>
<style>
	.circular1{
		width: 200px;
		height: 200px;
		position: relative;
		
	}
	.finger1 {
		position: absolute;
		top: 85px;
		left: 20px;
		/*transition:finger 0.4s;*/
		animation:finger1 2s infinite linear;
	
		
	}
	
	@keyframes finger1 {
		0% {
			transform:translate(0,0) ;
		}
		50% {
			transform:translate(0,-50px);
		}
		100% {
			transform:translate(0,0) ;
		}
		
	}
	
	.circular-fang1 {
		animation: myfirst1 2s infinite linear;
	}
	
	@keyframes myfirst1 {
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