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
		<transition name="fade">
			<div class="search" v-if="search_show">
				<div class="search_close">
					<svg class="icon" aria-hidden="true" @click="search_show = false">
					  <use xlink:href="#icon-guanbi"></use>
					</svg>
				</div>
				<div class="search_input">
					<input type="text">
				</div>
				<div class="search_association">
					<div>
						<div v-for=" v in 20">{{v}}</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data(){
		return {
			search_show: false,

			classfy_show: false,
		}
	},
	methods:{
		about() {
			
		},
		classfy() {
			
		},
		search() {
			this.search_show = true
		}
	},
	mounted(){
		
	}
}
</script>

<style scoped>
.search_association{
	display: flex;justify-content: center;
	width: 100%;color: #333
}
.search_association>div{
	width: 400px;max-width: 400px;
	max-height: 400px;
	margin-top: 1px;
	overflow-y: auto;
}
.search_association>div>div{
	background: #fff;
	width: 100%;
	padding: 10px 8px;box-sizing: border-box;
	border-bottom: 1px solid #f6f6f6;
	cursor: pointer;
	transition: padding .5s , color .5s;
}
.search_association>div>div:hover{
	background: #f3f3f3;
	padding-left: 20px;
	color: blue
}
.search_input{
	display: flex;justify-content: center;
	width: 100%;
	margin-top: 20px;
}
.search_input>input{
	max-width: 420px;width: 400px;height: 36px;
	border: none;
	border-radius: 6px;
	padding-left: 8px;box-sizing: border-box;
	outline: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
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
