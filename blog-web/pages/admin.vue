<template>
	<div class="admin_box">
		<div class="admin_tag">
			<div>新建文集</div>
		</div>
		<div class="admin_list">
			<div>新建文章</div>
		</div>
		<div class="admin_detail">
			
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
		
	},
	mounted(){
		
	}
}
</script>

<style scoped>
.admin_detail {
	flex: 16;
	overflow-y: auto;
}
.admin_list {
	flex: 8;
	overflow-y: scroll;
}
.admin_tag{
	flex: 4;
	background: #404040;
	color: #f2f2f2;
}
.admin_box{
	display: flex;width: 100%;height: 100%;
}
.admin_box>div{
	height: 100%;
}
</style>
