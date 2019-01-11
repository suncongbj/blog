<template>
	<div class="header">
		<div class="header_img">
			<div class="btn_hover" @click="about">
				<img src="../assets/img/about.png" alt="">
			</div>
			<div class="btn_hover" @click="classfy">
				<img src="../assets/img/classfy.png" alt="">
			</div>
			<div class="btn_hover" @click="search">
				<img src="../assets/img/search.png" alt="">
			</div>
		</div>
		<div class="search">
			<div class="search_close">
				<svg class="icon" aria-hidden="true" style="">
				  <use xlink:href="#icon-guanbi"></use>
				</svg>
			</div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	methods:{
		about() {
			
		},
		classfy() {
			
		},
		search() {
			
		}
	},
	mounted(){
		
	}
}
</script>

<style scoped>
.search_close>svg{
	color: #fff;font-size: 30px;
	margin-right: 10%;margin-top: 20px;
	cursor: pointer;
}
.search_close{
	width: 100%;
	display: flex;justify-content: flex-end;
}
.search{
	position: fixed;top: 0;left: 0;
	width: 100%;height: 100%;
	background: rgba(0,0,0,.3);
}
.header_img{
	display: flex;
}
.header_img>div{
	width: 35px;height: 35px;
	cursor: pointer;
	margin: 0 10px;
	animation: icon_in 1.5s
}
@keyframes icon_in{
	from {
		opacity: 0;
		transform: translate(0,-15px)
	}
	to{
		opacity: 1;
		transform: translate(0,0);
	}
}
.header{
	width: 100%;
	margin-top: 20px;
	display: flex;justify-content: center;
}
img{
	width: 100%;height: 100%;
}
</style>
